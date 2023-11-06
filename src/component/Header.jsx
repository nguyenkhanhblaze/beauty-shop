import { } from "/src/assets/js/jquery-1.11.3.min.js";
import { } from "/src/assets/js/jquery.isotope-3.0.6.min.js";
import { } from "/src/assets/js/jquery.magnific-popup.min.js";
import { } from "/src/assets/js/jquery.meanmenu.min.js";
import { } from "/src/assets/js/sticker.js";
import { } from "/src/assets/js/main.js";
import { createSignal } from "solid-js";

const Header = () => {
    const [keyWord, setKeyWord] = createSignal('')

    const isActiveMenu = (data) => {
        var pathURL = document.location.pathname
        pathURL = pathURL.substring(1)
        if (data === pathURL) {
            return true
        } else {
            return false
        }
    }

    return (
        <>
            {/* HEADER */}
            <div class="top-header-area" id="sticker">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12 col-sm-12 text-center">
                            <div class="main-menu-wrap">
                                {/* logo */}
                                <div class="site-logo">
                                    <a href="/">
                                        <img src="/img/logo.png" alt="" />
                                    </a>
                                </div>
                                {/* logo */}

                                {/* menu start */}
                                <nav class="main-menu">
                                    <ul>
                                        <li class={isActiveMenu('shop') ? 'current-list-item' : ''}><a href="/">Shop</a>
                                            {/* <ul class="sub-menu">
                                                <li><a href="shop.html">Shop</a></li>
                                                <li><a href="checkout.html">Check Out</a></li>
                                                <li><a href="single-product.html">Single Product</a></li>
                                                <li><a href="cart.html">Cart</a></li>
                                            </ul> */}
                                        </li>
                                        <li class={isActiveMenu('about') ? 'current-list-item' : ''}><a href="/about">About</a></li>
                                        <li class={isActiveMenu('contact') ? 'current-list-item' : ''}><a href="/contact">Contact</a></li>
                                        <li>
                                            <div class="header-icons">
                                                <a class="shopping-cart" href="cart.html"><i class="fas fa-shopping-cart"></i></a>
                                                <a class="mobile-hide search-bar-icon" href="#"><i class="fas fa-search"></i></a>
                                            </div>
                                        </li>
                                    </ul>
                                </nav>
                                <a class="mobile-show search-bar-icon" style={'margin-right:40px'} href="#"><i class="fas fa-search"></i></a>
                                <a class="mobile-show search-bar-icon" href="cart.html"><i class="fas fa-shopping-cart"></i></a>
                                <div class="mobile-menu"></div>
                                {/* menu end */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SEARCH AREA */}
            <div class="search-area">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-12">
                            <span class="close-btn"><i class="fas fa-window-close"></i></span>
                            <div class="search-bar">
                                <div class="search-bar-tablecell">
                                    <h3>Search For:</h3>
                                    <form action={`/search/${keyWord()}`} method="get">
                                        <input type="text" placeholder="Keywords" value={keyWord()} onChange={(e) => setKeyWord(e.target.value)} />
                                        <button type="submit">Search <i class="fas fa-search"></i></button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Header