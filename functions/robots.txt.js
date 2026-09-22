/**
 * Cloudflare Pages Function — /robots.txt
 * Blocks crawlers on *.pages.dev (duplicate content prevention)
 * Serves full allow robots.txt on the live domain
 */

const LIVE_ROBOTS = `# robots.txt - All search engines and AI crawlers are welcome.

User-agent: *
Allow: /

# AI / GEO crawlers - explicitly allowed

User-agent: GPTBot
Allow: /

User-agent: OAI-SearchBot
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: Applebot-Extended
Allow: /

User-agent: meta-externalagent
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Bytespider
Allow: /

User-agent: cohere-ai
Allow: /

User-agent: CCBot
Allow: /
Sitemap: https://paintkeystone.com/sitemap.xml`;

const BLOCK_ROBOTS = `User-agent: *\nDisallow: /\n`;

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const content = url.hostname.endsWith('.pages.dev') ? BLOCK_ROBOTS : LIVE_ROBOTS;
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' }
  });
}
