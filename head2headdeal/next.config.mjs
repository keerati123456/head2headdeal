/** @type {import('next').NextConfig} */
const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repoName = process.env.NEXT_PUBLIC_BASE_PATH || 'head2headdeal';

export default {
  output: 'export', // enables static export (GitHub Pages friendly)
  images: { unoptimized: true },
  basePath: isGitHubPages ? `/${repoName}` : undefined,
  trailingSlash: true,
};
