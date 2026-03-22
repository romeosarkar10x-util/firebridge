import { type FormEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LS_SERVICE_NAME = "firebridge:serviceName";
const LS_API_KEY = "firebridge:apiKey";

interface ServiceSetupFormProps {
    onComplete: () => void;
}

function ServiceSetupForm({ onComplete }: ServiceSetupFormProps) {
    const [serviceName, setServiceName] = useState("");
    const [apiKey, setApiKey] = useState("");
    const [error, setError] = useState<string | null>(null);

    const serviceNameRef = useRef<HTMLInputElement>(null);

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        if (!apiKey.trim()) {
            setError("Firebase API key is required.");
            return;
        }
        localStorage.setItem(LS_SERVICE_NAME, serviceName.trim());
        localStorage.setItem(LS_API_KEY, apiKey.trim());
        onComplete();
    }

    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Set Up Service</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="serviceName">Service Name</Label>
                        <Input
                            id="serviceName"
                            ref={serviceNameRef}
                            type="text"
                            placeholder="e.g. My App"
                            value={serviceName}
                            onChange={(e) => setServiceName(e.target.value)}
                            autoComplete="off"
                            autoFocus
                        />
                        <p className="text-xs text-muted-foreground">A label for your own reference. Optional.</p>
                    </div>

                    <div className="flex flex-col gap-1.5">
                        <Label htmlFor="apiKey">Firebase API Key</Label>
                        <Input
                            id="apiKey"
                            type="text"
                            placeholder="AIzaSy..."
                            value={apiKey}
                            onChange={(e) => {
                                setApiKey(e.target.value);
                                setError(null);
                            }}
                            autoComplete="off"
                        />
                        <p className="text-xs text-muted-foreground">
                            The public API key of the Firebase project (found in the service's frontend code).
                        </p>
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <Button type="submit" className="w-full">
                        Continue
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}

export { ServiceSetupForm };
