export class GetAllVerifiedCompaniesUseCase{
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }

    async execute() {
        const companies = await this.companyRepo.getAllVerified();
       
        if (!companies || companies.length == 0) {
            throw new Error("No company found");
        }

        return companies;
    }
}