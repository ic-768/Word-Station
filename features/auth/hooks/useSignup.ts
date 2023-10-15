import { FormEventHandler } from "react";
import { useRouter } from "next/router";

import { useLoader, useNotification } from "context";
import { signup } from "../api";
import { validatePassword } from "../utils";

export const useSignup = () => {
  const { setNotification } = useNotification();
  const { setLoader } = useLoader();
  const router = useRouter();

  const onSignup: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const passwordValidation = formData.get("password-validation") as string;

    const passwordError = validatePassword(password, passwordValidation);

    if (passwordError) {
      setNotification(passwordError);
    } else {
      setLoader({ showLoader: true, position: "inset-x-0 mx-auto top-16" });

      const { data, error } = await signup(email, password);
      setNotification(
        error
          ? { type: "error", message: error.message }
          : { type: "success", message: "You have successfully signed up!" }
      );

      setLoader(false);
      router.push("/words");
    }
  };

  return onSignup;
};
