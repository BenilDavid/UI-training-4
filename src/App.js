// import logo from './logo.svg';
import './css/style.css';
import React from 'react';
// import $ from 'jquery';

class App extends React.Component {
	constructor(props) {
		super(props);
		// initial state
		this.state = {
			products: [
				{
					id: 1,
					productCategory: 'Books',
					productTitle: 'Plain Notebook',
					price: 109.0,
					topProducts: false,
					sale: true,
					uploadedImageSrc: 'https://source.unsplash.com/400x300/?notebook',
				},
				{
					id: 2,
					productCategory: 'Bags',
					productTitle: 'Casual HandBag',
					price: 49.0,
					topProducts: false,
					sale: false,
					uploadedImageSrc: 'https://source.unsplash.com/400x300/?handbag',
				},
				{
					id: 3,
					productCategory: 'Books',
					productTitle: 'e-Book Reader',
					price: 199.0,
					topProducts: false,
					sale: true,
					uploadedImageSrc: 'https://source.unsplash.com/400x300/?e-book',
				},
				{
					id: 4,
					productCategory: 'Books',
					productTitle: 'Hard CoverBook',
					price: 59.0,
					topProducts: false,
					sale: false,
					uploadedImageSrc: 'https://source.unsplash.com/400x300/?Book',
				},
				{
					id: 5,
					productCategory: 'Misc',
					productTitle: 'Mug Mockup',
					price: 99.0,
					topProducts: false,
					sale: false,
					uploadedImageSrc: 'https://source.unsplash.com/400x300/?Mug',
				},
				{
					id: 6,
					productCategory: 'Hoodie/T-shirt',
					productTitle: 'Hoodie Red',
					price: 599.0,
					topProducts: false,
					sale: true,
					uploadedImageSrc: 'https://source.unsplash.com/400x300/?Hoodie',
				},
				{
					id: 7,
					productCategory: 'Misc',
					productTitle: 'Poster Mockup',
					price: 89.0,
					topProducts: false,
					sale: false,
					uploadedImageSrc: 'https://source.unsplash.com/400x300/?Poster',
				},
				{
					id: 8,
					productCategory: 'Misc',
					productTitle: 'Poster Mockup',
					price: 19.0,
					topProducts: false,
					sale: false,
					uploadedImageSrc: 'https://source.unsplash.com/400x300/?Poster',
				},
				{
					id: 9,
					productCategory: 'Misc',
					productTitle: 'Poster Mockup',
					price: 20.0,
					topProducts: false,
					sale: false,
					uploadedImageSrc: 'https://source.unsplash.com/400x300/?Poster',
				},
				// {
				// 	id: 10,
				// 	productCategory: 'Misc',
				// 	productTitle: 'Shoes',
				// 	price: 2000.0,
				// 	topProducts: false,
				// 	sale: false,
				// 	uploadedImageSrc: 'https://source.unsplash.com/400x300/?shoes',
				// },
			],
			topProduct: [
				{
					id: 0,
					productCategory: 'Misc',
					productTitle: 'Mug Mockup',
					price: 99.0,
					topProducts: true,
					uploadedImageSrc: 'https://source.unsplash.com/70x70/?mug,mockup',
				},
			],
			filtered: [],
			filterCategory: null,
			onclick: this.addProduct,
			isEdit: false,
			paginationResponse: [],
			pageNumber: [],
			pageWiseProducts: [],
			page_active_link: 1,
		};
	}
	componentDidMount() {
		this.updateMaxPrice(this.state.products);
		window.addEventListener('click', function (event) {
			var modal = document.getElementById('myModal');
			if (event.target == modal) {
				var body = document.getElementsByTagName('body')[0];
				var title = document.getElementById('title');
				var price = document.getElementById('price');
				modal.style.display = 'none';
				body.style.overflow = 'auto';
				title.value = '';
				price.value = '';
			}
			// if (this.state.isEdit) {
			// 	this.setState({
			// 		isEdit: !this.state.isEdit,
			// 	});
			// }
		});
		let response = this.paginator(this.state.products, 1, 9);
		this.setPageDatas(response);
	}

	// ----------------------------------------- PAGINATION ------------------------------------

