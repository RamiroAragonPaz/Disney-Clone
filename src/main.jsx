import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import '@rainbow-me/rainbowkit/styles.css';
import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
const { chains, publicClient } = configureChains(
  [sepolia],
  [
    alchemyProvider({ apiKey: import.meta.env.VITE_ALCHEMY_ID })
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'Disney',
  projectId: '9246fa3011efcea1d7a44649ef6a2228',
  chains
});
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient
})



ReactDOM.createRoot(document.getElementById('root')).render(
  <WagmiConfig config={wagmiConfig}>
    <RainbowKitProvider chains={chains}>
        <App />
    </RainbowKitProvider>
  </WagmiConfig>
)
