import { errorObjInterface } from "../MODELS/interfaces";

export default function errorHandler(setErrObj: any, message?: string, status?: number) {
    
    let errorObj: errorObjInterface = {message : "Internal server error", status: 500};
    
    if(message != null && status != null){
        errorObj.message = message 
        errorObj.status = status
    }
    setErrObj(errorObj);
}