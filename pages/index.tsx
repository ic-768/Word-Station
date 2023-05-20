import { useRouter } from "next/router";
import {
  ChangeEventHandler,
  FormEventHandler,
  ReactElement,
  useContext,
  useState,
} from "react";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";

import CredentialPanel from "../components/login/CredentialPanel";
import SubmitButton from "../components/login/SubmitButton";
import AlternateActionText from "../components/login/AlternateActionText";
import LoginLayout from "../components/layouts/LoginLayout";
import PageTitle from "../components/login/PageTitle";
export default function Home() {
  return <div>Explanatory homepage goes here</div>;
}
