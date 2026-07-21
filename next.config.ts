/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "pub-685502d84c2a432aa847dc33baf6aa6b.r2.dev",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
