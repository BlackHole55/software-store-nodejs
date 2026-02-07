export class CreateEmulationUseCase {
    constructor(emulationRepo) {
        this.emulationRepo = emulationRepo;
    }

    async execute(emulationData) {
        return await this.emulationRepo.create(emulationData);
    }
}