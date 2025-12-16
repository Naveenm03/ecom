// ==================== Product Data ====================
const products = [
    {
        id: 1,
        name: "Wireless Headphones Pro",
        category: "Electronics",
        price: 129.99,
        originalPrice: 199.99,
        rating: 4.5,
        reviews: 234,
        badge: "sale",
        filter: ["all", "trending", "sale"],
        image: "https://via.placeholder.com/280x280/e23744/ffffff?text=Headphones"
    },
    {
        id: 2,
        name: "Smart Watch Ultra",
        category: "Electronics",
        price: 299.99,
        originalPrice: 399.99,
        rating: 4.8,
        reviews: 567,
        badge: "trending",
        filter: ["all", "trending", "sale"],
        image: "https://via.placeholder.com/280x280/ffa500/ffffff?text=Smart+Watch"
    },
    {
        id: 3,
        name: "Designer Backpack",
        category: "Fashion",
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.3,
        reviews: 189,
        badge: "new",
        filter: ["all", "new"],
        image: "https://via.placeholder.com/280x280/48c479/ffffff?text=Backpack"
    },
    {
        id: 4,
        name: "Premium Coffee Maker",
        category: "Home & Living",
        price: 149.99,
        originalPrice: 249.99,
        rating: 4.7,
        reviews: 423,
        badge: "sale",
        filter: ["all", "sale"],
        image: "https://via.placeholder.com/280x280/e23744/ffffff?text=Coffee+Maker"
    },
    {
        id: 5,
        name: "Yoga Mat Pro",
        category: "Sports",
        price: 39.99,
        originalPrice: 59.99,
        rating: 4.6,
        reviews: 312,
        badge: "trending",
        filter: ["all", "trending"],
        image: "https://via.placeholder.com/280x280/ffa500/ffffff?text=Yoga+Mat"
    },
    {
        id: 6,
        name: "Skincare Set Deluxe",
        category: "Beauty",
        price: 89.99,
        originalPrice: 139.99,
        rating: 4.9,
        reviews: 678,
        badge: "new",
        filter: ["all", "new", "trending"],
        image: "https://via.placeholder.com/280x280/48c479/ffffff?text=Skincare"
    },
    {
        id: 7,
        name: "4K Action Camera",
        category: "Electronics",
        price: 199.99,
        originalPrice: 299.99,
        rating: 4.4,
        reviews: 201,
        badge: "sale",
        filter: ["all", "sale"],
        image: "https://via.placeholder.com/280x280/e23744/ffffff?text=Camera"
    },
    {
        id: 8,
        name: "Running Shoes Elite",
        category: "Sports",
        price: 119.99,
        originalPrice: 179.99,
        rating: 4.7,
        reviews: 445,
        badge: "trending",
        filter: ["all", "trending", "sale"],
        image: "https://via.placeholder.com/280x280/ffa500/ffffff?text=Shoes"
    },
    {
        id: 9,
        name: "Bestseller Book Collection",
        category: "Books",
        price: 49.99,
        originalPrice: 79.99,
        rating: 4.8,
        reviews: 892,
        badge: "new",
        filter: ["all", "new"],
        image: "https://via.placeholder.com/280x280/48c479/ffffff?text=Books"
    },
    {
        id: 10,
        name: "Minimalist Desk Lamp",
        category: "Home & Living",
        price: 59.99,
        originalPrice: 89.99,
        rating: 4.5,
        reviews: 267,
        badge: "sale",
        filter: ["all", "sale"],
        image: "https://via.placeholder.com/280x280/e23744/ffffff?text=Lamp"
    },
    {
        id: 11,
        name: "Wireless Earbuds",
        category: "Electronics",
        price: 79.99,
        originalPrice: 129.99,
        rating: 4.6,
        reviews: 534,
        badge: "trending",
        filter: ["all", "trending", "sale"],
        image: "https://via.placeholder.com/280x280/ffa500/ffffff?text=Earbuds"
    },
    {
        id: 12,
        name: "Luxury Perfume Set",
        category: "Beauty",
        price: 129.99,
        originalPrice: 199.99,
        rating: 4.9,
        reviews: 723,
        badge: "new",
        filter: ["all", "new"],
        image: "https://via.placeholder.com/280x280/48c479/ffffff?text=Perfume"
    }
];

// ==================== State Management ====================
let cart = [];
let currentFilter = 'all';

