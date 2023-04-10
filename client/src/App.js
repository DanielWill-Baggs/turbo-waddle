import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";

// My Pages and Components
import Videos from "./pages/Videos";
import VideoCapture from "./components/video-capture";
import Videosegments from "./pages/VideoSegments";

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <BrowserRouter>
          <div className="pages">
            <Routes>
              <Route path="/" element={[<Videos />, <Videosegments />]}></Route>
              <Route path="/videocapture" element={<VideoCapture />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ChakraProvider>
  );
}

export default App;
