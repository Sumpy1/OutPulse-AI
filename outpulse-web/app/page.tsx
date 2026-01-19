import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black flex flex-col">
      <header className="p-6 flex justify-between items-center border-b border-gray-200">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-black">
          OutPulse Ai
        </div>
        <nav className="flex gap-4">
          <SignedOut>
            <SignInButton mode="modal">
              <Button variant="ghost" className="text-gray-600 hover:text-blue-600">Sign In</Button>
            </SignInButton>
            <SignUpButton mode="modal">
              <Button className="bg-black text-white hover:bg-gray-800">Get Started</Button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <Link href="/dashboard">
              <Button variant="outline" className="mr-4 text-black border-gray-300 hover:bg-gray-100">Dashboard</Button>
            </Link>
            <UserButton />
          </SignedIn>
        </nav>
      </header>
      
      <main className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-gray-100 to-gray-200">
        <h1 className="text-6xl font-extrabold tracking-tight mb-6">
          <span className="block text-black">Automate Your</span>
          <span className="bg-clip-text text-transparent bg-black">
            B2B Outreach
          </span>
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          OutPulse learns your business, identifies your ideal customers, and manages personalized outreach at scale. 
          Stop prospecting, start closing.
        </p>
        
        <div className="flex gap-4">
           <SignedOut>
             <SignUpButton mode="modal">
                <Button size="lg" className="text-lg px-8 py-6 bg-black text-white hover:bg-gray-800">
                  Start Automating Free
                </Button>
             </SignUpButton>
           </SignedOut>
           <SignedIn>
             <Link href="/dashboard">
                <Button size="lg" className="text-lg px-8 py-6 bg-black text-white hover:bg-gray-800">
                  Go to Dashboard
                </Button>
             </Link>
           </SignedIn>
        </div>
      </main>
      
      <footer className="p-8 text-center text-gray-500 border-t border-gray-200">
        &copy; {new Date().getFullYear()} OutPulse Ai. All rights reserved.
      </footer>
    </div>
  );
}
