import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { createSignal, createEffect, onCleanup } from "solid-js";
import { useParams } from "@solidjs/router";
import imageExample from "/src/assets/js/imageExample";
import supabase from "../../ultis/supabase";

const Shop = () => {
    const keyWordParam = useParams().keyword
    const [categories, setCategories] = createSignal([]);
    const [products, setProducts] = createSignal([]);
    const [isLoadingMore, setIsLoadingMore] = createSignal(false)
    const [infiniteScroll, setInfiniteScroll] = createSignal(1000)
    const [isFullData, setIsFullData] = createSignal(false)

    const getCategories = async () => {
        var datas = await supabase.from('categories').select(`id, name`)
        setCategories(datas.data)
    }

    const getProducts = async () => {
        if (keyWordParam) {
            var datas = await supabase.rpc('get_products', { keyword: keyWordParam })
            setProducts(datas.data)
            $('#datafilter-all').trigger("click")
            jQuery(".loader").fadeOut()
        } else {
            var datas = await supabase.from('products').select().order('id', { ascending: false }).range(0, 5)
            setProducts(datas.data)
            $('#datafilter-all').trigger("click")
            jQuery(".loader").fadeOut()
        }
    }

    // Format number as currency
    const priceFormatter = (price) => {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(price)
    }

    var localLimit = 5
    var isWaiting = false
    const handleScroll = async () => {
        if (window.scrollY > infiniteScroll() && !isFullData() && !isWaiting) {
            setIsLoadingMore(true)
            // Call more item
            setInfiniteScroll(infiniteScroll() + 1000)
            isWaiting = true
            var { data, error } = await supabase.from('products').select().order('id', { ascending: false }).range(localLimit + 1, localLimit + 6)
            if (data.length > 0) {
                localLimit = localLimit + 6
                var newRecords = '';
                data.forEach((product) => {
                    newRecords += `<div class="grid-item col-lg-4 col-md-6 text-center category-${product.category_id}"}>
                    <div class="single-product-item">
                        <div class="product-image">
                            <a class="d-inline-block" href="/detail/${product.id}"><img src=${product.image ? product.image : imageExample} class="img-product" /></a>
                        </div>
                        <h3><a style='color:#242424' href="/detail/${product.id}"><p class="title-product">${product.name}</p></a></h3>
                        <p class="product-price"><span class="txt-desc-product">${product.description}</span>${priceFormatter(product.prices)}</p>
                        <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                    </div>
                </div>`
                })
                var $newItems = $(newRecords)
                $('#product-lists').isotope('insert', $newItems)
                isWaiting = false
                setIsLoadingMore(false)
            } else {
                // console.log('get full data')
                setIsFullData(true)
                setIsLoadingMore(false)
            }
        }
    }

    onCleanup(() => {
        if ('scrollRestoration' in history) {
            history.scrollRestoration = 'manual'
        }
        window.scrollTo(0, 0)
    })

    createEffect(() => {
        getCategories()
        getProducts()
        window.addEventListener("scroll", handleScroll)
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

            {/* condition search */}
            <Show when={keyWordParam}>
                <div class="container mt-3">
                    <div class="row col-sm">
                        <h4 class="mt-3">Condition Searched: </h4>
                        <span class="custom-keyword-searching">{keyWordParam}<a type="button" class="close ml-1" aria-label="Close" href='/'>
                            <span aria-hidden="true">&times;</span>
                        </a></span>
                    </div>
                </div>
            </Show>
            {/* end condition search */}

            {/* products */}
            <div class="product-section mt-150 mb-150">
                <div class="container">

                    <div class="row">
                        <div class="col-md-12">
                            <div class="product-filters">
                                <ul>
                                    <li id="datafilter-all" class="active li-product" data-filter="*">All</li>
                                    <For each={categories()}>{(category, i) =>
                                        <li class="li-product" data-filter={'.category-' + category.id}>{category.name}</li>
                                    }</For>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="row" id="product-lists">
                        <For each={products()}>{(product, i) =>
                            <div class={`grid-item col-lg-4 col-md-6 text-center category-${product.category_id}`}>
                                <div class="single-product-item">
                                    <div class="product-image">
                                        <a class="d-inline-block" href={`/detail/${product.id}`}><img src={product.image ? product.image : imageExample} class="img-product" /></a>
                                    </div>
                                    <h3><a style={'color:#242424'} href={`/detail/${product.id}`}><p class="title-product">{product.name}</p></a></h3>
                                    <p class="product-price"><span class="txt-desc-product">{product.description}</span>{priceFormatter(product.prices)}</p>
                                    <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                                </div>
                            </div>
                        }</For>
                    </div>

                    <div class={isLoadingMore() ? 'row' : 'd-none row'} style={'place-content: center'}>
                        <div class="spinner-border" role="status">
                            <span class="sr-only">Loading...</span>
                        </div>
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
                .img-product {height: 25vh}
                .custom-keyword-searching {
                    color: #6f6f6f;
                    font-size: 15px;
                    background-color: #f3f3f3;
                    display: inline-block;
                    padding: 8px 14px;
                    border-radius: 5px;
                    margin: 3px;
                    font-weight: 600;
                    border-radius: 50px;
                }
            `}</style>
            {/* end products */}

            {/* Footer Component */}
            <Footer />
            {/* Footer Component Ends */}
        </>
    )
}

export default Shop