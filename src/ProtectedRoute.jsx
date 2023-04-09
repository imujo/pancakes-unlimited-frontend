import React from "react";
// import { APP_ROUTES } from "./utils/constants";
// import server from "./utils/server";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  // CAN BE USED FOR AUTHENTICATING JWT TOKEN ON EVERY REQUEST
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   setLoading(true);
  //   localStorage.setItem(
  //     "token",
  //     "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJlbXBsb3llZSIsInJvbGUiOjIsImlhdCI6MTY4MDU0NTc5MiwiZXhwIjoxNjgwNjMyMTkyfQ.CD4TinEGzC9JJOpTx7_Ns__E8QyITft2bnTBzbpFpuga"
  //   );
  //   server
  //     .get(APP_ROUTES.IS_AUTHENTICATED)
  //     .then((res) => {
  //       console.log("works");
  //       if (res.status === 200) {
  //         setIsAuthenticated(true);
  //       }
  //     })
  //     .catch((err) => {})
  //     .finally(() => setLoading(false));
  // }, []);

  // if (loading) {
  //   return <div />;
  // }

  const token = localStorage.getItem("token");

  if (token) {
    return <Outlet />;
  }

  return <Navigate to={"/login"} replace />;
}
