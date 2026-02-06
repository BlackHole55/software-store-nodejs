export class GetByIdCompanyUseCase{
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }

    async execute() {
        const company = await this.companyRepo.getById(id);
       
        if (!company || company.length == 0) {
            throw new Error("No company found");
        }

        return company;
    }
}