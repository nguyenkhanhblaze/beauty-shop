import { createEffect, createSignal } from "solid-js";
import { useNavigate } from "@solidjs/router";
import "/src/assets/js_admin/sb-admin-2.min.css";
import "/src/assets/js_admin/dataTables.bootstrap4.min.css";

import { } from "/src/assets/js_admin/bootstrap.bundle.min.js";
// import { } from "/src/assets/js_admin/jquery.easing.min.js";

import { } from "/src/assets/js_admin/sb-admin-2.js";

import { } from "/src/assets/js_admin/jquery.dataTables.min.js";
import { } from "/src/assets/js_admin/dataTables.bootstrap4.min.js";
// import { } from "/src/assets/js_admin/datatables-demo.js";
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

    const logOut = () => {
        sessionStorage.removeItem("isLogged")
        navigate('/login', { replace: true })
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
                {/* Sidebar */}
                <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                    {/* Sidebar - Brand */}
                    <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
                        <div class="sidebar-brand-icon">
                            <i class="fas fa-fw fa-cog"></i>
                        </div>
                        <div class="sidebar-brand-text mx-3">Admin Page</div>
                    </a>

                    {/* Divider */}
                    <hr class="sidebar-divider my-0" />

                    {/* Nav Item - Dashboard */}
                    <li class="nav-item">
                        <a class="nav-link admin-nav-link" href="#">
                            <i class="fas fa-fw fa-chart-area"></i>
                            <span>Dashboard</span></a>
                    </li>

                    {/* Divider */}
                    <hr class="sidebar-divider" />

                    {/* Heading */}
                    <div class="sidebar-heading">
                        Interface
                    </div>

                    <li class="nav-item">
                        <a class="nav-link active" href="#">
                            <i style={'color:white'} class="fa fa-wrench"></i>
                            <span>Products</span></a>
                    </li>

                    {/* Divider */}
                    <hr class="sidebar-divider d-none d-md-block" />

                    {/* Sidebar Toggler (Sidebar) */}
                    <div class="text-center d-none d-md-inline">
                        <button class="rounded-circle border-0" id="sidebarToggle"></button>
                    </div>

                </ul>
                {/* End of Sidebar */}

                {/* Content Wrapper */}
                <div id="content-wrapper" class="d-flex flex-column">

                    {/* Main Content */}
                    <div id="content">

                        {/* Topbar */}
                        <nav class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">
                            {/* Sidebar Toggle (Topbar) */}
                            <button id="sidebarToggleTop" class="btn btn-link d-md-none rounded-circle mr-3">
                                <i class="fa fa-bars"></i>
                            </button>

                            {/* Topbar Navbar */}
                            <ul class="navbar-nav ml-auto m-0">
                                {/* Nav Item - Alerts */}
                                <li class="nav-item dropdown no-arrow mx-1">
                                    <a class="nav-link dropdown-toggle" href="#" id="alertsDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-bell fa-fw"></i>
                                        {/* Counter - Alerts */}
                                        <span class="badge badge-danger badge-counter">3+</span>
                                    </a>
                                    {/* Dropdown - Alerts */}
                                    <div class="dropdown-list dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="alertsDropdown">
                                        <h6 class="dropdown-header">
                                            Alerts Center
                                        </h6>
                                        <a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="mr-3">
                                                <div class="icon-circle bg-primary">
                                                    <i class="fas fa-file-alt text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="small text-gray-500">December 12, 2019</div>
                                                <span class="font-weight-bold">A new monthly report is ready to download!</span>
                                            </div>
                                        </a>
                                        <a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="mr-3">
                                                <div class="icon-circle bg-success">
                                                    <i class="fas fa-donate text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="small text-gray-500">December 7, 2019</div>
                                                $290.29 has been deposited into your account!
                                            </div>
                                        </a>
                                        <a class="dropdown-item d-flex align-items-center" href="#">
                                            <div class="mr-3">
                                                <div class="icon-circle bg-warning">
                                                    <i class="fas fa-exclamation-triangle text-white"></i>
                                                </div>
                                            </div>
                                            <div>
                                                <div class="small text-gray-500">December 2, 2019</div>
                                                Spending Alert: We've noticed unusually high spending for your account.
                                            </div>
                                        </a>
                                        <a class="dropdown-item text-center small text-gray-500" href="#">Show All Alerts</a>
                                    </div>
                                </li>

                                <div class="topbar-divider d-none d-sm-block"></div>

                                {/* Nav Item - User Information */}
                                <li class="nav-item dropdown no-arrow">
                                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" role="button"
                                        data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <span class="mr-2 d-none d-lg-inline text-gray-600 small">Systems Administrator</span>
                                        <img class="img-profile rounded-circle"
                                            src="img/undraw_profile.svg" />
                                    </a>
                                    {/* Dropdown - User Information */}
                                    <div class="dropdown-menu dropdown-menu-right shadow animated--grow-in"
                                        aria-labelledby="userDropdown">
                                        <a class="dropdown-item" href="#">
                                            <i class="fas fa-user fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Profile
                                        </a>
                                        <div class="dropdown-divider"></div>
                                        <a onClick={logOut} class="dropdown-item">
                                            <i class="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400"></i>
                                            Logout
                                        </a>
                                    </div>
                                </li>

                            </ul>

                        </nav>
                        {/* End of Topbar */}

                        {/* Begin Page Content */}
                        <div class="container-fluid">

                            {/* DataTales Example */}
                            <div class="card shadow mb-4">
                                <div class="card-header py-3">
                                    <h6 class="m-0 font-weight-bold text-primary">List of Products</h6>
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
                                                        <td>{product.name}</td>
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