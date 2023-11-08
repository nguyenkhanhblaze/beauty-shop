// CSS import
import "/src/assets/js_admin/sb-admin-2.min.css";
import "/src/assets/js_admin/dataTables.bootstrap4.min.css";

// JS import
import { } from "/src/assets/js_admin/bootstrap.bundle.min.js";
import { } from "/src/assets/js_admin/sb-admin-2.js";
import { } from "/src/assets/js_admin/jquery.dataTables.min.js";
import { } from "/src/assets/js_admin/dataTables.bootstrap4.min.js";

const AdminSidebar = () => {

    const isActiveSidebarItem = (data) => {
        var pathURL = document.location.pathname
        pathURL = pathURL.substring(1)

        if (data === pathURL) {
            return true
        } else {
            if (data === 'admin_product' && (pathURL === 'admin_product_add' || pathURL === 'admin_product_edit')) {
                return true
            }
            return false
        }
    }

    return (
        <>
            {/* Sidebar */}
            <ul class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion" id="accordionSidebar">

                {/* Sidebar - Brand */}
                <a class="sidebar-brand d-flex align-items-center justify-content-center" href="/">
                    <div class="sidebar-brand-icon">
                        <i class="fas fa-fw fa-home"></i>
                    </div>
                    <div class="sidebar-brand-text mx-3">Home Page</div>
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

                <li class="nav-item active">
                    <a class="nav-link collapsed active" href="#" data-toggle="collapse" data-target="#collapseSetting"
                        aria-expanded="true" aria-controls="collapseSetting">
                        <i class="fas fa-fw fa-wrench"></i>
                        <span>Setting</span>
                    </a>
                    <div id="collapseSetting" class="collapse" aria-labelledby="headingUtilities"
                        data-parent="#accordionSidebar">
                        <div class="bg-white py-2 collapse-inner rounded">
                            <a class={isActiveSidebarItem('admin_product') ? 'active collapse-item' : 'collapse-item'} href="/admin_product">Products</a>
                            <a class={isActiveSidebarItem('admin_category') ? 'active collapse-item' : 'collapse-item'} href="/admin_category">Categories</a>
                        </div>
                    </div>
                </li>

                {/* Divider */}
                <hr class="sidebar-divider d-none d-md-block" />

                {/* Sidebar Toggler (Sidebar) */}
                <div class="text-center d-none d-md-inline">
                    <button class="rounded-circle border-0" id="sidebarToggle"></button>
                </div>

            </ul>
            {/* End of Sidebar */}
        </>
    )
}

export default AdminSidebar