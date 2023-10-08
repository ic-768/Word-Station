import { NotificationProps } from "features/notifications";

/**
 * Function to validate password on registration. Takes password and repeated password
 */
export const validatePassword = (
  password: string,
  passwordValidation: string
): NotificationProps | undefined => {
  if (password !== passwordValidation) {
    return { type: "error", message: "Passwords don't match!" };
  } else if (password.length < 6) {
    return {
      type: "error",
      message: "Password must be atleast 6 characters",
    };
  }
};
