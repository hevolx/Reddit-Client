import type { Config } from '@netlify/functions';

const RAPIDAPI_HOST = 'reddit34.p.rapidapi.com';

function rapidapiHeaders(): Record<string, string> {
  return {
    'X-RapidAPI-Key': process.env.RAPIDAPI_KEY!,
    'X-RapidAPI-Host': RAPIDAPI_HOST,
  };
}

export default async (req: Request): Promise<Response> => {
  const url = new URL(req.url);
  const path = url.pathname;

  const subredditMatch = path.match(/^\/api\/reddit\/r\/([^/]+)\.json$/);
  if (subredditMatch) {
    const subreddit = subredditMatch[1];
    const res = await fetch(
      `https://${RAPIDAPI_HOST}/getPostsBySubreddit?subreddit=${encodeURIComponent(subreddit)}&sort=hot`,
      { headers: rapidapiHeaders() },
    );
    const data = await res.json();
    return Response.json({ data: { children: data.data?.posts ?? [] } });
  }

  const commentsMatch = path.match(/^\/api\/reddit(\/r\/[^/]+\/comments\/[^/]+(?:\/[^/]+)?)\.json$/);
  if (commentsMatch) {
    const permalink = commentsMatch[1];
    const postUrl = `https://www.reddit.com${permalink}/`;
    const res = await fetch(
      `https://${RAPIDAPI_HOST}/getPostComments?post_url=${encodeURIComponent(postUrl)}`,
      { headers: rapidapiHeaders() },
    );
    const data = await res.json();
    const comments = data.data?.comments ?? data.data?.posts ?? [];
    return Response.json([{}, { data: { children: comments } }]);
  }

  return new Response('Not found', { status: 404 });
};

export const config: Config = {
  path: '/api/reddit/*',
};
