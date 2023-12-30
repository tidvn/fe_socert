"use client"

import * as React from "react"

import { buttonVariants } from "@/components/ui/button"

import { cn } from "@/utils/cn"

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {


    return (
        <div className={cn("grid gap-6", className)} {...props}>

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>

            </div>
            <button
                type="button"
                className={cn(buttonVariants())}
            >
                Solana
            </button>
        </div>
    )
}