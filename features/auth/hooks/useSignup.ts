import { FormEventHandler } from "react";
import { useRouter } from "next/router";

import { getFormFields } from "utils";
import { useLoader, useNotification } from "context";
import { validatePassword } from "../utils";
import { signup } from "../api";

export const useSignup = () => {
  const { setNotification } = useNotification();
  const { setLoader } = useLoader();
  const router = useRouter();

  const onSignup: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const [email, password, passwordValidation] = getFormFields(
      e,
      "email",
      "password",
      "passwordValidation"
    );

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
