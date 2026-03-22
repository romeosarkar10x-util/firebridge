import { Moon, Sun, Github } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { packageJSON } from "@/utils/packageJSON";

interface HeaderProps {
    darkMode: boolean;
    onToggleDarkMode: () => void;
}

function Header({ darkMode, onToggleDarkMode }: HeaderProps) {
    function openGitHub() {
        window.open(packageJSON.repository.url, "_blank", "noopener,noreferrer");
    }

    return (
        <header className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="text-base font-bold">🔥 FireBridge</span>

            <div className="flex-1" />

            <Badge variant="outline" className="font-mono text-xs text-muted-foreground">
                v{packageJSON.version}
            </Badge>

            <Button variant="ghost" size="icon" aria-label="GitHub repository" onClick={openGitHub}>
                <Github />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                onClick={onToggleDarkMode}
            >
                {darkMode ? <Sun /> : <Moon />}
            </Button>
        </header>
    );
}

export { Header };
