const CAA_HEADERS = {
  "User-Agent": "Jukeboxd/1.0.0",
  Accept: "*/*",
};

const CAA_REVALIDATE = 86400;

function caaFetch(url) {
  return fetch(url, {
    method: "GET",
    headers: CAA_HEADERS,
    next: { revalidate: CAA_REVALIDATE },
  });
}

export function coverArtReleaseGroupUrl(releaseGroupId, size = "front-250") {
  return `https://coverartarchive.org/release-group/${releaseGroupId}/${size}`;
}

async function fetchCoverFromArchive(path) {
  try {
    const res = await caaFetch(`https://coverartarchive.org/${path}`);
    if (res.ok) return res.url;
    return "";
  } catch {
    return "";
  }
}

export async function fetchReleaseCoverUrl(releaseId) {
  const url = await fetchCoverFromArchive(
    `release/${encodeURIComponent(releaseId)}/front`
  );
  if (url) return url;

  return fetchCoverFromArchive(
    `release-group/${encodeURIComponent(releaseId)}/front`
  );
}
