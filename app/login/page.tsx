"use client"

import { useActionState } from "react";
import { Lock, KeyRound, Mail, ArrowRight, Loader2 } from "lucide-react";
import { loginAction } from "./actions";
import PageHeader from "@/components/ui/page_header";

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(loginAction, null);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 pt-32 pb-20">
      <title>Login - MyKayak</title>

      <div className="w-full max-w-md p-8 rounded-3xl bg-white/5 border border-white/10 shadow-2xl backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/20 text-blue-400 mb-4">
            <KeyRound className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">Area Admin</h2>
          <p className="text-white/40 text-sm mt-2 font-medium">
            Effettua l'accesso per gestire i contenuti
          </p>
        </div>

        <form action={formAction} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">
              Username
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                name="email"
                required
                placeholder="admin"
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="password"
                name="password"
                required
                placeholder="••••••••"
                className="w-full bg-black/20 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-blue-500/50 focus:bg-white/5 transition-all"
              />
            </div>
          </div>

          {state?.error && (
            <div className="p-3 mt-2 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium text-center">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Accedi
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
