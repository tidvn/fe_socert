import { Button } from "@/components/ui/button"
import { none } from '@metaplex-foundation/umi'
import {
    Keypair,
    PublicKey,
    Connection,
    Transaction,
    sendAndConfirmTransaction,
    TransactionInstruction,
  } from "@solana/web3.js";
  import { createAccount, createMint, mintTo, TOKEN_PROGRAM_ID } from "@solana/spl-token";
  import {
    SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
    createAllocTreeIx,
    ValidDepthSizePair,
    SPL_NOOP_PROGRAM_ID,
    MerkleTreeProof,
    MerkleTree,
  } from "@solana/spl-account-compression";
  import {
    PROGRAM_ID as BUBBLEGUM_PROGRAM_ID,
    MetadataArgs,
    TokenProgramVersion,
    TokenStandard,
    createCreateTreeInstruction,
    createMintToCollectionV1Instruction,
  } from "@metaplex-foundation/mpl-bubblegum";
  import {
    PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID,
    CreateMetadataAccountArgsV3,
    createCreateMetadataAccountV3Instruction,
    createCreateMasterEditionV3Instruction,
    createSetCollectionSizeInstruction,
  } from "@metaplex-foundation/mpl-token-metadata";
  import { Metadata, MetaplexError, Option } from "@metaplex-foundation/js";

import { useWallet } from "@solana/wallet-adapter-react"
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults"
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters"
import { createNft, mplTokenMetadata } from "@metaplex-foundation/mpl-token-metadata"


export const MintButton = (props: any) => {
    const { certMemberList, creatorWallet, collectionAddress } = props
    const wallet = useWallet();
    const umi = createUmi("https://api.devnet.solana.com")
        .use(walletAdapterIdentity(wallet))
        .use(mplTokenMetadata())

    const handlerMint = () => {

        const mintIxs: TransactionInstruction[] = [];


        certMemberList.map(async (item: any) => {
            mintIxs.push(
                MintToCollectionV1InstructionData(
                    {
                        payer: payer.publicKey,

                        merkleTree: treeAddress,
                        treeAuthority,
                        treeDelegate: payer.publicKey,

                        // set the receiver of the NFT
                        leafOwner: receiverAddress || payer.publicKey,
                        // set a delegated authority over this NFT
                        leafDelegate: payer.publicKey,

                        /*
                            You can set any delegate address at mint, otherwise should 
                            normally be the same as `leafOwner`
                            NOTE: the delegate will be auto cleared upon NFT transfer
                            ---
                            in this case, we are setting the payer as the delegate
                          */

                        // collection details
                        collectionAuthority: payer.publicKey,
                        collectionAuthorityRecordPda: BUBBLEGUM_PROGRAM_ID,
                        collectionMint: collectionMint,
                        collectionMetadata: collectionMetadata,
                        editionAccount: collectionMasterEditionAccount,

                        // other accounts
                        compressionProgram: SPL_ACCOUNT_COMPRESSION_PROGRAM_ID,
                        logWrapper: SPL_NOOP_PROGRAM_ID,
                        bubblegumSigner: bubblegumSigner,
                        tokenMetadataProgram: TOKEN_METADATA_PROGRAM_ID,
                    },
                    {
                        metadataArgs,
                    },
                ),
            );

        })
    }
    return (<Button onClick={handlerMint}>Mint On Solana</Button>)
}

