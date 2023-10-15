import { FormEvent } from "react";

export const getFormFields = (e: FormEvent, ...fields: string[]) => {
  const formData = new FormData(e.target as HTMLFormElement);
  return fields.map((f) => formData.get(f)) as string[];
};
