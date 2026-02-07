export class GetByIdEmulationUseCase {
    constructor(emulationRepo) {
        this.emulationRepo = emulationRepo;
    }

    async execute(id) {
        const emulation = await this.emulationRepo.getById(id);
        if (!emulation) {
            throw new Error("Emulation not found");
        }
        return emulation;
    }
}