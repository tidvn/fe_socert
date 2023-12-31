"use client"

import * as React from "react"

import { useWallet } from '@solana/wallet-adapter-react';

import { cn } from "@/utils/cn"
import { ConnectWallet } from "../wallet/WalletButton"
import { buttonVariants } from "@/components/ui/button";
import fetchClient from "@/utils/fetch-client";
import * as bs58 from "bs58";
import { signIn } from "next-auth/react";
import {isNil} from "lodash";
interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {


    const wallet: any = useWallet();

    async function handleLogin() {
        try {
            if (!wallet.connected) {
                return;
            }
            const publicKey = wallet.publicKey;
            const { data: responseData } = await fetchClient({
                method: "GET",
                endpoint: `/auth/wallet/${publicKey}/nonce/`,
            });
            if (responseData.statusCode !== 200) {
                return;
            }
            if (isNil(responseData.data.nonce)) {
                return;
            }
            const signature = await wallet.signMessage(new TextEncoder().encode(responseData.data.nonce));

            const data = {
                signature: bs58.encode(signature),
                publicAddress: publicKey.toBase58(),
            }
            await signIn("credentials", { ...data, callbackUrl: '/dashboard' })

        } catch (error) {
            console.log(error)
        }
    }

    return (

        <div className={cn("grid gap-6", className)} {...props}>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>

            </div>

            <ConnectWallet />
            <button
                type="button"
                className={cn(buttonVariants())}
                onClick={handleLogin}
            >
                Solana
            </button>
        </div>
    )
}