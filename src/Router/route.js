import { BrowserRouter,Routes,Route } from "react-router-dom";
import Login from "../Pages/Login/login";
import Detection from "../Pages/Detection/detection";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/Detection" element={<Detection/>}/>
      </Routes>
    </BrowserRouter>
  );
}