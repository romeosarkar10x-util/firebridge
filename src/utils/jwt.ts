function decodeJWT(token: string): Record<string, unknown> {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload)) as Record<string, unknown>;
}

function getTokenExpiry(token: string): Date {
    const payload = decodeJWT(token);
    const exp = payload["exp"] as number;
    return new Date(exp * 1000);
}

function getMinutesUntilExpiry(token: string): number {
    const expiry = getTokenExpiry(token);
    const now = new Date();
    return Math.floor((expiry.getTime() - now.getTime()) / 60000);
}

export { decodeJWT, getTokenExpiry, getMinutesUntilExpiry };
