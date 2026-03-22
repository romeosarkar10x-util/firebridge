import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

const rootElem = document.createElement("div");

document.body.appendChild(rootElem);

createRoot(rootElem).render(
    <StrictMode>
        <App />
    </StrictMode>,
);
