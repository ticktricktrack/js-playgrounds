import { Context } from "@oak/oak";

type WebsocketWithUsername = WebSocket & { username: string };
type AppEvent = { event: string; [key: string]: any };

export default class ChatServer {
  private connectedUsers = new Map<string, WebsocketWithUsername>();

  public async handleConnection(ctx: Context) {
    const socket = await ctx.upgrade() as WebsocketWithUsername;
    const username = ctx.request.url.searchParams.get("username");
    console.log(`Username: ${username} connected`);

    if (this.connectedUsers.has(username!)) {
      socket.close(1008, "Username already in use");
      return;
    }

    socket.username = username!;
    socket.onopen = this.broadcastUsernames.bind(this);
    socket.onclose = () => this.clientDisconnected(username!);
    socket.onmessage = (message) => this.send(username!, message);

    this.connectedUsers.set(username!, socket);
  }

  private send(username: string, message: any) {
    const data = JSON.parse(message.data);
    if (data.event !== "send-message") return;
    this.broadcast({
      event: "send-message",
      username: username,
      message: data.message,
    });
  }

  private clientDisconnected(username: string) {
    this.connectedUsers.delete(username);
    this.broadcastUsernames();
  }

  private broadcastUsernames() {
    const usernames = [...this.connectedUsers.keys()];
    this.broadcast({ event: "update-users", usernames });
  }

  private broadcast(event: AppEvent) {
    const eventString = JSON.stringify(event);
    for (const client of this.connectedUsers.values()) {
      client.send(eventString);
    }
  }
}
