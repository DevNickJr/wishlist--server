export default class ApiError extends Error {
    public status = 400

    constructor(message: string, statusCode?: number) {
        super(message)
        this.status = statusCode || 400
    }
}