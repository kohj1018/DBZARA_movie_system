import Home from "Routes/Home";
import Movies from "Routes/Movies";
import MoviesInfo from "Routes/MoviesInfo";
import Reservation from "Routes/Reservation";
import Theater from "Routes/Theater";
import Event from "Routes/Event";
import Store from "Routes/Store/Store";
import StoreTicket from "Routes/Store/Ticket";
import StorePopcorn from "Routes/Store/Popcorn";
import StorePointMall from "Routes/Store/Pointmall";
import Login from "Routes/Login";
import join from "Routes/Join";
import Filmography from "Filmography";

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
    path: "/Store/Ticket",
    component: StoreTicket,
  },
  {
    path: "/Store/Popcorn",
    component: StorePopcorn,
  },
  {
    path: "/Store/Pointmall",
    component: StorePointMall,
  },
  {
    path: "/Login",
    component: Login,
  },
  {
    path: "/Join",
    component: join,
  },
];
