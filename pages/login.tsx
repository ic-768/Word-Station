import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactElement,
  useContext,
  useState,
} from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import { LoaderContext, NotificationContext } from "context";
import { LoginLayout } from "layouts";
import {
  AlternateActionText,
  CredentialPanel,
  PageTitle,
  SubmitButton,
  login,
} from "features/auth";

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

  const onLogin: FormEventHandler<HTMLFormElement> = async (e) => {
    setLoader({ showLoader: true, position: "inset-x-0 mx-auto top-16" });
    e.preventDefault();

    if (email && password) {
      try {
        await login(email, password);
      } catch {
        setNotification({
          type: "error",
          message: "Please Make sure your credentials are correct!",
        });
        setLoader(false);
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
        onChange={updateEmail}
        icon={faUser}
      />
      <CredentialPanel
        label="Password"
        id="password"
        text={password}
        onChange={updatePassword}
        icon={faLock}
        type="password"
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
