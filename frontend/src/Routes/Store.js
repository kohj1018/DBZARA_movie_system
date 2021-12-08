import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { Button, Typography } from "@material-ui/core";
import StorePoster from "Components/StorePoster"
import axios from "axios";
import CircularProgress from '@material-ui/core/CircularProgress';


const Container = styled.div`
  padding-top: 100px;
  width: 980px;
  margin: 0 auto;
  /* background: #3f2; */
  `;
const StoreList = styled.ul`
  position: relative;
  padding-top: 50px;
  list-style: none;
  display: block;
  /* margin-block-start: 1em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 40px; */
`;
const StoreMenuList = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 70px;
  /* box-shadow: 0 0 20px rgba(0, 0, 0, 0.1); */
  /* background: #fff; */
  z-index: 10;
  &--top {
      position: fixed;
      top: 0;
  }
`;
const TabList = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #000;
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;
  font-size: 18px;
  border-bottom:1px solid #b4b4b4;
  cursor: pointer;
  &:hover {
    color:red;
    background: #eee;
    transition: all 0.5s ease;
    border-bottom: 2px solid #111;
  }
`;
const TabListActive = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  color: #000;
  letter-spacing: 0.1rem;
  transition: all 0.5s ease;
  font-size: 18px;
  border-bottom:2px solid #111;
  cursor: pointer;
`;

const AllStoreList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  /* width : 1200px; */
  margin-top: 60px;
  gap: 15px;
  position: relative;
  *{        //*의 의미 - 이 태그의 자식들은 모두 이 속성을 따라갈 것이다
    box-sizing: border-box;
  }
`;



const Store = (props) => {
  console.log(props)

  const [tabClick, setTabClick] = useState(0);

  return (
    <>
      <Container>
        {/* tab메뉴 */}
        <StoreList>
          <StoreMenuList>
            {tabClick === 0 ? (
              <TabListActive onClick={() => { setTabClick(0) }}>스낵</TabListActive>
            ) : (
                <TabList onClick={() => { setTabClick(0) }}>스낵</TabList>
              )}
            {tabClick === 1 ? (
              <TabListActive onClick={() => { setTabClick(1) }}>음료</TabListActive>
            ) : (
                <TabList onClick={() => { setTabClick(1) }}>음료</TabList>
              )}
            {tabClick === 2 ? (
              <TabListActive onClick={() => { setTabClick(2) }}>콤보</TabListActive>
            ) : (
                <TabList onClick={() => { setTabClick(2) }}>콤보</TabList>
              )}
            {tabClick === 3 ? (
              <TabListActive onClick={() => { setTabClick(3) }}>티켓</TabListActive>
            ) : (
                <TabList onClick={() => { setTabClick(3) }}>티켓</TabList>
              )}
          </StoreMenuList>
        </StoreList>
        {/* Tab눌렀을 때 뜨는 메뉴 리스트 */}
        <TabCont tabClick={tabClick} />
        {/* <TabSubList></TabSubList>
          <TabSubList></TabSubList>
          <TabSubList></TabSubList>
          <TabSubList></TabSubList> */}
      </Container>
    </>
  )
}


const TabCont = (props) => {
  const [menu, setMenu] = useState({
    snack: null,
    beverage: null,
    combo: null,
    ticket: null
  });

  useEffect(() => {
    axios.get("http://dbzara.kro.kr/api/v1/store/")
      .then(res => {
        // console.log(res.data)
        // console.log(res.data.snack)
        // console.log(res.data.beverage)
        // console.log(res.data.combo)
        setMenu((tmp) =>
        ({
          ...tmp,
          snack: res.data.snack,
          beverage: res.data.beverage,
          combo: res.data.combo,
          ticket: res.data.ticket
        }));
        // setMenu((tmp) => ({ ...tmp, snack: res.data.snack }));
        // setMenu((tmp) => ({ ...tmp, beverage: res.data.beverage }));
        // setMenu((tmp) => ({ ...tmp, combo: res.data.combo }));
      }
      )
      .catch((err) => console.log(err))
  }, [])

  const tab = ['스낵', '음료', '콤보', '티켓'];

  return (
    !menu.ticket ?  // tickek의 데이터가 없으면(로딩중이면) 빙글빙글 , 다 받아오면 로직띄우기
      (<div style={{ minHeight: "70vh" }}><CircularProgress style={{
        position: "absolute", top: "40%", left: "50%", margin: "-150px 0 0 - 150px"
      }} /></div>) : (
        tab.map((data, idx) => {
          if (props.tabClick === idx) { //tabClick은 0,1,2,3 idx는 tab배열의 0,1,2,3
            if (props.tabClick === 0) {
              return (
                // 모든 상품들을 grid로 만들고 storePoster컴포넌트로 띄워줄거임 ㅋㅋ
                <AllStoreList>
                  {/* {console.log(menu)} */}
                  {
                    menu.snack && menu.snack.map((res, index) => {  //api로 넘겨받은 data들을 menu에 저장
                      return (
                        // TODO if tabClick = res.category 일때만 storePoster 뜨게끔
                        <StorePoster
                          id={res.id}
                          category={res.category}
                          name={res.name}
                          image={res.image}
                          price={res.price}
                        ></StorePoster>
                      )
                    })
                  }
                </AllStoreList>
              )
            }

            else if (props.tabClick === 1) {
              return (
                // 모든 상품들을 grid로 만들고 storePoster컴포넌트로 띄워줄거임 ㅋㅋ
                <AllStoreList>
                  {/* {console.log(menu)} */}
                  {
                    menu.beverage && menu.beverage.map((res, index) => {  //api로 넘겨받은 data들을 menu에 저장
                      return (
                        // TODO if tabClick = res.category 일때만 storePoster 뜨게끔
                        <StorePoster
                          id={res.id}
                          category={res.category}
                          name={res.name}
                          image={res.image}
                          price={res.price}
                        ></StorePoster>
                      )
                    })
                  }
                </AllStoreList>
              )
            }

            else if (props.tabClick === 2) {
              return (
                // 모든 상품들을 grid로 만들고 storePoster컴포넌트로 띄워줄거임 ㅋㅋ
                <AllStoreList>
                  {/* {console.log(menu)} */}
                  {
                    menu.combo && menu.combo.map((res, index) => {  //api로 넘겨받은 data들을 menu에 저장
                      return (
                        // TODO if tabClick = res.category 일때만 storePoster 뜨게끔
                        <StorePoster
                          id={res.id}
                          category={res.category}
                          name={res.name}
                          image={res.image}
                          price={res.price}
                        ></StorePoster>
                      )
                    })
                  }
                </AllStoreList>
              )
            }
            if (props.tabClick === 3) {
              return (
                // 모든 상품들을 grid로 만들고 storePoster컴포넌트로 띄워줄거임 ㅋㅋ
                <AllStoreList>
                  {console.log(menu)}
                  {
                    menu.ticket && menu.ticket.map((res, index) => {  //api로 넘겨받은 data들을 menu에 저장
                      return (
                        // TODO if tabClick = res.category 일때만 storePoster 뜨게끔
                        <StorePoster
                          id={res.id}
                          category={res.category}
                          name={res.name}
                          image={res.image}
                          price={res.price}
                        ></StorePoster>
                      )
                    })
                  }
                </AllStoreList>
              )
            }

          }
        }))
  )
}


export default Store;
