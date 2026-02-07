export class PurchaseController {
    constructor({ 
        createPurchaseUC,
        getAllPurchaseUC,
        getByIdPurchaseUC,
        deletePurchaseUC
     }) {
        this.createPurchaseUC = createPurchaseUC;
        this.getAllPurchaseUC = getAllPurchaseUC;
        this.getByIdPurchaseUC = getByIdPurchaseUC;
        this.deletePurchaseUC = deletePurchaseUC;
    }

    handleCreate = async (req, res) => {
        try {
            await this.createPurchaseUC.execute(req.body);
            
            return res.status(201).json({ 
                message: "Purchase created successfully" 
            });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    };

    handleGetAll = async (req, res) => {
        try {
            const purchases = await this.getAllPurchaseUC.execute();
            return res.status(200).json(purchases);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    };

    handleGetById = async (req, res) => {
        try {
            const { id } = req.params;
            const purchase = await this.getByIdPurchaseUC.execute(id);
            
            return res.status(200).json(purchase);
        } catch (err) {
            const status = err.message === "Purchase not found" ? 404 : 500;
            return res.status(status).json({ error: err.message });
        }
    };

    handleDelete = async (req, res) => {
        try {
            const { id } = req.params;
            await this.deletePurchaseUC.execute(id);
            
            return res.status(200).json({ 
                message: "Purchase deleted successfully" 
            });
        } catch (err) {
            const status = err.message === "Purchase not found" ? 404 : 500;
            return res.status(status).json({ error: err.message });
        }
    };
}