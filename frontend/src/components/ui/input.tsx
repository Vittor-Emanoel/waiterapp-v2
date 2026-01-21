import type { ComponentProps } from "react";

export const InputRoot = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="p-4 w-full flex gap-4 border border-gray-200 rounded-md focus-within:border-gray-400">
      {children}
    </div>
  );
};

type InputSuffixProps = ComponentProps<"button">;

export const InputSuffix = ({ children, ...props }: InputSuffixProps) => {
  return (
    <button className="flex items-center" {...props}>
      {children}
    </button>
  );
};

type InputControlProps = ComponentProps<"input">;

export const InputControl = (props: InputControlProps) => {
  return (
    <input
      type="password"
      className="outline-none p-0 bg-transparent placeholder:text-zinc-400 w-full focus:ring-0 appearance-none autofill:bg-transparent autofill:hover:bg-red"
      {...props}
    />
  );
};

export const Input = {
  Root: InputRoot,
  Suffix: InputSuffix,
  Control: InputControl,
};
