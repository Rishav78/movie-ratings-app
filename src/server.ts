import express, { Express } from "express";
import http from "http";
import Routes from "./routes";

export class Server {
  private readonly app: Express;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
  }

  private initMiddlewares() {
    this.app.use(express.json());
  }

  private initRoutes() {
    this.app.use("/api", Routes);
  }

  public async init() {
    this.initMiddlewares();
    this.initRoutes();
    
    const httpServer = http.createServer(this.app);
    httpServer.listen(this.port, () => console.info(`🚀 Server ready at http://localhost:${this.port}`));
  }
}