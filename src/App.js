import React from "react";
import { Routes, Route } from "react-router-dom";
import { Signin } from "./Components/Pages/Signin/Signin";
import MainPage from "./Components/Pages/MainPage/MainPage";
import HomeOne from "./Components/Pages/Home One/HomeOne";
import HomeTwo from "./Components/Pages/Home Two/HomeTwo";
import Settings from "./Components/Pages/Settings/Settings";
import PageNotFound from "./Components/Pages/404/PageNotFound";
import Test from "./Components/Pages/Test/Test";
import Result from "./Components/Pages/Result/Result";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/" element={<Signin />} />
        <Route path="/welcome-page" element={<MainPage />}>
          <Route path="test" element={<Test />} />
          <Route path="result" element={<Result />} />
          <Route path="home-one" element={<HomeOne />} />
          <Route path="home-two" element={<HomeTwo />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