	paginator = (items, current_page, per_page_items) => {
		let page = current_page || 1,
			per_page = per_page_items || 10,
			offset = (page - 1) * per_page,
			paginatedItems = items.slice(offset).slice(0, per_page_items),
			total_pages = Math.ceil(items.length / per_page);

		return {
			page: page,
			per_page: per_page,
			pre_page: page - 1 ? page - 1 : null,
			next_page: total_pages > page ? page + 1 : null,
			total: items.length,
			total_pages: total_pages,
			data: paginatedItems,
		};
	};

	//set page product data as per the response
	setPageDatas = (response) => {
		this.setState(
			{
				paginationResponse: response,
			},
			() => {
				console.log(
					'this.state.paginationResponse',
					this.state.paginationResponse
				);
				this.loadPageNumber(this.state.paginationResponse);
				this.onLoadProductData(this.state.paginationResponse);
			}
		);
	};

	// Display Page Numbers Function
	loadPageNumber = (response) => {
		let dummy_array = [];

		for (let i = 1; i <= response.total_pages; i++) {
			dummy_array.push(i);
		}
		this.setState(
			{
				pageNumber: dummy_array,
			},
			() => {
				console.log('this.state.page', this.state.pageNumber);
			}
		);
	};

	//load products data as per the response
	onLoadProductData(response) {
		let dummy_array = [];
		// console.log(response)
		for (let i = 0; i < response.data.length; i++) {
			dummy_array.push(response.data[i]);
		}

		this.setState(
			{
				pageWiseProducts: dummy_array,
			},
			() => {
				console.log('onload data', this.state.pageWiseProducts);
			}
		);
	}

	//when user click the page numb
	pageNumbClick = (e) => {
		console.log('----------------page clicked---------------');
		e.preventDefault();
		console.log(e.target.dataset.page);
		let dummy_array = [];

		let page_click_response;

		// console.log(this.state.products);
		if (this.state.filtered.length === 0) {
			page_click_response = this.paginator(
				this.state.products,
				e.target.dataset.page,
				9
			);
		} else {
			page_click_response = this.paginator(
				this.state.filtered,
				e.target.dataset.page,
				9
			);
		}

		console.log(page_click_response);
		for (let i = 0; i < page_click_response.data.length; i++) {
			dummy_array.push(page_click_response.data[i]);
		}

		this.setState(
			{
				pageWiseProducts: dummy_array,
				page_active_link: parseInt(e.target.dataset.page),
			},
			() => {
				console.log(this.state.page_active_link);
			}
		);
		console.log('----------------page clicked---------------');
	};

	// add product open modal
	addProductBtn = () => {
		var modal = document.getElementById('myModal');
		var body = document.getElementsByTagName('body')[0];
		var save = document.getElementById('save');
		var title = document.getElementById('title');
		var price = document.getElementById('price');
		title.value = '';
		price.value = '';
		modal.style.display = 'block';
		body.style.overflow = 'hidden';
	};

	// close modal
	closeModal = () => {
		var modal = document.getElementById('myModal');
		var body = document.getElementsByTagName('body')[0];
		var title = document.getElementById('title');
		var price = document.getElementById('price');
		modal.style.display = 'none';
		body.style.overflow = 'auto';
		title.value = '';
		price.value = '';
		this.setState({
			isEdit: false,
		});
	};

	// -------------------------- PRODUCT CARD CLICKED ----------------------------

	// when product is clicked
	// showing default values for the product modal
	productClicked = (element) => {
		// var idarray = [];
		console.log(element.target.dataset.value);
		var modal = document.getElementById('myModal');
		var save = document.getElementById('save');
		var modalProductCategory = document.querySelectorAll(
			'.product-category select option'
		);
		var modalProductTitle = document.querySelector('#title');
		var modalProductPrice = document.querySelector('#price');
		var topProduct = document.getElementById('topProduct');
		var uploadFile = document.querySelector('input[type="file"]').files[0];
		var uploadFileValue = document.querySelector('input[type="file"]');
		var clikedProductId = parseInt(element.target.dataset.value);
		// changing the onclick function

		this.setState(
			{
				isEdit: true,
			},
			() => {
				modal.setAttribute('data-value', clikedProductId);

				// showing the modal
				var body = document.getElementsByTagName('body')[0];
				modal.style.display = 'block';
				body.style.overflow = 'hidden';

				// remove selected attribute in all options
				modalProductCategory.forEach((option) => {
					option.removeAttribute('selected', '');
				});

				// setting default values for the product that is clicked
				this.state.products.forEach((obj) => {
					if (obj.id == clikedProductId) {
						modalProductCategory.forEach((option) => {
							if (option.value === obj.productCategory) {
								console.log(option);
								option.setAttribute('selected', '');
							}
						});
						modalProductTitle.value = obj.productTitle;
						modalProductPrice.value = obj.price;
						topProduct.checked = obj.topProducts;
						uploadFileValue.value = '';
					}
				});
			}
		);
	};

