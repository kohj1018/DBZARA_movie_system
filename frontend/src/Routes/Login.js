import React, { useContext } from "react";
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

import Carousel from "react-material-ui-carousel";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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
      {/* test1 */}
      <Example></Example>
      <SimpleSlider></SimpleSlider>
      {/* test2 */}
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

//test
function Example(props) {
  var items = [
    {
      name: "Random Name #1",
      description: "test1",
    },
    {
      name: "Random Name #2",
      description: "test2",
    },
  ];

  return (
    <TestSel>
      <Item item={items[0]} />
      <Item item={items[1]} />
    </TestSel>
  );
}

function Item(props) {
  return (
    <Div>
      <h2>{props.item.name}</h2>
      <p>{props.item.description}</p>
    </Div>
  );
}
const TestSel = styled(Carousel)`
  && {
    margin: 100px 0 50px 0;
    width: 1000px;
    height: 400px;
    border: 1px solid red;
  }
`;
const Div = styled(Paper)`
  width: 100%;
  height: 250px;
`;
//test2

const TestSel2 = styled(Slider)`
  width: 1000px;
  height: 400px;
  border: 1px solid blue;
`;
function SimpleSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <TestSel2 {...settings}>
      <div>
        <h3>1</h3>
      </div>
      <div>
        <h3>2</h3>
      </div>
      <div>
        <h3>3</h3>
      </div>
      <div>
        <h3>4</h3>
      </div>
      <div>
        <h3>5</h3>
      </div>
      <div>
        <h3>6</h3>
      </div>
    </TestSel2>
  );
}
