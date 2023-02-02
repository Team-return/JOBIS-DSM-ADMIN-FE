import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";

function MainRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        {/*404page*/}
        <Route path="*" element="" />
      </Routes>
    </BrowserRouter>
  );
}

export default MainRouter;
