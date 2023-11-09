import { Router, Route, Routes } from "@solidjs/router";
import Login from "./pages/login/Login";
import Shop from "./pages/shop/Shop";
import Detail from "./pages/detail/Detail";
import About from "./pages/about/About";
import AdminProduct from "./pages/admin/AdminProduct";
import AdminProductAdd from "./pages/admin/AdminProductAdd";
import AdminProductEdit from "./pages/admin/AdminProductEdit";
import AdminCategory from "./pages/admin/AdminCategory";
import AdminCategoryAdd from "./pages/admin/AdminCategoryAdd";
import Contact from "./pages/contact/Contact";
import Infinitie from "./pages/contact/Infinitie";
import ErrorNotFound from "./pages/error/ErrorNotFound";

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
        <Route path="/infinitie" component={Infinitie} />
        <Route path="/admin_product" component={AdminProduct} />
        <Route path="/admin_product_add" component={AdminProductAdd} />
        <Route path="/admin_product_edit/:id" component={AdminProductEdit} />
        <Route path="/admin_category" component={AdminCategory} />
        <Route path="/admin_category_add" component={AdminCategoryAdd} />
        <Route path="*" component={ErrorNotFound} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
