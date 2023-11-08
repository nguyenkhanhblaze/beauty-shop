import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { createEffect, createSignal } from "solid-js";
import supabase from "../../ultis/supabase";

const AdminCategory = () => {
    const [categories, setCategories] = createSignal([])

    const getCategories = async () => {
        var datas = await supabase.from('categories').select()
        setCategories(datas.data)
        $('#dataTable').DataTable()
        jQuery(".loader").fadeOut()
    }

    createEffect(() => {
        getCategories()
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
                                    <h6 class="m-0 font-weight-bold text-primary">List of Category</h6>
                                </div>
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-hover" id="dataTable" width="100%" cellspacing="0">
                                            <thead>
                                                <tr>
                                                    <th>No.</th>
                                                    <th>Name</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyTable">
                                                <For each={categories()}>{(category, i) =>
                                                    <tr>
                                                        <td>{i() + 1}</td>
                                                        <td>{category.name}</td>
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
                {/* Content Wrapper Ends */}

            </div>

        </>
    )
}

export default AdminCategory