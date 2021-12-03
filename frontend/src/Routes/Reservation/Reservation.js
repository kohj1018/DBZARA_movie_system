import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import MuiAccordion from "@material-ui/core/Accordion";
import MuiAccordionSummary from "@material-ui/core/AccordionSummary";
import MuiAccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";

// Tab
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

//  calendar
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import UserInfoReservation from "Routes/Reservation/UserInfoReservation";
import SeatReservation from "Routes/Reservation/SeatReservation";
import DiscountReservation from "Routes/Reservation/DiscountReservation";

// api연결
// import { moviesApi } from "api";
import { UserContext } from "context";
import { dbzaraApi } from "dbzaraApi";

// 예매page
const Reservation = () => {
  // 영화선택
  const [expanded, setExpanded] = React.useState("panel1");
  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  // 극장
  const [expanded2, setExpanded2] = React.useState(false);
  const handleChange2 = (panel) => (event, isExpanded) => {
    setExpanded2(isExpanded ? panel : false);
  };

  const [areaValue, setAreaValue] = React.useState(0);

  // 상영관
  const tabStyled = tabStyles();
  const handleChange3 = (event, areaIdx) => {
    setAreaValue(areaIdx);
  };

  // 달력
  const [toDay, onChange] = useState(new Date());
  // value console찍기

  //! API 연결
  let [top10, setTop10] = useState({
    top: null,
    error: null,
    loading: true,
  });

  let [restMovies, setRestMovies] = useState({
    restMovie: null,
    error: null,
    loading: true,
  });

  let [cinemas, setCinema] = useState({
    cinema: null,
    error: null,
    loading: true,
  });

  async function feactApi() {
    try {
      // TOP10
      const {
        data: { results: boxOffice },
      } = await dbzaraApi.boxOffice();
      setTop10((movies) => ({ ...movies, top: boxOffice.slice(0, 10) }));
      // console.log("boxOffice", boxOffice.slice(0, 10));

      const { data: restMovie } = await dbzaraApi.moviesList();
      // console.log(restMovie);
      setRestMovies((movies) => ({ ...movies, restMovie }));

      // cinema
      const {
        data: { results: cinema },
      } = await dbzaraApi.cinema();
      setCinema((cinemas) => ({ ...cinemas, cinema }));
      // console.log(cinemas);
    } catch {
      setTop10((movies) => ({
        ...movies,
        error: "영화 정보를 찾을 수 없습니다!",
      }));
      setRestMovies((movies) => ({
        ...movies,
        error: "영화 정보를 찾을 수 없습니다!",
      }));
      setCinema((cinema) => ({
        ...cinema,
        error: "상영관 정보를 찾을 수 없습니다!",
      }));
    } finally {
      setTop10((movies) => ({ ...movies, loading: false }));
      setRestMovies((movies) => ({ ...movies, loading: false }));
      setCinema((cinema) => ({ ...cinema, loading: false }));
    }
  }
  // API연결 렌더링
  useEffect(() => {
    feactApi();
  }, []);

  // ! user DATA
  const userData = useContext(UserContext);

  // ! User Choice
  const [moviesChoice, onMoviesChoice] = useState({
    choice: false,
    movie: null,
    movieId: null,
  });
  const [theaterChoice, onTheaterChoice] = useState({
    choice: false,
    theater: null,
    theaterId: null,
  });
  const [dayChoice, onDayChoice] = useState({
    choice: false,
    day: null,
  });
  const [movieSeat, onMovieSeat] = useState({
    choice: false,
  });

  // TODO day만 잘라서 넣어놓기
  console.log(moviesChoice);
  console.log(theaterChoice);
  // console.log(new Date().getDay());
  // console.log(dayChoice.day.getDay());
  // console.log(dayChoice.day);
  // console.log(dayChoice.day.view);
  console.log(toDay.toISOString().split("T")[0].split("-"));
  // console.log(toDay.format);

  // !  cinema data
  const area = [
    "서울",
    "부산",
    "경기/인천",
    "충청/대전",
    "경북/대구",
    "경남/울산",
    "강원/제주",
  ];

  // 시네마 나눔
  let areaCinema = {
    서울: [],
    부산: [],
    "경기/인천": [],
    "충청/대전": [],
    "경북/대구": [],
    "경남/울산": [],
    "강원/제주": [],
  };

  cinemas.cinema &&
    cinemas.cinema.map((cinema, idx) => {
      if (cinema.main_region.slice(0, 2) === "서울") {
        areaCinema["서울"].push(cinema);
      } else if (cinema.main_region.slice(0, 2) === "부산") {
        areaCinema["부산"].push(cinema);
      } else if (
        cinema.main_region.slice(0, 2) === "경기" ||
        cinema.main_region.slice(0, 2) === "인천"
      ) {
        areaCinema["경기/인천"].push(cinema);
      } else if (
        cinema.main_region.slice(0, 2) === "충청" ||
        cinema.main_region.slice(0, 2) === "대전"
      ) {
        areaCinema["충청/대전"].push(cinema);
      } else if (
        cinema.main_region.slice(0, 2) === "경북" ||
        cinema.main_region.slice(0, 2) === "대구"
      ) {
        areaCinema["경북/대구"].push(cinema);
      } else if (
        cinema.main_region.slice(0, 2) === "경남" ||
        cinema.main_region.slice(0, 2) === "울산"
      ) {
        areaCinema["경남/울산"].push(cinema);
      } else {
        areaCinema["강원/제주"].push(cinema);
      }
    });
  // console.log(areaCinema);

  return (
    <Container>
      <Header>
        <Refresh onClick={() => window.location.reload()}>
          처음부터 다시
        </Refresh>
      </Header>
      <Main>
        <ReservationInfo>
          <MoviesReservation>
            <MainReservation>
              <Choice>
                <MoviesChoice>
                  <span>영화 선택</span>
                  <div>
                    <Accordion
                      square
                      expanded={expanded === "panel1"}
                      onChange={handleChange("panel1")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1d-content"
                        id="panel1d-header"
                      >
                        <Typography>예매 TOP 10</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* {console.log(movies.popular)} */}
                        <MovieUl>
                          {top10.top &&
                            top10.top.map((movie, idx) => (
                              <MovieLi
                                key={idx}
                                onClick={() =>
                                  onMoviesChoice((movies) => ({
                                    ...movies,
                                    choice: true,
                                    movie,
                                    movieId: movie.id,
                                  }))
                                }
                                choice={movie.id}
                                current={moviesChoice.movieId}
                              >
                                <p>{idx + 1}</p>
                                {movie.grade ? (
                                  <Age ageAttr={ageColor[movie.grade]}>
                                    {movie.grade === 0 ? "전체" : movie.grade}
                                  </Age>
                                ) : (
                                  <Age ageAttr={ageColor[0]}>전체</Age>
                                )}
                                {/* {console.log(moviesChoice)} */}
                                <p>{movie.name}</p>
                              </MovieLi>
                            ))}
                        </MovieUl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      square
                      expanded={expanded === "panel2"}
                      onChange={handleChange("panel2")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2d-content"
                        id="panel2d-header"
                      >
                        <Typography>TOP10 외 영화</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <MovieUl>
                          {restMovies.restMovie &&
                            restMovies.restMovie.map((movie, idx) => (
                              <MovieLi
                                key={idx}
                                onClick={() =>
                                  onMoviesChoice((movies) => ({
                                    ...movies,
                                    choice: true,
                                    movie,
                                    movieId: movie.id,
                                  }))
                                }
                                choice={movie.id}
                                current={moviesChoice.movieId}
                              >
                                {movie.grade ? (
                                  <Age ageAttr={ageColor[movie.grade]}>
                                    {movie.grade === 0 ? "전체" : movie.grade}
                                  </Age>
                                ) : (
                                  <Age ageAttr={ageColor[0]}>전체</Age>
                                )}
                                {/* {console.log(moviesChoice)} */}
                                <p>{movie.name}</p>
                              </MovieLi>
                            ))}
                        </MovieUl>
                      </AccordionDetails>
                    </Accordion>
                    <Accordion
                      square
                      expanded={expanded === "panel3"}
                      onChange={handleChange("panel3")}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3d-content"
                        id="panel3d-header"
                      >
                        <Typography>회원 나이대 영화순위</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        {/* //Todo 회원 나이대 영화순위 정렬 */}
                        <MovieUl>
                          {userData.favoriteMovies ? (
                            userData.favoriteMovies.map((movie, idx) => {
                              return (
                                <MovieLi
                                  key={idx}
                                  onClick={() =>
                                    onMoviesChoice((movies) => ({
                                      ...movies,
                                      choice: true,
                                      movie,
                                      movieId: movie.id,
                                    }))
                                  }
                                  choice={movie.id}
                                  current={moviesChoice.movieId}
                                >{`${idx + 1} : ${movie}`}</MovieLi>
                              );
                            })
                          ) : (
                            <MovieLi>로그인을 해주세요</MovieLi>
                          )}
                        </MovieUl>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                </MoviesChoice>
                <TheaterChoice>
                  <span>극장선택</span>
                  <div>
                    {/* // TODO MY극장 위에 상영관 추천 추가 */}
                    <Accordion2
                      expanded={expanded2 === "panel1"}
                      onChange={handleChange2("panel1")}
                    >
                      <AccordionSummary2
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography>MY극장</Typography>
                      </AccordionSummary2>
                      <AccordionDetails2>
                        {/* //TODO userData 넣기 */}
                        <Typography>설정한 MY극장이 없습니다.</Typography>
                        <Typography>설정하러 가실?</Typography>
                      </AccordionDetails2>
                    </Accordion2>
                  </div>
                  <div className={tabStyled.root}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={areaValue}
                      onChange={handleChange3}
                      aria-label="Vertical tabs example"
                      className={tabStyled.tabs}
                    >
                      {/* //TODO 지역 데이터 받아와서 넣기 */}
                      {area.map((area, idx) => {
                        return (
                          <Tab
                            key={idx}
                            label={area}
                            {...a11yProps(idx)}
                            className={tabStyled.tab}
                          />
                        );
                      })}
                    </Tabs>
                    {/* 지역상영관 정보 */}
                    <TheaterRegion>
                      {area.map((area, idx) => (
                        <TabPanel
                          value={areaValue}
                          index={idx}
                          className={tabStyled.tabpanel}
                        >
                          <p>{area}</p>
                          {cinemas.cinema &&
                            areaCinema[area].map((theater, idx) => (
                              <MovieLi
                                key={idx}
                                onClick={() =>
                                  onTheaterChoice((area) => ({
                                    ...area,
                                    choice: true,
                                    theater,
                                    theaterId: theater.id,
                                  }))
                                }
                                choice={theater.id}
                                current={theaterChoice.theaterId}
                              >
                                {/* {console.log(theaterChoice)} */}
                                {theater.name}
                              </MovieLi>
                            ))}
                        </TabPanel>
                      ))}
                    </TheaterRegion>
                  </div>
                </TheaterChoice>
                <DayChoice>
                  <span>관람일 선택</span>
                  <div>
                    <CalenderBox
                      onChange={onChange}
                      onClickDay={(toDay) =>
                        onDayChoice((data) => ({
                          ...data,
                          choice: true,
                          day: toDay,
                        }))
                      }
                      value={toDay}
                      // TODO영화개봉날짜 props로 받아서 해당 날짜에border씌우기
                    />
                    {/* {console.log(dayChoice)} */}
                    <Explanation>
                      <p>
                        영화, 극장, 관람일을 선택하시면 시간 선택이 아래쪽에
                        나타납니다
                      </p>
                    </Explanation>
                  </div>
                </DayChoice>
              </Choice>
              {moviesChoice.choice && theaterChoice.choice && dayChoice.choice && (
                <TheaterDetail>
                  <ScjeduleInfo>
                    <p>시간선택</p>
                    <p> > 30분전 예매 / 30분전 취소 가능</p>
                  </ScjeduleInfo>
                  <CinemaInfo>
                    <div>상영관들 data</div>
                    <div>상영관들 data</div>
                    <div>상영관들 data</div>
                  </CinemaInfo>
                </TheaterDetail>
              )}
            </MainReservation>
          </MoviesReservation>
          {/* <UserInfoReservation /> */}
          {/* <SeatReservation /> */}
          {/* <DiscountReservation /> */}
        </ReservationInfo>
        {moviesChoice.choice ? (
          <MoviesDetail choice={moviesChoice.choice}>
            <MoviesBgImage
              bgImage={
                moviesChoice.choice
                  ? `https://dbzarastorage.blob.core.windows.net${moviesChoice.movie.poster}`
                  : require("../../assets/noPosterSmall.png").default
              }
            />
            <MoviesInfo>
              <img
                className={"Choice"}
                src={
                  moviesChoice.choice
                    ? `https://dbzarastorage.blob.core.windows.net${moviesChoice.movie.poster}`
                    : require("../../assets/noPosterSmall.png").default
                }
              />
              <div>
                <div>
                  {moviesChoice.movie.grade ? (
                    <Age ageAttr={ageColor[moviesChoice.movie.grade]}>
                      {moviesChoice.movie.grade === 0
                        ? "전체"
                        : moviesChoice.movie.grade}
                    </Age>
                  ) : (
                    <Age ageAttr={ageColor[0]}>전체</Age>
                  )}
                  {/* {console.log(moviesChoice)} */}
                  <p>{moviesChoice.movie.name}</p>
                </div>
                <div>
                  {theaterChoice.choice
                    ? theaterChoice.theater.name
                    : "극장을 선택하세요."}
                </div>
                {/* //TODO 관람일자 왜...왜 씨발 왜... */}
                <div>관람일시를 선택하세요.</div>
                <div>좌석을 선택하세요.</div>
              </div>
            </MoviesInfo>
            <TicketInfo>
              <p>
                <span>성인(2)</span>
                <span>26,000원</span>
              </p>
              <p>
                <span>청소년(2)</span>
                <span>26,000원</span>
              </p>
              <p>
                <span>우대(2)</span>
                <span>26,000원</span>
              </p>
              <p>
                <span>예매수수료(2)</span>
                <span>26,000원</span>
              </p>
              <p>
                <span>할인금액</span>
                <span>(-) 1000원</span>
              </p>
            </TicketInfo>
            <AmountInfo>
              <div>
                <p>최종결제금액</p>
                <p>50,000원</p>
              </div>
              <Btn>결제</Btn>
            </AmountInfo>
          </MoviesDetail>
        ) : (
          <MoviesDetail choice={moviesChoice.choice}>
            <MoviesInfo>
              <div className={"nonChoice"} />
              <div>
                <div>영화를 선택하세요.</div>
                <div>극장을 선택하세요.</div>
                <div>관람일시를 선택하세요.</div>
                <div>좌석을 선택하세요.</div>
              </div>
            </MoviesInfo>
          </MoviesDetail>
        )}
      </Main>
    </Container>
  );
};
export default Reservation;

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 80px;
  padding: 15px;
  color: blue;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  min-width: 1200px;
  height: 30px;
  display: flex;
  margin: auto;
  justify-content: flex-end;
`;

const Refresh = styled(Button)`
  && {
    background-color: RGB(255, 255, 255);
    border: 1px solid RGB(200, 200, 200);
    font-size: 10px;
  }
`;

const Main = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 20px;
  padding-bottom: 120px;
`;

const ReservationInfo = styled.div`
  width: 100%;
  margin: auto;
  /* display: flex; */
`;

const MoviesReservation = styled.div`
  display: flex;
  margin: auto;
`;

const MainReservation = styled.div`
  width: 1200px;
  /* height: 900px; */
  margin: auto;
  /* border: 1px solid red; */
`;

const Choice = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 430px 470px 300px;

  div > span {
    color: black;
    font-size: 20px;
    padding-bottom: 10px;
  }
`;

const MoviesChoice = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  height: 620px;
  > span {
    background-color: #f5f5f5;
  }
`;

const TheaterChoice = styled.div`
  display: flex;
  flex-direction: column;
  height: 620px;
  overflow: hidden;
`;

const TheaterRegion = styled.div`
  overflow-y: scroll;
  width: 305px;
  height: 510px;
`;

const DayChoice = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoviesDetail = styled.div`
  margin: 40px auto;
  width: 1200px;
  height: 188px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  display: grid;
  position: relative;
  grid-template-columns: 492fr 358fr 348fr;
  color: ${(props) => (props.choice ? "white" : "RGB(200, 200, 200)")};
  background-color: ${(props) => (props.choice ? null : "white")};
  font-weight: ${(props) => (props.choice ? "bold" : "normal ")};
`;

const MoviesBgImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 1200px;
  height: 100%;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(3px);
  z-index: -1;
  opacity: 0.6;
`;

const MoviesInfo = styled.div`
  padding: 0 10px 0 30px;
  display: felx;
  justify-content: center;

  /* align-items: center; */

  .Choice {
    width: 95px;
    height: 136px;
    margin: 24px 35px 0 0;
    object-fit: fill;
  }
  .nonChoice {
    width: 95px;
    height: 136px;
    margin: 24px 35px 0 0;
    border: 1px solid rgba(0, 0, 0, 0.125);
    /* background-color: red; */
  }
  > div:nth-child(2) {
    width: 320px;
    height: 148px;
    padding-top: 42px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 12px;

    > div:nth-child(1) {
      display: flex;
      height: 46px;
      padding-bottom: 42px;
      font-size: 20px;
    }
    > div:nth-child(n + 2) {
      height: 20px;
      padding-bottom: 7px;
    }
  }
`;

const TicketInfo = styled.div`
  padding: 0 50px;
  border-left: 1px solid rgba(0, 0, 0, 0.25);
  border-right: 1px solid rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: blue;
  font-size: 14px;
  > p {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
  }

  > p:last-child :last-child {
    color: red;
  }
`;

const AmountInfo = styled.div`
  padding: 42px 30px 0 0;
  display: flex;
  > div {
    width: 210px;
    height: 80px;
    padding: 30px 0 0 13px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: blue;
    font-size: 13px;
    > p:last-child {
      padding-top: 14px;
      color: red;
      font-size: 24px;
    }
  }
`;

const Btn = styled(Button)`
  && {
    width: 111px;
    height: 111px;
    text-align: center;
    font-size: 25px;
    border: 1px solid rgba(0, 0, 0, 0.125);
    color: rgba(0, 0, 0, 0.125);
  }
`;

const TheaterDetail = styled.div`
  margin: 40px auto;
  width: 1200px;
`;

const ScjeduleInfo = styled.div`
  display: flex;
  color: black;
  > p {
    padding: 5px 10px 0 0;
    font-size: 13px;
    :nth-child(1) {
      padding-top: 0;
      font-size: 22px;
    }
  }
`;

const CinemaInfo = styled.div`
  margin-top: 10px;
  padding: 30px;
  border: 1px solid rgba(0, 0, 0, 0.25);
  background-color: #ffffff;
  font-size: 20px;
  color: black;
`;

const CalenderBox = styled(Calendar)`
  && {
    padding: 5px;
    width: 100%;
    height: 500px;
    font-size: 10px;
    border: 1px solid rgba(0, 0, 0, 0.125);
  }

  /* 월 */
  .react-calendar__navigation {
    margin: 30px 0 50px 0;
  }
  /* 일 */
  .react-calendar__month-view__weekdays {
    color: black;
    abbr[title="토요일"],
    abbr[title="일요일"] {
      color: red;
    }
  }
  .react-calendar__month-view__days button abbr {
    font-size: 12px;
  }
`;

const Explanation = styled.div`
  height: 90px;
  background-color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.125);
  p {
    color: black;
    font-size: 12px;
    width: 60%;
  }
