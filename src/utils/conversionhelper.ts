import { IncomingHttpHeaders } from "http";

export const convertToWebHeaders = (
    reqHeaders: IncomingHttpHeaders
): Headers => {
    const headers = new Headers();
    Object.entries(reqHeaders).forEach(([key, value]) => {
        if (typeof value === "string") {
            headers.append(key, value);
        }
    });

    return headers;
};