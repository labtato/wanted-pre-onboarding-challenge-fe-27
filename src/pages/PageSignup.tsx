import { FC } from "react";
import SignupInput from "../components/pageSignup/SignupInput";

const PageSignup: FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <SignupInput />
    </div>
  );
};

export default PageSignup;
