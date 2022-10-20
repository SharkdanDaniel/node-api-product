import { Router } from "express";
import { AuthController } from "./controllers/AuthController";
import { AvatarController } from "./controllers/AvatarController";
import { ProductController } from "./controllers/ProductController";
import { TagController } from "./controllers/TagController";
import { UserController } from "./controllers/UserController";
import { ensureAuth } from "./middlewares/ensureAuth";

const router = Router();
const authController = new AuthController();
const userController = new UserController();
const productController = new ProductController();
const tagController = new TagController();
const avatarController = new AvatarController();

// host
router.get("/", (req, res) => res.send('Hello World'));

// login
router.post("/login", authController.login);

// users
router.get("/users", ensureAuth, userController.getAll);
router.get("/users/:id", ensureAuth, userController.getById);
router.post("/users", ensureAuth, userController.create);
router.put("/users", ensureAuth, userController.update);
router.delete("/users/:id", ensureAuth, userController.delete);

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
