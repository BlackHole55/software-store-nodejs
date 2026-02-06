export class GameController {
    constructor({
        createGameUC, 
        getAllUC, 
        getAllVerifiedUC, 
        getByIdUC, 
        getByIdsUC, 
        getByUserIdUC
    }) {
        this.createGameUC = createGameUC;
        this.getAllUC = getAllUC;
        this.getAllVerifiedUC = getAllVerifiedUC,
        this.getByIdUC = getByIdUC,
        this.getByIdsUC = getByIdsUC,
        this.getByUserIdUC = getByUserIdUC
    }

    handleCreate = async (req, res) => {
        try {
            const gameData = req.body;
            const userId = (req).user.id;

            await this.createGameUC.execute(gameData, userId);

            return res.status(201).json({ message: "Game created successfuly" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleGetAll = async (req, res) => {
        try {
            const games = await this.getAllUC.execute();

            return res.status(200).json(games)
        } catch (err) {
            return res.status()
        }
    }
}