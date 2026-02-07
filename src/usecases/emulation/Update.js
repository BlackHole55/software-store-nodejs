export class UpdateEmulationUseCase {
    constructor(emulationRepo) {
        this.emulationRepo = emulationRepo;
    }

    async execute(id, updateData) {
        return await this.emulationRepo.update(id, updateData);
    }
}