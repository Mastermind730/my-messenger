/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash:true,
    images: {
      domains: [
        "res.cloudinary.com",
        "avatars.githubusercontent.com",
        "lh3.googleusercontent.com",
        "my-messenger-assets-bucket.s3.amazonaws.com",
      ]
    },
    reactStrictMode:true,
    assetPrefix: 'https://my-messenger-assets-bucket.s3.amazonaws.com/',

    // experimental: {
    //   swcPlugins: [
    //     ["next-superjson-plugin", {}]
    //   ]
    // }
  };
  
  export default nextConfig;
  
