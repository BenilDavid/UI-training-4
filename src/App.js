// import logo from './logo.svg';
import './css/style.css';
import React from 'react';
// import $ from 'jquery';

class App extends React.Component {
	productsArray = [
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
	];
	// filteredArray = this.productsArray;
	constructor(props) {
		super(props);
		// initial state
		this.state = {
			products: this.productsArray,
		};
	}
	componentDidMount() {
		this.updateMaxPrice(this.productsArray);
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
		});
	}

	// add product open modal
	addProductBtn() {
		var modal = document.getElementById('myModal');
		var body = document.getElementsByTagName('body')[0];

		var save = document.getElementById('save');
		save.setAttribute('onclick', 'addProduct()');

		var title = document.getElementById('title');
		var price = document.getElementById('price');
		title.value = '';
		price.value = '';
		modal.style.display = 'block';
		body.style.overflow = 'hidden';
	}

	// close modal
	closeModal() {
		var modal = document.getElementById('myModal');
		var body = document.getElementsByTagName('body')[0];
		var title = document.getElementById('title');
		var price = document.getElementById('price');
		modal.style.display = 'none';
		body.style.overflow = 'auto';
		title.value = '';
		price.value = '';
	}
	// filter by category
	filterByCategory = (el) => {
		var filteredArray = [];
		var selectedCategoryName = el.target.innerHTML;
		this.productsArray.map((e) => {
			if (e.productCategory === selectedCategoryName) {
				filteredArray.push(e);
			}
		});
		this.setState({
			products: filteredArray,
		});
		this.updateMaxPrice(filteredArray);
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
		// console.log(filteredArray);
		// update max value of slider
		var priceRange = document.querySelector('.price-range b span');
		priceRange.innerHTML = e.target.value;
		var filterPrice = [];
		console.log(this.state.products);
		this.state.products.forEach((arr) => {
			if (arr.price <= e.target.value) {
				filterPrice.push(arr);
			}
		});
		this.filteredArray = filterPrice;
		this.setState({
			products: filterPrice,
		});
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
	defaultSorting() {
		const defaultSort = this.state.products.sort(function (a, b) {
			return parseFloat(a.id) - parseFloat(b.id);
		});
		this.setState({
			products: defaultSort,
		});
	}
	// -------------------------- PRICE LOW TO HIGH ----------------------------
	priceLowToHigh = () => {
		const lowToHigh = this.state.products.sort(function (a, b) {
			return parseFloat(a.price) - parseFloat(b.price);
		});
		this.setState({
			products: lowToHigh,
		});
	};
	// -------------------------- PRICE HIGH TO LOW ----------------------------
	priceHighToLow() {
		const highToLow = this.state.products.sort(function (a, b) {
			return parseFloat(b.price) - parseFloat(a.price);
		});
		this.setState({
			products: highToLow,
		});
	}
	render() {
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
											// onClick={addProduct}
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
								<div className="mini-product-show-container"></div>
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
								{this.state.products.map((e) => {
									return (
										<div className="product-card" id="cardBtn">
											<div class="product-image">
												{e.sale === true ? (
													<button class="product-sale">sale</button>
												) : (
													''
												)}
												<img src={e.uploadedImageSrc} alt="" />
											</div>
											<div class="product-details">
												<span id="productId" style={{ display: 'none' }}>
													{e.id}
												</span>
												<div class="product-name">{e.productTitle}</div>
												<div class="product-price">${e.price}</div>
											</div>
										</div>
									);
								})}
							</div>
							<div className="pagination"></div>
						</div>
					</div>
				</main>
			</>
		);
	}
}

export default App;
