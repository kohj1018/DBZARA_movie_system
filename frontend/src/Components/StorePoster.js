import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";


const ItemCont = styled.div`
  display: block;
  /* width: 33%; */
  /* height: 200px; */
  /* background-color: #b4b4b4; */
  margin-bottom: 30px;
`;
const ItemImg = styled.img`
  width : 100%;
  height: 80%;
  *{
    display: block;
  }
`;
const ItemTitle = styled.div`
  padding-bottom: 10px;
  font-size: 17px;
  line-height: 26px;
  text-align: center;
  vertical-align: baseline;
  color: #2b2b2b;
  text-align: center;
  flex-direction: column;
`;
const ItemPrice = styled.div`
  font-weight: bold;
  font-size: 18px;
  text-align: center;
  flex-direction: column;
  color: #2b2b2b;
`;
const ItemCate = styled.div`
  /* padding-bottom: 10px; */
  font-size: 17px;
  line-height: 26px;
  text-align: center;
  vertical-align: baseline;
  color: #2b2b2b;
  text-align: center;
  flex-direction: column;
`;



const StorePoster = ({ id, category, name, image, price }) => {

  // const [item, setItem] = useState([]);

  // useEffect(() => {
  //   axios.get(`http://dbzara.kro.kr/api/v1/store/${id}/`)
  //     .then((result) => {
  //       console.log(result.data[0])
  //       setItem(result.data[0]);
  //     })
  //     .catch((err) => console.log(err))
  // }, [])


  return (
    <>
      <ItemCont>
        <ItemImg src={image}></ItemImg>
        {/* <ItemCate> &lt;{category}&gt; </ItemCate> */}
        <ItemTitle>{name}</ItemTitle>
        <ItemPrice>{price} 원</ItemPrice>
      </ItemCont>
    </>
  )

}

export default StorePoster;