import { Application, Router } from "https://deno.land/x/oak@v12.3.0/mod.ts";

const db = await Deno.openKv();

const app = new Application();
const router = new Router();

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });
