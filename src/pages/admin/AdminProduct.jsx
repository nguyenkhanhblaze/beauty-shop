import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import supabase from "../../ultis/supabase";

const Admin = () => {
    const navigate = useNavigate();
    const [products, setProducts] = createSignal([])
    const [cbProduct, setCbProduct] = createSignal([])
    const [isHandling, setIsHandling] = createSignal(false)
    const [errorMess, setErrorMess] = createSignal('The product has deleted')
    const getProducts = async () => {
        var datas = await supabase.from('products').select(`id, name, prices, description, created_at`).order('id', { ascending: false })
        setProducts(datas.data)
        $('#dataTable').DataTable()
        jQuery(".loader").fadeOut()
    }

    // Format number as currency
    const priceFormatter = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)
    }

    createEffect(() => {
        if (!sessionStorage.getItem('isLogged')) {
            navigate('/login', { replace: true })
        }
        getProducts()
    })

    const addCheckBox = (id) => {
        setCbProduct(cbProduct => [id, ...cbProduct])
    }

    const addAllCheckBox = () => {
        var allProductIds = products().map(x => x.id);
        setCbProduct(allProductIds)
    }

    const showToast = () => {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    const deleteProduct = async () => {
        if (cbProduct().length < 1) {
            setErrorMess('Please select a product')
            showToast()
            return
        }
        setIsHandling(true)
        const { error } = await supabase
            .from('products')
            .delete()
            .in('id', cbProduct())
        setProducts(products().filter((e) => !cbProduct().includes(e.id)))
        setErrorMess('The product has deleted')
        setIsHandling(false)
        showToast()
    }

    return (
        <>
            {/* PreLoader */}
            <div class="loader">
                <div class="loader-inner">
                    <div class="circle"></div>
                </div>
            </div>
            {/* PreLoader Ends */}

            <div id="wrapper">

                {/* SideBar */}
                <AdminSidebar />
                {/* Sidebar Ends */}

                {/* Content Wrapper */}
                <div id="content-wrapper" class="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">

                        {/* Topbar */}
                        <AdminTopbar />
                        {/* Topbar Ends */}

                        {/* Begin Page Content */}
                        <div class="container-fluid">

                            {/* DataTales Product */}
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <div class="row">
                                        <div class="col align-self-center">
                                            <h6 class="m-0 font-weight-bold text-primary">List of Products</h6>
                                        </div>
                                        <div class="col text-right cus-d-lg">
                                            <button onClick={deleteProduct} class="btn btn-danger mr-1"><span class="icon text-white-50"><i class="fa fa-trash" aria-hidden="true"></i></span> Delete</button>
                                            <a href="/admin_product_add" class="btn btn-primary">
                                                <span class="icon text-white-50"><i class="fas fa-plus-circle"></i></span>
                                                <span class="text">Add</span>
                                            </a>
                                        </div>
                                    </div>
                                    <div class="d-sm-none row mt-2">
                                        <div class="col">
                                            <button onClick={deleteProduct} class="btn btn-danger mr-1"><span class="icon text-white-50"><i class="fa fa-trash" aria-hidden="true"></i></span> Delete</button>
                                            <a href="/admin_product_add" class="btn btn-primary">
                                                <span class="icon text-white-50"><i class="fas fa-plus-circle"></i></span>
                                                <span class="text">Add</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th><input onClick={addAllCheckBox} type="checkbox" /> No.</th>
                                                    <th>Name</th>
                                                    <th>Prices</th>
                                                    <th>Description</th>
                                                    <th>Created date</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyTable">
                                                <For each={products()}>{(product, i) =>
                                                    <tr>
                                                        <td><input onClick={[addCheckBox, product.id]} type="checkbox" /> {i() + 1}</td>
                                                        <td><a href={`/admin_product_edit/${product.id}`} >{product.name}</a></td>
                                                        <td>{priceFormatter(product.prices)}</td>
                                                        <td>{product.description}</td>
                                                        <td>{`${product.created_at}`.slice(0, 10)}</td>
                                                    </tr>
                                                }</For>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                        </div>
                        {/* /.container-fluid */}

                    </div>
                    {/* End of Main Content */}

                </div>
                {/* End of Content Wrapper */}
            </div>

            <div id="snackbar">{errorMess()} <i style={errorMess() === 'Please select a product' ? 'display:none' : ''} class="fa fa-check-circle" aria-hidden="true"></i></div>

            {/* Overlay Screen */}
            {
                isHandling() && (
                    <div class="overlay">
                        <div class="overlay__inner">
                            <div class="overlay__content"><span class="spinner"></span></div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default Admin