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
import CredentialPanel from "../components/login/CredentialPanel";
import SubmitButton from "../components/login/SubmitButton";
import AlternateActionText from "../components/login/AlternateActionText";
import LoginLayout from "../components/layouts/LoginLayout";
import PageTitle from "../components/login/PageTitle";
import { NotificationContext } from "../context/notification";
import { LoaderContext } from "../context/loader";

export default function Login() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [_notification, setNotification] = useContext(NotificationContext);
  const [_loader, setLoader] = useContext(LoaderContext);

  const updateEmail: ChangeEventHandler<HTMLInputElement> = (e) =>
    setUsername(e.target?.value);

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target?.value);

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw Error(error.message);
  };

  const onLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoader(true);
    e.preventDefault();

    if (email && password) {
      try {
        await login();
      } catch {
        setNotification({
          type: "error",
          message: "Please Make sure your credentials are correct!",
        });
        return;
      }
      setNotification({
        type: "success",
        message: "Welcome!",
      });
      router.push("/words");
    } else {
      setNotification({
        type: "error",
        message: "Username or password is missing!",
      });
    }
    setLoader(false);
  };

  return (
    <form className="flex flex-col items-center gap-5" onSubmit={onLogin}>
      <PageTitle title="Log in to Word-Station" />
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
      <AlternateActionText
        text="Don't have an account? Register"
        link="/register"
      />
      <SubmitButton text="Log in" />
    </form>
  );
}

Login.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
