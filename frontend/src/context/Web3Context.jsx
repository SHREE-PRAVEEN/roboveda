import React, { createContext, useState, useEffect } from 'react'
import Web3 from 'web3'
import toast from 'react-hot-toast'

export const Web3Context = createContext(null)

export function Web3Provider({ children }) {
  const [web3, setWeb3] = useState(null)
  const [account, setAccount] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [balance, setBalance] = useState('0')
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum)
      setWeb3(web3Instance)
      
      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged)
      window.ethereum.on('chainChanged', handleChainChanged)
      
      checkConnection()
    }
    
    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged)
        window.ethereum.removeListener('chainChanged', handleChainChanged)
      }
    }
  }, [])

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' })
        if (accounts.length > 0) {
          handleAccountsChanged(accounts)
        }
      } catch (error) {
        console.error('Error checking connection:', error)
      }
    }
  }

  const handleAccountsChanged = async (accounts) => {
    if (accounts.length === 0) {
      setAccount(null)
      setIsConnected(false)
      setBalance('0')
    } else {
      setAccount(accounts[0])
      setIsConnected(true)
      await getBalance(accounts[0])
    }
  }

  const handleChainChanged = (chainId) => {
    setChainId(parseInt(chainId, 16))
    window.location.reload()
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      toast.error('Please install MetaMask!')
      window.open('https://metamask.io/download/', '_blank')
      return
    }

    try {
      const accounts = await window.ethereum.request({ 
        method: 'eth_requestAccounts' 
      })
      
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      setChainId(parseInt(chainId, 16))
      
      handleAccountsChanged(accounts)
      toast.success('Wallet connected!')
      
      return accounts[0]
    } catch (error) {
      console.error('Error connecting wallet:', error)
      toast.error('Failed to connect wallet')
      throw error
    }
  }

  const disconnectWallet = () => {
    setAccount(null)
    setIsConnected(false)
    setBalance('0')
    toast.success('Wallet disconnected')
  }

  const getBalance = async (address) => {
    if (!web3) return
    
    try {
      const balanceWei = await web3.eth.getBalance(address)
      const balanceEth = web3.utils.fromWei(balanceWei, 'ether')
      setBalance(parseFloat(balanceEth).toFixed(4))
      return balanceEth
    } catch (error) {
      console.error('Error getting balance:', error)
      return '0'
    }
  }

  const sendTransaction = async (to, amount) => {
    if (!web3 || !account) {
      toast.error('Please connect your wallet first')
      return
    }

    try {
      const amountWei = web3.utils.toWei(amount.toString(), 'ether')
      
      const txHash = await window.ethereum.request({
        method: 'eth_sendTransaction',
        params: [{
          from: account,
          to: to,
          value: amountWei,
        }],
      })
      
      toast.success('Transaction sent!')
      return txHash
    } catch (error) {
      console.error('Transaction error:', error)
      toast.error('Transaction failed')
      throw error
    }
  }

  const switchNetwork = async (targetChainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: `0x${targetChainId.toString(16)}` }],
      })
    } catch (error) {
      if (error.code === 4902) {
        toast.error('Please add this network to MetaMask')
      } else {
        toast.error('Failed to switch network')
      }
      throw error
    }
  }

  return (
    <Web3Context.Provider value={{
      web3,
      account,
      chainId,
      balance,
      isConnected,
      connectWallet,
      disconnectWallet,
      sendTransaction,
      switchNetwork,
      getBalance,
    }}>
      {children}
    </Web3Context.Provider>
  )
}
