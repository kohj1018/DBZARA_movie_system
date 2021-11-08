import React, { useEffect, useState } from "react";
import axios from "axios";

//  디비자라 API 받아옴
const api = axios.create({
  baseURL: "http://dbzara.kro.kr/",
});

const data = {
  username: "test",
  password: "1234",
};

export const info = {
  userLogin: () => api.post("api/token/", { data }),
};

// 데이터 저장소
export const UserContext = React.createContext();

const UserInfo = (props) => {
  let [userInfo, setUserInfo] = useState({
    username: "test",
    password: "1234",
    token: null,
    error: null,
  });
  async function userAPI() {
    try {
      const {
        data: { token },
      } = await info.userLogin();
      console.log(data);
      setUserInfo((userInfo) => ({ ...userInfo, token }));
    } catch {
      setUserInfo((userInfo) => ({
        ...userInfo,
        error: "로그인 정보가 없습니다.",
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
