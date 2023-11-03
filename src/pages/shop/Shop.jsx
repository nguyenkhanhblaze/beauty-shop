import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { createSignal, onMount } from "solid-js";
import { createClient } from '@supabase/supabase-js';

const Shop = () => {
    const supabase = createClient('https://yiglmbcswqzvxmhstwiq.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlpZ2xtYmNzd3F6dnhtaHN0d2lxIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg3MjUzNjEsImV4cCI6MjAxNDMwMTM2MX0.39hMv8Bgxlv3GmUX04JimOM632Ypbee1Zr8r-6cophE')
    const [categories, setCategories] = createSignal([]);
    const [products, setProducts] = createSignal([]);


    const getCategories = async () => {
        var datas = await supabase.from('categories').select()
        setCategories(datas.data)
    }

    const getProducts = async () => {
        var datas = await supabase.from('products').select()
        setProducts(datas.data)
        $('#datafilter-all').trigger("click")
        jQuery(".loader").fadeOut()
    }

    // Format number as currency
    const priceFormatter = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)
    }

    onMount(() => {
        getCategories()
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

            {/* Header Component */}
            <Header />
            {/* Header Component Ends */}

            {/* breadcrumb-section */}
            <div class="breadcrumb-section breadcrumb-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            <div class="breadcrumb-text">
                                <p>Fresh and Organic</p>
                                <h1>Shop</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* end breadcrumb section */}

            {/* products */}
            <div class="product-section mt-150 mb-150">
                <div class="container">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="product-filters">
                                <ul>
                                    <li id="datafilter-all" class="active li-product" data-filter="*">All</li>
                                    <For each={categories()}>{(category, i) =>
                                        <li class="li-product" data-filter={'.' + category.name}>{category.name}</li>
                                    }</For>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="row product-lists">
                        <For each={products()}>{(product, i) =>
                            <div class={`col-lg-4 col-md-6 text-center ${product.name}`}>
                                <div class="single-product-item">
                                    <div class="product-image">
                                        <a href={`/detail/${product.id}`}><img src={product.image} class="img-product" /></a>
                                    </div>
                                    <h3>{product.name}</h3>
                                    <p class="product-price"><span>{product.description}</span>{priceFormatter(product.prices)}</p>
                                    <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                                </div>
                            </div>
                        }</For>
                    </div>

                    {/* <div class="row">
                        <div class="col-lg-12 text-center">
                            <div class="pagination-wrap">
                                <ul>
                                    <li><a href="#">Prev</a></li>
                                    <li><a href="#">1</a></li>
                                    <li><a class="active" href="#">2</a></li>
                                    <li><a href="#">3</a></li>
                                    <li><a href="#">Next</a></li>
                                </ul>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
            <style>{`
                .img-product {height: 24vh}
            `}</style>
            {/* end products */}

            {/* Footer Component */}
            <Footer />
            {/* Footer Component Ends */}
        </>
    )
}

export default Shop