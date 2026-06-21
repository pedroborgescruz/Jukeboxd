export async function getUserByUsername(username) {
  try {
    const result = await fetch(
      process.env.NEXT_PUBLIC_URL + "/api/user/get",
      {
        method: "POST",
        body: JSON.stringify({ username }),
        cache: "no-store",
      }
    );
    return await result.json();
  } catch (error) {
    console.error("Failed to fetch user", error);
    return null;
  }
}

export async function followUser({ userProfileId, userWhofollowsId }) {
  return fetch("/api/user/follow", {
    method: "POST",
    body: JSON.stringify({ userProfileId, userWhofollowsId }),
  });
}
