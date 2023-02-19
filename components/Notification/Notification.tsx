export interface NotificationProps {
  type: "error" | "success" | "default";
  message: string;
}

// TODO css based on type
const Notification = ({ type, message }: NotificationProps) => (
  <div
    className="
      z-10
      text-gray-700
      drop-shadow-md
      animation-fill-forwards
      animate-slide-notification-in
      bg-white absolute flex items-center inset-0 p-8
      mx-auto min-h-[30px] max-h-[20vh] min-w-[50px] max-w-[40vw]"
  >
    {message}
  </div>
);

export default Notification;
