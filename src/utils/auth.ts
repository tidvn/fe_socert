import type { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import fetchClient from "./fetch-client";
import { jwt } from "./jwt";
import { isNil } from "lodash";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
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
        try {
          const response = await fetchClient({
            method: "POST",
            endpoint: "/auth/solana/login",
            body: JSON.stringify(credentials),
          });
          if (response.status != 201) {
            throw response.data.message;
          }


          const { data } = response.data;
          if (!data.accessToken) {
            throw response.data.message;
          }
          const { iat, exp, ...user } = jwt.decode(data.accessToken);
          return {
            ...user,
            accessToken: data.accessToken,
          };
        } catch (error) {
          if (error instanceof Response) {
            return null;
          }
          throw new Error("An error has occurred during login request");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.user = user;
      }
      return token
    },
    async session({ session, token }: any) {

      if (token.error) {
        throw new Error(token.error);
      }
      if (token.user) {
        const response = await fetchClient({
          method: "GET",
          endpoint: `/user/profile/`,
          token: token.user.accessToken,
        });
        if (response.status == 200) {
          session.userInfo = response.data.data;
        }
      }

      session.user = token.user;
      return session;
    },
  },
  // events: {
  //   async signOut({ token }: any) {
  //     await fetchClient({
  //       method: "POST",
  //       endpoint: "/auth/logout",
  //       token: token.accessToken,
  //     });
  //   },
  // },
};

// async function refreshAccessToken(token: any) {
//   try {
//     const response = await fetchClient({
//       method: "POST",
//       endpoint: "/api/refresh",
//       token: token?.refreshToken,
//     });

//     if (response.status != 200) {
//       throw new Error("Cant not get data");
//     }

//     const refreshedAccessToken: { access_token: string } =
//       await response.data;
//     const { exp } = jwt.decode(refreshedAccessToken.access_token);

//     return {
//       ...token,
//       accessToken: refreshedAccessToken.access_token,
//       exp,
//     };
//   } catch (error) {
//     return {
//       ...token,
//       error: "RefreshAccessTokenError",
//     };
//   }
// }