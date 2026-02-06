export const validate = (schema) => async (req, res, next) => {
    try {
        const parsed = await schema.parseAsync(req.body);

        req.body = parsed;

        return next();
    } catch (err) {
        if (err.errors && Array.isArray(err.errors)) {
            return res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: err.errors.map(e => ({
                    field: e.path.join('.'),
                    message: e.message
                }))
            });
        }

        return res.status(500).json({
            status: "error",
            message: "Internal Server Error",
            details: err.message
        });
    }
}