// import NextAuth, { AuthOptions } from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import GoogleProvider from "next-auth/providers/google";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
import { authOptions } from "./auth";
import NextAuth from "next-auth";
// const prisma = new PrismaClient();

// export const authOptions: AuthOptions = {
//     providers: [
//         GithubProvider({
//             clientId: process.env.GITHUB_ID as string,
//             clientSecret: process.env.GITHUB_SECRET as string
//         }),
//         GoogleProvider({
//             clientId: process.env.GOOGLE_ID as string,
//             clientSecret: process.env.GOOGLE_SECRET as string
//         }),
//         CredentialsProvider({
//             name: 'credentials',
//             credentials: {
//                 email: { label: 'Email', type: 'text' },
//                 password: { label: 'Password', type: 'password' }
//             },
//             async authorize(credentials) {
//                 if (!credentials?.email || !credentials?.password) {
//                     throw new Error('Invalid credentials');
//                 }

//                 const user = await prisma.user.findUnique({
//                     where: { email: credentials.email }
//                 });

//                 if (!user || !user.hashedPassword) {
//                     throw new Error('Invalid credentials');
//                 }

//                 const isCorrectPassword = await bcrypt.compare(
//                     credentials.password,
//                     user.hashedPassword
//                 );

//                 if (!isCorrectPassword) {
//                     throw new Error('Invalid credentials');
//                 }

//                 return user;
//             }
//         })
//     ],
//     callbacks: {
//         async signIn({ user, account, profile }) {
//             if (account?.provider === 'google' || account?.provider === 'github') {
//                 const email = user.email as string;
//                 const name = user.name || profile?.name;
//                 // const image = user.image || profile?.avatar_url || profile?.picture;
//                 const image = user.image ;

//                 await prisma.user.upsert({
//                     where: { email },
//                     update: { name, image },
//                     create: {
                        
//                         email,
//                         name,
//                         image,
//                         // Any other required fields can be added here
//                     },
//                 });
//             }
//             return true;
//         },
//         async session({ session, token, user }) {
//             if (token && typeof token.id === 'string') {
//                 session.id = token.id;
//             }
//             return session;
//         },
//         async jwt({ token, user, account, profile }) {
//             if (user) {
//                 token.id = user.id;
//             }
//             return token;
//         },
//     },
//     debug: process.env.NODE_ENV === 'development',
//     session: {
//         strategy: "jwt",
//     },
//     secret: process.env.NEXTAUTH_SECRET
// };

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };