/* ================= BOOK DATA ================= */

const books = [

    {
        id: 1,
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        category: "Fiction",
        price: 299,
        rating: 4.7,
        isbn: "978-0-7432-7356-5",
        icon: "📕",
        description:
            "A timeless story of wealth, love, dreams and the mysterious Jay Gatsby."
    },

    {
        id: 2,
        title: "The Alchemist",
        author: "Paulo Coelho",
        category: "Fiction",
        price: 249,
        rating: 4.8,
        isbn: "978-0-06-112241-5",
        icon: "📗",
        description:
            "An inspiring journey about following your dreams and discovering your destiny."
    },

    {
        id: 3,
        title: "Sapiens",
        author: "Yuval Noah Harari",
        category: "Non-Fiction",
        price: 499,
        rating: 4.8,
        isbn: "978-0-06-231609-7",
        icon: "📘",
        description:
            "A fascinating exploration of the history and development of humankind."
    },

    {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        category: "Non-Fiction",
        price: 399,
        rating: 4.9,
        isbn: "978-0-7352-1129-2",
        icon: "📙",
        description:
            "A practical guide to building good habits and breaking bad ones."
    },

    {
        id: 5,
        title: "The Little Prince",
        author: "Antoine de Saint-Exupéry",
        category: "Children",
        price: 199,
        rating: 4.9,
        isbn: "978-0-15-601219-5",
        icon: "🌟",
        description:
            "A beautiful children's classic filled with imagination and life lessons."
    },

    {
        id: 6,
        title: "Charlotte's Web",
        author: "E. B. White",
        category: "Children",
        price: 229,
        rating: 4.7,
        isbn: "978-0-06-440055-8",
        icon: "🕷️",
        description:
            "A heartwarming story about friendship between a pig and a spider."
    },

    {
        id: 7,
        title: "Classic Notebook",
        author: "BookNook",
        category: "Stationery",
        price: 149,
        rating: 4.6,
        isbn: "BN-NOTE-001",
        icon: "📓",
        description:
            "A premium notebook perfect for notes, ideas, journaling and planning."
    },

    {
        id: 8,
        title: "Creative Pen Set",
        author: "BookNook",
        category: "Stationery",
        price: 179,
        rating: 4.5,
        isbn: "BN-PEN-002",
        icon: "🖊️",
        description:
            "A colorful set of smooth-writing pens for school, college and creative work."
    }

];


/* ================= CART ================= */

let cart = JSON.parse(localStorage.getItem("bookNookCart")) || [];


/* ================= DOM ELEMENTS ================= */

const productGrid = document.getElementById("productGrid");
const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const priceFilter = document.getElementById("priceFilter");


/* ================= DISPLAY PRODUCTS ================= */

