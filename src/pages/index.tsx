import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/utils/cn"

export default function IndexPage() {

  return (
    <>
      <section className="space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">
          &#34;Discover a World of Opportunities with SO-CERT&#34;          </h1>
          <p className="max-w-[50rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          SO-CERT&#34; is a website that utilizes Solana blockchain to provide a transparent and easily verifiable certificate solution. In the context of counterfeit degrees and fake certifications flooding the market, &#34;SO-CERT&#34; promises to deliver an efficient and trustworthy solution.          </p>
          <div className="space-x-4">
            <Link href="/auth/login" className={cn(buttonVariants({ size: "lg" }))}>
              Get Started
            </Link>
            <Link
              href={`/explorer`}
              target="_blank"
              rel="noreferrer"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }))}
            >
              Search for certificates
            </Link>
          </div>
        </div>
      </section>

    </>
  )
}

