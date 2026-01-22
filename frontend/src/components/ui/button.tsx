import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import type { ComponentProps } from "react";

export const button = cva(
  [
    "inline-flex items-center justify-center gap-2",
    "rounded-full font-semibold transition-colors",
    "px-7 py-3.5 text-base",
  ],
  {
    variants: {
      variant: {
        primary: ["bg-brand-red text-white", "hover:bg-brand-red-dark"],
        outline: [
          "border-2 border-brand-red text-brand-red",
          "hover:bg-brand-red/10",
        ],
      },

      disabled: {
        true: ["cursor-not-allowed", "pointer-events-none"],
        false: null,
      },

      isLoading: {
        true: ["cursor-wait"],
        false: null,
      },
    },

    compoundVariants: [
      {
        variant: "primary",
        disabled: true,
        class: "bg-gray-300 text-white hover:bg-gray-300",
      },
      {
        variant: "outline",
        disabled: true,
        class: "border-gray-300 text-gray-300 hover:bg-transparent",
      },
    ],
    defaultVariants: {
      variant: "primary",
      disabled: false,
      isLoading: false,
    },
  },
);

export type ButtonVariants = VariantProps<typeof button> &
  ComponentProps<"button">;

export const Button = ({
  isLoading,
  children,
  variant,
  disabled,
  className,
}: ButtonVariants) => {
  return (
    <button
      className={button({
        className,
        disabled,
        variant,
        isLoading,
      })}
    >
      {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
