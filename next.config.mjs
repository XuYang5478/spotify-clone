/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "ueiehignrbxaxkgwytbk.supabase.co",
        pathname: "**"
      }
    ]
  }
};

export default nextConfig;
