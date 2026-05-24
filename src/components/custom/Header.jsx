import { googleLogout } from "@react-oauth/google";
import { AnimatePresence, motion } from "motion/react";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import LoginDialog from "@/components/custom/LoginDialog";
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
import { useGoogleAuth } from "@/hooks/useGoogleAuth";

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { loading, login } = useGoogleAuth({
    onSuccess: (userData) => {
      setUser(userData);
      setOpenDialog(false);
      toast.success("Successfully signed in!");
    },
  });

  const handleLogout = () => {
    googleLogout();
    localStorage.removeItem("user");
    setUser(null);
    setIsMenuOpen(false);
    toast.success("You have been logged out");
    window.location.reload();
  };

  const NavItems = () => (
    <>
      <Link to="/create-trip">
        <Button
          variant="outline"
          className="w-full md:w-auto rounded-full bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          Create Trip +
        </Button>
      </Link>
      <Link to="/my-trips">
        <Button
          variant="outline"
          className="w-full md:w-auto rounded-full bg-transparent text-white border-white hover:bg-white hover:text-black transition-colors duration-300"
        >
          My Trips
        </Button>
      </Link>
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
        <Link to="/" className="flex items-center space-x-2">
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
        </Link>

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

      <LoginDialog
        open={openDialog}
        onOpenChange={setOpenDialog}
        onLogin={login}
        loading={loading}
      />
    </motion.header>
  );
}
