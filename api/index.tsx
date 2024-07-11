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
  title:'In the background',
  assetsPath: '/',
  basePath: '/api',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})

app.frame('/', (c) => {
  return c.res({
    action: "/finish",
    image: "https://gateway.lighthouse.storage/ipfs/bafkreifwsrcrhfpwpmupupy47yiolpsg3ml6s2z7vwg6gg5rltniccft7q",
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
  const uri = 'https://gateway.lighthouse.storage/ipfs/bafkreiapcgyj57rruhwyqhwkf3ox3l4xs5xw3rppabpgwamqvrj5pf7tuu'; // Fixed URI

  console.log('address', address);
  console.log('tokenId', tokenId);
  console.log('uri', uri);
  

  // Contract transaction response.
  return c.contract({
    abi,
    chainId: 'eip155:42161', // arbitrum one
    functionName: 'safeMint',
    args: [address, uri],
    to: '0x81B1354Cafc84d77D2d74ac609087fE56ac7E580' // arbitrum one 0xE4D2ce5f8fd8c17A9aC3955B01dAdF50d5EECe48
  });
});

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
