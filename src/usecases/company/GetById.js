export class GetByIdCompanyUseCase{
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }

    async execute(id) {
        const company = await this.companyRepo.getById(id);
        if (!company) {
            throw new Error(`Company with ID ${id} not found`);
        }

        return company;
    }
}