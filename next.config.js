/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: "images.unsplash.com" },
      { hostname: "lh3.googleusercontent.com" },
      { hostname: "res.cloudinary.com" },
      { hostname: "readymadeui.com" }
    ],
  },
  redirects: () => [
    {
      source: "/",
      destination: "/store",
      permanent: false,
    },
  ]
};

module.exports = nextConfig;
