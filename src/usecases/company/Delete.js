


export class DeleteCompanyUseCase{
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }

    async execute(companyId) {    
        const existingUser = await this.companyRepo.getById(companyId);
        
        if (!existingUser) {
            throw new Error(`Cannot delete: Company with ID ${companyId} not found`);
        }

        await this.companyRepo.delete(companyId);
    }
    
}