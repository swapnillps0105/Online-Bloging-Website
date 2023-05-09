import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import TopBar from "./components/topbar/TopBar";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import Context, { MyContext } from "./context/Context";
import { useContext, useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
function App() {
  const [isLoading, setLoading] = useState(false);
  const { isLogin, setLogin, user, setUser } = useContext(MyContext);
  useEffect(() => {
    const storedLoginResponse = localStorage.getItem("userData");
    if (storedLoginResponse) {
      const loginResponse = JSON.parse(storedLoginResponse);
      setUser(loginResponse);
      setLogin(true);
    }
    setLoading(false);
    console.log(storedLoginResponse);
  }, []);
  if (isLoading) return <h1>Please wait,your page is loading</h1>;
  return (
    <div>
      <ToastContainer/>
      <Router>
        <TopBar />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/Write"} element={isLogin ? <Write /> : <Register />} />
          <Route
            path={"/register"}
            element={isLogin ? <Home /> : <Register />}
          />
          <Route path={"/login"} element={isLogin ? <Home /> : <Login />} />
          <Route
            path={"/settings"}
            element={isLogin ? <Settings /> : <Register />}
          />
          <Route path={"/post/:postId"} element={<Single />} />
        </Routes>
      </Router>
    </div>
  );
}

export default () => {
  return (
    <Context>
      <App />
    </Context>
  );
};
