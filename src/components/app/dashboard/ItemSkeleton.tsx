// import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Skeleton } from "@/components/ui/skeleton";

// export function ItemSkeleton() {
//     return (
//         <div className="overflow-hidden rounded-2xl bg-white shadow-card">
//             <AspectRatio>

//             </AspectRatio>
//             <div className="p-5">
//                 <Skeleton className="mb-2 h-5 w-1/3" />
//                 <Skeleton className="h-4 w-1/2" />
//             </div>
//         </div>
//     )
// }

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
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Typography } from "@/components/ui/typography"
import { Link } from "lucide-react"


interface ItemSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    aspectRatio?: "portrait" | "square"
    width?: number
    height?: number
}

export function ItemSkeleton({
    aspectRatio = "portrait",
    width,
    height,
    className,
    ...props
}: ItemSkeletonProps) {
    return (
        <div className={cn("space-y-3", className)} {...props}>
            <div className="overflow-hidden rounded-md ">
                <Skeleton className={cn(
                    "h-auto w-auto object-cover  transition-all hover:scale-105",
                    aspectRatio === "portrait" ? "aspect-[3/4]" : "aspect-square"
                )} />

                {/* <Image
                    src={data?.metadata?.image}
                    alt={data?.id || "error"}
                    width={width}
                    height={height}

                /> */}
            </div>
        </div>
    )
}
