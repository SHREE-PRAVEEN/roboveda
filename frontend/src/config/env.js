export const config = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  contractAddress: import.meta.env.VITE_CONTRACT_ADDRESS,
  infuraKey: import.meta.env.VITE_INFURA_KEY,
  chainId: parseInt(import.meta.env.VITE_CHAIN_ID || '1'),
  productPrice: 1.6,
}

export default config
