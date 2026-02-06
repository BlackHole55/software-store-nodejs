import bcrypt from "bcryptjs";

export class UpdateUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async execute(id, updates, requestUserId, requestUserRole) {
        const existingUser = await this.userRepo.getById(id);
        if (!existingUser) {
            throw new Error(`User with ID ${id} not found`);
        }

        if (requestUserRole !== "admin" && id !== requestUserId) {
            throw new Error("Permission denied: you can only update your own profile");
        }

        const finalUpdateData = {
            ...updates,
            updated_at: new Date()
        };

        if (updates.password) {
            const salt = await bcrypt.genSalt(10);
            finalUpdateData.password = await bcrypt.hash(updates.password, salt);
        }

        if (updates.role && requestUserRole !== "admin") {
            delete finalUpdateData.role;
        }

        return await this.userRepo.update(id, finalUpdateData);
    }
}