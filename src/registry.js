// import Repositories
import { GameRepository } from "./infrastructure/mongoose/repositories/GameRepository.js";
import { UserRepository } from "./infrastructure/mongoose/repositories/UserRepository.js";
import { CompanyRepository } from "./infrastructure/mongoose/repositories/CompanyRepository.js";
import { PurchaseRepository } from "./infrastructure/mongoose/repositories/PurchaseRepository.js";
import { ReviewRepository } from "./infrastructure/mongoose/repositories/ReviewRepository.js";

// import Game Use Cases
import { CreateGameUseCase } from "./usecases/game/CreateGame.js";
import { UpdateGameUseCase } from "./usecases/game/Update.js";
import { DeleteGameUseCase } from "./usecases/game/Delete.js";
import { GetAllGamesUseCase } from "./usecases/game/GetAll.js";
import { GetAllVerifiedGamesUseCase } from "./usecases/game/GetAllVerified.js";
import { GetByIdGameUseCase } from "./usecases/game/GetById.js";
import { GetUserLibraryWithDetailsUseCase } from "./usecases/game/GetUserLibraryWithDetails.js";
import { GetByUserIdGameUseCase } from "./usecases/game/GetByUserId.js";

// import User Use Cases
import { RegisterUserUseCase } from "./usecases/user/RegisterUser.js";
import { LoginUserUseCase } from "./usecases/user/LoginUser.js";
import { UpdateUserUseCase } from "./usecases/user/Update.js";
import { GetAllUsersUseCase } from "./usecases/user/GetAll.js";
import { GetByIdUserUseCase } from "./usecases/user/GetById.js";
import { DeleteUserUseCase } from "./usecases/user/Delete.js";

// import Company Use Cases
import { GetAllCompanyUseCase } from "./usecases/company/GetAll.js";
import { GetByIdCompanyUseCase } from "./usecases/company/GetById.js";
import { CreateCompanyUseCase } from "./usecases/company/CreateCompany.js";
import { UpdateCompanyUseCase } from "./usecases/company/Update.js";
import { DeleteCompanyUseCase } from "./usecases/company/Delete.js";
import { GetAllVerifiedCompaniesUseCase } from "./usecases/company/GetAllVerified.js";
import { VerifyCompanyUseCase } from "./usecases/company/VerifyCompany.js";

// import Emulation Use Cases
import { CreateEmulationUseCase } from "./usecases/emulation/CreateEmulation.js";
import { GetAllEmulationsUseCase } from "./usecases/emulation/GetAll.js";
import { GetByIdEmulationUseCase } from "./usecases/emulation/GetById.js";
import { UpdateEmulationUseCase } from "./usecases/emulation/Update.js";
import { DeleteEmulationUseCase } from "./usecases/emulation/Delete.js";

// import Purchase Use Cases
import { CreatePurchaseUseCase } from "./usecases/purchase/Create.js";
import { GetAllPurchaseUseCase } from "./usecases/purchase/GetAll.js";
import { GetByIdPurchaseUseCase } from "./usecases/purchase/GetById.js";
import { DeletePurchaseUseCase } from "./usecases/purchase/Delete.js";

// import Review Use Cases
import { CreateReviewUC } from "./usecases/review/Create.js";
import { UpdateReviewUC } from "./usecases/review/Update.js";
import { DeleteReviewUC } from "./usecases/review/Delete.js";
import { GetAllReviewUC } from "./usecases/review/GetAll.js";
import { GetByIdReviewUC } from "./usecases/review/GetById.js";
import { GetByGameIdReviewUC } from "./usecases/review/GetByGameId.js";

// import Controllers
import { GameController } from "./web/controllers/GameController.js";
import { UserController } from "./web/controllers/UserController.js";
import { CompanyController } from "./web/controllers/CompanyController.js";
import { EmulationController } from "./web/controllers/EmulationController.js";
import { PurchaseController } from "./web/controllers/PurchaseController.js";
import { ReviewController } from "./web/controllers/ReviewController.js";

