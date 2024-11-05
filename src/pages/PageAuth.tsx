import { FC } from "react";
import LoginInput from "../components/pageAuth/LoginInput";

const PageAuth: FC = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <LoginInput />
    </div>
  );
};

export default PageAuth;
