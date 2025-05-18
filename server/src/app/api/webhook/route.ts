import type { NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log('Received webhook:', body);

    // Example for storing slack thread data
    // This is a placeholder - you'll need to extract actual data from the webhook payload
    // depending on your specific requirements
    if (body.type === 'slack_thread') {
      await prisma.slackThread.create({
        data: {
          slackTeamId: body.team_id,
          slackThreadId: body.thread_id,
          channelId: body.channel_id,
          title: body.thread_title,
          user: {
            connectOrCreate: {
              where: { email: body.user_email },
              create: {
                email: body.user_email,
                name: body.user_name,
              },
            },
          },
        },
      });
    } else if (body.type === 'slack_receive_message') {
      await prisma.slackThread.create({
        data: {
          slackTeamId: body.data.team_id || "null",
          slackThreadId: body.data.ts,
          channelId: body.data.channel,
          title: body.data.text,
        },
      });
    }

    return new Response('Webhook received', { status: 200 });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return new Response('Error processing webhook', { status: 500 });
  }
}

export async function GET() {
  return new Response('Webhook endpoint is working', { status: 200 }); 
}
