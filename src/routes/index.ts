import { Router } from "express";
import { AvatarController } from "../controllers/AvatarController";
import { ProductController } from "../controllers/ProductController";
import { TagController } from "../controllers/TagController";
import { UserController } from "../controllers/UserController";
import { ensureAuth } from "../middlewares/ensureAuth";
import { authRouter } from "./authRouter";
import { userRouter } from "./userRouter";

const router = Router();
const userController = new UserController();
const productController = new ProductController();
const tagController = new TagController();
const avatarController = new AvatarController();

authRouter(router);
userRouter(router);
// products
router.get("/products", ensureAuth, productController.getAll);
router.get("/products/:id", ensureAuth, productController.getById);
router.post("/products", ensureAuth, productController.create);
router.put("/products", ensureAuth, productController.update);
router.delete("/products/:id", ensureAuth, productController.delete);

// tags
router.get("/tags", ensureAuth, tagController.getAll);
router.get("/tags/:id", ensureAuth, tagController.getById);
router.post("/tags", ensureAuth, tagController.create);
router.put("/tags", ensureAuth, tagController.update);
router.delete("/tags/:id", ensureAuth, tagController.delete);
// avatars
router.get("/avatars", ensureAuth, avatarController.getById);

router.post("/avatars", ensureAuth, avatarController.create);

export { router };