function displayProducts(list = books) {

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
                ${book.icon}
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


/* ================= SEARCH + FILTER ================= */

function filterProducts() {

    const search =
        searchInput.value.toLowerCase();

    const category =
        categoryFilter.value;

    const price =
        priceFilter.value;


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


searchInput.addEventListener(
    "input",
    filterProducts
);

categoryFilter.addEventListener(
    "change",
    filterProducts
);

priceFilter.addEventListener(
    "change",
    filterProducts
);


/* ================= CATEGORY BUTTON ================= */

function filterCategory(category) {

    categoryFilter.value = category;

    document
        .getElementById("products")
        .scrollIntoView({
            behavior: "smooth"
        });

    filterProducts();
}


/* ================= ADD TO CART ================= */

function addToCart(id) {

    const book =
        books.find(item => item.id === id);

    const existing =
        cart.find(item => item.id === id);


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

    alert(`${book.title} added to your cart! 🛒`);
}


/* ================= SAVE CART ================= */

function saveCart() {

    localStorage.setItem(
        "bookNookCart",
        JSON.stringify(cart)
    );

}


/* ================= CART COUNT ================= */

function updateCartCount() {

    const count =
        cart.reduce(
            (total, item) =>
                total + item.quantity,
            0
        );

    document.getElementById(
        "cartCount"
    ).textContent = count;

}


/* ================= OPEN CART ================= */

function openCart() {

    renderCart();

    document
        .getElementById("cartModal")
        .classList.add("active");

}


/* ================= CLOSE CART ================= */

function closeCart() {

    document
        .getElementById("cartModal")
        .classList.remove("active");

}


/* ================= RENDER CART ================= */

function renderCart() {

    const cartItems =
        document.getElementById("cartItems");

    cartItems.innerHTML = "";


    if (cart.length === 0) {

        cartItems.innerHTML = `
            <div class="no-products">
                <h3>Your cart is empty 📚</h3>
                <p>Add some books to get started.</p>
            </div>
        `;

    }


    cart.forEach(item => {

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `

            <div>

                <h4>${item.icon} ${item.title}</h4>

                <p>
                    ₹${item.price.toFixed(2)}
                </p>

            </div>

            <div class="quantity-controls">

                <button
                    onclick="changeQuantity(${item.id}, -1)">
                    −
                </button>

                <strong>${item.quantity}</strong>

                <button
                    onclick="changeQuantity(${item.id}, 1)">
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


/* ================= QUANTITY ================= */

function changeQuantity(id, amount) {

    const item =
        cart.find(book => book.id === id);

    if (!item) return;


    item.quantity += amount;


    if (item.quantity <= 0) {

        cart =
            cart.filter(book => book.id !== id);

    }


    saveCart();

    updateCartCount();

    renderCart();

}


/* ================= REMOVE ================= */

function removeFromCart(id) {

    cart =
        cart.filter(item => item.id !== id);

    saveCart();

    updateCartCount();

    renderCart();

}


/* ================= TOTAL ================= */

function getCartTotal() {

    return cart.reduce(
        (total, item) =>
            total + item.price * item.quantity,
        0
    );

}


function updateCartTotal() {

    document.getElementById(
        "cartTotal"
    ).textContent =
        `₹${getCartTotal().toFixed(2)}`;

}


/* ================= PRODUCT DETAILS ================= */

function showProduct(id) {

    const book =
        books.find(item => item.id === id);

    const details =
        document.getElementById("productDetails");


    details.innerHTML = `

        <div class="detail-content">

            <div class="detail-image">
                ${book.icon}
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


    document
        .getElementById("productModal")
        .classList.add("active");

}


/* ================= CLOSE PRODUCT ================= */

function closeProduct() {

    document
        .getElementById("productModal")
        .classList.remove("active");

}


/* ================= CHECKOUT ================= */

function openCheckout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        return;
    }


    document.getElementById(
        "checkoutTotal"
    ).textContent =
        `₹${getCartTotal().toFixed(2)}`;


    closeCart();


    document
        .getElementById("checkoutModal")
        .classList.add("active");

}


function closeCheckout() {

    document
        .getElementById("checkoutModal")
        .classList.remove("active");

}


/* ================= CHECKOUT FORM ================= */

document
    .getElementById("checkoutForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        const orderNumber =
            "BN" +
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        alert(
            `🎉 Order placed successfully!\n\nOrder ID: ${orderNumber}\nTotal: ₹${getCartTotal().toFixed(2)}`
        );


        cart = [];

        saveCart();

        updateCartCount();

        this.reset();

        closeCheckout();

    });


/* ================= LOGIN ================= */

function loginUser() {

    const name =
        document.getElementById(
            "username"
        ).value.trim();

    const email =
        document.getElementById(
            "email"
        ).value.trim();

    const message =
        document.getElementById(
            "loginMessage"
        );


    if (!name || !email) {

        message.textContent =
            "Please enter your name and email.";

        return;
    }


    localStorage.setItem(
        "bookNookUser",
        JSON.stringify({
            name,
            email
        })
    );


    message.textContent =
        `Welcome to BookNook, ${name}! 📚`;

}


/* ================= CONTACT FORM ================= */

document
    .getElementById("contactForm")
    .addEventListener("submit", function(event) {

        event.preventDefault();

        alert(
            "Thank you! Your message has been sent successfully. 📚"
        );

        this.reset();

    });


/* ================= MOBILE MENU ================= */

document
    .getElementById("menuBtn")
    .addEventListener("click", function() {

        document
            .getElementById("navMenu")
            .classList.toggle("show");

    });


/* ================= MODAL CLICK OUTSIDE ================= */

window.addEventListener("click", function(event) {

    const cartModal =
        document.getElementById("cartModal");

    const productModal =
        document.getElementById("productModal");

    const checkoutModal =
        document.getElementById("checkoutModal");


    if (event.target === cartModal) {
        closeCart();
    }

    if (event.target === productModal) {
        closeProduct();
    }

    if (event.target === checkoutModal) {
        closeCheckout();
    }

});


/* ================= INITIAL LOAD ================= */

displayProducts();

updateCartCount();