/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // TODO: Wrap useSearchParams with Suspense
    missingSuspenseWithCSRBailout: false,
  },
  images: {
    remotePatterns: [
      {
        hostname: "files.stripe.com",
      },
    ],
  },
};

export default nextConfig;
