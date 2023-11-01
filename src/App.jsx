import { Router, Route, Routes } from "@solidjs/router";
import Shop from "./pages/shop/Shop";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" component={Shop} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
