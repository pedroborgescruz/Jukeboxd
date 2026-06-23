import prisma from "@/lib/prisma";

export const POST = async (req) => {
  try {
    const data = await req.json();

    if (!data.username) {
      return new Response("Username is required", { status: 400 });
    }

    // Fetch the user from PostgreSQL matching the unique username field
    const user = await prisma.user.findFirst({
      where: {
        // If you store username case-insensitively, you can add mode: 'insensitive'
        // But for a basic swap, a straightforward match works perfectly:
        name: data.username, // Swap with 'username' if you add a specific username field to your schema later
      },
    });

    if (!user) {
      return new Response("User not found", { status: 404 });
    }

    return new Response(JSON.stringify(user), { 
      status: 200, 
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    console.error("Error fetching user data:", err);
    return new Response("Failed to fetch the user data", { status: 500 });
  }
};
