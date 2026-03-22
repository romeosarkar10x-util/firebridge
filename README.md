# 🔥 FireBridge

A lightweight web tool that bridges Firebase Authentication into usable API tokens — built for developers who need quick access to ID tokens for API testing and internal API usage.

## What is FireBridge?

Many services (like ElevenLabs) use Firebase for user authentication under the hood. When you want to test their internal or undocumented APIs, you need a valid Firebase ID token to use as a Bearer token. Getting one manually is a pain.

**FireBridge simplifies this.** Enter your credentials, and FireBridge calls Firebase Auth with the service's public API key — instantly returning a usable ID token. No browser DevTools, no manual token extraction, no hassle.

## How It Works

1. **Sign In** — Enter your email and password for the target service.
2. **Get Token** — FireBridge authenticates via Firebase REST API and displays your ID token.
3. **Use It** — Copy the token and use it as a `Bearer` token in your API requests.
4. **Refresh** — Token expired? Hit refresh to exchange your refresh token for a new ID token.
5. **Sign Out** — Clears all tokens and session data. Nothing is stored.

## Use Cases

- Testing internal/undocumented APIs of Firebase-backed services
- Quickly grabbing a Bearer token without digging through browser DevTools
- Automating API workflows that require Firebase authentication
- Exploring and reverse-engineering service APIs

## Security

- **No data is stored.** Tokens exist only in your browser session.
- **No backend.** All Firebase calls happen client-side.
- **Sign out clears everything.** No cookies, no local storage persistence.

> ⚠️ **Disclaimer:** FireBridge is a developer tool intended for legitimate API testing with your own accounts. Use responsibly and in accordance with the target service's terms of use.

## Tech Stack

- Single-page web application
- Firebase Auth REST API
- No backend server required

## Getting Started

1. Clone the repo
2. Open `index.html` in your browser (or serve it locally)
3. Enter the service's Firebase API key and your credentials
4. Get your token and start testing

## License

MIT
