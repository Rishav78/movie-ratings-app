import "reflect-metadata";
import "./lib/env";
import "./db/db";
import {Server} from "./server";

const app = new Server();
app.init();