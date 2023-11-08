import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";
import { createStore } from "solid-js/store";
import { createEffect, createSignal } from "solid-js";
import supabase from "../../ultis/supabase";

const AdminProductAdd = () => {
    const [form, setForm] = createStore({
        name: '',
        category_id: '',
        image: '',
        prices: '',
        description: ''
    })
    const [isErrorForm, setIsErrorForm] = createSignal(false)
    const [categories, setCategories] = createSignal([])
    const [isHandling, setIsHandling] = createSignal(false)

    const onChangeImage = (data, event) => {
        const [file] = imgInp.files

        // Render to preview image
        if (file) {
            blah.src = URL.createObjectURL(file)
        }

        // Convert image to base64
        let reader = new FileReader()
        reader.onloadend = function () {
            console.log('converted to base64', reader.result)
            setForm({
                'image': reader.result
            })
        }
        reader.readAsDataURL(file)
    }

    const updateFormField = (fieldName, event) => {
        setForm({
            [fieldName]: event.currentTarget.value
        })
    }

    const showToast = () => {
        var x = document.getElementById("snackbar");
        x.className = "show";
        setTimeout(function () { x.className = x.className.replace("show", ""); }, 3000);
    }

    const submitForm = async () => {
        if (form.name == '') {
            setIsErrorForm(true)
        } else {
            setIsHandling(true)
            await supabase.from('products').insert(form).then(rs => {
                setForm({
                    name: '',
                    category_id: '',
                    prices: '',
                    description: ''
                })
                blah.src = '#'
                imgInp.value = ''
                setIsHandling(false)
                showToast()
            })
        }
    }

    const getCategories = async () => {
        var datas = await supabase.from('categories').select()
        setCategories(datas.data)
    }

    createEffect(() => {
        getCategories()
    })

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
                                        <div class="col-lg-5 d-none d-lg-block">
                                            <img id="blah" src="#" class="card-img-top" alt="Product Image" />
                                        </div>
                                        <div class="col-lg-7">
                                            <div class="p-5">
                                                <div class="text-center">
                                                    <h1 class="h4 text-gray-900 mb-4">Create a Product</h1>
                                                </div>
                                                <form class="user">
                                                    <div class="form-group row">
                                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                                            <input type="text" class="form-control" placeholder="Name*" value={form.name} onChange={[updateFormField, 'name']} />
                                                            <span class={isErrorForm() ? '' : 'd-none'} style={'color: #e17f7d'}>Please enter the product name</span>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <select class="form-control" onChange={[updateFormField, 'category_id']} value={form.category_id}>
                                                                <For each={categories()}>{(category, i) =>
                                                                    <option value={category.id}>{category.name}</option>
                                                                }</For>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="form-group row">
                                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                                            <input type="file" accept="image/*" id="imgInp" onChange={[onChangeImage, 'image']} />
                                                        </div>
                                                        <div class="col-sm-6 mb-3 mb-sm-0">
                                                            <input type="text" class="form-control" placeholder="Prices" value={form.prices} onChange={[updateFormField, 'prices']} />
                                                        </div>
                                                    </div>
                                                    <div class="form-group">
                                                        <textarea class="form-control" rows="3" placeholder="Description" value={form.description} onChange={[updateFormField, 'description']} />
                                                    </div>
                                                    <button type="button" onClick={submitForm} class="btn btn-primary btn-user btn-block">
                                                        Register a product
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

            <div id="snackbar">The product has added <i class="fa fa-check-circle" aria-hidden="true"></i></div>

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

export default AdminProductAdd