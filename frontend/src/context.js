import React from "react";

// 데이터 저장소
export const UserContext = React.createContext();

const UserInfo = (props) => {
  // TODO : 로그인 정보 받아오기
  const users = {
    email: "wognskec@hanayang.ac.kr",
    number: "2018045115",
    name: "재훈",
  };

  return (
    <UserContext.Provider value={users}>{props.children}</UserContext.Provider>
  );
};

export default UserInfo;