`;

// accordion

const Accordion = withStyles({
  root: {
    border: "1px solid rgba(0, 0, 0, .125)",
    boxShadow: "none",
    "&:not(:last-child)": {
      borderBottom: 0,
    },
    "&:before": {
      display: "none",
    },
    "&$expanded": {
      margin: "auto",
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    // backgroundColor: "rgba(0, 0, 0, .03)",
    borderBottom: "1px solid rgba(0, 0, 0, .125)",
    marginBottom: -1,
    minHeight: 56,
    "&$expanded": {
      minHeight: 56,
    },
  },
  content: {
    "&$expanded": {
      margin: "12px 0",
    },
  },
  expanded: {},
})(MuiAccordionSummary);

const AccordionDetails = styled(MuiAccordionDetails)`
  && {
    padding: 15px;
    height: 408px;
  }
`;

const Accordion2 = styled(Accordion)`
  && {
    border: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.125);
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
`;

const AccordionSummary2 = styled(AccordionSummary)`
  && {
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  }
`;

const AccordionDetails2 = styled(AccordionDetails)`
  && {
    height: 50px;
  }
`;

const MovieUl = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const MovieLi = styled(Typography)`
  /* width: 100%; */
  min-height: 42px;
  display: flex;
  align-items: center;
  padding-left: 10px;
  ${(props) =>
    props.choice === props.current ? `background:RGB(236, 97, 90)` : null};
  &:hover {
    background: RGB(236, 97, 90);
  }
  > p {
    margin-left: 10px;
    margin-right: 10px;
  }
