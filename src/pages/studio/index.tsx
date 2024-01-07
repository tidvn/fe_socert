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
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"

export const metadata: Metadata = {
  title: "Studio",
}

const StudioPage = () => {
  const [loading, setLoading] = useState(false)

  if (loading) {

    return <Loading />
  }

  return (<StudioLayout>
    
    <iframe src="https://flatdraw.com/" frameBorder="0" width="100%" height="800px" allowFullScreen></iframe>
    <div className="flex h-16 items-center"> 

     <Dialog>
      <DialogTrigger asChild>
      <Button>save</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Name of this template</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" value="Pedro Duarte" className="col-span-3" />
          </div>

        </div>
        <DialogFooter>
          <Button  onClick={()=>setLoading(true)}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>       
        
      </div>
  </StudioLayout>

  )

}


export default StudioPage