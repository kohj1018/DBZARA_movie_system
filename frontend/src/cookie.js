import { Cookies, useCookies } from "react-cookie";

const cookies = new Cookies();

export const SetCookie = (name, value, option) => {
  return cookies.set(name, value, option);
};
// export const SetCookie = (name, value) => {
//   return cookies.save(name, value);
// };

export const GetCookie = (name) => {
  return cookies.get(name);
};
