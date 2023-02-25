import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        {/*404page*/}
        <Route path="*" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
