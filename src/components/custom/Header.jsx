import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { Menu } from "lucide-react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const fadeInUp = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.3 },
};

export default function Header() {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch (error) {
      console.error("Error parsing user data from localStorage:", error);
      return null;
    }
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    setLoading(true);
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((res) => {
        localStorage.setItem("user", JSON.stringify(res.data));
        setUser(res.data);
        setOpenDialog(false);
        setLoading(false);
        toast.success("Successfully signed in!");
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
        toast.error("Failed to sign in. Please try again.");
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    toast.success("You have been logged out");
    window.location.reload();
  };

  // useEffect(() => {
  //   console.log("user logged in");
  // }, [user]);

  const NavItems = () => (
    <>
      <a href="/create-trip">
        <Button
          variant="outline"
          className="w-full md:w-auto rounded-full bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          Create Trip +
        </Button>
      </a>
      <a href="/my-trips">
        <Button
          variant="outline"
          className="w-full md:w-auto rounded-full bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          My Trips
        </Button>
      </a>
    </>
  );

  return (
    <motion.header
      className="text-white p-4 md:p-6 bg-transparent sticky top-0 z-50 backdrop-blur-md"
      initial="initial"
      animate="animate"
      variants={fadeInUp}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <a href="/" className="flex items-center space-x-2">
          <motion.div
            className="font-bold text-2xl md:text-3xl lg:text-4xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Wander
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              AI
            </span>
          </motion.div>
        </a>

        <AnimatePresence mode="wait">
          {user ? (
            <motion.div
              key="user-menu"
              className="hidden md:flex items-center space-x-4"
              variants={fadeInUp}
            >
              <NavItems />
              <Popover>
                <PopoverTrigger>
                  <motion.img
                    src={user.picture}
                    alt="User"
                    className="h-10 w-10 rounded-full border-2 border-white cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  />
                </PopoverTrigger>
                <PopoverContent className="bg-gray-800 border-gray-700">
                  <div className="flex flex-col items-center gap-4 p-4">
                    <img
                      src={user.picture}
                      alt="User"
                      className="h-16 w-16 rounded-full"
                    />
                    <p className="text-white font-semibold">{user.name}</p>
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </motion.div>
          ) : (
            <motion.div
              key="sign-in"
              variants={fadeInUp}
              className="hidden md:block"
            >
              <Button
                onClick={() => setOpenDialog(true)}
                className="bg-gradient-to-r from-purple-400 to-pink-600 text-white rounded-full px-6 py-2 font-semibold hover:from-orange-500 hover:to-pink-700 transition-all duration-300"
              >
                Sign in
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="bg-transparent border-white"
              >
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-transparent text-white backdrop-blur-md">
              <SheetHeader>
                <SheetTitle className="text-white">Menu</SheetTitle>
              </SheetHeader>
              <div className="mt-6 flex flex-col space-y-4">
                {user ? (
                  <>
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={user.picture}
                        alt="User"
                        className="h-10 w-10 rounded-full"
                      />
                      <p className="font-semibold">{user.name}</p>
                    </div>
                    <NavItems />
                    <Button
                      variant="destructive"
                      onClick={handleLogout}
                      className="w-full"
                    >
                      Logout
                    </Button>
                  </>
                ) : (
                  <Button
                    onClick={() => {
                      setIsMenuOpen(false);
                      setOpenDialog(true);
                    }}
                    className="bg-gradient-to-r from-purple-400 to-pink-600 text-white rounded-full px-6 py-2 font-semibold hover:from-orange-500 hover:to-pink-700 transition-all duration-300"
                  >
                    Sign in
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
              {/* Decorative Circles */}
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
                onClick={login}
                className="w-full py-6 flex items-center justify-center gap-3 bg-white hover:bg-gray-200 text-black font-bold rounded-xl text-lg transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
              >
                <FcGoogle className="h-6 w-6" />
                Continue with Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </motion.header>
  );
}
