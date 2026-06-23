import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs/server";

export const POST = async (req) => {
  try {
    const user = await currentUser();
    const data = await req.json();

    const userProfileId = data.userProfileId;      // The user getting followed/unfollowed
    const userWhoFollowsId = data.userWhofollowsId; // The logged-in user performing the action

    // 1. Authentication Check
    if (!user || user.publicMetadata.userMongoId !== userWhoFollowsId) {
      return new Response("Unauthorized", { status: 401 });
    }

    // 2. Prevent self-following
    if (userWhoFollowsId === userProfileId) {
      return new Response("You cannot follow yourself", { status: 400 });
    }

    // 3. Verify both records exist in your PostgreSQL instance
    const [followerExists, followingExists] = await Promise.all([
      prisma.user.findUnique({ where: { id: userWhoFollowsId } }),
      prisma.user.findUnique({ where: { id: userProfileId } }),
    ]);

    if (!followerExists) {
      return new Response("User who follows not found in the db", { status: 404 });
    }
    if (!followingExists) {
      return new Response("User to follow not found in the db", { status: 404 });
    }

    // 4. Query the explicit composite key on your Follows join table
    const existingFollow = await prisma.follows.findUnique({
      where: {
        followerId_followingId: {
          followerId: userWhoFollowsId,
          followingId: userProfileId,
        },
      },
    });

    if (existingFollow) {
      // Unfollow action: Delete the relationship record
      await prisma.follows.delete({
        where: {
          followerId_followingId: {
            followerId: userWhoFollowsId,
            followingId: userProfileId,
          },
        },
      });
    } else {
      // Follow action: Create the relationship record
      await prisma.follows.create({
        data: {
          followerId: userWhoFollowsId,
          followingId: userProfileId,
        },
      });
    }

    // 5. Fetch the updated user data to return back to your client state
    const updatedUser = await prisma.user.findUnique({
      where: { id: userWhoFollowsId },
      include: {
        following: true, // Includes their active following relations
      },
    });

    return new Response(JSON.stringify(updatedUser), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error managing follow relation:", err);
    return new Response("Failed to follow/unfollow user", { status: 500 });
  }
};
