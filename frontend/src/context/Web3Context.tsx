

import React, { createContext, useState, ReactNode } from 'react';
import { Token, TransactionHistory } from '../types';

export interface Web3State {
  connected: boolean;
  walletAddress: string | null;
  chainId: number | null;
  balance: string;
  tokens: Token[];
  transactions: TransactionHistory[];
  isLoading: boolean;
  error: string | null;
}

export interface Web3ContextType extends Web3State {
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  sendToken: (token: string, amount: string, recipient: string) => Promise<void>;
  swapTokens: (fromToken: string, toToken: string, amount: string) => Promise<void>;
  addTransaction: (transaction: TransactionHistory) => void;
}

export const Web3Context = createContext<Web3ContextType | undefined>(undefined);

export const Web3Provider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<Web3State>({
    connected: false,
    walletAddress: null,
    chainId: null,
    balance: '0',
    tokens: [
      {
        id: 'rvo',
        name: 'ROBOVEDA Token',
        symbol: 'RVO',
        balance: '1,250.50',
        icon: '⛓️',
        description: 'Native platform token',
        contract: '0x1234567890abcdef',
      },
      {
        id: 'eth',
        name: 'Ethereum',
        symbol: 'ETH',
        balance: '0.5432',
        icon: '💠',
        description: 'Ethereum native token',
        contract: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
      },
    ],
    transactions: [],
    isLoading: false,
    error: null,
  });

  const connectWallet = async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    try {
      // Mock implementation - replace with ethers.js
      const mockAddress = '0x' + Math.random().toString(16).substr(2, 40);
      const mockBalance = (Math.random() * 10).toFixed(4);

      setState(prev => ({
        ...prev,
        connected: true,
        walletAddress: mockAddress,
        chainId: 1,
        balance: mockBalance,
        isLoading: false,
      }));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to connect wallet';
      setState(prev => ({
        ...prev,
        error: errorMessage,
        isLoading: false,
      }));
      throw error;
    }
  };

  const disconnectWallet = () => {
    setState(prev => ({
      ...prev,
      connected: false,
      walletAddress: null,
      chainId: null,
      balance: '0',
    }));
  };

  const sendToken = async (token: string, amount: string, recipient: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const transaction: TransactionHistory = {
        id: Date.now().toString(),
        type: 'sent',
        token,
        amount,
        to: recipient,
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        timestamp: new Date().toISOString(),
        status: 'confirmed',
      };

      setState(prev => ({
        ...prev,
        transactions: [transaction, ...prev.transactions],
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to send token',
        isLoading: false,
      }));
      throw error;
    }
  };

  const swapTokens = async (fromToken: string, toToken: string, amount: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      const transaction: TransactionHistory = {
        id: Date.now().toString(),
        type: 'swap',
        token: `${fromToken} → ${toToken}`,
        amount,
        hash: '0x' + Math.random().toString(16).substr(2, 64),
        timestamp: new Date().toISOString(),
        status: 'confirmed',
      };

      setState(prev => ({
        ...prev,
        transactions: [transaction, ...prev.transactions],
        isLoading: false,
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Failed to swap tokens',
        isLoading: false,
      }));
      throw error;
    }
  };

  const addTransaction = (transaction: TransactionHistory) => {
    setState(prev => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
    }));
  };

  return (
    <Web3Context.Provider
      value={{
        ...state,
        connectWallet,
        disconnectWallet,
        sendToken,
        swapTokens,
        addTransaction,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};