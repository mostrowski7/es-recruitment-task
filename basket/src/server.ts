import express, { Application } from "express";
import loadDatabase from "./loaders/database";
import loadExpress from "./loaders/express";

export default async (): Promise<Application> => {
  const app = express();
  loadExpress(app);
  try {
    await loadDatabase();
  } catch (err) {
    throw err;
  }
  return app;
};
