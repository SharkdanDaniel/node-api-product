import "reflect-metadata";
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import "express-async-errors";
import { router } from "./routes";
import "./db";
import cors from "cors";
import fileUpload from "express-fileupload";
import { swaggerOptions } from "./utils/swagger";
import  expressJSDocSwagger from 'express-jsdoc-swagger';

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors({
  origin: ["http://localhost:4200", "http://localhost:3000"],
}))
app.use(fileUpload());
app.use(express.json());
app.use('/api', router);
app.get('/', (req, res) => res.redirect('docs'));
// app.use(express.static("public"));
app.use('/public', express.static(__dirname + 'public'));
app.use((err: Error | any, req: Request, res: Response, next: NextFunction) => {
  if (err.status) return res.status(err.status).json({ status: err.status, message: err.message });
  if (err instanceof Error) return res.status(400).json({ status: 400, message: err.message });
  return res.status(500).json({ status: 500, message: "Internal Server Error" });
})

swaggerOptions.baseDir = __dirname;

expressJSDocSwagger(app)(swaggerOptions);

app.listen(PORT, () => console.log("Server is running!"));