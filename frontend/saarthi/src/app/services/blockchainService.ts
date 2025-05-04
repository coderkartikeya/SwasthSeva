import { ethers } from 'ethers';
import { formatForBlockchain } from '../utils/nameExtractor';

// Add TypeScript interface for window.ethereum
declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (event: string, callback: (accounts: string[]) => void) => void;
      removeListener: (event: string, callback: (accounts: string[]) => void) => void;
      isMetaMask?: boolean;
    };
  }
}

// ABI for the smart contract
const CONTRACT_ABI = [
  "function storeHospitalData(string memory hospitalId, string memory hospitalName, string memory contactName, string memory timestamp) public",
  "function getHospitalData(string memory hospitalId) public view returns (string memory, string memory, string memory, string memory)"
];

// Contract address - replace with your deployed contract address
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";

export class BlockchainService {
  private provider: ethers.BrowserProvider | null = null;
  private contract: ethers.Contract | null = null;

  constructor() {
    // Initialize provider only if window.ethereum exists
    if (typeof window !== 'undefined' && window.ethereum) {
      this.provider = new ethers.BrowserProvider(window.ethereum);
    }
  }

  async connectWallet() {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to use this feature');
      }

      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      // Initialize provider and contract if not already done
      if (!this.provider) {
        this.provider = new ethers.BrowserProvider(window.ethereum);
      }
      
      const signer = await this.provider.getSigner();
      this.contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);
      
      return true;
    } catch (error: any) {
      console.error('Error connecting wallet:', error);
      throw new Error(error.message || 'Failed to connect wallet');
    }
  }

  async storeHospitalData(hospitalData: any) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Please connect wallet first.');
      }

      // Format data for blockchain
      const formattedData = formatForBlockchain(hospitalData);

      // Store data in blockchain
      const tx = await this.contract.storeHospitalData(
        formattedData.hospitalId,
        formattedData.hospitalName,
        formattedData.contactPerson.fullName,
        formattedData.timestamp
      );

      // Wait for transaction to be mined
      await tx.wait();

      return {
        success: true,
        transactionHash: tx.hash
      };
    } catch (error: any) {
      console.error('Error storing data in blockchain:', error);
      return {
        success: false,
        error: error.message || 'Failed to store data in blockchain'
      };
    }
  }

  async getHospitalData(hospitalId: string) {
    try {
      if (!this.contract) {
        throw new Error('Contract not initialized. Please connect wallet first.');
      }

      const data = await this.contract.getHospitalData(hospitalId);
      return {
        success: true,
        data: {
          hospitalId: data[0],
          hospitalName: data[1],
          contactName: data[2],
          timestamp: data[3]
        }
      };
    } catch (error: any) {
      console.error('Error retrieving data from blockchain:', error);
      return {
        success: false,
        error: error.message || 'Failed to retrieve data from blockchain'
      };
    }
  }
}

// Create a singleton instance
export const blockchainService = new BlockchainService(); 