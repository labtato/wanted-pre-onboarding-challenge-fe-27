import { useMutation } from "@tanstack/react-query";
import { useInputWithValidation } from "../../hooks/useInputWithValidation";
import { postUsersLogin, PostUsersLoginReq } from "../../api/auth";
import { AUTH_TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";

const LoginInput = () => {
  const navigate = useNavigate();
  const {
    value: email,
    setValue: setEmail,
    isValid: isEmailValid,
  } = useInputWithValidation(
    "",
    (value) => value.includes("@") && value.includes(".")
  );
  const {
    value: password,
    setValue: setPassword,
    isValid: isPasswordValid,
  } = useInputWithValidation("", (value) => value.length >= 8);
  // res 타입 지정
  const { mutate } = useMutation({
    mutationFn: (data: PostUsersLoginReq) => postUsersLogin(data),
    onSuccess: (res) => {
      localStorage.setItem(AUTH_TOKEN, res.data.token);
      navigate("/", { replace: true });
    },
    onError: () => {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
      setEmail("");
      setPassword("");
    },
  });

  //
  // handlers
  //
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleSubmit = () => {
    mutate({ email, password });
  };
  const handleSignupClick = () => {
    navigate("/signup", { replace: true });
  };

  //
  //
  //
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <span className="font-bold">LOGIN</span>
      {/* email */}
      <input
        type="text"
        value={email}
        onChange={handleEmailChange}
        className="border border-black rounded-md"
      />
      {/* password */}
      <input
        type="text"
        value={password}
        onChange={handlePasswordChange}
        className="border border-black rounded-md"
      />
      {/* login button */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!isEmailValid || !isPasswordValid}
        className="px-4 py-1 bg-black rounded-md text-white text-md w-full font-bold disabled:bg-gray-300 hover:bg-gray-700"
      >
        로그인
      </button>
      {/* signup information */}
      <div className="mt-4 text-xs flex flex-col justify-center items-center">
        <p>아직 회원가입하지 않았다면?</p>
        <p
          onClick={handleSignupClick}
          className="underline cursor-pointer text-gray-500"
        >
          회원가입하기
        </p>
      </div>
    </div>
  );
};

export default LoginInput;
