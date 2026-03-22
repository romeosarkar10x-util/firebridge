import { type FormEvent, useEffect, useRef, useState } from "react";
import { Loader2 } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SignInFormProps {
    serviceName: string;
    onSignIn: (email: string, password: string) => void;
    onForgetService: () => void;
    isLoading: boolean;
    error: string | null;
}

function SignInForm({ serviceName, onSignIn, onForgetService, isLoading, error }: SignInFormProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const emailRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        emailRef.current?.focus();
    }, []);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        onSignIn(email.trim(), password);
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Sign In
                    {serviceName && <Badge variant="secondary">{serviceName}</Badge>}
                </CardTitle>
            </CardHeader>

            <CardContent>
                <form id="signin-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            ref={emailRef}
                            type="email"
                            placeholder="user@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="animate-spin" />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </Button>
                </form>
            </CardContent>

            <CardFooter className="justify-center">
                <Button variant="ghost" size="sm" onClick={onForgetService} className="text-muted-foreground">
                    Forget this service
                </Button>
            </CardFooter>
        </Card>
    );
}

export { SignInForm };
