document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.querySelector('#search-input');
    const categorySelect = document.querySelector('#category-select');
    const productList = document.querySelector('#product-list');
    const showAllButton = document.querySelector('#show-all');

    // Function to fetch and display products based on search and category filters
    async function fetchAndDisplayProducts() {
        const searchQuery = searchInput.value.trim();
        const category = categorySelect.value;
    
        let url = '/api/v1/products';
    
        // If there's a search query, append it to the URL
        if (searchQuery) {
            url += `/${searchQuery}`;
        } else if (category !== 'All') { // If there's a selected category, append it to the URL
            url += `/category/${category}`;
        } else { // If neither search query nor category is specified, fetch all products
            url += `/`;
        }
    
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
        card.classList.add('card', 'mb-3');

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

        card.appendChild(cardBody);
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
    searchInput.addEventListener('input', fetchAndDisplayProducts);
    categorySelect.addEventListener('change', fetchAndDisplayProducts);
    showAllButton.addEventListener('click', () => {
        searchInput.value = '';
        categorySelect.value = 'All';
        fetchAndDisplayProducts();
    });

    // Initial fetch and display of products
    fetchAndDisplayProducts();
});