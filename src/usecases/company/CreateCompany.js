export class CreateCompanyUseCase{
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }

    async execute(company){
        return await this.companyRepo.create(company)

    }
}