// ==================== DOM Elements ====================
const productGrid = document.getElementById('productGrid');
const cartBtn = document.getElementById('cartBtn');
const cartModal = document.getElementById('cartModal');
const closeCart = document.getElementById('closeCart');
const cartItems = document.getElementById('cartItems');
const totalAmount = document.getElementById('totalAmount');
const cartCount = document.querySelector('.cart-count');
const filterTabs = document.querySelectorAll('.filter-tab');
const searchInput = document.getElementById('searchInput');
const header = document.getElementById('header');

// ==================== Initialize App ====================
function init() {
    renderProducts(products);
    setupEventListeners();
    startCountdown();
    updateCartUI();
}

// ==================== Event Listeners ====================
function setupEventListeners() {
    // Filter tabs
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentFilter = tab.dataset.filter;
            filterProducts();
        });
    });

    // Search
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm)
        );
        renderProducts(filtered);
    });

    // Cart modal
    cartBtn.addEventListener('click', () => {
        cartModal.classList.add('active');
        renderCart();
    });

    closeCart.addEventListener('click', () => {
        cartModal.classList.remove('active');
    });

    cartModal.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.classList.remove('active');
        }
    });

    // Scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Category cards
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            const filtered = products.filter(product => 
                product.category.toLowerCase().includes(category)
            );
            renderProducts(filtered);
            window.scrollTo({ top: document.querySelector('.products').offsetTop - 100, behavior: 'smooth' });
        });
    });
}

// ==================== Product Rendering ====================
function renderProducts(productsToRender) {
    productGrid.innerHTML = '';
    
    productsToRender.forEach(product => {
        const productCard = createProductCard(product);
        productGrid.appendChild(productCard);
    });

    // Add animation
    const cards = productGrid.querySelectorAll('.product-card');
    cards.forEach((card, index) => {
        card.style.animation = `fadeInUp 0.5s ease-out ${index * 0.05}s both`;
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const stars = '★'.repeat(Math.floor(product.rating)) + '☆'.repeat(5 - Math.floor(product.rating));
    
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}">
            <span class="product-badge ${product.badge}">${product.badge}</span>
        </div>
        <div class="product-info">
            <div class="product-category">${product.category}</div>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <span class="stars">${stars}</span>
                <span class="rating-count">(${product.reviews})</span>
            </div>
            <div class="product-footer">
                <div class="product-price">
                    <span class="price-current">$${product.price}</span>
                    <span class="price-original">$${product.originalPrice}</span>
                </div>
                <button class="add-to-cart" data-id="${product.id}">Add</button>
            </div>
        </div>
    `;

    // Add to cart functionality
    const addBtn = card.querySelector('.add-to-cart');
    addBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        addToCart(product);
        
        // Visual feedback
        addBtn.textContent = '✓ Added';
        addBtn.style.background = '#48c479';
        setTimeout(() => {
            addBtn.textContent = 'Add';
            addBtn.style.background = '';
        }, 1000);
    });

    return card;
}

// ==================== Filter Products ====================
function filterProducts() {
    const filtered = products.filter(product => 
        product.filter.includes(currentFilter)
    );
    renderProducts(filtered);
}

// ==================== Cart Functions ====================
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartUI();
    saveCart();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    renderCart();
    saveCart();
}

function updateCartUI() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems;
    
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    totalAmount.textContent = `$${total.toFixed(2)}`;
}

function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-image" style="background-image: url('${item.image}')"></div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price} × ${item.quantity}</div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}">Remove</button>
        </div>
    `).join('');

    // Add remove functionality
    cartItems.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            removeFromCart(parseInt(btn.dataset.id));
        });
    });
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function loadCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        updateCartUI();
    }
}

// ==================== Countdown Timer ====================
function startCountdown() {
    const countdownDate = new Date().getTime() + (12 * 60 * 60 * 1000 + 34 * 60 * 1000 + 56 * 1000);
    
    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;
        
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
        
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById('countdown').innerHTML = '<p>Deal Expired!</p>';
        }
    }, 1000);
}

// ==================== Smooth Scroll ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== Initialize on Load ====================
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    init();
});

// ==================== Login Button (Demo) ====================
document.getElementById('loginBtn').addEventListener('click', () => {
    alert('Login functionality would be implemented here!');
});

// ==================== CTA Buttons ====================
document.querySelectorAll('.cta-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        window.scrollTo({ top: document.querySelector('.products').offsetTop - 100, behavior: 'smooth' });
    });
});

// ==================== Checkout Button ====================
document.querySelector('.checkout-btn').addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    alert('Proceeding to checkout... This would redirect to payment page!');
});
