import { ThemeToggle } from "@/components/theme-toggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@solana/wallet-adapter-react";
import { signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import { useState } from "react";

export function UserNav() {
  const { data: session, status } = useSession();
  const { userInfo }: any = session
  const { setTheme, theme } = useTheme()
  const [copied, setCopied] = useState(false);


  const wallet = useWallet();

  if (status != "authenticated") {
    return;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={wallet.connected ? wallet?.wallet?.adapter.icon : "https://upload.wikimedia.org/wikipedia/en/b/b9/Solana_logo.png"} alt="solana" />
            <AvatarFallback>{userInfo.walletAddress}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{`${userInfo.walletAddress.substring(0, 20)}...`}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {userInfo.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={async () => {
            await navigator.clipboard.writeText(userInfo.walletAddress);
            setCopied(true);
            setTimeout(() => setCopied(false), 400);
          }}>
            {copied ? 'Copied' : 'Copy Address'}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
            Toggle theme
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
