export class GetAllEmulationsUseCase {
    constructor(emulationRepo) {
        this.emulationRepo = emulationRepo;
    }

    async execute() {
        const emulations = await this.emulationRepo.getAll();
        if (!emulations || emulations.length === 0) {
            throw new Error("No emulations found");
        }
        return emulations;
    }
}