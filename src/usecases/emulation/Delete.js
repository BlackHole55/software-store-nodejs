export class DeleteEmulationUseCase {
    constructor(emulationRepo) {
        this.emulationRepo = emulationRepo;
    }

    async execute(id) {
        return await this.emulationRepo.delete(id);
    }
}