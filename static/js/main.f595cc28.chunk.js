(this["webpackJsonpshopping-site"]=this["webpackJsonpshopping-site"]||[]).push([[0],{13:function(e,t,c){},14:function(e,t,c){},16:function(e,t,c){"use strict";c.r(t);var s=c(1),a=c.n(s),r=c(3),o=c.n(r),d=(c(13),c(6)),i=c(4),l=c(5),n=c(8),u=c(7),p=(c(14),c(0)),m=function(e){Object(n.a)(c,e);var t=Object(u.a)(c);function c(e){var s;return Object(i.a)(this,c),(s=t.call(this,e)).addProductBtn=function(){console.log("hello",s.state.filtered.length);var e=document.getElementById("myModal"),t=document.getElementsByTagName("body")[0],c=(document.getElementById("save"),document.getElementById("title")),a=document.getElementById("price");c.value="",a.value="",e.style.display="block",t.style.overflow="hidden"},s.closeModal=function(){var e=document.getElementById("myModal"),t=document.getElementsByTagName("body")[0],c=document.getElementById("title"),a=document.getElementById("price");e.style.display="none",t.style.overflow="auto",c.value="",a.value="",s.setState({isEdit:!1})},s.productClicked=function(e){console.log(e.target.dataset.value);var t=document.getElementById("myModal"),c=(document.getElementById("save"),document.querySelectorAll(".product-category select option")),a=document.querySelector("#title"),r=document.querySelector("#price"),o=document.getElementById("topProduct"),d=(document.querySelector('input[type="file"]').files[0],document.querySelector('input[type="file"]')),i=parseInt(e.target.dataset.value);s.setState({isEdit:!0},(function(){t.setAttribute("data-value",i);var e=document.getElementsByTagName("body")[0];t.style.display="block",e.style.overflow="hidden",c.forEach((function(e){e.removeAttribute("selected","")})),s.state.products.forEach((function(e){e.id==i&&(c.forEach((function(t){t.value===e.productCategory&&(console.log(t),t.setAttribute("selected",""))})),a.value=e.productTitle,r.value=e.price,o.checked=e.topProducts,d.value="")}))}))},s.editProduct=function(){console.log("state",s.state);var e=document.getElementById("selectedCategory"),t=document.getElementById("title").value,c=document.getElementById("price").value,a=document.getElementById("topProduct"),r=document.querySelector('input[type="file"]').files[0];if(t&&c){var o=document.getElementById("myModal"),d=document.getElementsByTagName("body")[0];o.style.display="none",d.style.overflow="auto",console.log(o.dataset.value);var i=o.dataset.value;s.state.products.forEach((function(o){if(o.id==i){var d=e.options[e.selectedIndex].text;if(o.productCategory=d,o.productTitle=t,o.price=parseInt(c),o.topProducts=a.checked,r){var l=URL.createObjectURL(r);o.uploadedImageSrc=l}s.setState({products:s.state.products},(function(){if(s.updateMaxPrice(s.state.products),1==o.topProducts){var e=s.state.topProduct.filter((function(e){return e==o}));console.log("result",e),0==e.length&&s.state.topProduct.push(o),console.log(s.state.topProduct),s.setState({topProduct:s.state.topProduct})}else s.state.topProduct.forEach((function(e){if(console.log(e),e==o){var t=s.state.topProduct.indexOf(o);console.log(t),s.state.topProduct.splice(t,1)}})),s.setState({topProduct:s.state.topProduct})}))}}))}else document.getElementById("error-msg-title").innerHTML=t?"":"Please Enter the Title",document.getElementById("error-msg-price").innerHTML=c?"":"Please Enter the Price"},s.addProduct=function(){var e={};e.id=s.state.products.length+1;var t=document.getElementById("selectedCategory"),c=t.options[t.selectedIndex].text;e.productCategory=c;var a=document.getElementById("title").value;e.productTitle=a;var r=document.getElementById("price").value;e.price=parseInt(r);var o=document.getElementById("topProduct").checked;e.topProducts=o;var d=document.querySelector('input[type="file"]').files[0];if(a&&r&&void 0!=d){var i=URL.createObjectURL(d);e.uploadedImageSrc=i;var l=document.getElementById("myModal"),n=document.getElementsByTagName("body")[0];l.style.display="none",n.style.overflow="auto",!0===o?(s.state.topProduct.push(e),s.state.products.push(e),s.setState({products:s.state.products,topProduct:s.state.topProduct},(function(){s.updateMaxPrice(s.state.products)}))):(s.state.products.push(e),s.setState({products:s.state.products},(function(){s.updateMaxPrice(s.state.products)})))}else document.getElementById("error-msg-title").innerHTML=a?"":"Please Enter the Title",document.getElementById("error-msg-price").innerHTML=r?"":"Please Enter the Price",document.getElementById("error-msg-file").innerHTML=void 0==d?"Please Upload the file":""},s.filterByCategory=function(e){var t=[],c=e.target.innerHTML;s.state.products.map((function(e){e.productCategory===c&&t.push(e)})),s.setState({filtered:t,filterCategory:t},(function(){s.updateMaxPrice(t)}))},s.updateMaxPrice=function(e){var t=e.map((function(e){return e.price})),c=Math.max.apply(Math,Object(d.a)(t)),s=parseInt(c),a=document.querySelector(".price-range b span"),r=document.getElementById("slider");r.value=0,a.innerHTML=s,r.max=s},s.rangeSlider=function(e){document.querySelector(".price-range b span").innerHTML=e.target.value;var t=[];null==s.state.filterCategory?(s.state.products.forEach((function(c){c.price<=e.target.value&&t.push(c)})),s.setState({filtered:t})):(s.state.filterCategory.forEach((function(c){c.price<=e.target.value&&t.push(c)})),s.setState({filtered:t}))},s.sortByPrice=function(){var e=document.getElementById("selectedSort"),t=e.options[e.selectedIndex].value;1==t?s.priceHighToLow():2==t?s.priceLowToHigh():s.defaultSorting()},s.priceLowToHigh=function(){if(s.state.filtered.length<1){var e=s.state.products.sort((function(e,t){return parseFloat(e.price)-parseFloat(t.price)}));s.setState({filtered:e})}else{var t=s.state.filtered.sort((function(e,t){return parseFloat(e.price)-parseFloat(t.price)}));s.setState({filtered:t})}},s.state={products:[{id:1,productCategory:"Books",productTitle:"Plain Notebook",price:109,topProducts:!1,sale:!0,uploadedImageSrc:"https://source.unsplash.com/400x300/?notebook"},{id:2,productCategory:"Bags",productTitle:"Casual HandBag",price:49,topProducts:!1,sale:!1,uploadedImageSrc:"https://source.unsplash.com/400x300/?handbag"},{id:3,productCategory:"Books",productTitle:"e-Book Reader",price:199,topProducts:!1,sale:!0,uploadedImageSrc:"https://source.unsplash.com/400x300/?e-book"},{id:4,productCategory:"Books",productTitle:"Hard CoverBook",price:59,topProducts:!1,sale:!1,uploadedImageSrc:"https://source.unsplash.com/400x300/?Book"},{id:5,productCategory:"Misc",productTitle:"Mug Mockup",price:99,topProducts:!1,sale:!1,uploadedImageSrc:"https://source.unsplash.com/400x300/?Mug"},{id:6,productCategory:"Hoodie/T-shirt",productTitle:"Hoodie Red",price:599,topProducts:!1,sale:!0,uploadedImageSrc:"https://source.unsplash.com/400x300/?Hoodie"},{id:7,productCategory:"Misc",productTitle:"Poster Mockup",price:89,topProducts:!1,sale:!1,uploadedImageSrc:"https://source.unsplash.com/400x300/?Poster"},{id:8,productCategory:"Misc",productTitle:"Poster Mockup",price:19,topProducts:!1,sale:!1,uploadedImageSrc:"https://source.unsplash.com/400x300/?Poster"},{id:9,productCategory:"Misc",productTitle:"Poster Mockup",price:20,topProducts:!1,sale:!1,uploadedImageSrc:"https://source.unsplash.com/400x300/?Poster"}],topProduct:[{id:0,productCategory:"Misc",productTitle:"Mug Mockup",price:99,topProducts:!0,uploadedImageSrc:"https://source.unsplash.com/70x70/?mug,mockup"}],filtered:null,filterCategory:null,onclick:s.addProduct,isEdit:!1},s}return Object(l.a)(c,[{key:"componentDidMount",value:function(){this.updateMaxPrice(this.state.products),window.addEventListener("click",(function(e){var t=document.getElementById("myModal");if(e.target==t){var c=document.getElementsByTagName("body")[0],s=document.getElementById("title"),a=document.getElementById("price");t.style.display="none",c.style.overflow="auto",s.value="",a.value=""}}))}},{key:"defaultSorting",value:function(){if(this.state.filtered.length<1){var e=this.state.products.sort((function(e,t){return parseFloat(e.id)-parseFloat(t.id)}));this.setState({filtered:e})}else{var t=this.state.filtered.sort((function(e,t){return parseFloat(e.id)-parseFloat(t.id)}));this.setState({filtered:t})}}},{key:"priceHighToLow",value:function(){if(this.state.filtered.length<1){var e=this.state.products.sort((function(e,t){return parseFloat(t.price)-parseFloat(e.price)}));this.setState({filtered:e})}else{var t=this.state.filtered.sort((function(e,t){return parseFloat(t.price)-parseFloat(e.price)}));this.setState({filtered:t})}}},{key:"render",value:function(){var e=this;return console.log("state after render",this.state),Object(p.jsxs)(p.Fragment,{children:[Object(p.jsx)("header",{className:"header",children:Object(p.jsxs)("div",{className:"container",children:[Object(p.jsx)("div",{className:"product-logo",children:Object(p.jsx)("a",{href:"index.html",children:"Products"})}),Object(p.jsx)("button",{id:"myBtn",onClick:this.addProductBtn,className:"add-product",children:"Add Product"}),Object(p.jsx)("div",{id:"myModal",className:"modal",children:Object(p.jsxs)("div",{className:"modal-content",children:[Object(p.jsxs)("div",{className:"modal-header",children:[Object(p.jsx)("span",{onClick:this.closeModal,className:"close",children:"\xd7"}),Object(p.jsx)("h2",{children:"Add Product"})]}),Object(p.jsx)("div",{className:"modal-body",children:Object(p.jsxs)("form",{action:"",children:[Object(p.jsxs)("div",{className:"product-category",children:[Object(p.jsx)("div",{className:"product-category-name",children:"product Category"}),Object(p.jsxs)("select",{className:"select-product-category",name:"",id:"selectedCategory",children:[Object(p.jsx)("option",{value:"Books",children:"Books"}),Object(p.jsx)("option",{value:"Hoodie/T-shirt",children:"Hoodie/T-shirt"}),Object(p.jsx)("option",{value:"Bags",children:"Bags"}),Object(p.jsx)("option",{value:"Misc",children:"Misc"})]})]}),Object(p.jsxs)("div",{className:"product-title",children:[Object(p.jsx)("div",{className:"product-title-name",children:"product Title"}),Object(p.jsx)("input",{id:"title",className:"title",type:"text",placeholder:"Enter Product Tilte"}),Object(p.jsx)("div",{id:"error-msg-title",className:"error-msg"})]}),Object(p.jsxs)("div",{className:"product-price",children:[Object(p.jsx)("div",{className:"product-price-name",children:"Price"}),Object(p.jsx)("input",{id:"price",className:"price",type:"number",placeholder:"Enter Price"}),Object(p.jsx)("div",{id:"error-msg-price",className:"error-msg"})]}),Object(p.jsxs)("div",{className:"product-top",children:[Object(p.jsx)("input",{id:"topProduct",className:"top-product",type:"checkbox"}),Object(p.jsx)("span",{className:"product-top-name",children:"Top Products"})]}),Object(p.jsxs)("div",{className:"product-image",children:[Object(p.jsx)("div",{className:"product-image-name",children:"Upload Product Image"}),Object(p.jsxs)("label",{className:"custom-file-upload",children:[Object(p.jsx)("input",{name:"uploadImg",id:"uploadedImage",type:"file"}),"Upload"," "]}),Object(p.jsx)("span",{className:"show-img-name"}),Object(p.jsx)("div",{id:"error-msg-file",className:"error-msg"})]})]})}),Object(p.jsx)("div",{className:"modal-footer",children:Object(p.jsxs)("div",{className:"footer-cancel-save-container",children:[Object(p.jsx)("button",{onClick:this.closeModal,id:"cancel",className:"cancel",children:"CANCEL"}),Object(p.jsx)("button",{onClick:this.state.isEdit?this.editProduct:this.addProduct,id:"save",className:"save",children:"SAVE"})]})})]})})]})}),Object(p.jsx)("main",{className:"main",children:Object(p.jsxs)("div",{className:"container",children:[Object(p.jsxs)("div",{className:"left-sidebar",children:[Object(p.jsxs)("div",{className:"categories",children:[Object(p.jsx)("div",{className:"sidebar-heading",children:"Categories"}),Object(p.jsx)("div",{children:Object(p.jsxs)("ul",{children:[Object(p.jsx)("li",{onClick:this.filterByCategory,value:"Books",children:"Books"}),Object(p.jsx)("li",{onClick:this.filterByCategory,value:"Hoodie/T-shirt",children:"Hoodie/T-shirt"}),Object(p.jsx)("li",{onClick:this.filterByCategory,value:"Bags",children:"Bags"}),Object(p.jsx)("li",{onClick:this.filterByCategory,value:"Misc",children:"Misc"})]})})]}),Object(p.jsxs)("div",{className:"filter-by-price",children:[Object(p.jsx)("div",{className:"sidebar-heading",children:"Filter By Price"}),Object(p.jsx)("input",{onChange:this.rangeSlider,type:"range",id:"slider",min:"0",max:"599"}),Object(p.jsxs)("div",{className:"filter-btn-price",children:[Object(p.jsx)("button",{className:"filter-btn",children:"Filter"}),Object(p.jsxs)("span",{className:"price-range",children:["Price :"," ",Object(p.jsxs)("b",{children:["$0 - $",Object(p.jsx)("span",{children:"1000"})]})]})]})]}),Object(p.jsxs)("div",{className:"related-products",children:[Object(p.jsx)("div",{className:"sidebar-heading",children:"Top Products"}),Object(p.jsx)("div",{className:"mini-product-show-container",children:this.state.topProduct.map((function(e){return Object(p.jsxs)("div",{className:"mini-product-show",children:[Object(p.jsx)("img",{style:{width:"70px",height:"70px"},src:e.uploadedImageSrc,alt:""}),Object(p.jsxs)("div",{class:"product-content",children:[Object(p.jsx)("span",{class:"mini-product-heading",children:e.productTitle}),Object(p.jsxs)("div",{class:"star",children:[Object(p.jsx)("img",{src:"./images/star.png",alt:""}),Object(p.jsx)("img",{src:"images/star.png",alt:""}),Object(p.jsx)("img",{src:"images/star.png",alt:""}),Object(p.jsx)("img",{src:"images/star.png",alt:""}),Object(p.jsx)("img",{src:"images/star.png",alt:""})]}),Object(p.jsxs)("div",{class:"mini-price",children:["$",e.price]})]})]})}))})]})]}),Object(p.jsxs)("div",{className:"main-product-listing",children:[Object(p.jsxs)("div",{className:"top-sort",children:[Object(p.jsx)("span",{className:"showing-card",children:"Showing 1-8 of 9 results"}),Object(p.jsxs)("select",{id:"selectedSort",onChange:this.sortByPrice,className:"sort-button",children:[Object(p.jsx)("option",{value:"0",children:"Default Sorting"}),Object(p.jsx)("option",{value:"1",children:"Price: High to Low"}),Object(p.jsx)("option",{value:"2",children:"Price: Low to High"})]})]}),Object(p.jsx)("div",{className:"product-listing",children:null!==this.state.filtered?this.state.filtered.map((function(t){return Object(p.jsxs)("div",{className:"product-card",id:"cardBtn","data-value":t.id,onClick:function(t){return e.productClicked(t)},children:[Object(p.jsxs)("div",{className:"product-image","data-value":t.id,children:[!0===t.sale?Object(p.jsx)("button",{className:"product-sale","data-value":t.id,children:"sale"}):"",Object(p.jsx)("img",{src:t.uploadedImageSrc,"data-value":t.id,alt:""})]}),Object(p.jsxs)("div",{class:"product-details","data-value":t.id,children:[Object(p.jsx)("span",{id:"productId",style:{display:"none"},children:t.id}),Object(p.jsx)("div",{class:"product-name","data-value":t.id,children:t.productTitle}),Object(p.jsxs)("div",{class:"product-price","data-value":t.id,children:["$",t.price]})]})]})})):this.state.products.map((function(t){return Object(p.jsxs)("div",{className:"product-card",id:"cardBtn","data-value":t.id,onClick:function(t){return e.productClicked(t)},children:[Object(p.jsxs)("div",{className:"product-image","data-value":t.id,children:[!0===t.sale?Object(p.jsx)("button",{className:"product-sale","data-value":t.id,children:"sale"}):"",Object(p.jsx)("img",{src:t.uploadedImageSrc,"data-value":t.id,alt:""})]}),Object(p.jsxs)("div",{class:"product-details","data-value":t.id,children:[Object(p.jsx)("span",{id:"productId",style:{display:"none"},children:t.id}),Object(p.jsx)("div",{class:"product-name","data-value":t.id,children:t.productTitle}),Object(p.jsxs)("div",{class:"product-price","data-value":t.id,children:["$",t.price]})]})]})}))}),Object(p.jsx)("div",{className:"pagination"})]})]})})]})}}]),c}(a.a.Component),h=function(e){e&&e instanceof Function&&c.e(3).then(c.bind(null,17)).then((function(t){var c=t.getCLS,s=t.getFID,a=t.getFCP,r=t.getLCP,o=t.getTTFB;c(e),s(e),a(e),r(e),o(e)}))};o.a.render(Object(p.jsx)(a.a.StrictMode,{children:Object(p.jsx)(m,{})}),document.getElementById("root")),h()}},[[16,1,2]]]);
//# sourceMappingURL=main.f595cc28.chunk.js.map