	// save button when editting a product details
	editProduct = () => {
		var e = document.getElementById('selectedCategory');
		var title = document.getElementById('title').value;
		var price = document.getElementById('price').value;
		var topProduct = document.getElementById('topProduct');
		var uploadFile = document.querySelector('input[type="file"]').files[0];

		if (!title || !price) {
			if (!title) {
				document.getElementById('error-msg-title').innerHTML =
					'Please Enter the Title';
			} else {
				document.getElementById('error-msg-title').innerHTML = '';
			}
			if (!price) {
				document.getElementById('error-msg-price').innerHTML =
					'Please Enter the Price';
			} else {
				document.getElementById('error-msg-price').innerHTML = '';
			}
		} else {
			var modal = document.getElementById('myModal');
			var body = document.getElementsByTagName('body')[0];
			modal.style.display = 'none';
			body.style.overflow = 'auto';
			console.log(modal.dataset.value);
			var currentSelectedId = modal.dataset.value;
			this.state.products.forEach((obj) => {
				if (obj.id == currentSelectedId) {
					var category = e.options[e.selectedIndex].text;
					obj.productCategory = category;
					obj.productTitle = title;
					obj.price = parseInt(price);
					obj.topProducts = topProduct.checked;
					if (uploadFile) {
						var image = URL.createObjectURL(uploadFile);
						obj.uploadedImageSrc = image;
					}
					this.setState(
						{
							products: this.state.products,
						},
						() => {
							this.updateMaxPrice(this.state.products);
							if (obj.topProducts == true) {
								const result = this.state.topProduct.filter(
									(topobj) => topobj == obj
								);
								console.log('result', result);
								if (result.length == 0) {
									this.state.topProduct.push(obj);
								}
								console.log(this.state.topProduct);
								this.setState({
									topProduct: this.state.topProduct,
								});
							} else {
								this.state.topProduct.forEach((topObj) => {
									console.log(topObj);
									if (topObj == obj) {
										var index = this.state.topProduct.indexOf(obj);
										console.log(index);
										this.state.topProduct.splice(index, 1);
									}
								});
								this.setState({
									topProduct: this.state.topProduct,
								});
							}
						}
					);
				}
			});
		}
	};

	// -------------------------- SAVE: ADD PRODUCT BUTTON ----------------------------

	// save button for add product button
	//adding product to the product list (when Save button is clicked)
	addProduct = () => {
		var obj = {};
		obj['id'] = this.state.products.length + 1;
		var e = document.getElementById('selectedCategory');
		var category = e.options[e.selectedIndex].text;
		obj['productCategory'] = category;
		var title = document.getElementById('title').value;
		obj['productTitle'] = title;
		var price = document.getElementById('price').value;
		obj['price'] = parseInt(price);
		var topProduct = document.getElementById('topProduct').checked;
		obj['topProducts'] = topProduct;
		var uploadFile = document.querySelector('input[type="file"]').files[0];

		if (!title || !price || uploadFile == undefined) {
			if (!title) {
				document.getElementById('error-msg-title').innerHTML =
					'Please Enter the Title';
			} else {
				document.getElementById('error-msg-title').innerHTML = '';
			}
			if (!price) {
				document.getElementById('error-msg-price').innerHTML =
					'Please Enter the Price';
			} else {
				document.getElementById('error-msg-price').innerHTML = '';
			}
			if (uploadFile == undefined) {
				document.getElementById('error-msg-file').innerHTML =
					'Please Upload the file';
			} else {
				document.getElementById('error-msg-file').innerHTML = '';
			}
		} else {
			var image = URL.createObjectURL(uploadFile);
			obj['uploadedImageSrc'] = image;

			// hide modal after save
			var modal = document.getElementById('myModal');
			var body = document.getElementsByTagName('body')[0];
			modal.style.display = 'none';
			body.style.overflow = 'auto';

			if (topProduct === true) {
				this.state.topProduct.push(obj);
				this.state.products.push(obj);
				this.setState(
					{
						products: this.state.products,
						topProduct: this.state.topProduct,
						filtered: [],
					},
					() => {
						this.updateMaxPrice(this.state.products);
						let response = this.paginator(this.state.products, 1, 9);
						this.setPageDatas(response);
					}
				);
			} else {
				this.state.products.push(obj);
				this.setState(
					{
						products: this.state.products,
						filtered: [],
					},
					() => {
						this.updateMaxPrice(this.state.products);
						let response = this.paginator(this.state.products, 1, 9);
						this.setPageDatas(response);
					}
				);
			}
		}
	};

