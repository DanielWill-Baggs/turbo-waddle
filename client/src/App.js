import { BrowserRouter, Routes, Route } from "react-router-dom";

// My Pages and Components
import Videos from "./pages/Videos";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route path="/" element={<Videos />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
