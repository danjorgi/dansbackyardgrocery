document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector('#search-input');
    const categorySelect = document.querySelector('#category-select');
    const productList = document.querySelector('#product-list');
    const showAllButton = document.querySelector('#show-all');
    const searchButton = document.querySelector('#search-button');

    // Function to fetch and display products based on search query
    async function fetchProductsByName(searchQuery) {
        const url = `/api/v1/products?name=${encodeURIComponent(searchQuery)}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Function to fetch and display products based on category
    async function fetchProductsByCategory(category) {
        const url = `/api/v1/products/category/${category}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Function to fetch and display all products
    async function fetchAllProducts() {
        const url = '/api/v1/products';
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Failed to fetch products');
            }
            const products = await response.json();
            displayProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Function to fetch and display products based on search and category filters
    async function fetchAndDisplayProducts() {
        const searchQuery = searchInput.value.trim();
        const category = categorySelect.value;
    
        if (searchQuery) {
            fetchProductsByName(searchQuery);
        } else if (category !== 'All') {
            fetchProductsByCategory(category);
        } else {
            fetchAllProducts();
        }
    }

    // Function to display products as cards
    function displayProducts(products) {
        productList.innerHTML = '';
        if (products.length === 0) {
            productList.innerHTML = '<p>No products found</p>';
            return;
        }
        products.forEach(product => {
            const card = createProductCard(product);
            productList.appendChild(card);
        });
    }

    // Function to create a product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-3'); // Added 'col-md-4' class for Bootstrap grid system
    
        const cardInner = document.createElement('div');
        cardInner.classList.add('card', 'h-100'); // Added 'h-100' class to make all cards in a row have equal height
    
        const image = document.createElement('img'); // Create an image element
        image.src = product.imageUrl; // Set the image source to the URL from the product object
        image.classList.add('card-img-top'); // Add 'card-img-top' class for Bootstrap to place the image at the top of the card
        image.alt = product.name; // Set the alt attribute to the product name for accessibility
    
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
    
        const productName = document.createElement('h5');
        productName.classList.add('card-title');
        productName.textContent = product.name;
    
        const productDescription = document.createElement('p');
        productDescription.classList.add('card-text');
        productDescription.textContent = product.description;
    
        const productPrice = document.createElement('p');
        productPrice.classList.add('card-text');
        productPrice.textContent = `Price: $${product.price}`;
    
        const quantityLabel = document.createElement('label');
        quantityLabel.textContent = 'Quantity:';
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.value = '1';
        quantityInput.classList.add('form-control', 'mb-2');
    
        const addToCartButton = document.createElement('button');
        addToCartButton.textContent = 'Add to Cart';
        addToCartButton.classList.add('btn', 'btn-primary', 'mb-2');
        addToCartButton.addEventListener('click', () => {
            addToCart(product.id, parseInt(quantityInput.value, 10));
        });
    
        cardBody.appendChild(productName);
        cardBody.appendChild(productDescription);
        cardBody.appendChild(productPrice);
        cardBody.appendChild(quantityLabel);
        cardBody.appendChild(quantityInput);
        cardBody.appendChild(addToCartButton);
    
        cardInner.appendChild(image);
        cardInner.appendChild(cardBody);
    
        card.appendChild(cardInner);
        return card;
    }

    // Function to add a product to the cart
    async function addToCart(productId, quantity) {
        const userId = localStorage.getItem('userId');
        if (!userId) {
            console.error('User not authenticated');
            return;
        }

        try {
            const response = await fetch('/api/v1/products/addToCart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    productId: productId,
                    userId: userId,
                    quantity: quantity
                })
            });
            if (!response.ok) {
                throw new Error('Failed to add product to cart');
            }
            console.log('Product added to cart');
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    }

    // Event listeners
    searchButton.addEventListener('click', () => {
        console.log('Search button clicked');
        fetchProductsByName(searchInput.value.trim());
    });
    categorySelect.addEventListener('change', fetchAndDisplayProducts);
    showAllButton.addEventListener('click', () => {
        fetchAllProducts();
    });

    fetchAndDisplayProducts();
});