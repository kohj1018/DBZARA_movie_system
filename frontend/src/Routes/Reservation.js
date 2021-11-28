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

// api연결
import { moviesApi } from "api";
import { UserContext } from "context";

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

  const [value, setValue] = React.useState(0);

  // 상영관
  const tabStyled = tabStyles();
  const handleChange3 = (event, newValue) => {
    setValue(newValue);
  };

  // 달력
  const [toDay, onChange] = useState(new Date());
  // value console찍기
  const test = (value) => {
    console.log(value);
  };

  // API 연결

  let [movies, setMovies] = useState({
    popular: null,
    error: null,
    loading: true,
  });
  async function feactApi() {
    try {
      const {
        data: { results: popular1 },
      } = await moviesApi.popularPage(1);
      console.log("1", popular1);
      const {
        data: { results: popular2 },
      } = await moviesApi.popularPage(2);
      console.log("2", popular2);
      const {
        data: { results: popular3 },
      } = await moviesApi.popularPage(3);
      const {
        data: { results: popular4 },
      } = await moviesApi.popularPage(4);

      const data = [...popular1, ...popular2, ...popular3, ...popular4];
      // console.log("tmp", data);

      // const {
      //   data: { results: popular },
      // } = await moviesApi.popular();

      setMovies((movies) => ({ ...movies, popular: data }));
    } catch {
      setMovies((movies) => ({
        ...movies,
        error: "영화 정보를 찾을 수 없습니다!",
      }));
    } finally {
      setMovies((movies) => ({ ...movies, loading: false }));
    }
  }
  // API연결 렌더링
  useEffect(() => {
    feactApi();
  }, []);

  // user DATA
  const userData = useContext(UserContext);

  // user Choice
  const [moviesChoice, onMoviesChoice] = useState({
    choice: false,
    movie: null,
  });
  const [theaterChoice, onTheaterChoice] = useState({
    choice: false,
    theater: null,
  });
  const [dayChoice, onDayChoice] = useState({
    choice: true,
    day: null,
  });

  const area = [
    "서울",
    "부산",
    "경기/인천",
    "충청/대전",
    "경북/대구",
    "경남/울산",
    "강원/제주",
  ];

  return (
    <>
      <Container>
        <Header>
          <Refresh onClick={() => window.location.reload()}>
            처음부터 다시
          </Refresh>
        </Header>
        <Main>
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
                        {movies.popular &&
                          movies.popular.slice(0, 10).map((movie, idx) => (
                            <MovieLi
                              key={idx}
                              onClick={() =>
                                onMoviesChoice((movies) => ({
                                  ...movies,
                                  choice: true,
                                  movie,
                                }))
                              }
                              choice={movie}
                              current={moviesChoice.movie}
                            >
                              {idx + 1} {movie.adult ? null : ` [성인관람] `}
                              {movie.title}
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
                        {movies.popular &&
                          movies.popular.slice(10, 50).map((movie, idx) => {
                            return (
                              <MovieLi
                                key={idx}
                                onClick={() =>
                                  onMoviesChoice((movies) => ({
                                    ...movies,
                                    choice: true,
                                    movie,
                                  }))
                                }
                                choice={movie}
                                current={moviesChoice.movie}
                              >
                                {movie.adult ? `성인` : null} {movie.title}
                              </MovieLi>
                            );
                          })}
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
                                  }))
                                }
                                choice={movie}
                                current={moviesChoice.movie}
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
                      <Typography>설정한 MY극장이 없습니다.</Typography>
                      <Typography>설정하러 가실?</Typography>
                    </AccordionDetails2>
                  </Accordion2>
                </div>
                <div className={tabStyled.root}>
                  <Tabs
                    orientation="vertical"
                    variant="scrollable"
                    value={value}
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
                  {area.map((e, idx) => (
                    <TabPanel
                      value={value}
                      index={idx}
                      className={tabStyled.tabpanel}
                    >
                      {["가", "나", "다", "라", "마", "바", "사"].map(
                        (theater, idx) => (
                          <MovieLi
                            key={idx}
                            onClick={() =>
                              onTheaterChoice((area) => ({
                                ...area,
                                choice: true,
                                theater,
                              }))
                            }
                            choice={theater}
                            current={theaterChoice.theater}
                          >
                            test {theater}test {theater}test {theater}test
                            {theater}
                          </MovieLi>
                        )
                      )}
                    </TabPanel>
                  ))}
                </div>
              </TheaterChoice>
              <DayChoice>
                <span>관람일 선택</span>
                <div>
                  <CalenderBox
                    onChange={onChange}
                    onClick={test(toDay)}
                    value={toDay}
                    // TODO영화개봉날짜 props로 받아서 해당 날짜에border씌우기
                  />
                  <Explanation>
                    <p>
                      영화, 극장, 관람일을 선택하시면 시간 선택이 아래쪽에
                      나타납니다
                    </p>
                  </Explanation>
                </div>
              </DayChoice>
            </Choice>
            {moviesChoice.choice &&
              theaterChoice.choice &&
              dayChoice.choice && <TheaterDetail>상영관 정보</TheaterDetail>}
            <MoviesDetail>
              <MoviesInfo>
                <div />
                <div>
                  <div>movie.title</div>
                  <div>영화관정보</div>
                  <div>티켓시간 / 상영관</div>
                  <div>좌석 정보</div>
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
                <div></div>
                <div></div>
              </AmountInfo>
            </MoviesDetail>
          </MainReservation>
        </Main>
      </Container>
    </>
  );
};
export default Reservation;

const Container = styled.div`
  width: 100%;
  height: 1500px;
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

const MainReservation = styled.div`
  width: 1200px;
  height: 650px;
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
  > span {
    background-color: #f5f5f5;
  }
`;

const TheaterChoice = styled.div`
  display: flex;
  flex-direction: column;
`;

const DayChoice = styled.div`
  display: flex;
  flex-direction: column;
`;

const MoviesDetail = styled.div`
  margin-top: 40px;
  width: 100%;
  height: 188px;
  border: 1px solid red;
  background-color: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.25);
  display: grid;
  grid-template-columns: 492fr 358fr 348fr;
`;

const MoviesInfo = styled.div`
  padding: 0 10px 0 30px;
  display: felx;
  justify-content: center;
  /* align-items: center; */
  > div:nth-child(1) {
    width: 95px;
    height: 136px;
    margin: 24px 35px 0 0;
    background-color: red;
  }
  > div:nth-child(2) {
    width: 320px;
    height: 148px;
    padding-top: 42px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    font-size: 10px;
    color: red;
    > div:nth-child(1) {
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
`;

const TheaterDetail = styled(MoviesDetail)``;

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
    height: 410px;
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
  ${(props) =>
    props.choice === props.current ? `background:RGB(236, 97, 90)` : null};
  &:hover {
    background: RGB(236, 97, 90);
  }
`;
// Tab
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      // role="tabpanel"
      // hidden={value !== index}
      // id={`vertical-tabpanel-${index}`}
      // aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
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
