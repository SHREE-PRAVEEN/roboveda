import React from 'react'


export default function Footer() {
return (
<footer className="w-full bg-neutral-800/30 border-t border-neutral-700">
<div className="max-w-6xl mx-auto px-4 py-6 text-sm text-neutral-400">
<div className="flex justify-between">
<div>© {new Date().getFullYear()} Roboveda — Robotics for everyone.</div>
<div className="flex gap-4">
<a>Terms</a>
<a>Privacy</a>
<a>Contact</a>
</div>
</div>
</div>
</footer>
)
}