/**
 * Manual token test — reads credentials from .env.local only.
 * The app itself uses src/remoting/spotify.js automatically.
 *
 * Run: npm run spotify:token
 *
 * @see https://developer.spotify.com/documentation/web-api/tutorials/getting-started#request-an-access-token
 */

const fs = require("fs");
const path = require("path");

const TOKEN_URL = "https://accounts.spotify.com/api/token";

function loadEnvLocal() {
  const envPath = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(envPath)) {
    console.error("Missing .env.local — create it and add SPOTIFY_CLIENT_ID / SPOTIFY_CLIENT_SECRET.");
    process.exit(1);
  }

  for (const line of fs.readFileSync(envPath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;

    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();

    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    process.env[key] = value;
  }
}

function resolveCredentials() {
  loadEnvLocal();

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  const missing = [];
  if (!clientId) missing.push("SPOTIFY_CLIENT_ID");
  if (!clientSecret) missing.push("SPOTIFY_CLIENT_SECRET");

  if (missing.length) {
    console.error(
      `Missing in .env.local: ${missing.join(", ")}\n\n` +
        "Get them from https://developer.spotify.com/dashboard → your app → Settings"
    );
    process.exit(1);
  }

  return { clientId, clientSecret };
}

async function fetchSpotifyToken() {
  const { clientId, clientSecret } = resolveCredentials();

  const body = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: clientId,
    client_secret: clientSecret,
  });

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: body.toString(),
  });

  const text = await res.text();

  if (!res.ok) {
    console.error("Token request failed:", res.status, text);
    process.exit(1);
  }

  return JSON.parse(text);
}

fetchSpotifyToken()
  .then((data) => {
    const expiresAt = new Date(Date.now() + data.expires_in * 1000);

    console.log("Spotify access token fetched successfully.\n");
    console.log("access_token:", data.access_token);
    console.log("token_type:", data.token_type);
    console.log("expires_in:", `${data.expires_in}s (~1 hour)`);
    console.log("expires_at:", expiresAt.toISOString());
  })
  .catch((error) => {
    console.error("Unexpected error:", error);
    process.exit(1);
  });
