import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./routes/index.routes.js";
import { rateLimit } from "express-rate-limit";
import helmet from "helmet";

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 1000,
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(cookieParser());

app.use(limiter);

app.use(express.static(path.join(process.cwd(), "public")));
app.use(express.json());

app.use(router);

app.get("/", (req, res) => {
  const message = "Api Connected !";
  res.status(200).json({ message });
});

export default app;
