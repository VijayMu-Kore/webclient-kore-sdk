function cosmeticsTemplate() {

  var cosmeticsTemplate = `<div class="cosmetic-welcomePage">
  
  <div class="dem-screen-containers cosmetic-container">

    <div class="header-sec">

      <div class="logo-with-img">

        <div class="logo-bg">

          <img class="belcorp-item cosmetic-icon" src="images/cosmetics/cosmetic-logo.svg">

          <img class="belcorp-item belcorp-icon" src="../demo/images/belcrop-logo.svg">

        </div>

      </div>

      <div class="action-header belcrop-action-header">

        <a id="belcorp" href="#cosmetics" class="action-name nav-demo-link">Home</a>

        <a id="esika" href="#essi" class="action-name nav-demo-link">Essi</a>

        <a id="lbel" href="#lblanc" class="action-name nav-demo-link"><div class="lbel-sup">'</div>

          <div class="lbel-sub">L blanc</div></a>

        <a id="cyzone" href="#cyze" class="action-name nav-demo-link">Cyze</a>

      </div>

      <div class="name-with-profile">

       <!-- <div class="pro-img profile-dropdown">

          <span class="user-name"  id="belcorpUserName">My Account</span>

          <div class="dropdown-btns">

            <a type="button" id="login">Login</a>

            <a type="button" id="logout">Logout</a>

          </div>

        </div> --!>

        <a id="logIn" class="action-name-login"><span class="span-icon-login"><img src="images/cosmetics/icon-log-in.svg" class="icon-login" alt="icon-log-in" /></span>Login</a>

 

        <a class="cosmetic-post-login cart-icon"><img src="images/cosmetics/cart.svg" alt="cart" /></a>

        <a class="cosmetic-post-login whish-list-icon">

          <img class="dflt-wish-img" src="images/cosmetics/wish-unfill.svg" alt="wishlist" />

          <img class="wish-img-fill" src="images/cosmetics/wishlist-active-icon.svg">

        </a>

        <a class="cosmetic-post-login cos-dis-flex">

          <img  class="cosmetics-user-icon" src=""/> 

          <span class="cos-user-name"></span> 

        </a>

        <div class="profile_dropdown_cat">

          <div class="link-text" id="my-orders-tab">My Orders</div>

          <div class="link-text">Saved Addresses</div>

          <div class="link-text">Account Settings</div>

          <div class="link-text">Contact Us</div>

        </div>

        <a class="cosmetic-post-login cosmetics-logout pl-0"><img src="images/cosmetics/nav/nav-logout.svg" alt="logout" /></a>

      </div>

    </div>

    <!-- <div class="belcrop-body-img-section">

        <img src="../demo/images/screen-E-1.png" id="belcorp-home"  style="width: 100%;">

        <img src="../demo/images/screen-2.png" id="belcorp-esika"  style="width: 100%;">

        <img src="../demo/images/screen-3.png" id="belcorp-lbel"  style="width: 100%;">

        <img src="../demo/images/screen-4.png" id="belcorp-cyzone"  style="width: 100%;">

    </div> -->

</div>

<div class="search-top-data">

  <div class="title">Have a happy banking!</div>

  <div class="fixed-login-screen">

    <div class="login-screen-action">

      <div class="cosmetic-login-screen-block">

        <div class="cosmetic-login-screen-left">

          <div class="cosmetic-logo-bg">

            <img src="images/cosmetics/login-cosmetic-logo.svg" alt="cosmetics-logo" />

          </div>

          <div class="cosmetic-lipstick-bg">

            <img src="images/cosmetics/red-lipsticks-background.png" alt="lipstick-image" />

          </div>

        </div>

        <div class="cosmetic-login-screen-right">

          <div class="cosmetic-login-welcome">

            <div class="cosmetic-login-welcome-block">

              <div class="cosmetic-login-welcome-header">Hello Again!</div>

            <div class="cosmetic-login-welcome-desc">Good to see you.</div>

            </div>

            <div class="cosmetic-login-welcome-close cosmetics-logout"><img src="images/cosmetics/close-icon.png" alt="login-close" /></div>

          </div>

          <div class="cosmetic-login-form-block">

            <div class="input-box">

              <div class="label-text"><span class="icon-pos-set"><img src="images/cosmetics/user-icon.png" alt="user-icon" /></span> User Name</div>

              <input type="text" class="inputbox" id="loginUserName" placeholder="Enter text here">

            </div>  

            <div class="input-box pos-rel">

              <div class="label-text"><span class="icon-pos-set"><img src="images/cosmetics/password-icon.png" alt="user-password-icon" /></span> Password</div>

              <input type="password" class="inputbox" id="loginPassword" placeholder="Type here">

              <span class="veiw-pass-icon"><img src="images/cosmetics/view-password-icon.png" alt="view-password-icon" /></span>

            </div> 

            <div class="cosmetic-login-btn">

              <button class="login-btn">Login <span><img src="images/cosmetics/login-right-arrow-icon.png"  /></span></button>

            </div>

            <div>

              <a class="forgot-pws">Forgot Password?</a>  

            </div>

          </div>

        </div>

      </div>

 

    </div>

  </div>

</div>

  <div class="dummy-bg-search"></div>



  <div class="my-orders-container">

    <div class="left-data">

      <div class="main-heading">Services</div>

      <div class="links-info">

        <div class="link-with-title selected-item">

            <img src="images/cosmetics/my-orders.svg">

            <span>My Orders</span>

        </div>

        <div class="link-with-title">

            <img src="images/cosmetics/password.svg">

            <span>Update wallet Detailes</span>

        </div>

        <div class="link-with-title">

            <img src="images/cosmetics/currency.svg">

            <span>Payment Options</span>

        </div>

        <div class="link-with-title">

            <img src="images/cosmetics/notes.svg">

            <span>Coupons</span>

        </div>

        <div class="link-with-title">

            <img src="images/cosmetics/upgrade.svg">

            <span>Upgrade your Account</span>

        </div>

        <div class="link-with-title">

            <img src="images/cosmetics/refund.svg">

            <span>Refund Status</span>

        </div>

      </div>

      <div class="main-heading">Whats New?</div>

      <div class="links-info">

        <div class="link-with-title">

            <img src="images/cosmetics/collections.svg">

            <span>Summer Collection</span>

            <img class="arrow-icon" src="images/cosmetics/arrow-red.svg">

        </div>

        <div class="info-data">Check our newly launched items that will help you beat the summer</div>

        <div class="link-with-title">

            <img src="images/cosmetics/publish.svg">

            <span>Back to school collection</span>

            <img class="arrow-icon" src="images/cosmetics/arrow-red.svg">

        </div>

        <div class="info-data">As we approach the end of work from home setup, explore our cool back to work collection</div>

      </div>

    </div>

    <div class="right-data">

      <div class="main-heading">My Orders</div>

      <div class="order-box-data">

          <div class="top-inner-data">

              <div class="left-sec">

                  <div class="info-block">

                      <div class="heading-title">Order Placed</div>

                      <div class="order-info-text">18-02-2022</div>

                  </div>

                  <div class="info-block">

                      <div class="heading-title">Total</div>

                      <div class="order-info-text">$ 7.99</div>

                  </div>

                  <div class="info-block">

                      <div class="heading-title">Ship to</div>

                      <div class="order-info-text">${localStorage.userName}</div>

                  </div>

              </div>

              <div class="right-sec">

                  <div class="order-id">Order # 402-2811863-0142748</div>

                  <div class="actions-orders">

                      <div class="view-details">

                          <img src="images/cosmetics/view-detals.svg">

                          <span>View Details</span>

                      </div>

                      <div class="invoice-details">

                          <img src="images/cosmetics/download.svg">

                          <span>Invoice</span>

                      </div>

                  </div>

              </div>

          </div>

          <div class="bottom-inner-data">

              <div class="img-block">

                  <img src="images/cosmetics/lipstick-w-3.png">

              </div>

              <div class="content-block">

                  <div class="main-title">Delivering on 11-March-2022</div>

                  <div class="name-product">Lip Gloss</div>

                  <div class="product-order">Return window closed on 21-Mar-2022</div>

                  <div class="action-info">

                      <div class="action-links">

                          <img src="images/cosmetics/refresh-red.svg">

                          <span>Buy it again</span>

                      </div>

                      <div class="action-links">

                          <img src="images/cosmetics/storyboard.svg">

                          <span>Product Review</span>

                      </div>

                  </div>

              </div>

          </div>

      </div>

      <div class="order-box-data">

          <div class="top-inner-data">

              <div class="left-sec">

                  <div class="info-block">

                      <div class="heading-title">Order Placed</div>

                      <div class="order-info-text">19-02-2022</div>

                  </div>

                  <div class="info-block">

                      <div class="heading-title">Total</div>

                      <div class="order-info-text">$ 5.09</div>

                  </div>

                  <div class="info-block">

                      <div class="heading-title">Ship to</div>

                      <div class="order-info-text">${localStorage.userName}</div>

                  </div>

              </div>

              <div class="right-sec">

                  <div class="order-id">Order # 402-2865627-0153453</div>

                  <div class="actions-orders">

                      <div class="view-details">

                          <img src="images/cosmetics/view-detals.svg">

                          <span>View Details</span>

                      </div>

                      <div class="invoice-details">

                          <img src="images/cosmetics/download.svg">

                          <span>Invoice</span>

                      </div>

                  </div>

              </div>

          </div>

          <div class="bottom-inner-data">

              <div class="img-block">

                  <img src="images/cosmetics/lipstick-w.png">

              </div>

              <div class="content-block">

                  <div class="main-title">Delivering on 13-March-2022</div>

                  <div class="name-product">Lip Crayon</div>

                  <div class="product-order">Return window closed on 20-Mar-2022</div>

                  <div class="action-info">

                      <div class="action-links">

                          <img src="images/cosmetics/refresh-red.svg">

                          <span>Buy it again</span>

                      </div>

                      <div class="action-links">

                          <img src="images/cosmetics/storyboard.svg">

                          <span>Product Review</span>

                      </div>

                  </div>

              </div>

          </div>

      </div>

    </div>

  </div>



  <div class="cosmotic-welcome-1 cosmetics-home-screen">

  <section class="banner-header">

      <img src="images/cosmetics/banner-1.png" class="banner-img" alt="banner-1" />

  </section>

  <!-- banner bottom section start from here -->

  <section class="banner-bottom-section ">

      <div class="media-block">

          <div class="media-left-block">

              <img src="images/cosmetics/rewards.png" class="media-left-img" alt="rewards">

          </div>

          <div class="media-right-block">

              <div class="media-right-header">Rewards</div>

              <div class="media-right-desc">Exclusive  Customer loyalty reward programs for our repeat customers </div>

          </div>

      </div>

      <div class="media-block">

          <div class="media-left-block">

              <img src="images/cosmetics/order-online.png" class="media-left-img" alt="rewards">

          </div>

          <div class="media-right-block">

              <div class="media-right-header">Order Online</div>

              <div class="media-right-desc">Order your products online and enjoy free shipping</div>

          </div>

      </div>

      <div class="media-block border-right-none">

          <div class="media-left-block">

              <img src="images/cosmetics/download-app.png" class="media-left-img" alt="rewards">

          </div>

          <div class="media-right-block">

              <div class="media-right-header">Download APP</div>

              <div class="media-right-desc">Explore & order products,track orders all from your smartphone  </div>

          </div>

      </div>

  </section>

   <!-- banner bottom section ends here -->

   <!-- beauty products info sections start here  -->

    <section class="beauty-products-section ">

      <div class="media-block">

        <div class="media-left-block">

            <img src="images/cosmetics/product-type-2.png" class="media-left-img" alt="rewards">

        </div>

        <div class="media-right-block border-right-none">

            <div class="media-right-header">Skin Care</div>

            <div class="media-right-desc">With constant exposure to changing climatic conditions, pollution and other environmental factors, your skin needs a proper routine that helps it to stay healthy throughout the day. Explore our Lbalnc skin care products curated to provide best skin care routine</div>

        </div>

    </div>

    <div class="media-block">

      <div class="media-left-block">

          <img src="images/cosmetics/product-type-3.png" class="media-left-img" alt="rewards">

      </div>

      <div class="media-right-block border-right-none">

          <div class="media-right-header">Colour your Lips</div>

          <div class="media-right-desc">Our Lipsticks comes in different textures & unique formulas that suit every occassion you have in mind. With Essi, we offer shades that compliments all your skin tones. Explore our premium lipstick, liquid lipstick and crayons online </div>

      </div>

  </div>

  <div class="media-block">

    <div class="media-left-block">

        <img src="images/cosmetics/product-type-1.png" class="media-left-img" alt="rewards">

    </div>

    <div class="media-right-block border-right-none">

        <div class="media-right-header">The Perfume Corner</div>

        <div class="media-right-desc">Cyze perfumes are crafted specifically to create long lasting scents that will help you feel confident throught the day. Explore our unique collection of perfumes that are crafted with exquisite ingredients that helps exude confidence</div>

    </div>

</div>

    </section>

    <!-- beauty products info sections ends  -->

    <!-- cosmetic producs inner links strat from here -->

    <section class="cosmetic-blushes-section ">

      <div class="cosmetic-blushes-type"></div>

      <div class="cosmetic-blushes-type"></div>

      <div class="cosmetic-blushes-type"></div>

      <div class="cosmetic-blushes-type"></div>

      <div class="cosmetic-blushes-type"></div>

    </section>

    <!-- cosmetic producs inner links ends here -->



    <!-- products you may like start from here -->

    <section class="cosmetic-products-you-may-like"> 

      <div class="cosmetic-product-block">

        <div class="cosmetic-product-header">Products you may like</div>

        <div class="cosmetic-product-view-all hide"><a  class="view-all-link">View All</a></div>

      </div>

      <div class="cosmetic-product-list">

        <div class="cosmetic-product-card">

          <div class="cosmetic-pro-img">

            <img class="cos-pro-img" src="images/cosmetics/products/cosmetic-pro-1.png" />

            <div class="cosmetic-add-to-bag"><span class="add-to-bag-icon"><img src="images/cosmetics/products/add-to-bag.png" /></span><span class="add-to-bag-name">Add to Bag</span></div>

            <div class="cosmetic-add-to-wish"><img class="cos-wishlist-icon" src="images/cosmetics/products/pro-wishlist.png" /></div>

          </div>

          <div class="cosmetic-pro-details">

            <div class="cosmetic-pro-tag"><span>All New</span></div>

            <div class="cosmetic-pro-name">Lip Crayon - 

Swiss Brown</div>

            <div class="cosmetic-pro-desc">Swiss Brown ink Crayon that is Smudge proof and transfer resistant with matte finish that lasts uptio 8 hours</div>

            <div class="cosmetic-pro-price">$ 12.00</div>

          </div>

        </div>

        <div class="cosmetic-product-card">

          <div class="cosmetic-pro-img">

            <img class="cos-pro-img" src="images/cosmetics/products/cosmetic-pro-2.png" />

            <div class="cosmetic-add-to-bag"><span class="add-to-bag-icon"><img src="images/cosmetics/products/add-to-bag.png" /></span><span class="add-to-bag-name">Add to Bag</span></div>

            <div class="cosmetic-add-to-wish"><img class="cos-wishlist-icon" src="images/cosmetics/products/pro-wishlist.png" /></div>

          </div>

          <div class="cosmetic-pro-details">

            <div class="cosmetic-pro-tag"><span>All New</span></div>

            <div class="cosmetic-pro-name">Lip Crayon - 

              Light Red</div>

            <div class="cosmetic-pro-desc">Light Red Lip Crayon that is Smudge proof and transfer resistant with matte finish that lasts upto 8 hours</div>

            <div class="cosmetic-pro-price">$ 19.00</div>

          </div>

        </div>

        <div class="cosmetic-product-card">

          <div class="cosmetic-pro-img">

            <img class="cos-pro-img" src="images/cosmetics/products/cosmetic-pro-3.png" />

            <div class="cosmetic-add-to-bag"><span class="add-to-bag-icon"><img src="images/cosmetics/products/add-to-bag.png" /></span><span class="add-to-bag-name">Add to Bag</span></div>

            <div class="cosmetic-add-to-wish"><img class="cos-wishlist-icon" src="images/cosmetics/products/pro-wishlist.png" /></div>

          </div>

          <div class="cosmetic-pro-details">

            <div class="cosmetic-pro-tag best-seller"><span>Best Seller</span></div>

            <div class="cosmetic-pro-name">Lip Stick - 

Matte Maroon</div>

            <div class="cosmetic-pro-desc">Maroon Matte lipstick that offers a non-drying and un-crackable finish throughout the day</div>

            <div class="cosmetic-pro-price">$ 11.99</div>

          </div>

        </div>

        <div class="cosmetic-product-card">

          <div class="cosmetic-pro-img">

            <img class="cos-pro-img" src="images/cosmetics/products/cosmetic-pro-4.png" />

            <div class="cosmetic-add-to-bag"><span class="add-to-bag-icon"><img src="images/cosmetics/products/add-to-bag.png" /></span><span class="add-to-bag-name">Add to Bag</span></div>

            <div class="cosmetic-add-to-wish"><img class="cos-wishlist-icon" src="images/cosmetics/products/pro-wishlist.png" /></div>

          </div>

          <div class="cosmetic-pro-details">

            <div class="type-tag sponsered"><img src="images/cosmetics/info.svg">Sponsered</div>\

            <div class="cosmetic-pro-tag hide"><span>All New</span></div>

            <div class="cosmetic-pro-name">Lip Gloss</div>

            <div class="cosmetic-pro-desc">Glossy Dark Red lipstick that glides easily and does not budge and can last upto to 16 hrs.</div>

            <div class="cosmetic-pro-price">$ 13.99</div>

          </div>

        </div>

      </div>

    </section>

    <!-- products you may like ends here -->

    <!-- cosmetics footer start from here -->

    <section class="cosmetic-fotter">

      <div class="cosmetic-footer-data">

      </div>

    </section>

    </div>

    <!-- cosmetics footer ends here -->



    <div class="cosmotics-welcome-2 cosmetics-essi-screen">

      <div class="banner-img-2">

          <img src="images/cosmetics/welocme-2.svg">

      </div>



      <div class="arrivals-grids-template-welcome">

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/lipstick-w.png">

              </div>

              <div class="content-block">

                <div class="type-tag offer">All New</div>

                <div class="title">Lip Crayon - Swiss Brown</div>

                <div class="text-desc">Swiss Brown ink Crayon that is Smudge proof and transfer resistant with matte finish that lasts uptio 8 hours</div>

                <div class="amount-info">$ 12.00</div>

              </div>

            </div>

          </div>

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/lipstick-w-1.png">

              </div>

              <div class="content-block">

                <div class="type-tag offer">All New</div>

                <div class="title">Lip Crayon - Light Red</div>

                <div class="text-desc">Light Red Lip Crayon that is Smudge proof and transfer resistant with matte finish that lasts upto 8 hours</div>

                <div class="amount-info">$ 19.00</div>

              </div>

            </div>

          </div>

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/lipstick-w-2.png">

              </div>

              <div class="content-block">

                <div class="type-tag">Best Seller</div>

                <div class="title">Lip Stick - Matte Maroon</div>

                <div class="text-desc">Maroon Matte lipstick that offers a non-drying and un-crackable finish throughout the day</div>

                <div class="amount-info">$ 11.99</div>

              </div>

            </div>

          </div>

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/lipstick-w-3.png">

              </div>

              <div class="content-block">

                <div class="type-tag sponsered"><img src="images/cosmetics/info.svg">Sponsered</div>

                <div class="title">Lip Gloss - Dark Red</div>

                <div class="text-desc">Glossy Dark Red lipstick that glides easily and does not budge and can last upto to 16 hrs.</div>

                <div class="amount-info">$ 13.99</div>

              </div>

            </div>

          </div>

      </div>

    </div>



    <div class="cosmotics-welcome-2 cosmetics-cyze-screen">

      <div class="banner-img-2 pl-0 pr-50">

          <img src="images/cosmetics/welcome-3.svg">

      </div>



      <div class="arrivals-grids-template-welcome">

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/perfume-1.png">

              </div>

              <div class="content-block">

                <div class="type-tag all-new">All New</div>

                <div class="title">Pink Crystal -Perfume</div>

                <div class="text-desc">Perfume for women that recalls pink floral freshness and leaves you feeliing satisfied</div>

                <div class="amount-info">$ 12.00</div>

              </div>

            </div>

          </div>

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/perfume-2.png">

              </div>

              <div class="content-block">

                <div class="type-tag all-new">All New</div>

                <div class="title">Cyze Blossom - Perfume</div>

                <div class="text-desc">Perfume for women that recalls soft dewy freshness of the soft petal and the morning garden</div>

                <div class="amount-info">$ 19.00</div>

              </div>

            </div>

          </div>

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/perfume-3.png">

              </div>

              <div class="content-block">

                <div class="type-tag">Best Seller</div>

                <div class="title">Cyze Seductive- Perfume</div>

                <div class="text-desc">Perfume for women with fruity notes of black and blue berry. Perfect to spice up your evening</div>

                <div class="amount-info">$ 11.99</div>

              </div>

            </div>

          </div>

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/perfume-4.png">

              </div>

              <div class="content-block">

                <div class="type-tag sponsered"><img src="images/cosmetics/info.svg">Sponsered</div>

                <div class="title">Cyze Woody - Perfume</div>

                <div class="text-desc">Perfume for women with hit of sandalwood, burst of amber and vanilla that can spark excitment</div>

                <div class="amount-info">$ 13.99</div>

              </div>

            </div>

          </div>

      </div>

    </div>



    <div class="cosmotics-welcome-2 cosmetics-lblanc-screen">

      <div class="banner-img-2 pr-50">

          <img src="images/cosmetics/welcome-4.svg">

      </div>



      <div class="arrivals-grids-template-welcome">

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/facecream-1.png">

              </div>

              <div class="content-block">

                <div class="type-tag all-new-face">All New</div>

                <div class="title">Face pack - Green</div>

                <div class="text-desc">Packed with natural ingrediants that help brighten skin, unclog pores, remove tan and prevents acne</div>

                <div class="amount-info">$ 12.00</div>

              </div>

            </div>

          </div>

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/facecream-2.png">

              </div>

              <div class="content-block">

                <div class="type-tag all-new-face">All New</div>

                <div class="title">Face Wash - Aqua</div>

                <div class="text-desc">Helps maintain skins moisture and boost hydration level of the skin washing away dirt and oil from face</div>

                <div class="amount-info">$ 19.00</div>

              </div>

            </div>

          </div>

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/facecream-3.png">

              </div>

              <div class="content-block">

                <div class="type-tag">Best Seller</div>

                <div class="title">Face Balm - Cocoa glow</div>

                <div class="text-desc">Made with Rich Cocoa butter that help nourish skin and provides natural glow to your face</div>

                <div class="amount-info">$ 11.99</div>

              </div>

            </div>

          </div>

          <div class="slide-gride">

            <div class="inner-content-data">

              <div class="img-block">

                <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

                </div>

                <div class="wishlist">

                    <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                    <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

                </div>

                <img class="banner-img" src="images/cosmetics/facecream-4.png">

              </div>

              <div class="content-block">

                <div class="type-tag sponsered"><img src="images/cosmetics/info.svg">Sponsered</div>

                <div class="title">Mineral Pro -Sunscreen</div>

                <div class="text-desc">Made with Rich Cocoa butter that help nourish skin and provides natural glow to your face</div>

                <div class="amount-info">$ 13.99</div>

              </div>

            </div>

          </div>

      </div>

    </div>



    <div class="fixed-slider-right-left">

  <div class="slider-content">

     <div class="arrivals-grids-template-whishlist add-cart-grid-data">

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag">

                  <img src="images/cosmetics/remove.svg">

                  <span>Remove</span>

              </div>

              <div class="wishlist">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/lip-1.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

            <div class="type-tag offer">50% OFF</div>

            <div class="title">Lip Stick - Bright Red</div>

            <div class="text-desc">Bright Red lipstick that offers a non-drying and un-crackable finish throughout the day.</div>

            <div class="amount-info">$ 10.00</div>

            <div class="amount-info strike-text">$ 20.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag">

                  <img src="images/cosmetics/remove.svg">

                  <span>Remove</span>

              </div>

              <div class="wishlist">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/lip-2.png">

          </div>

          <div class="content-block">

            <div class="type-tag offer">New</div>

            <div class="title">Lipstick - Peach</div>

            <div class="text-desc">Peach Matte lipstick that offers a non-drying and un-crackable finish throughout the day </div>

            <div class="amount-info">$ 10.00</div>

            <div class="amount-info strike-text">$ 19.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag">

                  <img src="images/cosmetics/remove.svg">

                  <span>Remove</span>

              </div>

              <div class="wishlist">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/lipstick-w-3.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

              <div class="type-tag offer">20% OFF</div>

            <div class="title">Liquid Lip Stick - Red</div>

            <div class="text-desc">Glossy Dark Red lipstick that glides easily and does not budge and can last upto to 16 hrs.</div>

            <div class="amount-info">$ 12.00</div>

            <div class="amount-info strike-text">$ 17.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag">

                  <img src="images/cosmetics/remove.svg">

                  <span>Remove</span>

              </div>

              <div class="wishlist wish-filled">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/lipstick-w-2.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

              <div class="type-tag offer">20% OFF</div>

            <div class="title">Lipstick - Matte Ruby</div>

            <div class="text-desc">Matte Ruby lipstick that offers a non-drying and un-crackable finish throughout the day </div>

            <div class="amount-info">$ 11.00</div>

            <div class="amount-info strike-text">$ 16.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag">

                  <img src="images/cosmetics/remove.svg">

                  <span>Remove</span>

              </div>

              <div class="wishlist wish-filled">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/lip-4.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

              <div class="type-tag offer">20% OFF</div>

            <div class="title">Lip Crayon - Red</div>

            <div class="text-desc">Red ink Crayon that is Smudge proof and transfer resistant with matte finish that lasts uptio 8 hours</div>

            <div class="amount-info">$ 7.50</div>

            <div class="amount-info strike-text">$ 10.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag">

                  <img src="images/cosmetics/remove.svg">

                  <span>Remove</span>

              </div>

              <div class="wishlist wish-filled">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/facecream-2.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

              <div class="type-tag offer">20% OFF</div>

            <div class="title">Face wash - Aqua</div>

            <div class="text-desc">Helps maintain skin’s moisture and boost hydration level of the skin washing away dirt and oil from face</div>

            <div class="amount-info">$ 11.00</div>

            <div class="amount-info strike-text">$ 19.00</div>

          </div>

        </div>

      </div>

    </div>

    <div class="arrivals-grids-template-whishlist wishlist-grid-data">

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

              </div>

              <div class="wishlist wish-filled">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/perfume-1.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

            <div class="type-tag offer">20% OFF</div>

            <div class="title">Pink Crystal - Perfume</div>

            <div class="text-desc">Perfume for women that recalls pink floral freshness and leaves you feeliing satisfied</div>

            <div class="amount-info">$ 40.50</div>

            <div class="amount-info strike-text">$ 50.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

              </div>

              <div class="wishlist wish-filled">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/perfume-2.png">

          </div>

          <div class="content-block">

            <div class="type-tag offer">All New</div>

            <div class="title">Cyze Blossom - Perfume</div>

            <div class="text-desc">Perfume for women that recalls soft dewy freshness of the soft petal and the morning garden</div>

            <div class="amount-info">$ 50.00</div>

            <div class="amount-info strike-text">$ 78.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

              </div>

              <div class="wishlist wish-filled">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

              <img class="banner-img" src="images/cosmetics/lip-1.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

            <div class="type-tag offer">50% OFF</div>

            <div class="title">Lip Stick - Bright Red</div>

            <div class="text-desc">Bright Red lipstick that offers a non-drying and un-crackable finish throughout the day.</div>

            <div class="amount-info">$ 10.00</div>

            <div class="amount-info strike-text">$ 20.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

              </div>

              <div class="wishlist wish-filled">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/lip-4.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

              <div class="type-tag offer">20% OFF</div>

            <div class="title">Lip Crayon - Maroon</div>

            <div class="text-desc">Maroon ink Crayon that is Smudge proof and transfer resistant with matte finish that lasts uptio 8 hours</div>

            <div class="amount-info">$ 8.00</div>

            <div class="amount-info strike-text">$ 12.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

              </div>

              <div class="wishlist wish-filled">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/card1.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

              <div class="type-tag offer">20% OFF</div>

            <div class="title">Cyze Apple - Perfume</div>

            <div class="text-desc">Perfume that has a mild white apple aroma that leaves you feeling fresh and pleasant right from morning till night</div>

            <div class="amount-info">$ 55.00</div>

            <div class="amount-info strike-text">$ 75.00</div>

          </div>

        </div>

      </div>

      <div class="slide-gride">

        <div class="inner-content-data">

          <div class="img-block">

              <div class="add-to-bag green-bg">

                  <img src="images/cosmetics/bag.svg">

                  <span>Add to Bag</span>

              </div>

              <div class="wishlist wish-filled">

                  <img class="dflt-wish-img" src="images/cosmetics/wishlist.svg">

                  <img class="wish-img-fill" src="images/cosmetics/wish-fill.svg">

              </div>

            <img class="banner-img" src="images/cosmetics/perfume-4.png">

          </div>

          <div class="content-block">

              <div class="type-tag">Best Seller</div>

              <div class="type-tag offer">20% OFF</div>

            <div class="title">Cyze Woody - Perfume</div>

            <div class="text-desc">Perfume for women with hit of sandalwood, burst of amber and vanilla that can spark excitment</div>

            <div class="amount-info">$ 45.50</div>

            <div class="amount-info strike-text">$ 65.00</div>

          </div>

        </div>

      </div>

    </div>

    <div class="footer-cart">

      <div class="close-cart">Close</div>

      <div class="proceed-payment proceed-to-pay">

        <img src="images/cosmetics/card.svg">

        <span>Proceed to Pay</span>

      </div>

      <div class="proceed-payment shopping-bag">

          <img src="images/cosmetics/shopping-bag.svg">

          <span>Add all to Bag</span>

        </div> 

    </div>

  </div>

</div>

</div>`;



  return cosmeticsTemplate;

}