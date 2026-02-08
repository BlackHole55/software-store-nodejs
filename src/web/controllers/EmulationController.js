export class EmulationController {
    constructor({
        createEmulationUC,
        getAllEmulationsUC,
        getEmulationByIdUC,
        updateEmulationUseCase,
        deleteEmulationUC
    }) {
        this.createEmulationUC = createEmulationUC;
        this.getAllEmulationsUC = getAllEmulationsUC;
        this.getEmulationByIdUC = getEmulationByIdUC;
        this.updateEmulationUseCase = updateEmulationUseCase;
        this.deleteEmulationUC = deleteEmulationUC;
    }

    handleCreate = async (req, res) => {
        try {
            const emulationData = req.body;
            const result = await this.createEmulationUC.execute(emulationData);
            return res.status(201).json(result);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleGetAll = async (req, res) => {
        try {
            const emulations = await this.getAllEmulationsUC.execute();
            return res.status(200).json(emulations);
        } catch (err) {
            const statusCode = err.message === "No emulations found" ? 404 : 500;
            return res.status(statusCode).json({ error: err.message });
        }
    }

    handleGetById = async (req, res) => {
        try {
            const { id } = req.params;
            const emulation = await this.getEmulationByIdUC.execute(id);
            return res.status(200).json(emulation);
        } catch (err) {
            const statusCode = err.message === "Emulation not found" ? 404 : 400;
            return res.status(statusCode).json({ error: err.message });
        }
    }

    handleUpdate = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            await this.updateEmulationUseCase.execute(id, updateData);
            return res.status(200).json({ message: "Emulation updated successfully" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleDelete = async (req, res) => {
        try {
            const { id } = req.params;
            await this.deleteEmulationUC.execute(id);
            return res.status(204).send(); 
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}