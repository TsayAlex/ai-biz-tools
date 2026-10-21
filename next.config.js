/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [{
      source: '/compare/chatgpt-vs-claude',
      destination: '/compare/chatgpt-vs-claude-for-small-business',
      permanent: true
    }];
  }
};
module.exports = nextConfig;
