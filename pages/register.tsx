import Router, { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { supabase } from "../lib/supabaseClient";

import CredentialPanel from "../components/login/CredentialPanel";
import SubmitButton from "../components/login/SubmitButton";
import AlternateActionText from "../components/login/AlternateActionText";
import LoginLayout from "../components/layouts/LoginLayout";
import PageTitle from "../components/login/PageTitle";
import { NotificationContext } from "../context/notification";
import useAuthorizedRedirect from "../hooks/useAuthorizedRedirect";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");

  const router = useRouter();
  const [_notification, setNotification] = useContext(NotificationContext);

  useAuthorizedRedirect();

  const updateEmail: ChangeEventHandler<HTMLInputElement> = (e) =>
    setEmail(e.target?.value);

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target?.value);

  const updatePasswordValidation: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPasswordValidation(e.target?.value);

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("error");
      setNotification({ type: "error", message: "Couldn't sign you up!" });
    }
  };

  const onRegister: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    if (password !== passwordValidation) {
      setNotification({ type: "error", message: "Passwords don't match!" });
    } else if (password.length < 6) {
      setNotification({
        type: "error",
        message: "Password must be atleast 6 characters",
      });
    } else {
      // TODO password might be too short
      await signUp();
      setNotification({
        type: "success",
        message: "You have successfully signed up!",
      });
      router.push("/");
    }
  };

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={onRegister}>
      <PageTitle title="Create a new account" />
      <CredentialPanel
        label="Email"
        id="email"
        text={email}
        setText={updateEmail}
        icon={faUser}
      />
      <CredentialPanel
        label="Password"
        id="password"
        text={password}
        setText={updatePassword}
        icon={faLock}
      />
      <CredentialPanel
        label="Repeat password"
        id="password-validation"
        text={passwordValidation}
        setText={updatePasswordValidation}
        icon={faLock}
      />
      <AlternateActionText text="Already have an account? Log in" link="/" />
      <SubmitButton text="Register" />
    </form>
  );
}

Register.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
