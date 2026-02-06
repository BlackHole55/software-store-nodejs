export class GameController {
    constructor({
        createGameUC, 
        getAllUC, 
        getAllVerifiedUC, 
        getByIdUC, 
        getUserLibraryWithDetailsUC, 
        getByUserIdUC
    }) {
        this.createGameUC = createGameUC;
        this.getAllUC = getAllUC;
        this.getAllVerifiedUC = getAllVerifiedUC,
        this.getByIdUC = getByIdUC,
        this.getUserLibraryWithDetailsUC = getUserLibraryWithDetailsUC,
        this.getByUserIdUC = getByUserIdUC
    }

    handleCreate = async (req, res) => {
        try {
            const gameData = req.body;
            const userId = req.user.id;

            await this.createGameUC.execute(gameData, userId);

            return res.status(201).json({ message: "Game created successfuly" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleGetAll = async (req, res) => {
        try {
            const games = await this.getAllUC.execute();

            return res.status(200).json(games);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    handleGetAllVerified = async (req, res) => {
        try {
            const games = await this.getAllVerifiedUC.execute();
            return res.status(200).json(games);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    handleGetById = async (req, res) => {
        try {
            const { id } = req.params;
            const game = await this.getByIdUC.execute(id);

            if (!game) return res.status(404).json({ error: "Game not found" });

            return res.status(200).json(game);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleGetUserLibraryWithDetails = async (req, res) => {
        try {
            const userId = req.user.id;

            if (!userId) {
                return res.status(401).json({ error: "  Unauthorized: User ID not found"})
            }

            const libraryGames = await this.getUserLibraryWithDetailsUC.execute(userId);

            return res.status(200).json(libraryGames);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    handleGetByUserId = async (req, res) => {
        try {
            const userId = req.user.id;
            const games = await this.getByUserIdUC.execute(userId);
            return res.status(200).json(games);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}