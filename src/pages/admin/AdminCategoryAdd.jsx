import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { createStore } from "solid-js/store";
import { createSignal } from "solid-js";
import supabase from "../../ultis/supabase";

const AdminCategoryAdd = () => {
    const [category, setCategory] = createSignal('')
    const [isErrorForm, setIsErrorForm] = createSignal(false)
    const [isHandling, setIsHandling] = createSignal(false)

    const showToast = () => {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    const updateFormField = (event) => {
        if (event.key === 'Enter' || event.keyCode === 13) {
            submitForm()
        } else {
            setCategory(event.currentTarget.value)
        }
    }

    const submitForm = async () => {
        if (category() == '') {
            setIsErrorForm(true)
        } else {
            setIsHandling(true)
            var dataInsert = {
                name: category()
            }
            await supabase.from('categories').insert(dataInsert).then(rs => {
                setCategory('')
                setIsHandling(false)
                showToast()
            })
        }
    }

    return (
        <>
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

                            {/* Product */}
                            <div class="card o-hidden border-0 shadow-lg my-5">
                                <div class="card-body p-0">
                                    <div class="row">
                                        <div class="col">
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h1 class="h4 text-gray-900 mb-4">Create a Category</h1>
                                                </div>
                                                <form action="#" class="user">
                                                    <div class="form-group row">
                                                        <div class="col mb-3 mb-sm-0">
                                                            <input type="text" class="form-control" placeholder="Name*" value={category()} onKeyUp={updateFormField} />
                                                            <span class={isErrorForm() ? '' : 'd-none'} style={'color: #e17f7d'}>Please enter the category name</span>
                                                        </div>
                                                    </div>
                                                    <button type="button" onClick={submitForm} class="btn btn-primary btn-user btn-block">
                                                        Register a category
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
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

            <div id="snackbar">The category has added <i class="fa fa-check-circle" aria-hidden="true"></i></div>

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

export default AdminCategoryAdd