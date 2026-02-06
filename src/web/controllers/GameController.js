export class GameController {
    constructor(createGameUC){
        this.createGameUC = createGameUC;
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
}