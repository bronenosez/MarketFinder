class ApiError extends Error {
    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors);
    }

    static unauthorized(message="Unauthorized") {
        return new ApiError(401, message);
    }

    static forbidden(message="Forbidden") {
        return new ApiError(403, message);
    }

    static notFound(message="Not Found") {
        return new ApiError(404, message);
    }

    static internal(message = "Internal Server Error") {
        return new ApiError(500, message);
    }   
}

export default ApiError;