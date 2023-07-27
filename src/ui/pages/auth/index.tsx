import { FC, useEffect, useState } from "react";
import { AuthPageCarousel } from "./components/Carousel";
import { AuthPageForm } from "./components/Form";
import { useLoginViewModel } from "../../../viewmodel/Login";
import { useAppLoader } from "../../hooks/Loading";
import { toast } from "react-toastify";
import { AuthPagePostLoginForm } from "./components/PostLogin";
import { useNavigate } from "react-router-dom";
type Props = {};

export const AuthPage: FC<Props> = ({}) => {
  const navigate = useNavigate();
  const {
    login,
    loginState,
    postLoginState,
    onLoginStateReceived,
    onPostLoginStateReceived,
    verificateCode,
    resendCode,
    resendCodeState,
    onResendCodeStateReceived,
  } = useLoginViewModel();
  const [postLoginEnabled, setPostLoginEnabled] = useState<boolean>();
  useAppLoader([loginState, postLoginState, resendCodeState]);

  useEffect(() => {
    if (!!loginState && !loginState.loading) {
      if (loginState.hasError) {
        toast.error(loginState.error?.message);
      } else {
        setPostLoginEnabled(true);
      }
      onLoginStateReceived();
    }
  }, [loginState]);

  useEffect(() => {
    if (!!postLoginState && !postLoginState.loading) {
      if (postLoginState.hasError) {
        toast.error(postLoginState.error?.message);
      } else {
        navigate("/");
      }
      onPostLoginStateReceived();
    }
  }, [postLoginState]);

  useEffect(() => {
    if (!!resendCodeState && !resendCodeState.loading) {
      if (resendCodeState.hasError) {
        toast.error(resendCodeState.error?.message);
      } else {
        toast.success("Se ha enviado un nuevo código a su correo.");
      }
      onResendCodeStateReceived();
    }
  }, [resendCodeState]);

  return (
    <div
      className="overflow-hidden md:grid md:grid-cols-2 w-screen h-screen"
    >
      <div className="hidden md:block overflow-hidden w-full h-full">
        <AuthPageCarousel />
      </div>
      <div>
        {postLoginEnabled ? (
          <AuthPagePostLoginForm
            onBack={() => {
              setPostLoginEnabled(false);
            }}
            onSubmit={(data) => {
              verificateCode(data);
            }}
            onResend={resendCode}
          />
        ) : (
          <AuthPageForm onSubmit={login} />
        )}
      </div>
    </div>
  );
};
