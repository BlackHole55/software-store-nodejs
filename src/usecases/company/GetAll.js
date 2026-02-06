export class GetAllCompanyUseCase{
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }

    async execute() {
        const companies = await this.companyRepo.getAll();

        if (!company || company.length == 0) {
            throw new Error("No company found");
        }

        return companies
    }
}