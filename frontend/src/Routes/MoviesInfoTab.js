import Default from "Routes/MoviesInfoDetail/Default";
import People from "Routes/MoviesInfoDetail/People";
import Videos from "Routes/MoviesInfoDetail/Videos";
import Photos from "Routes/MoviesInfoDetail/Photos";
import Articles from "Routes/MoviesInfoDetail/Articles";
import Rates from "Routes/MoviesInfoDetail/Rates";

export default [
  {
    tabName: "기본정보",
    path: "/default/:id",
    pathFetch: "/default",
    component: Default
  },
  {
    tabName: "배우·제작진",
    path: "/people/:id",
    pathFetch: "/people",
    component: People
  },
  {
    tabName: "동영상",
    path: "/videos/:id",
    pathFetch: "/videos",
    component: Videos
  },
  {
    tabName: "포토",
    path: "/photos/:id",
    pathFetch: "/photos",
    component: Photos
  },
  {
    tabName: "관련기사",
    path: "/articl/:id",
    pathFetch: "/articles",
    component: Articles
  },
  {
    tabName: "평점",
    path: "/rates/:id",
    pathFetch: "/rates",
    component: Rates
  }
];
