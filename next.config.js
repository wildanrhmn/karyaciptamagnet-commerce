/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "readymadeui.com" }
    ],
  },
};

module.exports = nextConfig;
