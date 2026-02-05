import type { User } from "../entities/User.js";


export interface IUserRepository{  
    create(user: User): Promise<void>;
      
    getAll(): Promise<User[]>;
      
    getById(id: string): Promise<User | null>;

    getByEmail(email: string): Promise<User | null>;
      
    update(id: string, updates: Partial<User>): Promise<void>;
      
    delete(id: string): Promise<void>;
}