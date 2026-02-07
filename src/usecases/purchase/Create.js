export class CreatePurchaseUseCase {
    constructor(purchaseRepo, userRepo) {
        this.purchaseRepo = purchaseRepo;
        this.userRepo = userRepo;
    }

    async execute(purchaseData) {
        const purchase = await this.purchaseRepo.create(purchaseData);

        const user = await this.userRepo.getById(purchase.user_id.toString());
        if (!user) {
            throw new Error("User not found");
        }

        const now = new Date();

        purchase.items.forEach(item => {
            const isOwned = user.library.some(
                libGame => libGame.game_id.toString() === item.game_id.toString()
            );

            if (!isOwned) {
                user.library.push({
                    game_id: item.game_id,
                    added_at: now,
                    playtime_hours: 0
                });
            }
        });

        return await this.userRepo.update(user._id.toString(), user);
    }
}