export class ApiResponse{
    errors: boolean;
    message: string;
    data: any[];
    
    constructor(errors = false, message = "", data = []){
        this.errors = errors;
        this.message = message;
        this.data = data;
    }

    public static success(message: string, data: any[]){
        return new ApiResponse(false, message, data);
    }

    public static error(message: string, data: any[]= []){
        return new ApiResponse(true, message, data);
    }
}