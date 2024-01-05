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
import { useState } from "react"
import Image from "next/image"
// import { ImagePicker } from "@/components/app/nft-studio/ImagePicker"

import { Connection, clusterApiUrl } from "@solana/web3.js";

import { useWallet } from "@solana/wallet-adapter-react"
// import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
// import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters"
// import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"
// import { createSignerFromKeypair, signerIdentity, generateSigner, percentAmount, createGenericFile } from "@metaplex-foundation/umi"
// import { nftStorageUploader } from '@metaplex-foundation/umi-uploader-nft-storage'

import * as base58 from "bs58"

import { NEXT_PUBLIC_IMAGE_CDN } from "@/config/env"
import { cn } from "@/utils/cn"
import { useSession } from "next-auth/react"
import fetchClient from "@/utils/fetch-client"
import { Label } from "@/components/ui/label"
import { MediaPicker } from "degen"
import { uploadToCloudinary } from "@/utils/upload"

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
  // const umi = createUmi("https://api.devnet.solana.com")
  //   .use(walletAdapterIdentity(wallet))
  //   .use(mplTokenMetadata())
  // umi.use(nftStorageUploader({ token: siteConfig.nftstorage_api_key }))

  // const mint = generateSigner(umi);
  // const bundlrUploader = createBundlrUploader(umi);
  const [state, setState] = useState<string>("idle");
  const [imageUrl, setImageUrl] = useState<string>('');
  const connection = new Connection(clusterApiUrl("devnet"));
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
        creators: data.authenticator,
        certificate: "socert"
      };
      const templateId = certId;
      const organizationId = userInfo.currentOrg;

      const metadat_uri = await fetchClient({
        method: "POST",
        endpoint: "/certificate/collection/create",
        body: {
          metadata,
          templateId,
          organizationId
        }
      })
      console.log("metadat_uri ", metadat_uri);

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

      // let tx = await createNft(umi, {
      //   mint: mint,
      //   name: data.name,
      //   uri: metadat_uri,
      //   sellerFeeBasisPoints: percentAmount(parseInt(`${data.royalty}`)),
      //   isCollection: true,
      // })
      // let result = await tx.sendAndConfirm(umi);
      // const signature = base58.encode(result.signature);
      // console.log("signature ", signature);
    } catch (e: any) {
      console.log(e.message)
    } finally {
      setState("idle")
    }

  }

  return (
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
                    <Label className="">Upload Media</Label>
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
                      label="Upload certificate cover"
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
                            <Textarea
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
                    <Label className="">List of Authenticator</Label>
                      {authenticatorFields.map((field, index) => (<>
                        <div className="mt-4 grid grid-cols-12 gap-2">
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
                <Button type="submit" disabled={state != "idle"}>{state != "idle" ? state : "Create Collection"} </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>


  )
}