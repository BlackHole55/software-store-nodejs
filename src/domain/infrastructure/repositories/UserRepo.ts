import type { User } from "../../entities/User.js";
import type { IUserRepository } from "../../repositories/IUserInterface.js";


export class UserRepo implements IUserRepository{
    getByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    create(user: User): Promise<void> {
        throw new Error("Method not implemented.");
    }
    getAll(): Promise<User[]> {
        throw new Error("Method not implemented.");
    }
    getById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    update(id: string, updates: Partial<User>): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

}