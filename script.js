// ===============================
// BOOKNOOK - BOOK DATA
// ===============================

const books = [
    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        price: 299,
        rating: 4.7,
        isbn: "9780743273565",
        image: "https://covers.openlibrary.org/b/isbn/9780743273565-M.jpg",
        description: "A timeless story of wealth, love, dreams and the mysterious Jay Gatsby."
    },
    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        price: 249,
        rating: 4.8,
        isbn: "9780061122415",
        image: "https://covers.openlibrary.org/b/isbn/9780061122415-M.jpg",
        description: "An inspiring journey about following your dreams and discovering your destiny."
    },
    {
        id: 3,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "Non-Fiction",
        price: 499,
        rating: 4.8,
        isbn: "9780062316097",
        image: "https://covers.openlibrary.org/b/isbn/9780062316097-M.jpg",
        description: "A fascinating exploration of the history and development of humankind."
    },
    {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Non-Fiction",
        price: 399,
        rating: 4.9,
        isbn: "9780735211292",
        image: "https://covers.openlibrary.org/b/isbn/9780735211292-M.jpg",
        description: "A practical guide to building good habits and breaking bad ones."
    },
    {
        id: 5,
        title: "The Little Prince",
        author: "Antoine de Saint-Exupéry",
        category: "Children",
        price: 199,
        rating: 4.9,
        isbn: "9780156012195",
        image: "https://covers.openlibrary.org/b/isbn/9780156012195-M.jpg",
        description: "A beautiful children's classic filled with imagination and life lessons."
    },
    {
        id: 6,
        title: "Charlotte's Web",
        author: "E. B. White",
        category: "Children",
        price: 229,
        rating: 4.7,
        isbn: "9780064400558",
        image: "https://covers.openlibrary.org/b/isbn/9780064400558-M.jpg",
        description: "A heartwarming story about friendship between a pig and a spider."
    },
    {
        id: 7,
        title: "Classic Notebook",
        author: "BookNook",
        category: "Stationery",
        price: 149,
        rating: 4.6,
        isbn: "BN-NOTE-001",
        image: "https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=500",
        description: "A premium notebook perfect for notes, ideas, journaling and planning."
    },
    {
        id: 8,
        title: "Creative Pen Set",
        author: "BookNook",
        category: "Stationery",
        price: 179,
        rating: 4.5,
        isbn: "BN-PEN-002",
        image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=500",
        description: "A colorful set of smooth-writing pens for school, college and creative work."
    }
];


// ===============================
// CART
// ===============================

let cart = JSON.parse(localStorage.getItem("bookNookCart")) || [];


// ===============================
// GET ELEMENT HELPER
// ===============================

function getElement(id) {
    return document.getElementById(id);
}


// ===============================
// DISPLAY PRODUCTS
// ===============================

function displayProducts(list = books) {

    const productGrid = getElement("productGrid");

    if (!productGrid) {
        console.error("productGrid not found in HTML");
        return;
    }

    productGrid.innerHTML = "";

    if (list.length === 0) {
        productGrid.innerHTML = `
            <div class="no-products">
                <h3>📚 No books found</h3>
                <p>Try another search or category.</p>
            </div>
        `;
        return;
    }

    list.forEach(book => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `
            <div class="product-image">
                <img 
                    src="${book.image}"
                    alt="${book.title}"
                    onerror="this.src='https://placehold.co/300x400/FDF6E3/2D6A4F?text=BookNook';"
                >
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${book.category}
                </span>

                <h3>${book.title}</h3>

                <p class="author">
                    by ${book.author}
                </p>

                <div class="rating">
                    ⭐ ${book.rating}
                </div>

                <div class="price">
                    ₹${book.price.toFixed(2)}
                </div>

                <div class="product-actions">

                    <button
                        class="view-btn"
                        onclick="showProduct(${book.id})">
                        View
                    </button>

                    <button
                        class="add-btn"
                        onclick="addToCart(${book.id})">
                        Add to Cart
                    </button>

                </div>

            </div>
        `;

        productGrid.appendChild(card);
    });
}


// ===============================
// SEARCH AND FILTER
// ===============================

function filterProducts() {

    const searchInput = getElement("searchInput");
    const categoryFilter = getElement("categoryFilter");
    const priceFilter = getElement("priceFilter");

    const search = searchInput
        ? searchInput.value.toLowerCase()
        : "";

    const category = categoryFilter
        ? categoryFilter.value
        : "All";

    const price = priceFilter
        ? priceFilter.value
        : "All";

    const filtered = books.filter(book => {

        const matchesSearch =
            book.title.toLowerCase().includes(search) ||
            book.author.toLowerCase().includes(search);

        const matchesCategory =
            category === "All" ||
            book.category === category;

        const matchesPrice =
            price === "All" ||
            book.price <= Number(price);

        return matchesSearch &&
               matchesCategory &&
               matchesPrice;
    });

    displayProducts(filtered);
}


// ===============================
// CATEGORY FILTER
// ===============================

function filterCategory(category) {

    const categoryFilter = getElement("categoryFilter");

    if (categoryFilter) {
        categoryFilter.value = category;
    }

    const products = getElement("products");

    if (products) {
        products.scrollIntoView({
            behavior: "smooth"
        });
    }

    filterProducts();
}


