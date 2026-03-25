"use client"

import { Button } from "@/components/ui/button"
import { UserCircleIcon } from "lucide-react"
import { UserButton, SignInButton, SignedIn, SignedOut} from "@clerk/nextjs"

export const AuthButton = () => {
    // add different auth states

    return (
        <>
            <SignedIn>  
                {/* Wraps content that should only show to users who are signed in */}
                <UserButton />
                {/* Add menu items and profile */}
            </SignedIn>
            <SignedOut> {/* Wraps content that should only show to users who are not signed in */}
                <SignInButton mode="modal">
                    <Button variant="outline" className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-500 border-blue-500/2 rounded-full shadow-none">
                        <UserCircleIcon />
                        Sign in
                    </Button>
                </SignInButton>
            </SignedOut>
        </>
    )
}