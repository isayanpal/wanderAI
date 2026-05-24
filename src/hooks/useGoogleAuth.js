import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";

export function useGoogleAuth({ onSuccess } = {}) {
  const [loading, setLoading] = useState(false);

  const fetchUserProfile = (tokenInfo) => {
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
        setLoading(false);
        onSuccess?.(res.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
        setLoading(false);
        toast.error("Failed to sign in. Please try again.");
      });
  };

  const login = useGoogleLogin({
    onSuccess: (codeResp) => fetchUserProfile(codeResp),
    onError: (error) => console.error(error),
  });

  return { loading, login };
}
