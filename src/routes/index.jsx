import LandingPage from "../../src/views/LandingPage/LandingPage.jsx";
import AuthPage from "../views/LoginPage/AuthPage.jsx";
import AccountPage from  "../views/Authentication/Account"
import ReserveAuth from "../views/ReservationPage/ReserveAuth";

const indexRoutes = [
  { path: "/profile", name: "Account", component: AccountPage },
  { path: "/reserve-page", name: "ReserveAuthPage", component: ReserveAuth },
  { path: "/login-page", name: "LoginPage", component: AuthPage },
  { path: "/", name: "LandingPage", component: LandingPage }
];

export default indexRoutes;
