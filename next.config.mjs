/** @type {import('next').NextConfig} */
const nextConfig = {

    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: "https",
    //         hostname: process.env.WORDPRESS_HOSTNAME,
    //         port: "",
    //         pathname: "/**",
    //       },
    //       {
    //         protocol: "https",
    //         hostname: "res.cloudinary.com",
    //         port: "",
    //         pathname: "/**",
    //       },
    //       {
    //         protocol: "https",
    //         hostname: "img.youtube.com",
    //         port: "",
    //         pathname: "/**",
    //       },
    //     ],
    //   },
    images: {
        domains: ['localhost'],
        domains: ['res.cloudinary.com'], 
      },
};

export default nextConfig;
