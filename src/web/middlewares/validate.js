import { error } from "console";
import { parse } from "path";

export const validate = (schema) => async (req, res, next) => {
    try {
        const parsed = await schema.parseAsync({
            body: req.body,
            params: req.params,
            query: req.query,
        });

        req.body = parsed.body;
        req.params = parsed.params;
        req.query = parsed.query;

        return next();
    } catch (err) {
        return res.status(400).json({
            status: "error",
            message: "Validation failed",
            errors: err.errors.map(err => ({
                field: err.path.join('.'),
                message: err.message
            }))
        });
    }
}