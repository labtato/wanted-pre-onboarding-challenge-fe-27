import { useInputWithValidation } from "../../hooks/useInputWithValidation";

const LoginInput = () => {
  const {
    value: email,
    handleValueChange: handleEmailChange,
    isValid: isEamilValid,
  } = useInputWithValidation(
    "",
    (value) => value.includes("@") && value.includes(".")
  );
  const {
    value: password,
    handleValueChange: handlePasswordChange,
    isValid: isPaswordValid,
  } = useInputWithValidation("", (value) => value.length >= 8);

  return (
    <form>
      <div className="flex flex-col justify-center items-center gap-4">
        <span>Login</span>
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          className="border border-black rounded-md"
        />
        <input
          type="text"
          value={password}
          onChange={handlePasswordChange}
          className="border border-black rounded-md"
        />
        <button
          type="submit"
          disabled={!isEamilValid || !isPaswordValid}
          className="px-4 py-1 bg-black rounded-md text-white w-full font-bold disabled:bg-gray-300 hover:bg-gray-700"
        >
          로그인
        </button>
      </div>
    </form>
  );
};

export default LoginInput;
