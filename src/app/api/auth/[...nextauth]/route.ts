import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth/core/types";
import { JWT } from "next-auth/jwt";
import { NextAuthOptions } from "next-auth";
import { AnyCnameRecord } from "dns";
import { NextResponse } from "next/server";


const authOptions: NextAuthOptions = {
  jwt: {
    secret: process.env.JWT_SIGNING_PRIVATE_KEY
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 4 * 60 * 60 // 4 hours
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        Username: { label: "Username", type: "text", placeholder: "João" },
        Password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        try {
          const { Username, Password } = credentials as any;

          const resposta = await fetch(
            process.env.NEXT_PUBLIC_STRAPI_API_URL + "/auth/local",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
                // "Content-Type": "application/x-www-form-urlencoded",
              },
              body: JSON.stringify({
                identifier: Username,
                password: Password
              })
            }
          );

          const res = await resposta.json();

           const erro = {
            jwt: null,
            id: null,
            name: null,
            email: null,
            confirmed: null,
            blocked: null,
            pemission: null
           }
          if (res.error) {
            throw new Error("Usuário e senha incorreto");
          }
 
          const { jwt, user } = res;

          const { confirmed, blocked, username, id, email, pemission } =
            await user;
          const response = {
            jwt: jwt,
            id: id,
            name: username,
            email: email,
            confirmed: confirmed,
            blocked: blocked,
            pemission: pemission
          };

          if (!jwt || !id || !username || !email) {
            throw new Error("Usuário e senha incorreto");
          }

          return response;
        } catch (e: any) {
          console.log(e);
          return null
        }
      }
    })
  ],
  pages: {
    signIn: "/auth/signin"
    // signOut: '/auth/signout',
    // error: '/auth/error', // Error code passed in query string as ?error=
    // verifyRequest: '/auth/verify-request', // (used for check email message)
    // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },


  callbacks: {
    jwt: async ({ token, user }): Promise<any> => {
      const isSignIn = !!user;
      const actualDateInSeconds = Math.floor(Date.now() / 1000);
      const tokenExpirationInSeconds = Math.floor(4 * 60 * 60); // 4 hours

      if (isSignIn) {
        if (!user?.jwt || !user?.id || !user?.name || !user?.email) {
          return null;
        }

        token.jwt = user.jwt;
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.confirmed = user.confirmed;
        token.blocked = user.blocked;
        token.pemission = user.pemission;

        token.expiration = actualDateInSeconds + tokenExpirationInSeconds;
      } else {
        if (!token?.expiration) {
          return null;
        }
      }

      return token as JWT;
    },
    session: async ({ session, token }): Promise<Session | any> => {
      if (
        !token?.jwt ||
        !token?.id ||
        !token?.name ||
        !token?.email ||
        !token?.expiration ||
        !token?.pemission
      ) {
        return null;
      }

      session.user = {
        id: token.id as number,
        name: token.name as string,
        email: token.email as string,
        pemission: token.pemission as string,
        confirmed: token.confirmed as boolean,
        blocked: token.blocked as boolean
      };

      session.token = token.jwt as string;
      return session;
    }
  }
}

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}