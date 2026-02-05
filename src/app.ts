import express from "express";

// Repositories
import { GameRepository } from "./infrastructure/mongoose/repositories/GameRepository.js";
import { UserRepository } from "./infrastructure/mongoose/repositories/UserRepository.js";

// Use Cases
import { CreateGameUseCase } from "./usecases/game/CreateGame.js";
import { RegisterUserUseCase } from "./usecases/user/RegisterUser.js";
import { LoginUserUseCase } from "./usecases/user/LoginUser.js";

// Controllers
import { GameController } from "./web/controllers/GameController.js";
import { UserController} from "./web/controllers/UserController.js"; 

// Routes
import { gameRouter } from "./web/routes/gameRoutes.js";
import { userRouter } from "./web/routes/userRoutes.js";

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Initialize Repositories
const gameRepo = new GameRepository();
const userRepo = new UserRepository();

// Initialize Use Cases
const createGameUC = new CreateGameUseCase(gameRepo);
const registerUserUC = new RegisterUserUseCase(userRepo);
const loginUserUC = new LoginUserUseCase(userRepo);

// Initialize Controllers
const gameController = new GameController(createGameUC);
const userController = new UserController(registerUserUC, loginUserUC)
// Routes
app.use('/api/v1/games', gameRouter(gameController));

app.use('/api/v1/users', userRouter(userController));


export default app;