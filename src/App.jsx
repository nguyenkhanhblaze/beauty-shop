import { Router, Route, Routes } from "@solidjs/router";
import Home from "./pages/home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" component={Home} />
      </Routes>
    </Router>
  );
}

export default App;
