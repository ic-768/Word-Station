interface SubmitButtonProps {
  text: string;
}
const SubmitButton = ({ text }: SubmitButtonProps) => (
  <button
    type="submit"
    className="self-center w-2/5 px-6 py-4 bg-green-600 rounded-lg transition-all whitespace-nowrap hover:bg-green-700 sm:w-2/4 hover:scale-110"
  >
    {text}
  </button>
);

export default SubmitButton;
