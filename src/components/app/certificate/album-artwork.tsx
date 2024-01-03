import Image from "next/image"
import { PlusCircledIcon } from "@radix-ui/react-icons"

import { cn } from "@/utils/cn"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { NEXT_PUBLIC_BACKEND_URL } from "@/config/env"


interface CertificateTemplateProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function CertificateTemplate({
  data,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: CertificateTemplateProps) {

  const [open, setOpen] = React.useState(false)
  return (
    <div className={cn("space-y-3", className)} {...props}>

      <AlertDialog open={open}>
        <AlertDialogContent>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>{data?.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-x-8 items-center">
                  <div className="col-span-5">
                    <div className="rounded-md border-2 border-dashed	border-gray-600">
                      <Image
                        src={`${NEXT_PUBLIC_BACKEND_URL}/image/template/${data.id}.png`}
                        alt="collection"
                        width="0"
                        height="0"
                        sizes="100vw"
                        className={cn(
                          `h-auto w-full object-cover transition-all `
                        )}
                      /></div>
                  </div>
                  <div className="col-span-2">col2</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-6">
              <Button variant="outline">Cancel</Button>
              <Button onClick={() => setOpen(false)} >Deploy</Button>
            </CardFooter>
          </Card>
        </AlertDialogContent>
      </AlertDialog>


      <div className="overflow-hidden rounded-md" onClick={() => setOpen(true)}>
        <Image
          src={`${NEXT_PUBLIC_BACKEND_URL}/image/template/${data.id}.png`}
          alt={data?.id || "error"}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover transition-all hover:scale-105",
            aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
          )}
        />
      </div>

      <div className="space-y-1 text-sm">
        <h3 className="font-medium leading-none">{data?.name}</h3>
        <p className="text-xs text-muted-foreground">mô tả</p>
      </div>
    </div>
  )
}
