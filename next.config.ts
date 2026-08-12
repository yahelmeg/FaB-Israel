/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.fab-israel.com",
                pathname: "/**",
            },
        ],
    },
};

export default nextConfig;
