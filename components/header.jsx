import Image from 'next/image'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/nextjs'
import Link  from 'next/link' // ⚠️ Lucide's Link is an icon, not a router
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import UserMenu from './user-menu'
import { checkUser } from '@/lib/checkUser'
import UserLoading from './user-loading'

const Header = async () => {
await checkUser();
  return (
      <header className="container mx-auto">
      <nav className="py-6 px-4 flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl font-bold">
            <Image
              src="/companies/logo.png"
              alt="Zscrum Logo"
              width={600}
              height={156}
              className="h-28 w-auto object-contain"
            />
          </h1>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/project/create">
            <Button variant="destructive" className="flex items-center gap-2">
              <PenBox size={18} />
              <span className="hidden md:inline">Create Project</span>
            </Button>
          </Link>
          <SignedOut>
            <SignInButton forceRedirectUrl="/onboarding">
              <Button variant="outline">Login</Button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserMenu />
          </SignedIn>
        </div>
      </nav>

      <UserLoading />
    </header>
  )
}

export default Header