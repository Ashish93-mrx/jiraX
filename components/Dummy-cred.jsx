'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Copy } from "lucide-react"

export default function DemoCredentialModal() {
  const [copied, setCopied] = useState(false);
  const credential = "admin@scrumx24.com";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(credential);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="lg" variant="outline" className="ml-2 cursor-pointer">Try Demo</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Use Demo Credentials</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-gray-500 mb-4">
          To explore the platform without signing up, use the following as both the email and password on the login page:
        </p>
        <div className="flex items-center space-x-2">
          <Input readOnly value={credential} className="text-sm font-mono" />
          <Button variant="outline" size="icon" onClick={handleCopy}>
            <Copy className="h-4 w-4" />
          </Button>
        </div>
        {copied && <p className="text-green-500 text-sm mt-2">Copied to clipboard!</p>}
        {/* <DialogFooter className="mt-4">
          <Button variant="default" onClick={() => window.location.href = '/sign-in'}>
            Go to Login
          </Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  )
}