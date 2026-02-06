import bcrypt from "bcryptjs";

export class RegisterUserUseCase {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }

    async execute(userData) {
        if (!userData.email) {
            throw new Error("Email is required");
        }

        const existingUser = await this.userRepo.getByEmail(userData.email);
        if (existingUser) {
            throw new Error("User with this email already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(userData.password, salt);

        const newUser = {
            ...userData,
            password: hashedPassword,
            role: userData.role || "user", 
            created_at: new Date()
        };
        return await this.userRepo.create(newUser);
    }
}