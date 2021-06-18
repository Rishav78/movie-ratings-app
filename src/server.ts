import express, { Express } from "express";
import http from "http";

export class Server {
  private readonly app: Express;
  private readonly port: number;

  constructor() {
    this.app = express();
    this.port = Number(process.env.PORT) || 3000;
  }

  private initMiddlewares() {

  }

  private initRoutes() {

  }

  public async init() {
    this.initMiddlewares();
    this.initRoutes();
    
    const httpServer = http.createServer(this.app);
    httpServer.listen(this.port, () => console.info(`🚀 Server ready at http://localhost:${this.port}`));
  }
}