	// filter by category
	filterByCategory = (el) => {
		var filterCategory = [];
		var selectedCategoryName = el.target.innerHTML;
		this.state.products.map((e) => {
			if (e.productCategory === selectedCategoryName) {
				filterCategory.push(e);
			}
		});
		this.setState(
			{
				filtered: filterCategory,
				filterCategory: filterCategory,
			},
			() => {
				this.updateMaxPrice(filterCategory);
				let response = this.paginator(this.state.filtered, 1, 9);
				this.setPageDatas(response);
			}
		);
		// this.updateMaxPrice(filteredArray);
	};

	// update max price
	updateMaxPrice = (filteredArray) => {
		var priceArr = filteredArray.map((costs) => {
			return costs.price;
		});
		var max = Math.max(...priceArr);
		var maxx = parseInt(max);

		var priceRange = document.querySelector('.price-range b span');
		var slider = document.getElementById('slider');
		slider.value = 0;
		priceRange.innerHTML = maxx;
		slider.max = maxx;
	};

	// range slider
	rangeSlider = (e) => {
		// update max value of slider
		var priceRange = document.querySelector('.price-range b span');
		priceRange.innerHTML = e.target.value;
		var filterPrice = [];

		if (this.state.filterCategory == null) {
			this.state.products.forEach((arr) => {
				if (arr.price <= e.target.value) {
					filterPrice.push(arr);
				}
			});
			this.setState(
				{
					filtered: filterPrice,
				},
				() => {
					let response = this.paginator(this.state.filtered, 1, 9);
					this.setPageDatas(response);
				}
			);
		} else {
			this.state.filterCategory.forEach((arr) => {
				if (arr.price <= e.target.value) {
					filterPrice.push(arr);
				}
			});
			this.setState(
				{
					filtered: filterPrice,
				},
				() => {
					let response = this.paginator(this.state.filtered, 1, 9);
					this.setPageDatas(response);
				}
			);
		}
	};

	// selecting sort by price type (ASC/DESC)
	sortByPrice = () => {
		var e = document.getElementById('selectedSort');
		var category = e.options[e.selectedIndex].value;

		if (category == 1) {
			this.priceHighToLow();
		} else if (category == 2) {
			this.priceLowToHigh();
		} else {
			this.defaultSorting();
		}
	};
	// -------------------------- PRICE: DEFAULT SORTING ----------------------------
	defaultSorting = () => {
		if (this.state.filtered.length < 1) {
			const defaultSort = this.state.products.sort(function (a, b) {
				return parseFloat(a.id) - parseFloat(b.id);
			});
			this.setState(
				{
					filtered: defaultSort,
				},
				() => {
					let response = this.paginator(this.state.filtered, 1, 9);
					this.setPageDatas(response);
				}
			);
		} else {
			const defaultSort = this.state.filtered.sort(function (a, b) {
				return parseFloat(a.id) - parseFloat(b.id);
			});
			this.setState(
				{
					filtered: defaultSort,
				},
				() => {
					let response = this.paginator(this.state.filtered, 1, 9);
					this.setPageDatas(response);
				}
			);
		}
	};
	// -------------------------- PRICE LOW TO HIGH ----------------------------
	priceLowToHigh = () => {
		if (this.state.filtered.length < 1) {
			const lowToHigh = this.state.products.sort(function (a, b) {
				return parseFloat(a.price) - parseFloat(b.price);
			});
			this.setState(
				{
					filtered: lowToHigh,
				},
				() => {
					let response = this.paginator(this.state.filtered, 1, 9);
					this.setPageDatas(response);
				}
			);
		} else {
			const lowToHigh = this.state.filtered.sort(function (a, b) {
				return parseFloat(a.price) - parseFloat(b.price);
			});
			this.setState(
				{
					filtered: lowToHigh,
				},
				() => {
					let response = this.paginator(this.state.filtered, 1, 9);
					this.setPageDatas(response);
				}
			);
		}
	};
	// -------------------------- PRICE HIGH TO LOW ----------------------------
	priceHighToLow = () => {
		if (this.state.filtered.length < 1) {
			const highToLow = this.state.products.sort(function (a, b) {
				return parseFloat(b.price) - parseFloat(a.price);
			});
			this.setState(
				{
					filtered: highToLow,
				},
				() => {
					let response = this.paginator(this.state.filtered, 1, 9);
					this.setPageDatas(response);
				}
			);
		} else {
			const highToLow = this.state.filtered.sort(function (a, b) {
				return parseFloat(b.price) - parseFloat(a.price);
			});
			this.setState(
				{
					filtered: highToLow,
				},
				() => {
					let response = this.paginator(this.state.filtered, 1, 9);
					this.setPageDatas(response);
				}
			);
		}
	};

