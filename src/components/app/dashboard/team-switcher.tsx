"use client"

import * as React from "react"
import {
  CaretSortIcon,
  CheckIcon,
} from "@radix-ui/react-icons"

import { cn } from "@/utils/cn"
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,

} from "@/components/ui/command"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { useSession } from "next-auth/react"
import { switchOrganization } from "@/utils/switch-organization"



type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

interface OrganizationSwitcherProps extends PopoverTriggerProps { }

export default function OrganizationSwitcher({ className }: OrganizationSwitcherProps) {

  const { data: sessions }: any = useSession()
  const organizations = sessions.userInfo.organizations

  const [open, setOpen] = React.useState(false)
  const [selectedOrganization, setSelectedOrganization] = React.useState<any>(sessions.userInfo.organizations[sessions.userInfo.currentOrg - 1])

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a organization"
          className={cn("w-[200px] justify-between", className)}
        >
          {selectedOrganization && (<> <Avatar className="mr-2 h-5 w-5">
            <AvatarImage
              src={selectedOrganization.image}
              alt={selectedOrganization.name}
            // className="grayscale"
            />
            <AvatarFallback>SC</AvatarFallback>
          </Avatar>
            {`${(selectedOrganization.name).substring(0, 15)}...`}
            <CaretSortIcon className="ml-auto h-4 w-4 shrink-0 opacity-50" /></>)}

        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            {/* <CommandInput placeholder="Search organization..." /> */}
            <CommandEmpty>No organization found.</CommandEmpty>
            <CommandGroup>
              {organizations.map((organization: any) => (
                <CommandItem
                  key={organization.name}
                  onSelect={async () => {
                    setSelectedOrganization(organization)
                    await switchOrganization(organization.id)
                    setOpen(false)
                  }}
                  className="text-sm"
                >
                  <Avatar className="mr-2 h-5 w-5">
                    <AvatarImage
                      src={organization.image}
                      alt={organization.name}
                    // className="grayscale"
                    />
                    <AvatarFallback>SC</AvatarFallback>
                  </Avatar>
                  {organization.name}
                  {
                    selectedOrganization && (<CheckIcon
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedOrganization.name === organization.name
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />)
                  }

                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>

        </Command>
      </PopoverContent>
    </Popover>

  )
}
