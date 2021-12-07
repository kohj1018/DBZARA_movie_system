import React, { useEffect, useState } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
//  디비자라 API 받아옴
const api = axios.create({
  baseURL: "http://dbzara.kro.kr/",
});

//  TODO user input으로 받아오기
const data = {
  username: "test",
  password: "1234",
};

export const info = {
  userLogin: () => api.post("api/token/", { ...data }),
};

// 데이터 저장소
export const UserContext = React.createContext();

const UserInfo = (props) => {
  const [userInfo, setUserInfo] = useState({
    token: false,
  });

  const handleUserInfo = (tokenId) => {
    setUserInfo((prevState) => ({
      ...prevState,
      token: tokenId,
    }));
  };

  useEffect(() => {
    if (userInfo.token) {
      let decode = jwt_decode(userInfo.token);
      // console.log(decode);
      setUserInfo((userInfo) => ({
        ...userInfo,
        token_docode: { ...decode },
      }));
    }
  }, [userInfo.token]);

  return (
    <UserContext.Provider value={{ userInfo, handleUserInfo }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserInfo;
