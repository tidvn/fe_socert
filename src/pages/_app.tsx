import "@/styles/globals.css"

import { Metadata } from "next"
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import { Wallet } from "@/context/connectWalletContext"

import { siteConfig } from "@/config/site"
import { fontSans } from "@/utils/fonts"
import { TailwindIndicator } from "@/components/tailwind-indicator"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/utils/cn"
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
}
export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const { session, ...props }: any = pageProps

  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <>
      <div
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <Wallet>

          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <div className="relative flex min-h-screen flex-col">
              <div className="container flex-1 ">
                <SessionProvider session={session}>
                  {getLayout(
                    <>
                      <Component  {...props} />
                    </>
                  )}
                </SessionProvider>
              </div>
            </div>
            <TailwindIndicator />
          </ThemeProvider>
        </Wallet>
      </div>
    </>
  )
}
