import { ethers } from 'ethers'
import CONTRACT_ABI from '../config/contractABI.json'

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS

export class BlockchainService {
  constructor(provider) {
    this.provider = provider
    this.contract = null
  }

  async initContract() {
    if (!this.provider) {
      throw new Error('No provider available')
    }

    const signer = this.provider.getSigner()
    this.contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    )
  }

  async purchaseLicense(priceInEth) {
    if (!this.contract) await this.initContract()

    try {
      const tx = await this.contract.purchaseLicense({
        value: ethers.utils.parseEther(priceInEth.toString())
      })
      
      await tx.wait()
      return tx.hash
    } catch (error) {
      console.error('Purchase failed:', error)
      throw error
    }
  }

  async getLicenseInfo(userAddress) {
    if (!this.contract) await this.initContract()

    try {
      const license = await this.contract.getLicense(userAddress)
      return {
        isActive: license.isActive,
        expiryDate: new Date(license.expiryTimestamp * 1000),
        licenseType: license.licenseType,
      }
    } catch (error) {
      console.error('Failed to get license info:', error)
      throw error
    }
  }

  async mintRobotNFT(robotMetadata) {
    if (!this.contract) await this.initContract()

    try {
      const tx = await this.contract.mintRobotNFT(robotMetadata)
      await tx.wait()
      return tx.hash
    } catch (error) {
      console.error('NFT minting failed:', error)
      throw error
    }
  }
}

export default BlockchainService
