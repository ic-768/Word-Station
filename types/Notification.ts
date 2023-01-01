export interface Notification {
  type: "error" | "success" | "default";
  message: string;
}
