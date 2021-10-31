import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const Container = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginView = styled.div`
  margin-top: 20px;
  margin: 10px;
  width: 50%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #66a6ff;
`;

const Btn = styled(Button)`
  && {
  }
`;

const Login = () => {
  return (
    <Container>
      <LoginView>
        <Btn variant="outlined">로그인</Btn>
      </LoginView>
    </Container>
  );
};

export default Login;
