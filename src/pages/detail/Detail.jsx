import Header from "../../component/Header";
import Footer from "../../component/Footer";
import { useParams } from "@solidjs/router";
import { createSignal, onMount } from "solid-js";
import imageExample from "/src/assets/js/imageExample";
import supabase from "../../ultis/supabase";

const Detail = () => {
    const idParam = parseInt(useParams().id)
    const [product, setProduct] = createSignal({})

    const getDetailProduct = async () => {
        var detailData = await supabase
            .from('products')
            .select()
            .eq('id', idParam)
            .limit(1)

        setProduct(detailData.data[0])
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
        getDetailProduct()
    })

    return (
        <>
            {/*PreLoader*/}
            <div class="loader">
                <div class="loader-inner">
                    <div class="circle"></div>
                </div>
            </div>
            {/*PreLoader Ends*/}

            {/* Header Component */}
            <Header />
            {/* Header Component Ends */}

            {/* BREADCRUMB SECTION */}
            <div class="breadcrumb-section breadcrumb-bg">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-8 offset-lg-2 text-center">
                            <div class="breadcrumb-text">
                                <p>See more Details</p>
                                <h1>Single Product</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* BREADCRUMB SECTION Ends */}

            {/* DETAIL PRODUCT */}
            <div class="single-product mt-150 mb-150">
                <div class="container">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="single-product-img">
                                <img src={product().image ? product().image : imageExample} class="img-product" />
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="single-product-content">
                                <h3>{product().name}</h3>
                                <p class="single-product-pricing"><span>{product().description}</span>{priceFormatter(product().prices)}</p>
                                <p>{product().description}</p>
                                <div class="single-product-form">
                                    <form action="index.html">
                                        <input type="number" placeholder="0" />
                                    </form>
                                    <a href="cart.html" class="cart-btn"><i class="fas fa-shopping-cart"></i> Add to Cart</a>
                                    {/* <p><strong>Categories: </strong>Fruits, Organic</p> */}
                                </div>
                                <h4>Share:</h4>
                                <ul class="product-share">
                                    <li><a href=""><i class="fab fa-facebook-f"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* DETAIL PRODUCT Ends */}

            {/* Footer Component */}
            <Footer />
            {/* Footer Component Ends */}
        </>
    )
}

export default Detail