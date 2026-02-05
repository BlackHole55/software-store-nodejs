import type { Company } from "../entities/Company.js";

export interface ICompanyRepository {  
    create(user: Company): Promise<void>;
    
    getAll(): Promise<Company[]>;

    getById(id: string): Promise<Company | null>;

    update(id: string, updates: Partial<Company>): Promise<void>;
    
    delete(id: string): Promise<void>;
}