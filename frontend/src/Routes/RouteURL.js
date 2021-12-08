import Home from "Routes/Home";
import Movies from "Routes/Movies";
import MoviesInfo from "Routes/MoviesInfo";
import Reservation from "Routes/Reservation/Reservation";
import Theater from "Routes/Theater";
import Event from "Routes/Event";
import Store from "Routes/Store";
import Login from "Routes/Login";
import MyPage from "Routes/MyPage";
import MyPageMyMovie from "Routes/MyPageMyMovie";
import MyPageMyRating from "Routes/MyPageMyRating";
import GuideInfo from "Routes/GuideInfo"
// import join from "Routes/Join";
import Filmography from "Routes/Filmography";
import MoviesRating from "./MoviesRating";
import MoviesNotOpen from "./MoviesNotOpen";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/Movies",
    component: Movies,
  },
  {
    path: "/Movies/Review-Rating",
    component: MoviesRating,
  },
  {
    path: "/Movies/Upcoming-Release",
    component: MoviesNotOpen,
  },
  // 이거 왜 MovieView.js의 Link to랑 같이 "/MoviesInfo/Index?mId=:id"로 바꾸면 안되지?
  {
    path: "/MoviesInfo/Index/:id",
    component: MoviesInfo,
  },
  {
    path: "/MoviesInfo/People/:id",
    component: Filmography,
  },
  {
    path: "/Reservation",
    component: Reservation,
  },
  {
    path: "/Theater",
    component: Theater,
  },
  {
    path: "/Event",
    component: Event,
  },
  {
    path: "/Store",
    component: Store,
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/MyPage",
    component: MyPage,
  },
  {
    path: "/MyPage/MyMovie",
    component: MyPageMyMovie,
  },
  {
    path: "/MyPage/MyRating",
    component: MyPageMyRating,
  },
  {
    path: "/GuideInfo",
    component: GuideInfo,
  },
];
