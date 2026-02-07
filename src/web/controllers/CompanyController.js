import { read } from "fs";

export class CompanyController {
    constructor({
        createCompanyUC, 
        updateCompanyUC,
        deleteCompanyUC,
        getAllCompaniesUC, 
        getAllVerifiedCompaniesUC, 
        getByIdCompanyUC, 
        verifyCompanyUC
    }) {
        this.createCompanyUC = createCompanyUC,
        this.updateCompanyUC = updateCompanyUC,
        this.deleteCompanyUC = deleteCompanyUC,
        this.getAllCompaniesUC = getAllCompaniesUC;
        this.getAllVerifiedCompaniesUC = getAllVerifiedCompaniesUC,
        this.getByIdCompanyUC = getByIdCompanyUC,
        this.verifyCompanyUC = verifyCompanyUC
    }

    handleCreate = async (req, res) => {
        try {
            const companyData = req.body;

            await this.createCompanyUC.execute(companyData)

            return res.status(201).json({ message: "Company created successfuly" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleGetAll = async (req, res) => {
        try {
            const companies = await this.getAllCompaniesUC.execute()

            res.status(200).json(companies)
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    handleGetAllVerified = async (req, res) => {
        try {
            const companies = await this.getAllVerifiedCompaniesUC.execute()

            res.status(200).json(companies)
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    }

    handleGetById = async (req, res) => {
        try {
            const { id } = req.params;
            const company = await this.getByIdCompanyUC.execute(id);

            if (!company) {
                return res.status(404).json({ error: "Company not found" });
            }

            return res.status(200).json(company);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleUpdate = async (req, res) => {
        try {
            const { id } = req.params
            const companyData = req.body
            const userRole = req.user.role

            await this.updateGameUC.execute(id, companyData, userRole)

            return res.status(200).json({ message: "Game updated"})

        } catch (err) {
            return res.status(403).json({ error: err.message });
        }
    }

    handleDelete = async (req, res) => {
         try {
            const { id } = req.params;

            await this.deleteCompanyUC.execute(id);

            return res.status(204).json({ message: "Company deleted"});
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    handleVerifySwitch = async (req, res) => {
        try {
            const { id } = req.params;
            const userRole = req.user.role;

            await this.verifyCompanyUC.execute(id, userRole);

            return res.status(200).json({ 
                message: "Company verification status toggled successfully" 
            });
        } catch (err) {
            const statusCode = err.message.includes("Permission") ? 403 : 400;
            return res.status(statusCode).json({ error: err.message });
        }
    }
}