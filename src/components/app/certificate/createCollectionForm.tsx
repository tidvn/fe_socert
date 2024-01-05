"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import * as z from "zod"
import { TrashIcon } from '@radix-ui/react-icons'

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@radix-ui/react-separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { use, useState } from "react"
import Image from "next/image"
// import { ImagePicker } from "@/components/app/nft-studio/ImagePicker"

import { Connection, clusterApiUrl } from "@solana/web3.js";

import { useWallet } from "@solana/wallet-adapter-react"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"
import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount, createGenericFile } from "@metaplex-foundation/umi"

import * as base58 from "bs58"

import { NEXT_PUBLIC_BACKEND_URL, NEXT_PUBLIC_IMAGE_CDN } from "@/config/env"
import { cn } from "@/utils/cn"
import { useSession } from "next-auth/react"
import fetchClient from "@/utils/fetch-client"
import { Label } from "@/components/ui/label"
import { MediaPicker } from "degen"
import { uploadToCloudinary } from "@/utils/upload"
import { set } from "lodash"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AlertDialog, AlertDialogContent } from "@/components/ui/alert-dialog"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import router from "next/router"
import { fetchShyft } from "@/utils/useShyft"
import { ConnectWallet } from "../wallet/WalletButton"

const certificateFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: "Name must be at least 2 characters.",
    })
    .max(30, {
      message: "Name must not be longer than 30 characters.",
    }),
  description: z.string().optional(),
  link: z.string().optional(),
  royalty: z.string().max(2, { message: "Royalty must be less than 99" }).refine((val) => !Number.isNaN(parseInt(val, 10)), {
    message: "Expected number, received a string"
  }).default("0").optional(),
  attributes: z
    .array(
      z.object({
        trait_type: z.string().min(2, { message: "Please enter a type." }),
        value: z.string().min(2, { message: "Please enter a value." }),
      })
    )
    .optional(),
  authenticator: z
    .array(
      z.object({
        value: z.string(),
      })
    )
    .optional(),
})

type CertificateFormValues = z.infer<typeof certificateFormSchema>