`;
const ageColor = {
  0: {
    color: "#60c9e3",
    border: "1px solid #60c9e3",
    "font-size": "5px",
    "line-height": "1",
    padding: "5px 0 0 0",
  },
  12: {
    color: "#6dd551",
    border: "1px solid #6dd551",
    "font-size": "15px",
    "line-height": "0.7",
    padding: "5px 0px 0px 0px",
  },
  15: {
    color: "#fbac30",
    border: "1px solid #fbac30",
    "font-size": "15px",
    "line-height": "0.7",
    padding: "5px 0px 0px 0px",
  },
  19: {
    color: "#d30101",
    border: "1px solid #d30101",
    "font-size": "15px",
    "line-height": "0.7",
    padding: "5px 0px 0px 0px",
  },
};

const Age = styled.span`
  margin-right: 5px;
  color: ${(props) => props.ageAttr["color"]};
  border: ${(props) => props.ageAttr["border"]};
  padding: ${(props) => props.ageAttr["padding"]};
  display: inline-block;
  width: 25px;
  height: 22px;
  line-height: ${(props) => props.ageAttr["line-height"]};
  text-align: center;
  font-size: ${(props) => props.ageAttr["font-size"]};
`;

// Tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div {...other}>
      {value === index && (
        <Box p={3}>
          <Typography styled={{ overflow: "scroll" }}>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

const tabStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    // height: "530px",
    // overflow: "hidden";
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  tabs: {
    border: `1px solid ${theme.palette.divider}`,
    color: "black",
  },
  tabpanel: {
    color: "black",
  },
  tab: {
    " &:hover": {
      backgroundColor: "#eaeaea",
    },
  },
}));
