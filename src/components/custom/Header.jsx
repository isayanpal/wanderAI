import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";

export default function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [openDialog, setOpenDialog] = useState(false);

  const [loading, setLoading] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
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
        // console.log(res);
        localStorage.setItem("user", JSON.stringify(res.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  // useEffect(() => {
  //   console.log(user);
  // }, []);

  return (
    <div className="p-6 shadow-sm flex justify-between items-center px-5">
      <a href="/">
        <div className="font-bold text-white text-3xl">
          Wander
          <span className="text-[#ff9100]">AI</span>
        </div>
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">
            <a href={"/create-trip"}>
              <Button variant="outline" className="rounded-full">
                Create Trip +
              </Button>
            </a>
            <a href={"/my-trips"}>
              <Button variant="outline" className="rounded-full">
                My Trips
              </Button>
            </a>

            <Popover>
              <PopoverTrigger>
                <img
                  src={user?.picture}
                  className="h-[30px] w-[30px] rounded-full"
                  alt=""
                />
              </PopoverTrigger>
              <PopoverContent className="flex items-center gap-2">
                <Button
                  variant="destructive"
                  onClick={() => {
                    googleLogout();
                    localStorage.clear();
                    window.location.reload();
                    toast("You have been logged out");
                  }}
                >
                  Logout
                </Button>
                <p className="text-sm font-light">Sign Out Of this App</p>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign in</Button>
        )}
      </div>
      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign In</DialogTitle>
            <DialogDescription>
              <h1 className="font-bold text-xl text-black">
                {" "}
                Wander
                <span className="text-[#ff9100]">AI</span>
              </h1>
              <h2 className="font-bold text-lg mt-5">Sign In With Google</h2>
              <p>Sign in to the app with Google Authentication</p>

              <Button
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-3 items-center"
              >
                Sign In With Google
                <FcGoogle className="h-7 w-7" />
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
