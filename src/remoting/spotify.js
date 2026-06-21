const SPOTIFY_API = "https://api.spotify.com/v1";
const TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_REVALIDATE = 86400;
const SPOTIFY_TIMEOUT_MS = 15000;

let tokenCache = { accessToken: null, expiresAt: 0 };

export function isSpotifyConfigured() {
  return Boolean(
    process.env.SPOTIFY_CLIENT_ID && process.env.SPOTIFY_CLIENT_SECRET
  );
}

export function isSpotifyId(value) {
  return /^[A-Za-z0-9]{22}$/.test(value);
}

function spotifyMarket() {
  return process.env.SPOTIFY_MARKET || "US";
}

async function requestAccessToken() {
  const credentials = Buffer.from(
    `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${credentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
    cache: "no-store",
    signal: AbortSignal.timeout(SPOTIFY_TIMEOUT_MS),
  });

  if (!res.ok) {
    console.error("Spotify token request failed:", await res.text());
    return null;
  }

  return res.json();
}

async function getAccessToken() {
  if (!isSpotifyConfigured()) return null;

  if (tokenCache.accessToken && Date.now() < tokenCache.expiresAt - 30_000) {
    return tokenCache.accessToken;
  }

  try {
    let data = await requestAccessToken();
    if (!data) {
      // Retry once on transient network failures
      data = await requestAccessToken();
    }
    if (!data) return null;

    tokenCache = {
      accessToken: data.access_token,
      expiresAt: Date.now() + data.expires_in * 1000,
    };
    return tokenCache.accessToken;
  } catch (error) {
    console.error("Spotify token request failed:", error);
    return null;
  }
}

async function spotifyFetch(urlOrPath) {
  const token = await getAccessToken();
  if (!token) return null;

  const url = urlOrPath.startsWith("http")
    ? urlOrPath
    : `${SPOTIFY_API}${urlOrPath}`;

  try {
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: SPOTIFY_REVALIDATE },
      signal: AbortSignal.timeout(SPOTIFY_TIMEOUT_MS),
    });

    if (res.status === 404) return null;

    if (!res.ok) {
      console.error(
        "[spotifyFetch] Spotify API request failed:",
        res.status,
        urlOrPath.startsWith("http") ? urlOrPath : `${SPOTIFY_API}${urlOrPath}`,
        await res.text()
      );
      return null;
    }

    return res.json();
  } catch (error) {
    console.error("Spotify API request failed:", error);
    return null;
  }
}

function pickImageUrl(images, preferredWidth = 300) {
  if (!images?.length) return null;

  const sorted = [...images].sort(
    (a, b) => Math.abs((a.width ?? 0) - preferredWidth) -
      Math.abs((b.width ?? 0) - preferredWidth)
  );

  return sorted[0]?.url ?? images[0]?.url ?? null;
}

function normalizeAlbumTitle(title) {
  return title
    .replace(/\s*[\(\[][^\)\]]*[\)\]]\s*/g, "")
    .trim()
    .toLowerCase();
}

function albumScore(album) {
  const typeScore = album.album_type === "album" ? 2 : 1;
  return typeScore * 1000 + (album.total_tracks ?? 0);
}

function dedupeSpotifyAlbums(albums) {
  const byKey = new Map();

  for (const album of albums) {
    const key = normalizeAlbumTitle(album.name);
    const prev = byKey.get(key);

    if (!prev || albumScore(album) > albumScore(prev)) {
      byKey.set(key, album);
    }
  }

  return [...byKey.values()];
}

export async function searchSpotifyArtist(query) {
  const data = await spotifyFetch(
    `/search?type=artist&q=${encodeURIComponent(query)}&limit=1`
  );
  return data?.artists?.items?.[0] ?? null;
}

export async function fetchSpotifyArtist(artistId) {
  return spotifyFetch(`/artists/${artistId}`);
}

export async function fetchSpotifyAlbum(albumId) {
  const album = await spotifyFetch(`/albums/${albumId}`);
  if (!album) return null;

  return {
    title: album.name ?? "Unknown title",
    artist: album.artists?.[0]?.name ?? "Unknown artist",
    year: album.release_date?.substring(0, 4) ?? "",
    label: album.label ?? "—",
    coverUrl: pickImageUrl(album.images, 640),
    releaseDate: album.release_date ?? "",
  };
}

export async function fetchSpotifyArtistAlbums(artistId, maxAlbums = 80) {
  const market = spotifyMarket();
  const collected = [];
  let nextUrl = `/artists/${artistId}/albums?include_groups=album&market=${market}&limit=10`;

  while (nextUrl && collected.length < maxAlbums * 3) {
    const data = await spotifyFetch(nextUrl);
    if (!data) break;

    collected.push(...(data.items ?? []));
    nextUrl = data.next ?? null;
  }

  const deduped = dedupeSpotifyAlbums(collected);

  return deduped
    .map((album) => ({
      albumId: album.id,
      title: album.name,
      sortDate: album.release_date || "9999-12-31",
      coverUrl: pickImageUrl(album.images, 250),
      albumType: album.album_type,
    }))
    .sort((a, b) => (b.sortDate || "").localeCompare(a.sortDate || ""))
    .slice(0, maxAlbums);
}

export function buildSpotifyArtistBio(artist) {
  const parts = [];

  if (artist.genres?.length) {
    parts.push(`Genres: ${artist.genres.slice(0, 5).join(", ")}.`);
  }

  if (artist.followers?.total) {
    parts.push(
      `${artist.followers.total.toLocaleString("en-US")} followers on Spotify.`
    );
  }

  return parts.join(" ").trim() || "No biography available yet.";
}

export function getSpotifyArtistSubtitle(artist) {
  if (artist.type === "group") return "Group";
  return "Artist";
}

export function getSpotifyArtistImage(artist, size = 300) {
  return pickImageUrl(artist.images, size);
}
