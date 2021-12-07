import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import { Box, Button } from "@material-ui/core";
import Dialog from '@material-ui/core/Dialog';
// import MuiDialogTitle from '@material-ui/core/DialogTitle';
// import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions';
// import IconButton from '@material-ui/core/IconButton';
// import CloseIcon from '@material-ui/icons/Close';
// import Typography from '@material-ui/core/Typography';
import axios from 'axios'




const EventModal = styled.div``;

const EventPoster = ({ id, day, src, title, text }) => {
  const [modal, setModal] = useState([]);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    axios
      .get(`http://dbzara.kro.kr/api/v1/event/${id}/`)
      .then((result) => setModal(result.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      {/* 이벤트 랜더링 */}
      <EventBg src={src}></EventBg>
      {/* {console.log(src)} */}
      <EventInfo>
        <Btn>
          <DDay>D - {day}</DDay>
          <EventTitle>{title}</EventTitle>
          <EventText onClick={handleClickOpen}>자세히 보기</EventText>
        </Btn>
      </EventInfo>

      {/* 모달 창 */}
      <EventModal>

        <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
          <img src={modal.poster} />
          {/* <p>{modal.title}</p> */}

          {/* <Button autoFocus onClick={handleClose} color="primary">
            닫기
          </Button> */}
        </Dialog>
      </EventModal>
    </>
  );
};
export default EventPoster;

const EventBg = styled.img`
  width: 100%;
  height: 100%;
  position: relative;
`;

const EventInfo = styled.div`
  position: absolute;
  top: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  opacity: 0;
  transition: all 0.3s ease-in-out;
  background-color: #000000;
  &:hover {
    opacity: 0.9;
  }
`;

const Btn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0%;
  width: 100%;
  height: 100%;
  position: relative;
  font-size: 16px;
  color: RGB(255, 255, 255);
`;

const DDay = styled.div`
  padding-bottom: 15px;
  font-size: 28px;
  color: #ec6159;
  text-align: center;
`;

const EventTitle = styled.div`
  padding-bottom: 20px;
  font-size: 20px;
  line-height: 26px;
  text-align: center;
  vertical-align: baseline;
`;

const EventText = styled.div`
  padding-bottom: 10px;
  cursor: pointer;
`;
