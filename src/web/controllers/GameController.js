export class GameController {
    constructor({
        createGameUC, 
        updateGameUC,
        deleteGameUC,
        getAllGamesUC, 
        getAllVerifiedGamesUC, 
        getByIdGameUC, 
        getUserLibraryWithDetailsUC, 
        getByUserIdGameUC,
        verifySwitchUC,
        getGameStatsUC
    }) {
        this.createGameUC = createGameUC,
        this.updateGameUC = updateGameUC,
        this.deleteGameUC = deleteGameUC,
        this.getAllGamesUC = getAllGamesUC;
        this.getAllVerifiedGamesUC = getAllVerifiedGamesUC,
        this.getByIdGameUC = getByIdGameUC,
        this.getUserLibraryWithDetailsUC = getUserLibraryWithDetailsUC,
        this.getByUserIdGameUC = getByUserIdGameUC,
        this.verifySwitchUC = verifySwitchUC,
        this.getGameStatsUC = getGameStatsUC
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

    handleDelete = async (req, res) => {
        try {
            const { id } = req.params;

            await this.deleteGameUC.execute(id);

            return res.status(204).json({ message: "Game deleted"});
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleUpdate = async (req, res) => {
        try {
            const { id } = req.params;
            const gameData = req.body;
            const userId = req.user.id;
            const userRole = req.user.role;

            await this.updateGameUC.execute(id, gameData, userId, userRole);

            return res.status(200).json({ message: "Game updated"});
        } catch (err) {
            return res.status(403).json({ error: err.message });
        }
    }

    handleGetAll = async (req, res) => {
        try {
            const games = await this.getAllGamesUC.execute();

            return res.status(200).json(games);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    handleGetAllVerified = async (req, res) => {
        try {
            const games = await this.getAllVerifiedGamesUC.execute();
            return res.status(200).json(games);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    handleGetById = async (req, res) => {
        try {
            const { id } = req.params;
            const game = await this.getByIdGameUC.execute(id);

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
            const games = await this.getByUserIdGameUC.execute(userId);
            return res.status(200).json(games);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleVerifySwitch = async (req, res) => {
        try {
            const { id } = req.params;

            await this.verifySwitchUC.execute(id);

            return res.status(200).json({
                message: "Game verified/unverified successfully"
            });
        } catch (err) {
            const statusCode = err.message == "Game not found" ? 404 : 500;

            return res.status(statusCode).json({
                error: err.message
            });
        }
    }

    handleGetStats = async (req, res) => {
        try {
            const stats = await this.getGameStatsUC.execute();

            return res.status(200).json(stats);
        } catch (err) {
            console.error("Stats Error:", err);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}