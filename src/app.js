import express from "express";
import { initRegistry } from "./registry.js";

// Routes
import { gameRouter } from "./web/routes/gameRoutes.js";
import { userRouter } from "./web/routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

const { gameController, userController } = await initRegistry();

// Routes
app.use('/api/v1/games', gameRouter(gameController));
app.use('/api/v1/users', userRouter(userController));

export default app;