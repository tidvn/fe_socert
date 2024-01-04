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
import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_IMAGE_CDN } from "@/config/env"


interface CertificateCardProps extends React.HTMLAttributes<HTMLDivElement> {
  data: any
  aspectRatio?: "portrait" | "square"
  width?: number
  height?: number
}

export function CertificateCard({
  data,
  aspectRatio = "portrait",
  width,
  height,
  className,
  ...props
}: CertificateCardProps) {
  return (
    <div className={cn("space-y-3", className)} {...props}>

    

      <div className="overflow-hidden rounded-md border-solid	 border-2">
        <Image
          src={`${NEXT_PUBLIC_IMAGE_CDN}/api/image/template/${data.id}.png`}
          alt={data?.id || "error"}
          width={width}
          height={height}
          className={cn(
            "h-auto w-auto object-cover  transition-all hover:scale-105",
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
