import { NextApiRequest, NextApiResponse } from 'next';

interface ClaudeError extends Error {
  status?: number;
  statusText?: string;
  response?: {
    data?: Record<string, unknown>;
  };
}

interface ClaudeResponse {
  content: Array<{
    text: string;
    type: string;
  }>;
}

const CLAUDE_API_KEY = process.env.CLAUDE_API_KEY;
const CLAUDE_API_URL = 'https://api.anthropic.com/v1/messages';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('🔄 Claude API request received:', { 
    method: req.method,
    hasApiKey: !!CLAUDE_API_KEY,
    promptLength: req.body?.prompt?.length
  });

  if (req.method !== 'POST') {
    console.log('❌ Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!CLAUDE_API_KEY) {
    console.error('❌ Claude API key not configured');
    return res.status(500).json({ error: 'Claude API key not configured' });
  }

  try {
    const { prompt } = req.body;
    console.log('📝 Processing prompt:', prompt.substring(0, 100) + '...');

    const response = await fetch(CLAUDE_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': CLAUDE_API_KEY,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: 'claude-3-sonnet-20240229',
        max_tokens: 1000,
        messages: [{ role: 'user', content: prompt }]
      })
    });

    console.log('📡 Claude API response status:', response.status);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('❌ Claude API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorData
      });
      throw new Error(`API call failed: ${response.statusText}`);
    }

    const data = (await response.json()) as ClaudeResponse;
    console.log('✅ Claude API response received:', {
      hasContent: !!data.content,
      contentLength: data.content?.[0]?.text?.length
    });

    res.status(200).json({ text: data.content[0].text });
  } catch (error: unknown) {
    const claudeError = error as ClaudeError;
    console.error('❌ Error processing request:', claudeError);
    res.status(500).json({ 
      error: 'Failed to generate response', 
      details: claudeError?.message || 'Unknown error' 
    });
  }
} 