import {Connection,PubKey,Transaction,Keypair,SystemProgram,} from '@solana/web3.js';
import * as token from '@solana/spl-token';

async function buildCreateMintTransaction(
    connection: Connection,
    payer: PubKey,
    decimals: number
) : Promise<Transaction>{
    const lamports = await token.getMinimumBalanceForRentExemptMint(connection);
    const accountKeypair = Keypair.generate();
    const programId = token.TOKEN_PROGRAM_ID;
    const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: payer,
            newAccountPubkey: accountKeypair.publicKey,
            space: token.MINT_SIZE,
            lamports,
            programId,
        }),
        token.createInitializeMintInstruction(
            accountKeypair.publicKey,
            decimals,
            payer,
            payer,
            programId
        )
    );
}
