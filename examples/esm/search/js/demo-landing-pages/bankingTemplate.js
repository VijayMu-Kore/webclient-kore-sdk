function bankingTemplate(data) {

  var bankingTemplate = `<div class="banking-usecase-container">
  
  <header class="headr-sec">

    <div class="logo-sec">

      <img src="./images/banking/logo.svg">

      <span class="logo-name">MY BANK</span>

    </div>

    <div class="links-section">

        <a href="#banking" id="personal" class="link-name">Personal</a>

        <a href="#loans" id="loan" class="link-name">Loans</a>

        <a href="#invest" id="investing" class="link-name">Invest</a>

        <a href="#cards" id="card" class="link-name">Cards</a>

        <a href="#offers" id="offer" class="link-name">Offers</a>

    </div>

    <div class="location-data">

      <div class="locate-globe">

        <img src="./images/banking/globe.svg">

        <span class="title" id="locateUs"></span>

      </div>

      <div class="help-link">

        <img src="./images/banking/help.svg">

        <span class="title">Help</span>

      </div>



      <div class="login-net">

        <img src="./images/banking/external.svg" class="active-img">

        <img src="./images/banking/external-white.svg" class="inactive-img">

        <span class="title-netbanking">Login</span>

      </div>

      <div class="logout-net">

        <div class="logout-net-selected-title">

          <img src="" class="inactive-img profile-user-img">

          <span class="title-netbanking" id="bankUserName"></span>

        </div>

        <div class="items-dropdown logout-btn">

          <li>Logout</li>  

        </div>

      </div>

    </div>

  </header>

  <section class="body-section">

    <div class="search-top-data">

      <div class="title">Have a happy banking!</div>

      <div class="fixed-login-screen banking-login-screen">

        <div class="login-screen-action">

          <div class="input-box">

            <div class="label-text">User Name</div>

            <input type="text" class="inputbox" id="userName" placeholder="Enter text here">

          </div>  

          <div class="input-box">

            <div class="label-text">Password</div>

            <input type="password" class="inputbox" id="userPassword" placeholder="Enter text here">

          </div> 

          <button class="login-btn banking-login-btn">Login</button>

          <div>

            <a  class="forgot-pws">Forgot Password?</a>  

          </div>

        </div>\

      </div>

    </div>





    <div class="post-login-screen hide">

      <div class="nav-actions">

        <div class="nav-title active-link">Overview</div>

        <div class="nav-title">Bank Account</div>

        <div class="nav-title">Payment & Transfer</div>

        <div class="nav-title">Credit & Debit cards</div>

        <div class="nav-title">Investment</div>

      </div>

      <div class="body-content-info">

        <div class="left-sec">

          <div class="main-heading-text">Services</div>

          <div class="actions-box">

            <div class="action-title">

              <img src="images/banking/prelogin/change-address.svg">

              <span class="action-name">Change Address</span>

            </div>

            <div class="action-title">

              <img src="images/banking/prelogin/password.svg">

              <span class="action-name">Generate Card PIN</span>

            </div>

            <div class="action-title">

              <img src="images/banking/prelogin/textfield.svg">

              <span class="action-name">Manage Debit Card</span>

            </div>

            <div class="action-title">

              <img src="images/banking/prelogin/upgrade.svg">

              <span class="action-name">Upgrade your Account</span>

            </div>

            <div class="action-title">

              <img src="images/banking/prelogin/nominee.svg">

              <span class="action-name">View/Update Nominee</span>

            </div>

            <div class="action-title">

              <img src="images/banking/prelogin/linaccount.svg">

              <span class="action-name">Link your Loan Account</span>

            </div>

          </div>

          <div class="main-heading-text">Whats New?</div>

          <div class="actions-box whats-new-sec">

            <div class="action-title">

              <img src="images/banking/prelogin/travel-card.svg">

              <span class="action-name">Travel Card</span>

              <img src="images/banking/arrow.svg" class="arrow-right">

            </div>

            <div class="label-info-desc">By Forex Online to get free doorstep delivery. Now Reload instant access...</div>

            <div class="action-title">

              <img src="images/banking/prelogin/testing.svg">

              <span class="action-name">iWish Flexible RD</span>

              <img src="images/banking/arrow.svg" class="arrow-right">

            </div>

            <div class="label-info-desc">Deposite any amount anytime, open and close any RD based on the fin...</div>

          </div>

        </div>  



        <div class="middle-sec">

          <div class="inner-content-data-sec">

            <div class="accordon-data-info">

              <div class="header-sec-data">

                <div class="title">Accounts</div>

                <div class="hide-show">

                  <img src="images/banking/carrot_up.svg">

                  <span>Hide</span>

                </div>

              </div>

              <div class="body-inner-accordion">

                <div class="account-cards">

                  <div class="card_data">

                    <div class="title">Total Balance</div>

                    <div class="balance">$ 22,389</div>

                    <div class="view-statement">View Satement</div>

                  </div>

                  <div class="card_data">

                    <div class="title">Total Deposits</div>

                    <div class="balance">$ 12,323</div>

                    <div class="view-statement">View Satement</div>

                  </div>

                  <div class="card_data">

                    <div class="title">Total Loan</div>

                    <div class="balance">$ 46,389</div>

                    <div class="view-statement">View Satement</div>

                  </div>

                </div>

                <div class="tabs-inside-links">

                  <div class="link-name actve-link">Bill Payment</div>

                  <div class="link-name">Frequent Trasnsaction</div>

                  <div class="link-name">Recent Trasnsaction</div>

                  <div class="link-name">Last 30 Days Transactions</div>

                </div>

                <div class="bills-info">

                  <div class="bill-card">

                    <img src="images/banking/prelogin/electricity.svg">

                    <span>Electrictiy</span>

                  </div>

                  <div class="bill-card">

                    <img src="images/banking/prelogin/mutualfunds.svg">

                    <span>Mutual Funds</span>

                  </div>

                  <div class="bill-card">

                    <img src="images/banking/prelogin/mobile.svg">

                    <span>Mobile</span>

                  </div>

                  <div class="bill-card">

                    <img src="images/banking/prelogin/internet.svg">

                    <span>Internet</span>

                  </div>

                </div>

              </div>

            </div>

            <div class="accordon-data-info">

              <div class="header-sec-data">

                <div class="title">Credit Cards</div>

                <div class="hide-show">

                  <img src="images/banking/carrot_up.svg">

                  <span>Hide</span>

                </div>

              </div>

              <div class="body-inner-accordion">

                <div class="credit-card-details">

                  <div class="img-block-credit">

                    <img src="images/banking/creditcard.svg">

                  </div>

                  <div class="info-content">

                    <button class="pay-now">Pay Now</button>

                    <div class="title">Mintlet Travel Card</div>

                    <div class="card-number">XXXX XXXX XXXX 9874</div>

                    <div class="action-card">Modify Limit</div>

                    <div class="action-card">View Statement</div>

                    <div class="details-table">

                      <div class="details-of-card">

                        <div class="title-heading">Available Limit</div>

                        <div class="balance-text">$ *****</div>

                      </div>

                      <div class="details-of-card">

                        <div class="title-heading">Outstanding</div>

                        <div class="balance-text">$ *****</div>

                      </div>

                      <div class="details-of-card">

                        <div class="title-heading">Previous Balance</div>

                        <div class="balance-text">$ *****</div>

                      </div>

                      <div class="view-details">View Details</div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>



        <div class="right-sec">

          <div class="inner-content-data">

            <div class="box-info-cards">

              <div class="heading-title">Credit Score</div>

              <div class="count-text">732 - 782</div>

              <div class="scrore-link">View Actual Score</div>

            </div>

            <div class="box-info-cards">

              <div class="heading-title">Credit Score</div>

              <div class="inside-border-cards">

                <div class="title">Home Loan</div>

                <div class="desc-text">Get Pre - Approved Home loan sanction</div>

                <div class="action-click">View Details</div>

              </div>

              <div class="inside-border-cards">

                <div class="title">Vehicle Loan</div>

                <div class="desc-text">Get Pre - Approved Auto loan sanction</div>

                <div class="action-click">View Details</div>

              </div>

            </div>

            <div class="box-info-cards">

              <div class="heading-title">Investment Options </div>

              <div class="inside-border-cards">

                <div class="title">Mutual Funds</div>

                <div class="desc-text">Invest in Mutual Funds is simple and free.</div>

                <div class="action-click">View Details</div>

              </div>

              <div class="inside-border-cards">

                <div class="title">ETF</div>

                <div class="desc-text">ETF is a type of pooled investment fund that helps diverdify your portfolio </div>

                <div class="action-click">View Details</div>

              </div>

            </div>

          </div>

        </div>  

      </div>

    </div>

   



    <div class="future-cards-section-info hide">

      <div class="heading-banner">Featured Cards</div>

      <div class="cards-features">

        <div class="card-info-data">

          <div class="debit-card-image">

            <img src="images/banking/card-1.png">

            <span class="card-type">Mintlet travel card</span>

          </div>

          <div class="inner-content-info">

            <div class="info-text">1,00,000 Bonus Membership Rewards Points or stay vouchers worth $ 45,000 from Hotels</div>

            <div class="title-main">Annual Fee: $ 60,000 plus applicable taxes</div>

            <div class="list-stars-data">

              <div class="stars-list">

                <img src="images/banking/star.svg">

                <span>'Do Anything' Platinum Concierge</span>

              </div>

              <div class="stars-list">

                <img src="images/banking/star.svg">

                <span>Earn 3X Membership Rewards® Points on all Overseas spending</span>

              </div>

              <div class="stars-list">

                <img src="images/banking/star.svg">

                <span>Access to 1200+ lounges across the globe with the Global Lounge Collection®</span>

              </div>

            </div>

            <div class="know-more">Know More</div>

            <button class="apply-now">Apply Now</button>

          </div>

        </div>

        <div class="card-info-data">

          <div class="debit-card-image">

            <img src="images/banking/card-2.png">

            <span class="card-type">Final Credit Card</span>

          </div>

          <div class="inner-content-info">

            <div class="info-text">Welcome Gift of 4,000 Bonus Membership Rewards Points</div>

            <div class="title-main">First Year Fee: $ 1,000 plus applicable taxes</div>

            <div class="list-stars-data">

              <div class="stars-list">

                <img src="images/banking/star.svg">

                <span>Earn 1,000 Bonus Membership Rewards®Points for simply using your Card 4 times on transactions of $ 1,500 and above every month</span>

              </div>

              <div class="stars-list">

                <img src="images/banking/star.svg">

                <span>Earn an additional 1,000 Membership Rewards points simply by spending $ 20,000</span>

              </div>

              <div class="stars-list">

                <img src="images/banking/star.svg">

                <span>Redeem your Points from the fabulous 18 and 24 Karat Gold Collection</span>

              </div>

            </div>

            <div class="know-more">Know More</div>

            <button class="apply-now">Apply Now</button>

          </div>

        </div>

        <div class="card-info-data">

          <div class="debit-card-image">

            <img src="images/banking/card-3.png">

            <span class="card-type">HBL World Debit Card</span>

          </div>

          <div class="inner-content-info">

            <div class="info-text">$ 500 cashback as a Welcome Gift on eligible spends of $ 10,000 in the first 90 days of Cardmembership </div>

            <div class="title-main">First Year Fee: $ 495 plus applicable taxes</div>

            <div class="list-stars-data">

              <div class="stars-list">

                <img src="images/banking/star.svg">

                <span>Earn 10X Membership Rewards® Points on all your spending on Flipkart, Amazon and Uber and earn 5X Membership Rewards Points.</span>

              </div>

              <div class="stars-list">

                <img src="images/banking/star.svg">

                <span>Beginning 01 August 2021, you can earn Amazon vouchers worth $ 500 upon reaching the spend milestones of $ 1,200, $ 1,800 and $ 2,400 respectively in a Cardmembership year</span>

              </div>

            </div>

            <div class="know-more">Know More</div>

            <button class="apply-now">Apply Now</button>

          </div>

        </div>

      </div>

    </div>



    <div class="loans-section hide">

      <div class="nav-actions">

        <div class="nav-title active-link">Personal Loan</div>

        <div class="nav-title">IRA</div>

        <div class="nav-title">Business Banking</div>

      </div>

      <div class="scroll-loans-relative">

        <div class="loans-card-data">

        <div class="left-sec">

          <div class="main-heading">Personal Loans</div>

          <div class="box-data">

            <div class="info-text">From consolidating credit card debt1 to home improvement, get the funds you need with loans between  $3,500 to $40,000* available to eligible Card Members. That's the power of MyBank's Personal Loan, ranked #1 in customer satisfaction. </div>

            <div class="list-data-parent">

              <div class="list-info">

                <img src="images/banking/round-arrow.svg">

                <span class="action-name">No origination fee and no prepayment penalty</span>

              </div>

              <div class="list-info">

                <img src="images/banking/round-arrow.svg">

                <span class="action-name">Fixed interest rates</span>

              </div>

              <div class="list-info">

                <img src="images/banking/round-arrow.svg">

                <span class="action-name">No credit score impact to apply</span>

              </div>

              <div class="list-info">

                <img src="images/banking/round-arrow.svg">

                <span class="action-name">Quick application and a decision in seconds</span>

              </div>

            </div>

            <button class="apply-now">Apply Now</button>

          </div>

        </div>

        <div class="right-sec">

          <div class="main-heading">3 Easy Steps</div>

          <div class="easy-steps-data">

            <div class="step-card">

              <div class="img-info">

                <img src="images/banking/offer.svg">

              </div>

              <div class="title">1. Check for an offer</div>

              <div class="text-info">Find out if you're pre-approved by logging in to your MyBank account. You'll see how much you could borrow and your rate. <a href="#">Get Started</a></div>

            </div>

            <div class="step-card">

              <div class="img-info">

                <img src="images/banking/quick.svg">

              </div>

              <div class="title">2. Quick application</div>

              <div class="text-info">Tell us how much you need up to your pre-approved amount, then select a monthly payment option and enter some information about yourself. You'll get a decision in seconds.</div>

            </div>

            <div class="step-card">

              <div class="img-info">

                <img src="images/banking/money.svg">

              </div>

              <div class="title">3. Get funded</div>

              <div class="text-info">If you're approved, we'll disburse your funds after you review the terms and accept your loan. Then put your funds to work for you.</div>

            </div>

          </div>

        </div>

      </div>

      <div class="desclaim-text">Loan of $10,000 repaid over 36 months at 7.98% APR will have a monthly payment of $313.32 and the total cost will be $11,279. Actual rates, interest and costs may vary. </div>

      <div class="desclaim-text">*Not all customers will be eligible for the lowest APR, the highest loan amount, or the same repayment period options.To learn more, see <a href="#">Terms and Conditions.</a></div>

      </div>

    </div>





    <div class="invest-sec-data hide">

      <div class="nav-actions">

        <div class="nav-title active-link">Explore All</div>

        <div class="nav-title">Online Investing</div>

        <div class="nav-title">Help</div>

      </div>

      <div class="invest-sec-cards-info">

        <div class="left-sec">

          <div class="titles-info-box">

            <div class="title">Invest in your future.</div>

            <div class="desc-text">Wherever you are in planning for your future, we're here to help you evaluate investment and retirement options as you work toward your goals.</div>

          </div>

          <div class="titles-info-box">

            <div class="title">Ways to work with us</div>

            <div class="desc-text">Whether you prefer online investing or personalized financial planning guidance - or want a little of both - we have options to meet your needs.</div>

          </div>

          <div class="card-data-info">

            <div class="img-info">

              <img src="images/banking/globe-round.svg">

            </div>

            <div class="main-title">Online investing</div>

            <div class="desc-text">If you want a managed-for-you option, Automated Investor, or you prefer to build and manage your own portfolio through Self-directed brokerage we've got an online investing option for you from U.S. Bancorp Investments.</div>

            <div class="compare-icon">Compare online investing choices</div>

          </div>

        </div>

        <div class="right-sec">

          <div class="box-data-info">

            <div class="title">Why invest with us?</div>

            <ul>

              <li>Insights derived from decades of proven experience </li>

              <li>Flexible investing options</li>

              <li>Personalized guidance based on your goals </li>

              <li>Access to a broad range of diversified investments</li>

              <li>Disciplined due diligence and investment selection process</li>

              <li>Timely market commentaries</li>

            </ul>

          </div>

          <div class="card-data-info">

            <div class="img-info">

              <img src="images/banking/audience.svg">

            </div>

            <div class="main-title">Personal guidance</div>

            <div class="desc-text">Making sense of your finances is our starting point for your personalized guidance. Whatever your financial situation, we will tailor a strategy to help you work toward your financial goals.</div>

            <div class="compare-icon">Work with a financial advisor or banker</div>

          </div>

        </div>

      </div>

    </div>





    <div class="offers-sec-data hide">

      <div class="nav-actions">

        <div class="nav-title active-link">Latest Offers</div>

        <div class="nav-title">Rewards</div>

        <div class="nav-title">Help</div>

      </div>

      <div class="offers-sections-inside">

        <div class="left-sec">

          <div class="main-heading">Explore all Health & Wellness Offers</div>

          <div class="box-data">

            <div class="main-title"><span class="post-login-offer">Offers for you</span> <span class="pre-login-offer"> Offers on all credit cards</span></div>

            <div class="divider-data">

              <div class="title">Advanced Hair Studio</div>

              <div class="desc-info">Get Free Consultation and 15% discount on all Hair loss procedure across all studio across Pan India. T&Cs apply.</div>

            </div>

            <div class="divider-data">

              <div class="title">Atmantan Spa Resort</div>

              <div class="desc-info">Up to 25% off at Atmantan Wellness Resort. T&Cs apply.</div>

            </div>

            <div class="divider-data">

              <div class="title">CGH Earth Wellness</div>

              <div class="desc-info">Get up to 20% off on Wellness Programs at CGH Wellness. T&Cs apply.</div>

            </div>

            <div class="divider-data">

              <div class="title">Sakra</div>

              <div class="desc-info">Get up to 20% off at Sakra Hospitals. T&Cs apply.</div>

            </div>

            <div class="desclaim-text">*Please read the contract and reward <u>terms and conditions</u></div>

          </div>

        </div>

        <div class="right-sec">

          <div class="main-title"><span class="post-login-offer">Exclusive Travel Offers</span> <span class="pre-login-offer"> Travel Offers</span></div>

          <div class="desc-text-info">Many or all of the products featured here are from our partners who compensate us. This may influence which products we write about and where and how the product appears on a page. However, this does not influence our evaluations. Our opinions are our own. Here is a list of our partners and here's how we make money.</div>

          <div class="box-card-details">

            <div class="top-sec">

              <div class="img-block">

                <img src="images/banking/image2.png">

              </div>

              <div class="content-info">

                <div class="title">Hotel Fort Inn, Luxury Suite.</div>

                <div class="rating">

                  <span>3.96</span>

                  <img src="images/banking/filled-star.svg">

                  <img src="images/banking/filled-star.svg">

                  <img src="images/banking/filled-star.svg">

                  <img src="images/banking/filled-star.svg">

                  <img src="images/banking/unfilled-star.svg">

                </div>

                <div class="desc_text">Significantly reduce time and costs with the U.S. Bank Purchasing Card, a fast, flexible purchasing tool, which offers you an.</div>

              </div>

            </div>

            <div class="chips-sec">

              <div class="chips-name">20% Cashback</div>

              <div class="chips-name">Free Breakfast</div>

              <div class="chips-name">Shop tag</div>

              <div class="chips-name">Free Meal</div>

              <div class="chips-name">Reward Points</div>

              <div class="chips-name">Exclusive Off</div>

              <div class="chips-name">Summer Offers</div>

              <div class="chips-name">Special Festive Offer</div>

            </div>

          </div>

        </div>

      </div>

    </div>







    <div class="carousel-with-login-data hide">

      <div class="img-block-carousel">

        <img src="./images/banking/banking-carousel.png">

      </div>

      <div class="login-personal-banking">

        <div class="title-info">Personal banking products what are you looking for?</div>

        <div class="input-data">

          <div class="label-text">Select product type</div>

          <input class="dummy-inputs" placeholder="Select">

          <img src="images/banking/carrotup.svg" class="drp-icon">

        </div>

        <div class="input-data">

          <div class="label-text">Select product</div>

          <input class="dummy-inputs" placeholder="Select">

          <img src="images/banking/carrotup.svg" class="drp-icon">

        </div>

        <div class="btn_info">

          <button class="apply-online">Apply Online</button>

          <a href="#banking" class="know-more-link">Know More</a>

        </div>

        <div class="info-text">Get exclusinve offers and countless options for our partners</div>

        <button class="btn-check-emi">Check Eligibility for EMI</button>

      </div>

    </div>



    <div class="banner-data-sec hide">

      <div class="banner-column">

        <div class="img-block">

          <img src="./images/banking/rupee.svg">

        </div>

        <div class="banner-content">

          <div class="banner-title">Best interest rates in the market</div>

          <div class="small-info">Both on FD and RD</div>

        </div>

      </div>

      <div class="banner-column">

        <div class="img-block">

          <img src="./images/banking/GIFT.svg">

        </div>

        <div class="banner-content">

          <div class="banner-title">Best Gifts and Rewards</div>

          <div class="small-info">On all Credit and Debit cards</div>

        </div>

      </div>

      <div class="banner-column">

        <div class="img-block">

          <img src="./images/banking/percentage.svg">

        </div>

        <div class="banner-content">

          <div class="banner-title">Best Deals on loans</div>

          <div class="small-info">Segment best Car and House loans</div>

        </div>

      </div>

      <div class="banner-column">

        <div class="img-block">

          <img src="./images/banking/health.svg">

        </div>

        <div class="banner-content">

          <div class="banner-title">Life and health insurance</div>

          <div class="small-info">Best corpus after maturity</div>

        </div>

      </div>

    </div>



    <div class="other-links-data hide">

        <div class="other-links-title">Other Links</div>

        <div class="footer-links-section">

          <div class="links-externals">

              <div class="link-data">

                <img src="./images/banking/external-link.svg">

                <span class="link-name">Industrial Automation</span>

              </div>

              <div class="link-data">

                <img src="./images/banking/external-link.svg">

                <span class="link-name">Building Technologies</span>

              </div>

          </div>

          <div class="links-externals">

            <div class="link-data">

              <img src="./images/banking/external-link.svg">

              <span class="link-name">Car Loans</span>

            </div>

            <div class="link-data">

              <img src="./images/banking/external-link.svg">

              <span class="link-name">Student loans</span>

            </div>

          </div>

          <div class="links-externals">

            <div class="link-data">

              <img src="./images/banking/external-link.svg">

              <span class="link-name">Energy</span>

            </div>

            <div class="link-data">

              <img src="./images/banking/external-link.svg">

              <span class="link-name">Healthcare</span>

            </div>

          </div>

          <div class="links-externals">

            <div class="link-data">

              <img src="./images/banking/external-link.svg">

              <span class="link-name">House Loan</span>

            </div>

            <div class="link-data">

              <img src="./images/banking/external-link.svg">

              <span class="link-name">Financing</span>

            </div>

          </div>

          <div class="links-externals">

            <div class="link-data">

              <img src="./images/banking/external-link.svg">

              <span class="link-name">Download App</span>

            </div>

            <div class="link-data">

              <img src="./images/banking/external-link.svg">

              <span class="link-name">Download statements</span>

            </div>

          </div>

        </div>

    </div>

  </section>

</div>`;

return bankingTemplate;

}