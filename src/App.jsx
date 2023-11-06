import { Router, Route, Routes } from "@solidjs/router";
import Login from "./pages/login/Login";
import Shop from "./pages/shop/Shop";
import Detail from "./pages/detail/Detail";
import About from "./pages/about/About";
import Admin from "./pages/admin/Admin";
import Contact from "./pages/contact/Contact";

function App() {
  return (
    <>
    <Router>
      <Routes>
        <Route path="/" component={Shop} />
        <Route path="/login" component={Login} />
        <Route path="/search/:keyword" component={Shop} />
        <Route path="/detail/:id" component={Detail} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/admin" component={Admin} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
