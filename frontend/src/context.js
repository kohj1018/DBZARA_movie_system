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
  let [userInfo, setUserInfo] = useState({
    username: "test",
    password: "1234",
    token: null,
    token_docode: {
      email: null,
      exp: null,
      orig_iat: null,
      user_id: null,
      username: null,
    },
    error: null,
    favoriteMovies: ["밤샘", "지옥", "종강", "원츄"],
  });
  async function userAPI() {
    try {
      const {
        data: { token },
      } = await info.userLogin();

      let decode = jwt_decode(token);
      // console.log(decode);
      setUserInfo((userInfo) => ({
        ...userInfo,
        token,
        token_docode: { ...decode },
      }));
      // console.log(userInfo);
    } catch {
      setUserInfo((userInfo) => ({
        ...userInfo,
        error: "회원 정보가 없습니다.",
      }));
    }
  }

  useEffect(() => {
    userAPI();
  }, []);

  return (
    <UserContext.Provider value={userInfo}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserInfo;
