export class VerifyCompanyUseCase {
    constructor(companyRepo) {
        this.companyRepo = companyRepo;
    }

    async execute(id, userRole) {
        if (userRole !== 'admin') {
            throw new Error("Permission denied: only admins can verify companies");
        }

        const company = await this.companyRepo.getById(id);
        if (!company) {
            throw new Error(`Company with ID ${id} not found`);
        }

        if (company.is_verified) {
            return await this.companyRepo.unverify(id);
        }

        return await this.companyRepo.verify(id);
    }
}