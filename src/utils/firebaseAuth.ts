interface SignInResponse {
    idToken: string;
    refreshToken: string;
    email: string;
    expiresIn: string;
    localId: string;
}

interface RefreshResponse {
    id_token: string;
    refresh_token: string;
    expires_in: string;
    user_id: string;
    project_id: string;
}

const ERROR_MESSAGES: Record<string, string> = {
    EMAIL_NOT_FOUND: "No account found with this email.",
    INVALID_PASSWORD: "Incorrect password.",
    INVALID_LOGIN_CREDENTIALS: "Invalid email or password.",
    USER_DISABLED: "This account has been disabled.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "Too many failed attempts. Try again later.",
    INVALID_API_KEY: "Invalid API key. Make sure you're using the correct Firebase project key.",
};

function parseFirebaseError(message: string): string {
    for (const [code, friendly] of Object.entries(ERROR_MESSAGES)) {
        if (message.includes(code)) {
            return friendly;
        }
    }
    return message;
}

async function signInWithEmail(apiKey: string, email: string, password: string): Promise<SignInResponse> {
    let response: Response;
    try {
        response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password, returnSecureToken: true }),
                referrer: "",
                referrerPolicy: "no-referrer",
            },
        );
    } catch {
        throw new Error("Network error. Check your connection and try again.");
    }

    const data = (await response.json()) as { error?: { message?: string } };

    if (!response.ok) {
        const msg = data.error?.message ?? "Sign in failed.";
        throw new Error(parseFirebaseError(msg));
    }

    return data as unknown as SignInResponse;
}

async function refreshIdToken(apiKey: string, refreshToken: string): Promise<RefreshResponse> {
    let response: Response;
    try {
        response = await fetch(`https://securetoken.googleapis.com/v1/token?key=${apiKey}`, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `grant_type=refresh_token&refresh_token=${encodeURIComponent(refreshToken)}`,
            referrer: "",
            referrerPolicy: "no-referrer",
        });
    } catch {
        throw new Error("Network error. Check your connection and try again.");
    }

    if (!response.ok) {
        throw new Error("Failed to refresh token. Please sign in again.");
    }

    return (await response.json()) as RefreshResponse;
}

export type { SignInResponse, RefreshResponse };
export { signInWithEmail, refreshIdToken };
