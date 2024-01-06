import { Metadata } from "next"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { CalendarDateRangePicker } from "@/components/app/dashboard/date-range-picker"
import { MainNav } from "@/components/app/dashboard/main-nav"
import { Overview } from "@/components/app/dashboard/overview"
import { RecentSales } from "@/components/app/dashboard/recent-sales"
import { Search } from "@/components/app/dashboard/search"
import OrganizationSwitcher from "@/components/app/dashboard/team-switcher"
import { UserNav } from "@/components/app/dashboard/user-nav"
import { ReactElement, use, useEffect, useState } from "react"
import StudioLayout from "@/components/layout/dashboard/dashboard"
import { userStore } from "@/store/user"
import { useSession } from "next-auth/react"
import { useRouter } from "next/router"
import Loading from "@/components/loading"

export const metadata: Metadata = {
  title: "Studio",
}

const StudioPage = () => {
  const [loading, setLoading] = useState(true)

  // if (loading) {

  //   return <Loading />
  // }
  
  return (<StudioLayout><iframe src="https://flatdraw.com/" frameBorder="0" width="100%" height="800px" allowFullScreen></iframe></StudioLayout>

  )

}


export default StudioPage