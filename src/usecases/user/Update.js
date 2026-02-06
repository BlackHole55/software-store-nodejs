export class UpdateUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async execute(userId, updates) {
        const existingUser = await this.userRepo.getById(userId);
        if (!existingUser) {
            throw new Error(`User with ID ${userId} not found`);
        }

        const allowedFields = ['name', 'email', '']; 
        const filteredUpdates = Object.keys(updates)
            .filter(key => allowedFields.includes(key))
            .reduce((obj, key) => {
                obj[key] = updates[key];
                return obj;
            }, {});

        if (Object.keys(filteredUpdates).length === 0) {
            return existingUser; 
        }

        return await this.userRepo.update(userId, filteredUpdates);
    }
}