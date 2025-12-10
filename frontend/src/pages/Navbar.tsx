import { Link } from 'react-router-dom'
import WalletConnect from '../../pages/Blockchain/WalletConnect'


export default function Navbar() {
return (
<nav className="w-full bg-neutral-800/40 backdrop-blur-md border-b border-neutral-700">
<div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
<div className="flex items-center gap-3">
<img src="/assets/logos/roboveda-logo.svg" alt="Roboveda" className="h-8" />
<Link to="/" className="text-xl font-semibold">Roboveda</Link>
</div>
<div className="flex items-center gap-4">
<Link to="/products" className="hover:underline">Products</Link>
<Link to="/dev" className="hover:underline">Dev</Link>
<Link to="/blockchain" className="hover:underline">Web3</Link>
<WalletConnect />
</div>
</div>
</nav>
)
}