import { useEffect, useState } from "react";
import { Toaster } from "sonner";

import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ServiceSetupForm } from "@/components/ServiceSetupForm";
import { SignInForm } from "@/components/SignInForm";
import { TokenDisplay } from "@/components/TokenDisplay";
import { signInWithEmail } from "@/utils/firebaseAuth";

const LS_DARK_MODE = "firebridge:darkMode";
const LS_SERVICE_NAME = "firebridge:serviceName";
const LS_API_KEY = "firebridge:apiKey";

type AppPhase = "setup" | "signin" | "token";

interface AuthState {
    email: string;
    apiKey: string;
    idToken: string | null;
    refreshToken: string | null;
    isLoading: boolean;
    error: string | null;
}

function getInitialPhase(): AppPhase {
    return localStorage.getItem(LS_API_KEY)?.trim() ? "signin" : "setup";
}

function App() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const stored = localStorage.getItem(LS_DARK_MODE);
        if (stored !== null) return stored === "true";
        return window.matchMedia("(prefers-color-scheme: dark)").matches;
    });

    const [phase, setPhase] = useState<AppPhase>(getInitialPhase);

    const [auth, setAuth] = useState<AuthState>({
        email: "",
        apiKey: "",
        idToken: null,
        refreshToken: null,
        isLoading: false,
        error: null,
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
        localStorage.setItem(LS_DARK_MODE, String(darkMode));
    }, [darkMode]);

    function toggleDarkMode() {
        setDarkMode((prev) => !prev);
    }

    function handleSetupComplete() {
        setPhase("signin");
    }

    function handleForgetService() {
        localStorage.removeItem(LS_SERVICE_NAME);
        localStorage.removeItem(LS_API_KEY);
        setAuth({ email: "", apiKey: "", idToken: null, refreshToken: null, isLoading: false, error: null });
        setPhase("setup");
    }

    async function handleSignIn(email: string, password: string) {
        const apiKey = localStorage.getItem(LS_API_KEY) ?? "";
        setAuth((prev) => ({ ...prev, isLoading: true, error: null }));
        try {
            const result = await signInWithEmail(apiKey, email, password);
            setAuth({
                email: result.email,
                apiKey,
                idToken: result.idToken,
                refreshToken: result.refreshToken,
                isLoading: false,
                error: null,
            });
            setPhase("token");
        } catch (err) {
            setAuth((prev) => ({
                ...prev,
                isLoading: false,
                error: err instanceof Error ? err.message : "Sign in failed.",
            }));
        }
    }

    function handleTokenRefreshed(idToken: string, refreshToken: string) {
        setAuth((prev) => ({ ...prev, idToken, refreshToken }));
    }

    function handleSignOut() {
        setAuth({ email: "", apiKey: "", idToken: null, refreshToken: null, isLoading: false, error: null });
        setPhase("signin");
    }

    const serviceName = localStorage.getItem(LS_SERVICE_NAME) ?? "";

    return (
        <div className="flex min-h-screen flex-col">
            <Header darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />

            <main className="flex flex-1 items-start justify-center px-4 py-8">
                <div className="w-full max-w-lg">
                    {phase === "setup" && <ServiceSetupForm onComplete={handleSetupComplete} />}

                    {phase === "signin" && (
                        <SignInForm
                            serviceName={serviceName}
                            onSignIn={handleSignIn}
                            onForgetService={handleForgetService}
                            isLoading={auth.isLoading}
                            error={auth.error}
                        />
                    )}

                    {phase === "token" && auth.idToken && auth.refreshToken && (
                        <TokenDisplay
                            email={auth.email}
                            idToken={auth.idToken}
                            refreshToken={auth.refreshToken}
                            apiKey={auth.apiKey}
                            serviceName={serviceName}
                            onSignOut={handleSignOut}
                            onTokenRefreshed={handleTokenRefreshed}
                        />
                    )}
                </div>
            </main>

            <Footer />
            <Toaster richColors />
        </div>
    );
}

export default App;
