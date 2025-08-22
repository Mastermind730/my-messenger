/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: 'https://my-messenger-assets-bucket.s3.amazonaws.com/',
    images: {
      domains: [
        "res.cloudinary.com",
        "avatars.githubusercontent.com",
        "lh3.googleusercontent.com",
        "my-messenger-assets.s3.amazonaws.com",
      ]
    },
    reactStrictMode:true,
    // experimental: {
    //   swcPlugins: [
    //     ["next-superjson-plugin", {}]
    //   ]
    // }
  };
  
  export default nextConfig;
  
