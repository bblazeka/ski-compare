module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["openweathermap.org"],
  },
  publicRuntimeConfig: {
    CACHE_MAX_SIZE: process.env.CACHE_MAX_SIZE || 50,
    CACHE_MAX_AGE_IN_S: process.env.CACHE_MAX_AGE_IN_S || 30 * 60,
  },
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
};
