/*
 *
 * Skeleton code for Node/TypeScript/Lamba
 * Copyright Michael Piazza 2018
 *
 */

/* ---------------- Types ---------------- */

import { Callback, Context, Handler} from "aws-lambda";

/* TODO: Fill Me Out */
interface IRequest {
}

/* TODO: Fill Me Out */
interface IResponse {
}

interface ILambdaResponse {
    body: string;
    statusCode: number;
    headers: {[index: string]: string};
}

/* ---------------- Main ---------------- */

const main = (request: IRequest): IResponse => {
    /*  TODO: Refactor this bit here */
    if (request.bg < MIN_BLOOD_GLUCOSE) {
        return {
            bloodGlucose: request.bg,
            carbs: request.carbs,
            insulin: 0,
            message: `Error: Blood Glucose is less than ${MIN_BLOOD_GLUCOSE},
                 and doctor hasn't specified what to do in this situation. \n Time to call a relative.`,
            timeOfDay: request.timeOfDay,
        };

    } else if (request.bg > MAX_BLOOD_GLUCOSE) {
        return {
            bloodGlucose: request.bg,
            carbs: request.carbs,
            insulin: 0,
            message: `Error: Blood Glucose is greater than ${MAX_BLOOD_GLUCOSE},
                and doctor hasn't specified what to do in this situation. \n Time to call a relative.`,
            timeOfDay: request.timeOfDay,
        };
    }

    const [ insulin, explanation ] = calculateInsulinWithExplanation(request.bg, request.carbs, request.timeOfDay);

    return {
        bloodGlucose: request.bg,
        carbs: request.carbs,
        insulin: Number(insulin.toFixed(2)),
        message: explanation,
        timeOfDay: request.timeOfDay,
    };
};

const handleRequest: Handler = (event: any, context: Context, callback: Callback): void => {
    try {
        const request: IRequest = JSON.parse(event.body);
        const responseBody: IResponse = main(request);
        const response: ILambdaResponse = {
            body: JSON.stringify(responseBody),
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            statusCode: 200,
        };
        context.done(undefined, response);
    } catch (err) {
        context.done(err, null);
    }
};

export const handler = handleRequest;
