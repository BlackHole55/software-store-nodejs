export class ReviewController {
    constructor({
        createReviewUC,
        updateReviewUC,
        deleteReviewUC,
        getAllReviewUC,
        getByIdReviewUC,
        getByGameIdReviewUC
    }) {
        this.createReviewUC = createReviewUC;
        this.updateReviewUC = updateReviewUC;
        this.deleteReviewUC = deleteReviewUC;
        this.getAllReviewUC = getAllReviewUC;
        this.getByIdReviewUC = getByIdReviewUC;
        this.getByGameIdReviewUC = getByGameIdReviewUC;
    }

    handleCreate = async (req, res) => {
        try {
            const reviewData = {
                ...req.body,
                user_id: req.user.id
            };

            await this.reviewUC.create(reviewData);
            return res.status(201).json({ message: "Review submitted" });
        } catch (err) {
            const status = err.message.includes("denied") ? 403 : 500;
            return res.status(status).json({ error: err.message });
        }
    }

    handleGetAll = async (req, res) => {
        try {
            const reviews = await this.reviewUC.getAll();
            return res.status(200).json(reviews);
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    };

    handleGetById = async (req, res) => {
        try {
            const review = await this.reviewUC.getById(req.params.id);
            return res.status(200).json(review);
        } catch (err) {
            const status = err.message === "Review not found" ? 404 : 500;
            return res.status(status).json({ error: err.message });
        }
    };

    handleGetByGameId = async (req, res) => {
        try {
            const reviews = await this.reviewUC.getByGameId(req.params.id);
            return res.status(200).json(reviews);
        } catch (err) {
            const status = err.message === "Game not found" ? 404 : 500;
            return res.status(status).json({ error: err.message });
        }
    }

    handleUpdate = async (req, res) => {
        try {
            const { id } = req.params;
            const currentUserId = req.user.id;
            
            await this.reviewUC.update(id, currentUserId, req.body);
            return res.status(200).json({ message: "Review updated successfully" });
        } catch (err) {
            const status = err.message === "Review not found" ? 404 : 500;
            return res.status(status).json({ error: err.message });
        }
    };

    handleDelete = async (req, res) => {
        try {
            const { id } = req.params;
            const userId = req.user.id;
            const userRole = req.user.role || "user";

            await this.reviewUC.delete(id, userId, userRole);
            return res.status(200).json({ message: "Review deleted successfully" });
        } catch (err) {
            const status = err.message === "Review not found" ? 404 : 403;
            return res.status(status).json({ error: err.message });
        }
    };
}