export function CreateCertificateCollectionForm(props: any) {
  const { certId } = props
  const wallet = useWallet();
  const umi = createUmi("https://api.devnet.solana.com")
    .use(walletAdapterIdentity(wallet))
    .use(mplTokenMetadata())

  const signer = generateSigner(umi);
  const [state, setState] = useState<string>("idle");
  const [imageUrl, setImageUrl] = useState<string>('');
  const connection = new Connection(clusterApiUrl("devnet"));
  const [open, setOpen] = useState(false)
  const { data: session, status } = useSession();

  const { userInfo }: any = session

  const form = useForm<CertificateFormValues>({
    resolver: zodResolver(certificateFormSchema),
    mode: "onChange",
  })

  const { fields: attFields, append: attAppend, remove: attRemove } = useFieldArray({
    name: "attributes",
    control: form.control,
  })

  const { fields: authenticatorFields, append: authenticatorAppend, remove: authenticatorRemove, update: authenticatorUpdate } = useFieldArray({
    name: "authenticator",
    control: form.control,
  })
  if (userInfo.walletAddress != authenticatorFields[0]?.value) {
    authenticatorUpdate(0, { value: userInfo.walletAddress })
  }
  async function onSubmit(data: CertificateFormValues) {
    try {
      setState("Intializing...")
      if (!imageUrl) {
        return
      }
      setState("Create Metadata...")
      const metadata = {
        name: data.name,
        description: data.description,
        image: imageUrl,
        attributes: data.attributes,
        properties: {
          images: [{
            "type": "image/png",
            "uri": imageUrl
          }]
        },
        creators: data.authenticator?.map(item => item.value) || [],
      };
      const templateId = certId;
      const organizationId = userInfo.currentOrg;

      const response = await fetchClient({
        method: "POST",
        endpoint: "/certificate/collection/create",
        body: {
          metadata,
          templateId,
          organizationId
        }
      })
      if (response.status != 201) {
        setState("Error")
        return
      }
      const { certificateId, metadata_path } = response.data.data
      const metadata_uri = `${NEXT_PUBLIC_BACKEND_URL}${metadata_path}`
      console.log("metadat_uri ", metadata_uri);

      // const imageGeneric = createGenericFile(image, `${data.name}.png`, { contentType: "image/png" })
      // const [image_uri] = await umi.uploader.upload([imageGeneric]);
      // const metadata = {
      //   name: data.name,
      //   description: data.description,
      //   website: data.link,
      //   image: image_uri,
      //   attributes: data.attributes,
      //   seller_fee_basis_points: 100 * parseInt(data.royalty ? data.royalty : ""),
      //   properties: {
      //     images: [
      //       {
      //         type: "image/png",
      //         uri: image_uri
      //       },
      //     ]
      //   },
      //   creators: []
      // };
      // const metadat_uri = await umi.uploader.uploadJson(metadata);

      let tx = await createNft(umi, {
        mint: signer,
        name: data.name,
        uri: metadata_uri,
        sellerFeeBasisPoints: percentAmount(0),
        isCollection: true,
      })


      let result = await tx.sendAndConfirm(umi);
      const signature = base58.encode(result.signature);
      if (signature) {
        // toast.success("Create collection success")

        const response = await fetchShyft({
          method: "GET",
          endpoint: `/sol/v1/wallet/transaction?network=devnet&txn_signature=${signature}`,
        })
        if (response) {
          await fetchClient({
            method: "POST",
            endpoint: `/certificate/collection/${certificateId}`,
            body: {
              nftAddress: response.data.result?.parsed.actions[0].info.nft_address
            }
          })
        }
        setOpen(true)
      }
      console.log("signature ", signature);
    } catch (e: any) {
      console.log(e.message)
    } finally {
      setState("idle")
    }

  }

  return (

    <>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <Card className="w-full">
            <CardHeader>

            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-7 gap-x-8 items-center">
                  <div className="col-span-5">
                    <div className="rounded-md border-2 border-dashed	border-gray-600 flex items-center justify-center ">
                    </div>
                  </div>
                  <div className="col-span-2">col2</div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-end gap-6">
              <Button onClick={() => setOpen(false)} variant="outline">View Cert</Button>
              <Button onClick={() => router.push(`/dashboard/`)} >Upload Student</Button>
            </CardFooter>
          </Card>
        </AlertDialogContent>
      </AlertDialog>

      <div className="h-full px-4 py-6 lg:px-8">
        <h1 className="text-2xl font-semibold tracking-tight">
          Create collection Certificate
        </h1>

        <div className="mt-5 container relative hidden h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0  rounded-md border border-dashed">

          <div className="lg:p-8 ">
            <div className="mx-auto flex w-full flex-col  space-y-6 sm:w-[450px]">
              <div className="flex flex-col space-y-2 text-left">


              </div>
              <div className="">
                <Image
                  src={`${NEXT_PUBLIC_IMAGE_CDN}/image/template/${certId}.png`}
                  alt="collection"
                  width="0"
                  height="0"
                  sizes="100vw"
                  className={cn(
                    `h-auto w-full object-cover transition-all border-2	p-2 `
                  )}
                />
              </div>
              <p className="text-sm text-muted-foreground">
                Upon completion, your student will receive an nft that looks like this
              </p>
            </div>

          </div>
          <div className="lg:p-8">
            <div className="mx-auto flex w-full flex-col  space-y-6 sm:w-[450px]">
              <div className="flex flex-col space-y-2 text-left">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create collection NFT
                </h1>
                <p className="text-sm text-muted-foreground">
                  Creating a collection NFT is required to ensure your NFTs are easily searchable and grouped together in wallets and marketplaces.
                </p>

              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <Tabs defaultValue="basics" className="h-full space-y-6">
                    <div className="space-between flex items-center">
                      <TabsList>
                        <TabsTrigger value="basics" className="relative">
                          Basics
                        </TabsTrigger>
                        <TabsTrigger value="properties">Properties</TabsTrigger>
                      </TabsList>
                    </div>
                    <TabsContent
                      value="basics"
                      className=" h-[29rem] border-none p-0 outline-none"
                    >
                      <Label >Certificate Corver</Label>
                      <MediaPicker
                        onChange={async (e) => {
                          setState("uploading...");
                          setImageUrl(await uploadToCloudinary(e));
                          setState("idle");
                        }}
                        onReset={() => {
                          setImageUrl('');
                          setState("idle");
                        }}
                        compact
                        label="Upload Image"
                      />
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter a Name" {...field} />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter a Description"
                                className="resize-none"
                                {...field}
                              />
                            </FormControl>

                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div>
                        <Label className="mt-4">List of Authenticator</Label>
                        {authenticatorFields.map((field, index) => (<>
                          <div className="grid grid-cols-12 mt-1 gap-2">
                            <div className="col-span-11">
                              <FormField
                                control={form.control}
                                key={field.id}
                                name={`authenticator.${index}.value`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input  {...field} />
                                    </FormControl>
                                    <FormMessage />

                                  </FormItem>
                                )}
                              /></div>
                            <div className="col-span-1"><Button
                              type="button"
                              variant="outline"
                              className="p-2"
                              onClick={() => authenticatorRemove(index)}
                            >
                              <TrashIcon />
                            </Button></div>

                          </div>

                        </>

                        ))}


                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => authenticatorAppend({ value: "" })}
                        >
                          Add Authenticator
                        </Button>
                      </div>


                    </TabsContent>
                    <TabsContent
                      value="properties"
                      className="h-[29rem] flex-col border-none p-0 data-[state=active]:flex"
                    >
                      <div>
                        {attFields.map((field, index) => (<>
                          <div className="mt-4 grid grid-cols-12 gap-2">
                            <div className="col-span-5">
                              <FormField
                                control={form.control}
                                key={field.id}
                                name={`attributes.${index}.trait_type`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input placeholder="e. g. Size"  {...field} />
                                    </FormControl>
                                    <FormMessage />

                                  </FormItem>
                                )}
                              /></div>
                            <div className="col-span-6">
                              <FormField
                                control={form.control}
                                key={field.id}
                                name={`attributes.${index}.value`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Input placeholder="e. g. Medium" {...field} />
                                    </FormControl>
                                    <FormMessage />

                                  </FormItem>
                                )}
                              />
                            </div>
                            <div className="col-span-1"><Button
                              type="button"
                              variant="outline"
                              className="p-2"
                              onClick={() => attRemove(index)}
                            >
                              <TrashIcon />
                            </Button></div>

                          </div>

                        </>

                        ))}
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => attAppend({ trait_type: "", value: "" })}
                        >
                          Add Property
                        </Button>
                      </div>
                      <Separator className="my-4" />
                    </TabsContent>
                  </Tabs>
                  {
                    wallet.connected
                      ? (<Button type="submit" disabled={state != "idle"}>{state != "idle" ? state : "Create Collection"} </Button>)
                      : (<ConnectWallet />)}

                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>


  )
}