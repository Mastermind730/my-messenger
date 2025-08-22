/** @type {import('next').NextConfig} */
const nextConfig = {
    assetPrefix: 'https://my-messenger-assets-bucket.s3.amazonaws.com/',
      output: 'export',
      trailingSlash: true,
    images: {
      domains: [
        "res.cloudinary.com",
        "avatars.githubusercontent.com",
        "lh3.googleusercontent.com",
        "my-messenger-assets.s3.amazonaws.com",
      ],
            unoptimized: true,

    },
    reactStrictMode:true,
    // experimental: {
    //   swcPlugins: [
    //     ["next-superjson-plugin", {}]
    //   ]
    // }
  };
  
  export default nextConfig;
  
