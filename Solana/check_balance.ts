import { Connection,LAMPORTS_PER_SOL,PublicKey,clusterApiUrl } from "@solana/web3.js";
import "dotenv/config";
import { getKeypairFromEnvironment } from "@solana-developers/helpers";
const keypair = getKeypairFromEnvironment("SECRET_KEY");
const pk = keypair.publicKey.toBase58();
// const publickey = new PublicKey(`${pk}`);
const mainnetUrl = clusterApiUrl('mainnet-beta');
// Create a connection to the mainnet
const connection = new Connection(mainnetUrl, 'confirmed');
const publickey = new PublicKey("DtvCuBKG2hrLL7mVUGmaRRv4pFfMAQP7jdyTih9TX5aR");
//const connection = new Connection("https://api.mainnet.solana.com", "confirmed");
const balanceInLamports = await connection.getBalance(publickey);
const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;
console.log(
    `Finished! the balance for the wallet at adress ${publickey} is ${balanceInSOL}`
);
