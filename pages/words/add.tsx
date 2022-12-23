import { FormEvent, useRef } from "react";

const InputForm = () => {
  // if/when we need to use something like debounce, we can useState instead of useRef
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const value = inputRef.current?.value;
    // TODO send to backend -> verify if word exists -> if so, save it -> else error
  };

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-lg">
      <label
        className="block font-bold mb-2 text-gray-700 text-sm uppercase"
        htmlFor="input"
      >
        Input Label
      </label>
      <input
        className="bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-full appearance-none leading-normal"
        id="input"
        type="text"
        ref={inputRef}
      />
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default InputForm;
