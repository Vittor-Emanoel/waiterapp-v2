import { useState } from "react";
import { Eyes } from "../../components/icons/eyes";
import { Logo } from "../../components/icons/logo";
import { Input } from "../../components/ui/input";

export const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-10 w-[384px]">
        <Logo />

        <form
          action=""
          onSubmit={(e) => e.preventDefault()}
          className="flex flex-col items-center gap-8 w-full"
        >
          <Input.Root>
            <Input.Control type="email" />
          </Input.Root>

          <Input.Root>
            <Input.Control type={showPassword ? "text" : "password"} />
            <Input.Suffix onClick={() => setShowPassword((prev) => !prev)}>
              <Eyes />
            </Input.Suffix>
          </Input.Root>
        </form>
      </div>
    </div>
  );
};
