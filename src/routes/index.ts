import { Router } from "express";
import { authRouter } from "./authRouter";
import { avatarRouter } from "./avatarRouter";
import { productRouter } from "./productRouter";
import { tagRouter } from "./tagRouter";
import { userRouter } from "./userRouter";

const router = Router();

authRouter(router);
userRouter(router);
productRouter(router);
tagRouter(router);
avatarRouter(router);

export { router };
