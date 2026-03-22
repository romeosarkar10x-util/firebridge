import { useEffect, useRef, useState } from "react";
import { Copy, Loader2, LogOut, RefreshCw } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { refreshIdToken } from "@/utils/firebaseAuth";
import { TokenMeta } from "@/components/TokenMeta";

interface TokenDisplayProps {
    email: string;
    idToken: string;
    refreshToken: string;
    apiKey: string;
    serviceName: string;
    onSignOut: () => void;
    onTokenRefreshed: (idToken: string, refreshToken: string) => void;
}

function TokenDisplay({
    email,
    idToken,
    refreshToken,
    apiKey,
    serviceName,
    onSignOut,
    onTokenRefreshed,
}: TokenDisplayProps) {
    const tokenRef = useRef<HTMLPreElement>(null);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [refreshError, setRefreshError] = useState<string | null>(null);

    useEffect(() => {
        tokenRef.current?.focus();
    }, []);

    async function handleCopy() {
        await navigator.clipboard.writeText(idToken);
        toast.success("Copied!");
    }

    async function handleRefresh() {
        setIsRefreshing(true);
        setRefreshError(null);
        try {
            const result = await refreshIdToken(apiKey, refreshToken);
            onTokenRefreshed(result.id_token, result.refresh_token);
        } catch (err) {
            setRefreshError(err instanceof Error ? err.message : "Failed to refresh token.");
        } finally {
            setIsRefreshing(false);
        }
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>ID Token</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-4">
                <TokenMeta email={email} idToken={idToken} serviceName={serviceName} />

                <pre
                    ref={tokenRef}
                    tabIndex={0}
                    className="max-h-48 overflow-y-auto break-all whitespace-pre-wrap rounded-md bg-muted px-3 py-2 font-mono text-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                    {idToken}
                </pre>

                {refreshError && (
                    <Alert variant="destructive">
                        <AlertDescription>{refreshError}</AlertDescription>
                    </Alert>
                )}

                <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopy} aria-label="Copy token to clipboard">
                        <Copy />
                        Copy Token
                    </Button>

                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleRefresh}
                        disabled={isRefreshing}
                        aria-label="Refresh token"
                    >
                        {isRefreshing ? <Loader2 className="animate-spin" /> : <RefreshCw />}
                        {isRefreshing ? "Refreshing..." : "Refresh Token"}
                    </Button>

                    <Button variant="destructive" size="sm" onClick={onSignOut} aria-label="Sign out">
                        <LogOut />
                        Sign Out
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

export { TokenDisplay };