	render() {
		const { page_active_link, pageNumber } = this.state;
		console.log('state after render', this.state);
		return (
			<>
				<header className="header">
					<div className="container">
						<div className="product-logo">
							<a href="index.html">Products</a>
						</div>

						<button
							id="myBtn"
							onClick={this.addProductBtn}
							className="add-product"
						>
							Add Product
						</button>
						<div id="myModal" className="modal">
							<div className="modal-content">
								<div className="modal-header">
									<span onClick={this.closeModal} className="close">
										&times;
									</span>
									<h2>Add Product</h2>
								</div>
								<div className="modal-body">
									<form action="">
										<div className="product-category">
											<div className="product-category-name">
												product Category
											</div>
											<select
												className="select-product-category"
												name=""
												id="selectedCategory"
											>
												<option value="Books">Books</option>
												<option value="Hoodie/T-shirt">Hoodie/T-shirt</option>
												<option value="Bags">Bags</option>
												<option value="Misc">Misc</option>
											</select>
										</div>
										<div className="product-title">
											<div className="product-title-name">product Title</div>
											<input
												id="title"
												className="title"
												type="text"
												placeholder="Enter Product Tilte"
											/>
											<div id="error-msg-title" className="error-msg"></div>
										</div>
										<div className="product-price">
											<div className="product-price-name">Price</div>
											<input
												id="price"
												className="price"
												type="number"
												placeholder="Enter Price"
											/>
											<div id="error-msg-price" className="error-msg"></div>
										</div>
										<div className="product-top">
											<input
												id="topProduct"
												className="top-product"
												type="checkbox"
											/>
											<span className="product-top-name">Top Products</span>
										</div>
										<div className="product-image">
											<div className="product-image-name">
												Upload Product Image
											</div>
											<label className="custom-file-upload">
												<input
													name="uploadImg"
													id="uploadedImage"
													type="file"
												/>
												Upload{' '}
											</label>
											<span className="show-img-name"></span>
											<div id="error-msg-file" className="error-msg"></div>
										</div>
									</form>
								</div>
								<div className="modal-footer">
									<div className="footer-cancel-save-container">
										<button
											onClick={this.closeModal}
											id="cancel"
											className="cancel"
										>
											CANCEL
										</button>
										<button
											onClick={
												this.state.isEdit ? this.editProduct : this.addProduct
											}
											id="save"
											className="save"
										>
											SAVE
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</header>
				<main className="main">
					<div className="container">
						<div className="left-sidebar">
							<div className="categories">
								<div className="sidebar-heading">Categories</div>
								<div>
									<ul>
										<li onClick={this.filterByCategory} value="Books">
											Books
										</li>
										<li onClick={this.filterByCategory} value="Hoodie/T-shirt">
											Hoodie/T-shirt
										</li>
										<li onClick={this.filterByCategory} value="Bags">
											Bags
										</li>
										<li onClick={this.filterByCategory} value="Misc">
											Misc
										</li>
									</ul>
								</div>
							</div>
							<div className="filter-by-price">
								<div className="sidebar-heading">Filter By Price</div>
								<input
									onChange={this.rangeSlider}
									type="range"
									id="slider"
									min="0"
									max="599"
								/>
								<div className="filter-btn-price">
									<button className="filter-btn">Filter</button>
									<span className="price-range">
										Price :{' '}
										<b>
											$0 - $<span>1000</span>
										</b>
									</span>
								</div>
							</div>
							<div className="related-products">
								<div className="sidebar-heading">Top Products</div>
								<div className="mini-product-show-container">
									{this.state.topProduct.map((e) => {
										return (
											<div className="mini-product-show">
												<img
													style={{ width: '70px', height: '70px' }}
													src={e.uploadedImageSrc}
													alt=""
												/>
												<div class="product-content">
													<span class="mini-product-heading">
														{e.productTitle}
													</span>
													<div class="star">
														<img src="./images/star.png" alt="" />
														<img src="images/star.png" alt="" />
														<img src="images/star.png" alt="" />
														<img src="images/star.png" alt="" />
														<img src="images/star.png" alt="" />
													</div>
													<div class="mini-price">${e.price}</div>
												</div>
											</div>
										);
									})}
								</div>
							</div>
						</div>
						<div className="main-product-listing">
							<div className="top-sort">
								<span className="showing-card">Showing 1-8 of 9 results</span>
								<select
									id="selectedSort"
									onChange={this.sortByPrice}
									className="sort-button"
								>
									<option value="0">Default Sorting</option>
									<option value="1">Price: High to Low</option>
									<option value="2">Price: Low to High</option>
								</select>
							</div>
							<div className="product-listing">
								{this.state.pageWiseProducts.map((e) => {
									return (
										<div
											className="product-card"
											id="cardBtn"
											data-value={e.id}
											onClick={(e) => this.productClicked(e)}
										>
											<div className="product-image" data-value={e.id}>
												{e.sale === true ? (
													<button className="product-sale" data-value={e.id}>
														sale
													</button>
												) : (
													''
												)}
												<img
													src={e.uploadedImageSrc}
													data-value={e.id}
													alt=""
												/>
											</div>
											<div class="product-details" data-value={e.id}>
												<span id="productId" style={{ display: 'none' }}>
													{e.id}
												</span>
												<div class="product-name" data-value={e.id}>
													{e.productTitle}
												</div>
												<div class="product-price" data-value={e.id}>
													${e.price}
												</div>
											</div>
										</div>
									);
								})}
								{/* {this.state.filtered.length !== 0
									? this.state.filtered.map((e) => {
											return (
												<div
													className="product-card"
													id="cardBtn"
													data-value={e.id}
													onClick={(e) => this.productClicked(e)}
												>
													<div className="product-image" data-value={e.id}>
														{e.sale === true ? (
															<button
																className="product-sale"
																data-value={e.id}
															>
																sale
															</button>
														) : (
															''
														)}
														<img
															src={e.uploadedImageSrc}
															data-value={e.id}
															alt=""
														/>
													</div>
													<div class="product-details" data-value={e.id}>
														<span id="productId" style={{ display: 'none' }}>
															{e.id}
														</span>
														<div class="product-name" data-value={e.id}>
															{e.productTitle}
														</div>
														<div class="product-price" data-value={e.id}>
															${e.price}
														</div>
													</div>
												</div>
											);
									  })
									: this.state.products.map((e) => {
											return (
												<div
													className="product-card"
													id="cardBtn"
													data-value={e.id}
													onClick={(e) => this.productClicked(e)}
												>
													<div className="product-image" data-value={e.id}>
														{e.sale === true ? (
															<button
																className="product-sale"
																data-value={e.id}
															>
																sale
															</button>
														) : (
															''
														)}
														<img
															src={e.uploadedImageSrc}
															data-value={e.id}
															alt=""
														/>
													</div>
													<div class="product-details" data-value={e.id}>
														<span id="productId" style={{ display: 'none' }}>
															{e.id}
														</span>
														<div class="product-name" data-value={e.id}>
															{e.productTitle}
														</div>
														<div class="product-price" data-value={e.id}>
															${e.price}
														</div>
													</div>
												</div>
											);
									  })} */}
							</div>
							<ul className="pagination">
								{pageNumber.map((item, key) => {
									return (
										<>
											<li
												className="page"
												id={key}
												data-page={item}
												onClick={this.pageNumbClick}
											>
												{item}
											</li>
										</>
									);
								})}
							</ul>
						</div>
					</div>
				</main>
			</>
		);
	}
}

export default App;
