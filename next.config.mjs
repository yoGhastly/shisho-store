/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // TODO: Wrap useSearchParams with Suspense
    missingSuspenseWithCSRBailout: false,
  },
};

export default nextConfig;
