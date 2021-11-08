import React, { useContext } from "react";
import styled from "styled-components";
import {
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { UserContext } from "context";

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

const Btn = styled(Button)`
  && {
  }
`;

const Login = () => {
  //  UserContext에서 정보 받아와서 사용
  const { username, password, token, error } = useContext(UserContext);
  console.log(useContext(UserContext));

  return (
    <Container>
      {/* {console.log(username, password, token)} */}
      {/* {console.log({ token_decode })} */}
      <LoginView>
        <Btn variant="outlined">로그인</Btn>
        <Info>
          <Accordion>
            <UserSummary>
              <Typography>UserInfo</Typography>
            </UserSummary>
            <UserDetails>
              <Data>{`name : ${username}`}</Data>
              <Data>{`password : ${password}`}</Data>
              <Data>
                {token ? `token : ${token.substring(0, 18)}...` : error}
              </Data>
            </UserDetails>
          </Accordion>
        </Info>
      </LoginView>
    </Container>
  );
};

export default Login;
