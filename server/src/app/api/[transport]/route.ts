import { createMcpHandler } from '@vercel/mcp-adapter';
import { z } from 'zod';
import { Composio } from "@composio/core";
import { LangchainToolset } from "@composio/langchain";

const composio = new Composio({
  apiKey: process.env.COMPOSIO_API_KEY,
  toolset: new LangchainToolset(),
});

const slackTools = (await composio.getTools(
  "default",
  {
    toolkits: ["slack"],
    important: "true",
  }
));

const handler = createMcpHandler(
  async (server) => {
    for (const tool of slackTools) {
      try {
        console.log({
          name: tool.name,
          description: tool.description,
          toolStructure: Object.keys(tool),
        });
        
        server.tool(
          tool.name,
          tool.description,
          tool.schema.shape as z.ZodRawShape,
          async (args) => {
            const result = await tool.call(args);
            return {
              content: [{ type: "text", text: result ? result.toString() : "Operation completed" }],
            };
          }
        );
      } catch (error) {
        console.error(error);
      }
    }
  },
  {
    // Optional server options
    capabilities: {
      tools: {
      },
    },
  },
  {
    // Optional configuration
    redisUrl: process.env.REDIS_URL,
    // Set the basePath to where the handler is to automatically derive all endpoints
    // This base path is for if this snippet is located at: /app/api/[transport]/route.ts
    basePath: '/api',
    maxDuration: 60,
    verboseLogs: true,
  }
);
export { handler as GET, handler as POST };