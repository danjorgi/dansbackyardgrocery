document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector('#search-input');
    const categorySelect = document.querySelector('#category-select');
    const productList = document.querySelector('#product-list');
    const showAllButton = document.querySelector('#show-all');
    const searchButton = document.querySelector('#search-button');
    const cartCountElement = document.querySelector('#cart-count');
    const cartCounterElement = document.querySelector('#cart-counter');
    const orderButton = document.querySelector('.order-btn');

    updateCartCount();

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
            if (productList) {
                displayProducts(products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    }

    // Function to fetch and display products based on search and category filters
    async function fetchAndDisplayProducts() {
        const searchQuery = searchInput && searchInput.value ? searchInput.value.trim() : '';
        const category = categorySelect && categorySelect.value ? categorySelect.value : '';
        
        if (searchQuery) {
            fetchProductsByName(searchQuery);
        } else if (category) {
            fetchProductsByCategory(category);
        } else {
            fetchAllProducts();
        }
    }

    // Function to display products as cards
    function displayProducts(products) {
        if (!productList) {
            console.error('Product list element not found.');
            return;
        }
        if (products.length === 0) {
            productList.innerHTML = '<p>No products found</p>';
            return;
        }
        productList.innerHTML = '';
        products.forEach(product => {
            const card = createProductCard(product);
            card.querySelector('.btn-primary').addEventListener('click', () => {
                const productId = product.id;
                const quantityInput = card.querySelector('.form-control');
                const quantity = parseInt(quantityInput.value, 10);
                addToCart(product.id, product.name, product.description, product.price, quantity, product.imageUrl);
            })
            productList.appendChild(card);
        });
    }

    // Function to create a product card
    function createProductCard(product) {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'mb-3');
    
        const cardInner = document.createElement('div');
        cardInner.classList.add('card', 'h-100');
    
        const image = document.createElement('img');
        image.src = product.imageUrl;
        image.classList.add('card-img-top');
        image.alt = product.name;
    
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
    function addToCart(productId, name, description, price, quantity, imageUrl) {
        const cartItem = {
            productId: productId,
            name: name,
            description: description,
            price: price,
            quantity: quantity,
            imageUrl: imageUrl
        };
    
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const existingItemIndex = cartItems.findIndex(item => item.productId === productId);
    
        if (existingItemIndex !== -1) {
            cartItems[existingItemIndex].quantity += quantity;
        } else {
            cartItems.push(cartItem);
        }
    
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        updateCartCount();
    }

    // Event listeners
    if (searchButton) {
        searchButton.addEventListener('click', () => {
            console.log('Search button clicked');
            fetchProductsByName(searchInput.value.trim());
        });
    }

    if (categorySelect) {
        categorySelect.addEventListener('change', fetchAndDisplayProducts);
    }
    
    if (showAllButton) {
        showAllButton.addEventListener('click', fetchAllProducts);
    }

    if (orderButton) {
        orderButton.addEventListener('click', () => {
            console.log('Order button clicked');
            const isAuthenticated = localStorage.getItem('isAuthenticated');
            console.log('Is authenticated:', isAuthenticated);
        
            if (isAuthenticated) {
                const message = `Your order is complete. Thanks for shopping with us!`;
                alert(message);
                console.log('Cart before clearing:', localStorage.getItem('cartItems'));
                clearCart();
                console.log('Cart after clearing:', localStorage.getItem('cartItems'));
                displayCartItems();
            } else {
                alert("Please log in to complete your order. If you do not have an account, please register.");
            }
        });
    }

    fetchAllProducts();

    function clearCart() {
        localStorage.removeItem('cartItems');
        updateCartCount();
    }

    // Function to create a cart item card
    function createCartItemCard(item) {
        const card = document.createElement('div');
        card.classList.add('card', 'h-100');
    
        const cardInner = document.createElement('div');
        cardInner.classList.add('card-inner');
    
        const productImage = document.createElement('img');
        productImage.src = item.imageUrl;
        productImage.classList.add('card-img-top', 'cart-product-image');
        productImage.alt = item.name;
    
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
    
        const productDetails = document.createElement('div');
        productDetails.classList.add('cart-product-details');
    
        const productName = document.createElement('h5');
        productName.classList.add('card-title');
        productName.textContent = item.name;
    
        const productPrice = document.createElement('p');
        productPrice.classList.add('card-text');
        productPrice.textContent = `Price: $${item.price}`;
    
        const quantityLabel = document.createElement('label');
        quantityLabel.textContent = 'Quantity:';
        const quantityInput = document.createElement('input');
        quantityInput.type = 'number';
        quantityInput.min = '1';
        quantityInput.value = item.quantity;
        quantityInput.classList.add('form-control', 'mb-2');
        quantityInput.addEventListener('input', () => {
            updateQuantity(item.productId, parseInt(quantityInput.value));
        });
    
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'mt-2');
        deleteButton.addEventListener('click', () => {
            removeFromCart(item.productId);
        });
    
        productDetails.appendChild(productName);
        productDetails.appendChild(productPrice);
        productDetails.appendChild(quantityLabel);
        productDetails.appendChild(quantityInput);
        productDetails.appendChild(deleteButton);
    
        cardBody.appendChild(productDetails);
    
        cardInner.appendChild(productImage);
        cardInner.appendChild(cardBody);
    
        card.appendChild(cardInner);
    
        return card;
    }

    // Function to remove a product from the cart
    function removeFromCart(productId) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        cartItems = cartItems.filter(item => item.productId !== productId);
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
        displayCartItems();
        updateCartCount();
    }

    // Function to update the cart count in the navbar
    function updateCartCount() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        const cartCountElement = document.getElementById('cart-count');
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
        }

        if (cartCounterElement) {
            cartCounterElement.textContent = cartCount;
        }
    }


    // Event listener to display cart items when the cart page loads
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }

    // Function to display cart items on the cart page
    function displayCartItems() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const cartList = document.querySelector('#cart-list');
        if (!cartList) {
            console.error('Cart list element not found.');
            return;
        }
    
        cartList.innerHTML = '';
    
        let totalPrice = 0; // Initialize total price variable
    
        for (let i = 0; i < cartItems.length; i += 3) {
            const row = document.createElement('div');
            row.classList.add('row', 'mb-3');
    
            for (let j = i; j < i + 3 && j < cartItems.length; j++) {
                const item = cartItems[j];
                const card = createCartItemCard(item);
                const col = document.createElement('div');
                col.classList.add('col-md-4', 'mb-3');
                col.appendChild(card);
                row.appendChild(col);
    
                // Add item price to total price
                totalPrice += item.price * item.quantity;
            }
    
            cartList.appendChild(row);
        }
    
        // Display total price
        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }

    // Function to update the quantity of a product in the cart
    function updateQuantity(productId, newQuantity) {
        let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        const itemIndex = cartItems.findIndex(item => item.productId === productId);

        if (itemIndex !== -1) {
            cartItems[itemIndex].quantity = newQuantity;
            localStorage.setItem('cartItems', JSON.stringify(cartItems));
            displayCartItems(); // Update cart items display
            updateCartCount(); // Update cart count in the navbar
            updateTotalPrice(); // Update total price display
        }
    }

    // Function to update the total price based on cart items
    function updateTotalPrice() {
        const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        let totalPrice = 0;

        cartItems.forEach(item => {
            totalPrice += item.price * item.quantity;
        });

        const totalPriceElement = document.getElementById('total-price');
        totalPriceElement.textContent = `Total Price: $${totalPrice.toFixed(2)}`;
    }

    // Event listener to display cart items when the cart page loads
    if (window.location.pathname.includes('cart.html')) {
        displayCartItems();
    }
});