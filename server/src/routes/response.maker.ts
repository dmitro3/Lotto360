import ApiResponseResult from "../middlewares/error-handler";

export const responseMaker = ({
    success,
    exception,
    messages,
    result,
}: ApiResponseResult): ApiResponseResult => {
    return {
        success,
        exception,
        messages,
        result,
    };
};
