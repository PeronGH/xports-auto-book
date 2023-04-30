import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.3.0/mod.ts";
import { parseDate } from "./utils.ts";
import { autoBook } from "./mod.ts";

const requestParamsSchema = z.object({
  netUserId: z.coerce.string(),
  serviceName: z.string(),
  date: z.string().refine((value) => parseDate(value) !== null, "Invalid date"),
  timeName: z.string(),
});
type RequestParams = z.infer<typeof requestParamsSchema>;

const db = await Deno.openKv();

const app = new Application();
const router = new Router();

router.post("/book", async (ctx) => {
  try {
    const body = ctx.request.body({ type: "json" });
    const params = requestParamsSchema
      .parse(await body.value);

    const id = crypto.randomUUID();

    await db.set(["tasks", params.date, id], params);

    ctx.response.body = id;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = error;
  }
});

router.get("/book/:date/:id", async (ctx) => {
  const { date, id } = ctx.params;
  ctx.response.body = (await db.get<RequestParams>(["tasks", date, id])).value;
});

router.get("/run", async (ctx) => {
  const tasks = db.list<RequestParams>({ prefix: ["tasks"] });
  const removeTaskKeys: Promise<void>[] = [];
  const validTasks: Promise<void>[] = [];

  for await (const { key, value } of tasks) {
    const date = key[1] as `${number}-${number}-${number}`;
    const parsedDate = parseDate(date);
    if (parsedDate === null) {
      removeTaskKeys.push(db.delete(key));
      continue;
    }

    const now = new Date();
    if (
      parsedDate.getTime() > now.getTime() &&
      parsedDate.getTime() < now.getTime() + 1000 * 60 * 60 * 24 * 7
    ) {
      // deno-lint-ignore ban-ts-comment
      // @ts-ignore
      validTasks.push(autoBook(value).catch(() => {}));
      removeTaskKeys.push(db.delete(key));
    }
  }
  try {
    await Promise.all([Promise.all(validTasks), Promise.all(removeTaskKeys)]);
    ctx.response.body = removeTaskKeys;
  } catch (error) {
    ctx.response.status = 500;
    ctx.response.body = error;
  }
});

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });
