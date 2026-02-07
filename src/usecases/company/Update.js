export class UpdateCompanyUseCase{
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }

    async execute(id, company, userRole) {
        const existingCompany = await this.companyRepo.getById(id);
        if (!existingCompany) {
            throw new Error("Company not found");
        }

        if (userRole !== "admin") {
            throw new Error("Permission denied: you are not admin");
        }

        const finalUpdateData = {
            ...company,
            isVerified: false 
        };

        return await this.companyRepo.update(id, finalUpdateData)
    }
}
