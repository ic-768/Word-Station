import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactElement,
  useContext,
  useState,
} from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { supabase } from "../lib/supabaseClient";
import { NotificationContext, LoaderContext } from "../context";
import { LoginLayout } from "../layouts";
import {
  AlternateActionText,
  PageTitle,
  SubmitButton,
  CredentialPanel,
  CredentialPanelProps,
} from "../features/auth";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const router = useRouter();

  const [_notification, setNotification] = useContext(NotificationContext);
  const [_loader, setLoader] = useContext(LoaderContext);

  const updateEmail: ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e.target?.value);

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target?.value);

  const updatePasswordValidation: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPasswordValidation(e.target?.value);

  const signUp = async () => {
    setLoader({ showLoader: true, position: "inset-x-0 mx-auto top-16" });
    // TODO extract to utility file
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("error");
      setNotification({ type: "error", message: error.message });
    } else {
      setNotification({
        type: "success",
        message: "You have successfully signed up!",
      });
      router.push("/login");
    }
    setLoader(false);
  };

  const onRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    // TODO extract to utility file / hook
    if (password !== passwordValidation) {
      setNotification({ type: "error", message: "Passwords don't match!" });
    } else if (password.length < 6) {
      setNotification({
        type: "error",
        message: "Password must be atleast 6 characters",
      });
    } else {
      await signUp();
    }
  };

  const emailPanel: CredentialPanelProps = {
    label: "Email",
    id: "email",
    text: email,
    onChange: updateEmail,
    icon: faUser,
  };

  const passwordPanel: CredentialPanelProps = {
    label: "Password",
    id: "password",
    text: password,
    onChange: updatePassword,
    icon: faLock,
    type: "password",
  };

  const repeatPasswordPanel: CredentialPanelProps = {
    label: "Repeat password",
    id: "password-validation",
    text: passwordValidation,
    onChange: updatePasswordValidation,
    icon: faLock,
    type: "password",
  };

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={onRegister}>
      <PageTitle title="Create a new account" />
      <CredentialPanel {...emailPanel} />
      <CredentialPanel {...passwordPanel} />
      <CredentialPanel {...repeatPasswordPanel} />
      <AlternateActionText
        text="Already have an account? Log in"
        link="/login"
      />
      <SubmitButton text="Register" />
    </form>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
