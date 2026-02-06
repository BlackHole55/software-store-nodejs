// import Repositories
import { GameRepository } from "./infrastructure/mongoose/repositories/GameRepository";
import { UserRepository } from "./infrastructure/mongoose/repositories/UserRepository";

// import Game Use Cases
import { CreateGameUseCase } from "./usecases/game/CreateGame.js";
import { GetAllGamesUseCase } from "./usecases/game/GetAll.js";
import { GetAllVerifiedGamesUseCase } from "./usecases/game/GetAllVerified.js";
import { GetByIdGameUseCase } from "./usecases/game/GetById.js";
import { GetByIdsGameUseCase } from "./usecases/game/GetByIds";
import { GetByUserIdGameUseCase } from "./usecases/game/GetByUserId";

// import User Use Cases
import { RegisterUserUseCase } from "./usecases/user/RegisterUser.js";
import { LoginUserUseCase } from "./usecases/user/LoginUser.js";
import { UpdateUserUseCase } from "./usecases/user/Update.js";
import { GetAllUsersUseCase } from "./usecases/user/GetAll.js";
import { GetByIdUserUseCase } from "./usecases/user/GetById.js";
import { DeleteUserUseCase } from "./usecases/user/Delete.js";

// import Controllers
import { GameController } from "./web/controllers/GameController";
import { UserController } from "./web/controllers/UserController";

export const initRegistry = async () => {
    // Initialize Repositories
    const gameRepo = new GameRepository();
    const userRepo = new UserRepository();

    // Initialize Game Use Cases
    const createGameUC = new CreateGameUseCase(gameRepo);
    const getAllGamesUC = new GetAllGamesUseCase(gameRepo);
    const getAllVerifiedGamesUC = new GetAllVerifiedGamesUseCase(gameRepo);
    const getByIdGameUC = new GetByIdGameUseCase(gameRepo);
    const getByIdsGameUC = new GetByIdsGameUseCase(gameRepo);
    const getByUserIdGameUC = new GetByUserIdGameUseCase(gameRepo);

    // Initialize User Use Cases
    const registerUserUC = new RegisterUserUseCase(userRepo);
    const loginUserUC = new LoginUserUseCase(userRepo);
    const updateUserUC = new UpdateUserUseCase(userRepo)
    const getAllUserUC = new GetAllUsersUseCase(userRepo)
    const getByIdUserUC = new GetByIdUserUseCase(userRepo)
    const deleteUserUC = new DeleteUserUseCase(userRepo)

    // Initialize Controllers
    const gameController = new GameController({
        createGameUC: createGameUC, 
        getAllGamesUC: getAllGamesUC, 
        getAllVerifiedGamesUC: getAllVerifiedGamesUC, 
        getByIdGameUC: getByIdGameUC, 
        getByIdsGameUC: getByIdsGameUC, 
        getByUserIdGameUC: getByUserIdGameUC
    });

    const userController = new UserController(registerUserUC, loginUserUC,updateUserUC,getAllUserUC,getByIdUserUC, deleteUserUC)

    return {
        gameController,
        userController
    }
}