import React, { useContext, useEffect } from "react";
import styled from "styled-components";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Paper,
} from "@material-ui/core";
import { UserContext } from "context";
import GoogleLogin from "react-google-login";
import KakaoLogin from "react-kakao-login";
import { socialAPI } from "junsu-api";
import setCookie from "cookie";

// !로그인 연동
const Login = () => {
  const { userInfo, handleUserInfo } = useContext(UserContext);
  console.log(userInfo);

  const responseGoogle = async (response) => {
    const { profileObj } = response;
    const dbzaraToken = await socialAPI.googleLogin(profileObj);
    console.log("구글", dbzaraToken);
    console.log("구글token", dbzaraToken.data.token);
    handleUserInfo(dbzaraToken.data.token);
    // setCookie("dbzaraToken", dbzaraToken.data.token, {
    //   path: "/",
    //   secure: true,
    //   sameSite: "none",
    // });
    // setCookie("googleToken", google.data.token);
  };
  const onSuccess = async (response) => {
    const { profile } = response;
    // const data = await socialAPI.kakaoLogin(profile);
    const dbzaraToken = await socialAPI.kakaoLogin(profile);
    console.log("카카오", dbzaraToken);
    console.log("카카오token", dbzaraToken.data.token);
    handleUserInfo(dbzaraToken.data.token);
    // setCookie("dbzaraToken", dbzaraToken.data.token, {
    //   path: "/",
    //   secure: true,
    //   sameSite: "none",
    // });
    // setCookie("kakaoToken", kakao.data.token);
  };
  const onFailure = (response) => {
    console.log(response);
  };

  useEffect(() => {
    if (window.Kakao !== undefined) {
      window.Kakao.init(process.env.REACT_APP_KAKAO_LOGIN_API);
    }
  }, []);

  return (
    <Container>
      {console.log(userInfo)}
      <LoginView>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_LOGIN_ID}
          buttonText="Google Login"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
        <KakaoLogin
          token={process.env.REACT_APP_KAKAO_LOGIN_API}
          onSuccess={onSuccess}
          onFail={onFailure}
        ></KakaoLogin>
        <Info>
          <Accordion>
            <UserSummary>
              <Typography>UserInfo</Typography>
            </UserSummary>
            <UserDetails>
              {/* <Data>{`name : ${userInfo.username}`}</Data>
              <Data>{`password : ${userInfo.password}`}</Data> */}
              <Data>
                {/* {token ? `token : ${userInfo.token.substring(0, 18)}...` : error} */}
              </Data>
            </UserDetails>
          </Accordion>
        </Info>
      </LoginView>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginView = styled.div`
  margin-top: 20px;
  margin: 10px;
  width: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #66a6ff;
`;

const Info = styled.ul`
  background-color: #293672;
  margin: 10px 0 0 10px;
`;

const UserSummary = styled(AccordionSummary)``;
const UserDetails = styled(AccordionDetails)`
  display: flex;
  flex-direction: column;
  background-color: #89f7fe;
`;
const Data = styled.li`
  font-size: 15px;
`;
