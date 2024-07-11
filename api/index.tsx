import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'
import { abi } from '../abi.js';
import type { Address } from 'viem';

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  title:'Kiara',
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.frame('/', (c) => {
  return c.res({
    action: "/finish",
    image: "https://gateway.lighthouse.storage/ipfs/bafybeiafmvxkfr3yq3mgxi4icbtennr3rqnjadu3dwlyy6k44zkkdsf2ry",
    intents: [
      
      <Button.Transaction target="/mint">Mint</Button.Transaction>,
    ],
  });
});

app.frame('/finish', (c) => {
  return c.res({
    image: "https://gateway.lighthouse.storage/ipfs/bafybeievffeqfyxz2aysj25jvl5y5tfcfexio3ewbbeqmzxafyyl62saoq",
    intents: [
      <Button.Link href="https://warpcast.com/kathediaz">Go to my profile</Button.Link>
    ],
  });
});

app.transaction('/mint', (c) => {
  const address = c.address as Address;
  console.log('address', address);
  const tokenId = 0;
  const uri = 'https://gateway.lighthouse.storage/ipfs/bafybeiafmvxkfr3yq3mgxi4icbtennr3rqnjadu3dwlyy6k44zkkdsf2ry'; // Fixed URI

  console.log('address', address);
  console.log('tokenId', tokenId);
  console.log('uri', uri);
  

  // Contract transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:42161', // arbitrum one
    functionName: 'safeMint',
    args: [address, uri],
    to: '0xdcc10F9aaA19E61CD0E0B8b19CeEd9E9B9dC0446' // arbitrum one
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
