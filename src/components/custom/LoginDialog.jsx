import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";

export default function LoginDialog({ open, onOpenChange, onLogin, loading }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#0a0a0a] border border-white/10 text-white sm:rounded-3xl shadow-2xl p-0 overflow-hidden max-w-sm">
        <DialogHeader className="p-0">
          <div className="relative h-48 w-full bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
            <div className="z-10 text-center">
              <span className="text-6xl mb-2 block">✈️</span>
              <h2 className="text-2xl font-bold text-white drop-shadow-md">
                Wander AI
              </h2>
            </div>
            <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
          </div>

          <DialogDescription className="p-8 space-y-6 bg-[#0a0a0a]">
            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white">Welcome Back!</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Sign in to save your trips and access your personalized
                itineraries across devices.
              </p>
            </div>

            <Button
              disabled={loading}
              onClick={onLogin}
              className="w-full py-6 flex items-center justify-center gap-3 bg-white hover:bg-gray-200 text-black font-bold rounded-xl text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              <FcGoogle className="h-6 w-6" />
              Continue with Google
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
