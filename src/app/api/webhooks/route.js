import { Webhook } from 'svix';
import { headers } from 'next/headers';
import prisma from '@/lib/prisma';

export async function POST(req) {
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      'Please add WEBHOOK_SECRET from Clerk Dashboard to .env'
    );
  }

  // 1. Extract Svix Verification Headers
  const headerPayload = await headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occurred -- no svix headers', {
      status: 400,
    });
  }

  // 2. Extract Request Payload
  const payload = await req.json();
  const body = JSON.stringify(payload);

  const wh = new Webhook(WEBHOOK_SECRET);
  let evt;

  // 3. Securely Verify Webhook Signature
  try {
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occurred', {
      status: 400,
    });
  }

  const eventType = evt?.type;

  // 4. Handle Account Creation & Updates
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, email_addresses, username } = evt?.data;
    
    // Extract primary email string safely
    const primaryEmail = email_addresses?.[0]?.email_address || "";
    const fullName = [first_name, last_name].filter(Boolean).join(" ");

    try {
      // Prisma upsert handles both creations and updates atomically
      await prisma.user.upsert({
        where: { id: id }, // Using Clerk's native string ID as the primary key
        update: {
          email: primaryEmail,
          name: username || fullName || null, // Fallbacks to ensure your name field is occupied
        },
        create: {
          id: id,
          email: primaryEmail,
          name: username || fullName || null,
        },
      });

      console.log(`User ${id} successfully synchronized via upsert.`);
    } catch (error) {
      console.error('Error synchronizing user data in PostgreSQL:', error);
      return new Response('Error occurred updating database', { status: 500 });
    }
  }

  // 5. Handle Account Deletion
  if (eventType === 'user.deleted') {
    const { id } = evt?.data;
    try {
      await prisma.user.delete({
        where: { id: id },
      });
      console.log(`User ${id} cleanly purged from PostgreSQL.`);
    } catch (error) {
      console.error('Error deleting user from PostgreSQL:', error);
      return new Response('Error occurred deleting user', { status: 500 });
    }
  }

  return new Response('', { status: 200 });
}
