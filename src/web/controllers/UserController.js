export class UserController {
    constructor(
        registerUserUC,
        loginUserUC,
        updateUserUC,
        getAllUserUC,
        getByIdUserUC,
        deleteUserUC
    )
    {
        this.registerUserUC = registerUserUC;
        this.loginUserUC = loginUserUC;
        this.updateUserUC = updateUserUC;
        this.getByIdUserUC = getByIdUserUC;
        this.getAllUserUC = getAllUserUC;
        this.deleteUserUC = deleteUserUC;
    }

    handleRegister = async (req, res) => {
        try {
            const userData = req.body;
            await this.registerUserUC.execute(userData);
            return res.status(201).json({ message: "User registered successfully" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };

    handleLogin = async (req, res) => {
        try {
            const { email, password } = req.body;
            const result = await this.loginUserUC.execute(email, password);
            return res.status(200).json(result);
        } catch (err) {
            return res.status(401).json({ error: "Invalid credentials" });
        }
    };

   handleUpdate = async (req, res) => {
         try {
            const { id } = req.params;
            const userData = req.body;
            const requestUserId = req.user.id;
            const requestUserRole= req.user.role;

            await this.updateGameUC.execute(id, userData, requestUserId, requestUserRole);

            return res.status(200).json({ message: "User updated"});
        } catch (err) {
            return res.status(403).json({ error: err.message });
        }
    };

    handleGetAll = async (req, res) => {
        try {
            const users = await this.getAllUserUC.execute();
            return res.status(200).json(users);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    };

    handleGetById = async (req, res) => {
        try {
            const { userId } = req.params;
            const user = await this.getByIdUserUC.execute(userId);
            if (!user) return res.status(404).json({ error: "User not found" });
            
            return res.status(200).json(user);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };

    handleGetProfile = async (req, res) => {
        try {
            const userID = req.user?.id;
            if (!userID) {
                return res.status(401).json({ error: "Unauthorized" });
            }

            const user = await this.getByIdUserUC.execute(userID);
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const { password, ...userProfile } = user;
            return res.status(200).json(userProfile);
        } catch (err) {
            return res.status(500).json({ error: "Internal server error" });
        }
    };

    handleDelete = async (req, res) => {
        try {
            const { userId } = req.params;
            if (!userId) {
                return res.status(400).json({ error: "User ID is required" });
            }

            const currentUserId = req.user?.id;
            if (currentUserId === userId) {
                return res.status(400).json({ error: "You cannot delete your own account" });
            }

            await this.deleteUserUC.execute(userId);
            return res.status(200).json({ message: "User deleted successfully" });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    };
}