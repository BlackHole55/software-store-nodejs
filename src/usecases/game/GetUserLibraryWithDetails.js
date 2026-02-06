export class GetUserLibraryWithDetailsUseCase {
    constructor(gameRepo, userRepo) {
        this.gameRepo = gameRepo;
        this.userRepo = userRepo;
    }

    async execute(userId) {
        const user = await this.userRepo.getById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        const gameIds = user.library.map(item => item.game_id.toString());

        const games = await this.gameRepo.getByIds(gameIds);

        const gameMap = new Map(
            games.map(game => [game._id.toString(), game])
        );

        return user.library.map(item => {
            const gameIdStr = item.game_id.toString();
            const game = gameMap.get(gameIdStr);

            return {
                gameId: gameIdStr,
                title: game ? game.title : "Unkown Game",
                addedAt: item.addedAt,
                playtimeHours: item.playtimeHours
            };
        });
    }
}