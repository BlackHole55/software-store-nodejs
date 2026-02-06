
export const validate = (schema) => async (req, res, next) => {
    try {
        if (schema.body) {
            req.body = await schema.body.parseAsync(req.body);
        }

        if (schema.params) {
            req.params = await schema.params.parseAsync(req.params);
        }

        if (schema.query) {
            req.query = await schema.query.parseAsync(req.query);
        }

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
