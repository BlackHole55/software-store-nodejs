// import Repositories
import { GameRepository } from "./infrastructure/mongoose/repositories/GameRepository";
import { UserRepository } from "./infrastructure/mongoose/repositories/UserRepository";

// import Game Use Cases
import { CreateGameUseCase } from "./usecases/game/CreateGame.js";
import { UpdateGameUseCase } from "./usecases/game/Update.js";
import { DeleteGameUseCase } from "./usecases/game/Delete.js";
import { GetAllGamesUseCase } from "./usecases/game/GetAll.js";
import { GetAllVerifiedGamesUseCase } from "./usecases/game/GetAllVerified.js";
import { GetByIdGameUseCase } from "./usecases/game/GetById.js";
import { GetUserLibraryWithDetailsUseCase } from "./usecases/game/GetUserLibraryWithDetails.js";
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
    const updateGameUc = new UpdateGameUseCase(gameRepo);
    const deleteGameUC = new DeleteGameUseCase(gameRepo);
    const getAllGamesUC = new GetAllGamesUseCase(gameRepo);
    const getAllVerifiedGamesUC = new GetAllVerifiedGamesUseCase(gameRepo);
    const getByIdGameUC = new GetByIdGameUseCase(gameRepo);
    const getUserLibraryWithDetailsUC = new GetUserLibraryWithDetailsUseCase(gameRepo, userRepo);
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
        updateGameUC: updateGameUc,
        deleteGameUC: deleteGameUC,
        getAllGamesUC: getAllGamesUC, 
        getAllVerifiedGamesUC: getAllVerifiedGamesUC, 
        getByIdGameUC: getByIdGameUC, 
        getUserLibraryWithDetailsUC: getUserLibraryWithDetailsUC, 
        getByUserIdGameUC: getByUserIdGameUC
    });

    const userController = new UserController(registerUserUC, loginUserUC,updateUserUC,getAllUserUC,getByIdUserUC, deleteUserUC)

    return {
        gameController,
        userController
    }
}