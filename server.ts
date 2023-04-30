import { z } from "https://deno.land/x/zod@v3.21.4/mod.ts";
import { Application, Router } from "https://deno.land/x/oak@v12.3.0/mod.ts";

const createScheduledTaskParamsSchema = z.object({
  newUserId: z.coerce.string(),
  serviceName: z.string(),
  date: z.string(),
  timeName: z.string(),
});

const db = await Deno.openKv();

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });
