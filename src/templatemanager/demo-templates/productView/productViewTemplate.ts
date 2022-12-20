
import helpers from '../../../utils/helpers';
import './productViewTemplate.scss';
class ProductViewTemplate {
    renderMessage(msgData: any) {
        let me: any = this;
        let $ = me.hostInstance.$;
        let helpersObj = helpers;
        if (msgData?.message?.[0]?.component?.payload?.template_type === "productViewTemplate") {
          me.messageHtml = $(ProductViewTemplate.prototype.getTemplateString()).tmpl(msgData?.message[0].component?.payload);
            return me.messageHtml;
        }
    }

    getTemplateString() {
        var productViewTemplate = {
            "id": 29,
            'template': '<script type="text/x-jqury-tmpl">\
                  <div class="product-view-template">\
                    <div class="external-cart-info-data">\
                      <div class="data-cart-info-ext">\
                        <div class="top-inner-data">\
                          <div class="left-sec">\
                            <div class="img-block">\
                              <img src="${img}">\
                            </div>\
                          </div>\
                          <div class="right-sec">\
                            <div class="titlle--with-tags">\
                              <div class="title">${title}</div>\
                              <div class="tag-best  {{if bestseller==false}}hide{{/if}}">Best Seller</div>\
                              <div class="tag-best offer  {{if newarrival==false}}hide{{/if}}">New</div>\
                              <div class="tag-best offer">${percentageOffer}</div>\
                            </div>\
                            <div class="desc-text">Weightless, ultra-comfortable lipstick that is enriched with jojoba and vitamin E oil. It is pocket friendly and budget friendly lipstick for daily use</div>\
                            <div class="amount-info">\
                              <div class="amount">${price}</div>\
                              <div class="amount-strike">${orgPrice}</div>\
                            </div>\
                            <div class="product-details">\
                                <div class="main-title">PRODUCT DETAILS</div>\
                                <div class="product-details-box">\
                                  <div class="titles-blcok">\
                                      <div class="text-gray">Brand Name</div>\
                                      <div class="p-text">${brandName}</div>\
                                    </div>\
                                    <div class="titles-blcok">\
                                      <div class="text-gray">Feature</div>\
                                      <div class="p-text">Long Lasting</div>\
                                    </div>\
                                    <div class="titles-blcok">\
                                      <div class="text-gray">Pigmentation</div>\
                                      <div class="p-text">Full Coverage</div>\
                                    </div>\
                                    <div class="titles-blcok">\
                                      <div class="text-gray">Applicator Type</div>\
                                      <div class="p-text">${category}</div>\
                                    </div>\
                                </div>\
                            </div>\
                            <div class="footer-info">\
                              <div class="btns-buy">\
                                <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/card.svg">\
                                <span>Buy Now</span>\
                              </div>\
                              <div class="btns-buy add-to-tag">\
                                <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/bag.svg">\
                                <span>Add to Bag</span>\
                              </div>\
                              <div class="btns-buy add-to-list">\
                                <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/wishlist.svg">\
                                <span>Add to Wishlist</span>\
                              </div>\
                            </div>\
                          </div>\
                        </div>\
                        <div class="heading-border">\
                          <div class="title">Frequently bought together</div>\
                          <div class="border"></div>\
                        </div>\
                        <div class="more-list-cart-add">\
                          <div class="img-block">\
                            <img src="${img}">\
                            <div class="img-info">${title}</div>\
                          </div>\
                          <div class="plus-add">+</div>\
                          <div class="img-block">\
                            <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/makeup.png">\
                            <div class="img-info">Lipstick - Red</div>\
                          </div>\
                          <div class="total-price">\
                            <div class="total-block">\
                              <div class="title">Total Price</div>\
                              <div class="amount-info">\
                                <div class="amount">${totalPrice}</div>\
                                <div class="amount-strike">${totalOrigPrice}</div>\
                              </div>\
                            </div>\
                            <div class="btns-buy add-to-tag">\
                              <img src="https://koregeneric.s3.amazonaws.com/SearchAssist_UI_Img/Cosmetics_demo/bag.svg">\
                              <span>Add All to Bag</span>\
                            </div>\
                          </div>\
                        </div>\
                      </div>\
                    </div>\
                  </div>\
                  </script>',
            "layoutType": "details",
            "templateType": "preview"
          }
          return productViewTemplate.template;
    }
    
}

export default ProductViewTemplate;