export const initRegistry = async () => {
    // Initialize Repositories
    const gameRepo = new GameRepository();
    const userRepo = new UserRepository();
    const companyRepo = new CompanyRepository();
    const emulationRepo = new EmulationRepository();
    const purchaseRepo = new PurchaseRepository();
    const reviewRepo = new ReviewRepository();

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

    // Initialize Company Use Cases
    const getAllCompaniesUC = new GetAllCompanyUseCase(companyRepo);
    const getByIdCompanyUC = new GetByIdCompanyUseCase(companyRepo);
    const createCompanyUC = new CreateCompanyUseCase(companyRepo);
    const updateCompanyUC = new UpdateCompanyUseCase(companyRepo);
    const deleteCompanyUC = new DeleteCompanyUseCase(companyRepo);
    const getAllVerifiedCompaniesUC = new GetAllVerifiedCompaniesUseCase(companyRepo);
    const verifyCompanyUC = new VerifyCompanyUseCase(companyRepo);

    // Initialize Emulation Use Cases
    const createEmulationUC = new CreateEmulationUseCase(emulationRepo);
    const getAllEmulationsUC = new GetAllEmulationsUseCase(emulationRepo);
    const getByIdEmulationUC = new GetByIdEmulationUseCase(emulationRepo)
    const updateEmulationUseCase = new UpdateEmulationUseCase(emulationRepo);
    const deleteEmulationUC = new DeleteEmulationUseCase(emulationRepo);

    // Initialize Purchase Use Cases
    const createPurchaseUC = new CreatePurchaseUseCase(purchaseRepo, userRepo);
    const getAllPurchaseUC = new GetAllPurchaseUseCase(purchaseRepo);
    const getByIdPurchaseUC = new GetByIdPurchaseUseCase(purchaseRepo);
    const deletePurchaseUC = new DeletePurchaseUseCase(purchaseRepo);

    // Initialize Purchase Use Cases
    const createReviewUC = new CreateReviewUC(reviewRepo, userRepo);
    const updateReviewUC = new UpdateReviewUC(reviewRepo);
    const deleteReviewUC = new DeleteReviewUC(reviewRepo);
    const getAllReviewUC = new GetAllReviewUC(reviewRepo);
    const getByIdReviewUC = new GetByIdReviewUC(reviewRepo);
    const getByGameIdReviewUC = new GetByGameIdReviewUC(reviewRepo, gameRepo);

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

    const userController = new UserController({
        registerUserUC: registerUserUC, 
        loginUserUC: loginUserUC,
        updateUserUC: updateUserUC,
        getAllUserUC: getAllUserUC,
        getByIdUserUC: getByIdUserUC, 
        deleteUserUC: deleteUserUC
    })

    const companyController = new CompanyController({
        getAllCompaniesUC: getAllCompaniesUC ,
        getByIdCompanyUC: getByIdCompanyUC,
        createCompanyUC: createCompanyUC,
        updateCompanyUC: updateCompanyUC,
        deleteCompanyUC: deleteCompanyUC,
        getAllVerifiedCompaniesUC: getAllVerifiedCompaniesUC, 
        verifyCompanyUC: verifyCompanyUC
    });


    const emulationController = new EmulationController({
        createEmulationUC,
        getAllEmulationsUC,
        getByIdEmulationUC,
        updateEmulationUseCase,
        deleteEmulationUC
    });

    const purchaseController = new PurchaseController({
        createPurchaseUC: createPurchaseUC,
        getAllPurchaseUC: getAllPurchaseUC,
        getByIdPurchaseUC: getByIdPurchaseUC,
        deletePurchaseUC: deletePurchaseUC
    })

    const reviewController = new ReviewController({
        createReviewUC: createReviewUC,
        updateReviewUC: updateReviewUC,
        deleteReviewUC: deleteReviewUC,
        getAllReviewUC: getAllReviewUC,
        getByIdReviewUC: getByIdReviewUC,
        getByGameIdReviewUC: getByGameIdReviewUC
    })

    return {
        gameController,
        userController,
        companyController,
        emulationController,
        purchaseController,
        reviewController
    }
}