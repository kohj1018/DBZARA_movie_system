import Home from "Routes/Home";
import Movies from "Routes/Movies";
import Reservation from "Routes/Reservation";
import Theater from "Routes/Theater";
import Event from "Routes/Event";
import Store from "Routes/Store/Store";
// import StoreTicket from "Routes/Store/Ticket";
// import StorePopcorn from "Routes/Store/Popcorn";
// import StorePointMall from "Routes/Store/Pointmall";
import Login from "Routes/Login";
import join from "Routes/Join";

// eslint-disable-next-line import/no-anonymous-default-export
export default [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/movies",
    component: Movies,
  },
  {
    path: "/reservation",
    component: Reservation,
  },
  {
    path: "/theater",
    component: Theater,
  },
  {
    path: "/event",
    component: Event,
  },
  {
    path: "/store",
    component: Store,
  },
  //   {
  //     path: "/store/ticket",
  //     component: StoreTicket,
  //   },
  //   {
  //     path: "/store/popcorn",
  //     component: StorePopcorn,
  //   },
  //   {
  //     path: "/store/pointmall",
  //     component: StorePointMall,
  //   },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/join",
    component: join,
  },
];
