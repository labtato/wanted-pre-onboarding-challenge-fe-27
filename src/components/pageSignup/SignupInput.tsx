import { useMutation } from "@tanstack/react-query";
import { useInputWithValidation } from "../../hooks/useInputWithValidation";
import { postUsersCreate, PostUsersCreateReq } from "../../api/auth";
import { AUTH_TOKEN } from "../../constants";
import { useNavigate } from "react-router-dom";

const SignupInput = () => {
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
    mutationFn: (data: PostUsersCreateReq) => postUsersCreate(data),
    onSuccess: (res) => {
      localStorage.setItem(AUTH_TOKEN, res.data.token);
      alert("회원가입이 완료되었습니다. 메인 페이지로 이동합니다.");
      navigate("/", { replace: true });
    },
    onError: (error) => {
      switch (error.response?.status) {
        case 409:
          alert("이미 가입된 이메일입니다.");
          break;
        default:
          alert("회원가입에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
          break;
      }
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
  const handleLoginClick = () => {
    navigate("/auth", { replace: true });
  };

  //
  //
  //
  return (
    <div className="flex flex-col justify-center items-center gap-4">
      <span className="font-bold">SIGNUP</span>
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
        가입하기
      </button>
      {/* signup information */}
      <div className="mt-4 text-xs flex flex-col justify-center items-center">
        <p>이미 가입한 유저라면?</p>
        <p
          onClick={handleLoginClick}
          className="underline cursor-pointer text-gray-500"
        >
          로그인하기
        </p>
      </div>
    </div>
  );
};

export default SignupInput;
