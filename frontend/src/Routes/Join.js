import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const Container = styled.div`
  margin-top: 50px;
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
`;

const LoginView = styled.div`
  margin-top: 20px;
  margin: 10px;
  width: 80%;
  height: 60%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff7eb3;
`;

const Btn = styled(Button)`
  && {
    color: #6f86d6;
  }
`;

const Login = () => {
  return (
    <Container>
      <LoginView>
        <Btn variant="outlined">회원가입</Btn>
      </LoginView>
    </Container>
  );
};

export default Login;
