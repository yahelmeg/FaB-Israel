"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { FaGoogle } from "react-icons/fa"
import {createClient} from "@/lib/supabase/client";

interface AuthFormProps extends React.ComponentProps<"div"> {
  errorMessage?: string
}

export function AuthForm({className, errorMessage, ...props}: AuthFormProps) {
  const signInWithGoogle = () => {
    const supabase = createClient()
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/auth/callback` },
    })
  }

  return (
      <div className={cn("flex flex-col gap-6", className)} {...props}>
        <Card className="rounded-2xl border bg-card text-card-foreground shadow-md p-6 flex flex-col gap-5 w-full max-w-lg">
          <div className="space-y-3">
            <h3 className="font-bold text-2xl text-foreground">
              Welcome to Fab Israel
            </h3>
            <p className="text-base font-medium text-muted-foreground">
              Continue with Google to sign in or create an account
            </p>
          </div>

          {errorMessage && (
              <p className="text-sm text-destructive">{errorMessage}</p>
          )}

          <div className="rounded-xl">
            <Button
                variant="outline"
                type="button"
                className="w-full justify-center gap-2.5 bg-background font-medium"
                onClick={signInWithGoogle}
            >
              <FaGoogle size="16" />
              Continue with Google
            </Button>
          </div>
        </Card>
      </div>
  )
}