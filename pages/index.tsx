import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactElement,
  useContext,
  useEffect,
  useState,
} from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import CredentialPanel from "../components/login/CredentialPanel";
import SubmitButton from "../components/login/SubmitButton";
import AlternateActionText from "../components/login/AlternateActionText";
import LoginLayout from "../components/layouts/LoginLayout";
import PageTitle from "../components/login/PageTitle";
import { NotificationContext } from "../context/notification";
import { supabase } from "../lib/supabaseClient";
import { UserSessionContext } from "../context/user-session";

export default function Home() {
  const [email, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const [_notification, setNotification] = useContext(NotificationContext);
  const [session] = useContext(UserSessionContext);

  const updateEmail: ChangeEventHandler<HTMLInputElement> = (e) =>
    setUsername(e.target?.value);

  const updatePassword: ChangeEventHandler<HTMLInputElement> = (e) =>
    setPassword(e.target?.value);

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw Error("Bad login");

    //TODO what to do with user data
    console.log(data);
  };

  const onLogin: FormEventHandler<HTMLFormElement> = async (e) => {
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

Home.getLayout = function getLayout(page: ReactElement) {
  return <LoginLayout>{page}</LoginLayout>;
};
