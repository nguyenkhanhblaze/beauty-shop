import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import supabase from "../../ultis/supabase";

const Admin = () => {
    const navigate = useNavigate();
    const [products, setProducts] = createSignal([])

    const getProducts = async () => {
        var datas = await supabase.from('products').select()
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
                                        <div class="col text-right">
                                            <a href="/admin_product_add" class="btn btn-primary btn-icon-split">
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
                                                    <th>No.</th>
                                                    <th>Name</th>
                                                    <th>Prices</th>
                                                    <th>Description</th>
                                                    <th>Created date</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyTable">
                                                <For each={products()}>{(product, i) =>
                                                    <tr>
                                                        <td>{i() + 1}</td>
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
        </>
    )
}

export default Admin