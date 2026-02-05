import express from "express";

// Repositories
import { GameRepository } from "./infrastructure/mongoose/repositories/GameRepository.js";

// Use Cases
import { CreateGameUseCase } from "./usecases/game/CreateGame.js";

// Controllers
import { GameController } from "./web/controllers/GameController.js";

// Routes
import { gameRouter } from "./web/routes/gameRoutes.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Initialize Repositories
const gameRepo = new GameRepository();

// Initialize Use Cases
const createGameUC = new CreateGameUseCase(gameRepo);

// Initialize Controllers
const gameController = new GameController(createGameUC);

// Routes
app.use('/api/v1/games', gameRouter(gameController));

export default app;