import { NextResponse, type NextRequest } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Composio } from '@composio/core';
import { LangchainToolset } from '@composio/langchain';
import { env } from 'node:process';

const composio = new Composio({
  apiKey: env.COMPOSIO_API_KEY,
  toolset: new LangchainToolset(),
});


export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = await composio.tools.execute("SLACK_SEARCH_MESSAGES", {
        arguments: {
            count: 100,
            query: "<@U08SNEDUMGE>",
            sort: "timestamp",
            sortDir: "descending"
        },
        connectedAccountId: "ca_heS-1fWrZ1N2",
        userId: "utkarsh"
    })

    for (const match of (result.data.messages as any).matches as any[]) {
        try {
        await prisma.slackThread.create({
            data: {
                slackTeamId: match.team,
                slackThreadId: match.ts,
                channelId: match.channel.id,
                title: match.text,
            }
        });
        } catch (error) {
            console.error('Error creating slack thread:', error);
        }
    }
    const response = NextResponse.json(result);
    response.headers.set('Access-Control-Allow-Origin', '*');
    return response;
  } catch (error) {
    console.error('Error updating thread status:', error);
    return new Response('Error updating thread status', { status: 500 });
  }
}