// ===============================
// ADD TO CART
// ===============================

function addToCart(id) {

    const book = books.find(book => book.id === id);

    if (!book) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...book,
            quantity: 1
        });
    }

    saveCart();
    updateCartCount();

    alert(book.title + " added to your cart! 🛒");
}


// ===============================
// SAVE CART
// ===============================

function saveCart() {

    localStorage.setItem(
        "bookNookCart",
        JSON.stringify(cart)
    );
}


// ===============================
// CART COUNT
// ===============================

function updateCartCount() {

    const cartCount = getElement("cartCount");

    if (!cartCount) return;

    const count = cart.reduce(
        (total, item) => total + item.quantity,
        0
    );

    cartCount.textContent = count;
}


// ===============================
// OPEN CART
// ===============================

function openCart() {

    renderCart();

    const modal = getElement("cartModal");

    if (modal) {
        modal.classList.add("active");
    }
}


// ===============================
// CLOSE CART
// ===============================

function closeCart() {

    const modal = getElement("cartModal");

    if (modal) {
        modal.classList.remove("active");
    }
}


// ===============================
// RENDER CART
// ===============================

function renderCart() {

    const cartItems = getElement("cartItems");

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="no-products">
                <h3>Your cart is empty 📚</h3>
                <p>Add some books to get started.</p>
            </div>
        `;

        updateCartTotal();
        return;
    }

    cart.forEach(item => {

        const cartItem = document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <h4>${item.title}</h4>
                <p>₹${item.price.toFixed(2)}</p>
            </div>

            <div class="quantity-controls">

                <button onclick="changeQuantity(${item.id}, -1)">
                    −
                </button>

                <strong>${item.quantity}</strong>

                <button onclick="changeQuantity(${item.id}, 1)">
                    +
                </button>

            </div>

            <button
                class="remove-btn"
                onclick="removeFromCart(${item.id})">
                Remove
            </button>
        `;

        cartItems.appendChild(cartItem);
    });

    updateCartTotal();
}


// ===============================
// CHANGE QUANTITY
// ===============================

function changeQuantity(id, amount) {

    const item = cart.find(item => item.id === id);

    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== id);
    }

    saveCart();
    updateCartCount();
    renderCart();
}


// ===============================
// REMOVE FROM CART
// ===============================

function removeFromCart(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();
    updateCartCount();
    renderCart();
}


// ===============================
// CART TOTAL
// ===============================

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );
}


function updateCartTotal() {

    const cartTotal = getElement("cartTotal");

    if (!cartTotal) return;

    cartTotal.textContent =
        "₹" + getCartTotal().toFixed(2);
}


// ===============================
// PRODUCT DETAILS
// ===============================

function showProduct(id) {

    const book = books.find(book => book.id === id);

    if (!book) return;

    const details = getElement("productDetails");

    if (!details) return;

    details.innerHTML = `
        <div class="detail-content">

            <div class="detail-image">

                <img
                    src="${book.image}"
                    alt="${book.title}"
                    onerror="this.src='https://placehold.co/300x400/FDF6E3/2D6A4F?text=BookNook';"
                >

            </div>

            <div>

                <span class="product-category">
                    ${book.category}
                </span>

                <h2>${book.title}</h2>

                <p>
                    <strong>Author:</strong>
                    ${book.author}
                </p>

                <p>
                    <strong>ISBN:</strong>
                    ${book.isbn}
                </p>

                <p>
                    ⭐ ${book.rating}/5
                </p>

                <p>
                    ${book.description}
                </p>

                <div class="price">
                    ₹${book.price.toFixed(2)}
                </div>

                <button
                    class="btn primary-btn"
                    onclick="addToCart(${book.id})">
                    🛒 Add to Cart
                </button>

            </div>

        </div>
    `;

    const modal = getElement("productModal");

    if (modal) {
        modal.classList.add("active");
    }
}


// ===============================
// CLOSE PRODUCT
// ===============================

function closeProduct() {

    const modal = getElement("productModal");

    if (modal) {
        modal.classList.remove("active");
    }
}


// ===============================
// CHECKOUT
// ===============================

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }

    const checkoutTotal = getElement("checkoutTotal");

    if (checkoutTotal) {
        checkoutTotal.textContent =
            "₹" + getCartTotal().toFixed(2);
    }

    closeCart();

    const modal = getElement("checkoutModal");

    if (modal) {
        modal.classList.add("active");
    }
}


function closeCheckout() {

    const modal = getElement("checkoutModal");

    if (modal) {
        modal.classList.remove("active");
    }
}


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", function () {

    displayProducts();

    updateCartCount();

    const searchInput = getElement("searchInput");
    const categoryFilter = getElement("categoryFilter");
    const priceFilter = getElement("priceFilter");

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            filterProducts
        );
    }

    if (categoryFilter) {
        categoryFilter.addEventListener(
            "change",
            filterProducts
        );
    }

    if (priceFilter) {
        priceFilter.addEventListener(
            "change",
            filterProducts
        );
    }
});
