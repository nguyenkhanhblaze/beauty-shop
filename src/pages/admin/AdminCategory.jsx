import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { createEffect, createSignal } from "solid-js";
import supabase from "../../ultis/supabase";

const AdminCategory = () => {
    const [categories, setCategories] = createSignal([])
    const [cbCategory, setCbCategory] = createSignal([])
    const [isHandling, setIsHandling] = createSignal(false)
    const [errorMess, setErrorMess] = createSignal('The category has deleted')

    const getCategories = async () => {
        var datas = await supabase.from('categories').select().order('id', { ascending: false })
        setCategories(datas.data)
        $('#dataTable').DataTable()
        jQuery(".loader").fadeOut()
    }

    const showToast = () => {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    createEffect(() => {
        getCategories()
    })

    const addCheckBox = (id) => {
        setCbCategory(cbCategory => [id, ...cbCategory])
    }

    const deleteCategory = async () => {
        if (cbCategory().length < 1) {
            setErrorMess('Please select a category')
            showToast()
            return
        }
        setIsHandling(true)
        const { error } = await supabase
            .from('categories')
            .delete()
            .in('id', cbCategory())
        setCategories(categories().filter((e) => !cbCategory().includes(e.id)))
        setErrorMess('The category has deleted')
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
                                            <h6 class="m-0 font-weight-bold text-primary">List of Category</h6>
                                        </div>
                                        <div class="col text-right cus-d-lg">
                                            <button onClick={deleteCategory} class="btn btn-danger mr-1"><span class="icon text-white-50"><i class="fa fa-trash" aria-hidden="true"></i></span> Delete</button>
                                            <a href="/admin_category_add" class="btn btn-primary">
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
                                                    <th>Created date</th>
                                                </tr>
                                            </thead>
                                            <tbody id="tbodyTable">
                                                <For each={categories()}>{(category, i) =>
                                                    <tr>
                                                        <td><input onClick={[addCheckBox, category.id]} type="checkbox" /> {i() + 1}</td>
                                                        <td><a href={`/admin_category_edit/${category.id}`}>{category.name}</a></td>
                                                        <td>{`${category.created_at}`.slice(0, 10)}</td>
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

            <div id="snackbar">{errorMess()} <i style={errorMess() === 'Please select a category' ? 'display:none' : ''} class="fa fa-check-circle" aria-hidden="true"></i></div>

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

export default AdminCategory