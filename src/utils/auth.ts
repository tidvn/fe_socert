import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fetchClient from "./fetch-client";
import { jwt } from "./jwt";

export const authOptions: NextAuthOptions = {  
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: parseInt(process.env.NEXTAUTH_JWT_AGE!) || 1209600,
  },
  providers: [
    CredentialsProvider({
      name: "solana",
      credentials: {
        publicAddress: {
          label: "publicAddress",
          type: "text",
        },
        signature: {
          label: "signature",
          type: "text",
        },
      },
      async authorize(credentials) {
        // console.log(credentials)
        try {
          const response = await fetchClient({
            method: "POST",
            endpoint: "/auth/solana/login",
            body: JSON.stringify(credentials),
          });
          console.log(response)

          if (response.status != 200) {
            throw new Error("Cant not get data");
          }
          const data: {
            user: any;
            access_token: string;
          } =  response.data;
          if (!data?.access_token) {
            throw response;
          }

          return {
            ...data.user,
            accessToken: data?.access_token,
          };
        } catch (error) {
          console.log(error)
          if (error instanceof Response) {
            return null;
          }
          throw new Error("An error has occurred during login request");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }: any) {
      if (trigger === "update") {       
        if (session.type === "MANUAL") {
          const response = await fetchClient({
            endpoint: "/api/user",
            token: token.accessToken,
          });
          const user =  response.data;

          return { ...token, ...user };
        }

        return { ...token, ...session };
      }
      if (user) {
        return { ...token, ...user };
      }

      const { exp: accessTokenExpires } = jwt.decode(token.accessToken);

      if (!accessTokenExpires) {
        return token;
      }

      const currentUnixTimestamp = Math.floor(Date.now() / 1000);
      const accessTokenHasExpired = currentUnixTimestamp > accessTokenExpires;

      if (accessTokenHasExpired) {
        return await refreshAccessToken(token);
      }

      return token;
    },
    async session({ session, token }: any) {
      if (token.error) {
        throw new Error("Refresh token has expired");
      }
      session.accessToken = token.accessToken;
      session.user.username = token.username || "";
      session.user.email = token.email || "";
      return session;
    },
  },
  events: {
    async signOut({ token }: any) {
      await fetchClient({
        method: "POST",
        endpoint: "/api/logout",
        token: token.accessToken,
      });
    },
  },
};

async function refreshAccessToken(token: any) {
  try {
    const response = await fetchClient({
      method: "POST",
      endpoint: "/api/refresh",
      token: token?.accessToken,
    });

    if (response.status != 200) {
      throw new Error("Cant not get data");
    }

    const refreshedAccessToken: { access_token: string } =
      await response.data;
    const { exp } = jwt.decode(refreshedAccessToken.access_token);

    return {
      ...token,
      accessToken: refreshedAccessToken.access_token,
      exp,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}