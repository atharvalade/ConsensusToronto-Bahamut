"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
// import { useWallet } from "@/context/WalletContext"
import { useRouter } from "next/navigation"
import { defineChain } from 'viem'

import { createAppKit } from "@reown/appkit/react";
import { EthersAdapter } from "@reown/appkit-adapter-ethers";
// import { rootstockTestnet } from "@reown/appkit/networks";


export const horizon = defineChain({
  id: 2552,
  name: 'Horizon',
  nativeCurrency: {
    decimals: 18,
    name: 'FTN',
    symbol: 'FTN',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc1-horizon.bahamut.io'],
      webSocket: ['wss://ws1.bahamut.io,wss://ws2.bahamut.io'],
    },
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://horizon.ftnscan.com' },
  },
})

// 1. Get projectId at https://cloud.reown.com
const projectId = "d679b0acafc801412fd613c2ebe6a961";

// 2. Create a metadata object
const metadata = {
  name: "My Website",
  description: "My Website description",
  url: "https://mywebsite.com", // origin must match your domain & subdomain
  icons: ["https://avatars.mywebsite.com/"],
};

// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [horizon],
  projectId,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
});

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const handleCreateInvoice = () => {
    if (!address) {
      alert("Please connect your wallet first")
      return
    }
    router.push("/dashboard")
  }

  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center">
          <Image
    src="/final.webp" // ✅ Replace with your actual image path
    alt="StakePay Logo"
    width={64}       // ✅ Adjust as needed
    height={64}
    className="mr-2"
  />
          </Link>

          <appkit-button />

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-500 hover:text-gray-700 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-3">
            {address ? (
              <>
                <button
                  className="block w-full px-4 py-2 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                  onClick={disconnectWallet}
                >
                  {address.slice(0, 6)}...{address.slice(-4)}
                </button>
                <button
                  className="block w-full px-4 py-2 text-sm bg-[#2E6D9A] text-white rounded-md hover:bg-[#245a81] transition-colors"
                  onClick={handleCreateInvoice}
                >
                  Create Invoice
                </button>
              </>
            ) : (
              <button
                className="block w-full px-4 py-2 text-sm bg-[#2E6D9A] text-white rounded-md hover:bg-[#245a81] transition-colors"
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
