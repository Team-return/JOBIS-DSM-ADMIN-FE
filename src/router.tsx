import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Components/Login/Login";

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        {/*404page*/}
        <Route path="*" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
