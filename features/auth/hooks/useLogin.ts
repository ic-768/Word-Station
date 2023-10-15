import { FormEventHandler } from "react";
import { useRouter } from "next/router";

import { getFormFields } from "utils";
import { useLoader, useNotification } from "context";
import { login } from "../api";

export const useLogin = () => {
  const router = useRouter();
  const { setLoader } = useLoader();
  const { setNotification } = useNotification();

  const onLogin: FormEventHandler = async (e) => {
    e.preventDefault();

    const [email, password] = getFormFields(e, "email", "password");

    setLoader({ showLoader: true, position: "inset-x-0 mx-auto top-16" });

    if (email && password) {
      try {
        await login(email, password); // Call your login API function here
        setNotification({
          type: "success",
          message: "Welcome!",
        });
        router.push("/words");
      } catch {
        setNotification({
          type: "error",
          message: "Please make sure your credentials are correct!",
        });
      }
    } else {
      setNotification({
        type: "error",
        message: "Username or password is missing!",
      });
    }

    setLoader(false);
  };

  return onLogin;
};
