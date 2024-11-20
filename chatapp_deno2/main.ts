import { Application, Context, Router } from "@oak/oak";
import ChatServer from "./ChatServer.ts";

const app = new Application();
const port = 8000;
const router = new Router();
const chatServer = new ChatServer();

router.get("/ws", (ctx) => chatServer.handleConnection(ctx));

app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (context) => {
  await context.send({
    root: `${Deno.cwd()}/public`,
    index: "index.html",
  });
});

console.log(`Server running on port ${port}`);
await app.listen({ port });
