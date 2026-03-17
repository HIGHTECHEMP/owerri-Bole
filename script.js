 // Menu Data
        const menuItems = [
            {
                id: 1,
                name: "Bole Boat & Grilled Fish",
                category: "signaturebole",
                price: 2500,
                description: "Roasted plantain served with grilled fish and fresh tomato sauce.",
                image: "food1.jpg",
                badge: "Bestseller"
            },
            {
                id: 2,
                name: "Bole Boat & Grilled Chicken",
                category: "signaturebole",
                price: 3500,
                description: "Roasted plantain served with grilled chicken",
                image: "food2.jpg",
                badge: "Popular"
            },
            {
                id: 3,
                name: "Bole & Yam Platter",
                category: "signaturebole",
                price: 29300,
                description: "A combination of roasted plantain and yam, often served with grilled fish, snails, or turkey. ",
                image: "food3.jpg",
                badge: "Family Size"
            },
            {
                id: 4,
                name: "Abacha & Fish",
                category: "soups",
                price: 4500,
                description: " African salad with grilled fish, peppered ponmo, and garden eggs.",
                image: "food4.jpg",
                badge: "Chef's Choice"
            },
            {
                id: 5,
                name: "Ukwa(Breadfruit)",
                category: "soups",
                price: 5500,
                description: " Served with grilled fish",
                image: "food5.jpg",
                badge: "Combo"
            },
            {
                id: 6,
                name: "Special Bole Native Rice",
                category: "soups",
                price: 4000,
                description: "Traditional palm oil rice served with grilled fish.",
                image: "food6.jpg",
                badge: "Spicy"
            },
            {
                id: 7,
                name: "Isi Ewu (Goat Head)",
                category: "specials",
                price: 5000,
                description: "Spicy goat head delicacy prepared with traditional spices and palm oil",
                image: "food7.jpg",
                badge: "Delicacy"
            },
            {
                id: 8,
                name: "Nkwobi",
                category: "specials",
                price: 2500,
                description: "Spicy cooked cow leg",
                image: "food8.jpg",
                badge: "Vegetarian"
            },
            {
                id: 9,
                name: "Plantain Porridge",
                category: "soups",
                price: 3000,
                description: " A thick, local porridge. ",
                image: "food9.jpg",
                badge: "Traditional"
            },
            {
                id: 10,
                name: "Roasted Yam & Fish",
                category: "signaturebole",
                price: 3000,
                description: "Charcoal-roasted yam served with grilled tilapia and pepper sauce",
                image: "food10.jpg",
                badge: null
            },
            {
                id: 11,
                name: "Ofe Onugbu (Bitter Leaf)",
                category: "soups",
                price: 4000,
                description: "Bitter leaf soup with cocoyam thickener, assorted meat, and stockfish",
                image: "food11.jpg",
                badge: null
            },
            {
                id: 12,
                name: "Oha Soup Special",
                category: "soups",
                price: 4200,
                description: "Traditional oha leaves soup with cocoyam, assorted meat, and smoked fish",
                image: "food12.jpg",
                badge: null
            }
        ];

        // Cart State
        let cart = [];

        // Initialize
        document.addEventListener('DOMContentLoaded', () => {
            renderMenu('all');
            updateCartUI();
        });

        // Render Menu
        // Render Menu with animation attributes
function renderMenu(category) {
    const grid = document.getElementById('menuGrid');
    const filtered = category === 'all' ? menuItems : menuItems.filter(item => item.category === category);
    
    grid.innerHTML = filtered.map((item, index) => `
        <div class="menu-item scroll-reveal" data-animation="menu-item" data-index="${index}" data-category="${item.category}">
            ${item.badge ? `<div class="menu-item-badge">${item.badge}</div>` : ''}
            <div class="menu-item-image">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
            </div>
            <div class="menu-item-content">
                <div class="menu-item-header">
                    <h3>${item.name}</h3>
                    <span class="price">₦${item.price.toLocaleString()}</span>
                </div>
                <p>${item.description}</p>
                <button class="add-to-cart" onclick="addToCart(${item.id})">
                    <i class="fas fa-plus"></i> Add to Order
                </button>
            </div>
        </div>
    `).join('');

    // Reinitialize observer for new menu items
    setTimeout(initScrollAnimations, 100);
}

        // Filter Menu
        function filterMenu(category) {
            // Update active tab
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
                if(btn.textContent.toLowerCase().includes(category) || (category === 'all' && btn.textContent === 'All')) {
                    btn.classList.add('active');
                }
            });
            
            // Animate and render
            const grid = document.getElementById('menuGrid');
            grid.style.opacity = '0';
            setTimeout(() => {
                renderMenu(category);
                grid.style.opacity = '1';
            }, 200);
        }

        // Add to Cart
        function addToCart(itemId) {
            const item = menuItems.find(i => i.id === itemId);
            const existingItem = cart.find(i => i.id === itemId);
            
            if (existingItem) {
                existingItem.quantity++;
            } else {
                cart.push({ ...item, quantity: 1 });
            }
            
            updateCartUI();
            showNotification(`${item.name} added to cart!`);
            
            // Animate button
            const btn = event.target.closest('.add-to-cart');
            btn.classList.add('added');
            btn.innerHTML = '<i class="fas fa-check"></i> Added';
            setTimeout(() => {
                btn.classList.remove('added');
                btn.innerHTML = '<i class="fas fa-plus"></i> Add to Order';
            }, 1500);
        }

        // Update Cart UI
        function updateCartUI() {
    const cartCount = document.querySelector('.floating-cart .cart-count');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    if (cartCount) cartCount.textContent = totalItems;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="cart-empty">
                <i class="fas fa-basket-shopping"></i>
                <p>Your basket is empty</p>
                <p style="font-size: 0.875rem; margin-top: 0.5rem;">Add some delicious Igbo delicacies!</p>
            </div>
        `;
        checkoutBtn.disabled = true;
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-image">
                    <img src="${item.image}" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>₦${item.price.toLocaleString()}</p>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span>${item.quantity}</span>
                        <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                    <div class="remove-item" onclick="removeFromCart(${item.id})">
                        <i class="fas fa-trash"></i> Remove
                    </div>
                </div>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }
    
    cartTotal.textContent = `₦${totalPrice.toLocaleString()}`;
}

        // Update Quantity
        function updateQuantity(itemId, change) {
            const item = cart.find(i => i.id === itemId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(itemId);
                } else {
                    updateCartUI();
                }
            }
        }

        // Remove from Cart
        function removeFromCart(itemId) {
            cart = cart.filter(i => i.id !== itemId);
            updateCartUI();
            showNotification('Item removed from cart');
        }

        // Toggle Cart
        function toggleCart() {
            const sidebar = document.getElementById('cartSidebar');
            const overlay = document.getElementById('cartOverlay');
            sidebar.classList.toggle('active');
            overlay.classList.toggle('active');
        }

        // Open Checkout
        function openCheckout() {
            if (cart.length === 0) return;
            
            const modal = document.getElementById('checkoutModal');
            const summaryItems = document.getElementById('summaryItems');
            const summaryTotal = document.getElementById('summaryTotal');
            
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            summaryItems.innerHTML = cart.map(item => `
                <div class="summary-item">
                    <span>${item.name} x${item.quantity}</span>
                    <span>₦${(item.price * item.quantity).toLocaleString()}</span>
                </div>
            `).join('');
            
            summaryTotal.textContent = `₦${totalPrice.toLocaleString()}`;
            
            modal.classList.add('active');
            toggleCart(); // Close cart sidebar
        }

        // Close Checkout
        function closeCheckout() {
            document.getElementById('checkoutModal').classList.remove('active');
        }

        // Select Payment Method
        function selectPayment(element, method) {
            document.querySelectorAll('.payment-method').forEach(el => el.classList.remove('active'));
            element.classList.add('active');
        }

        // Process Order
        function processOrder(event) {
            event.preventDefault();
            
            const btn = event.target.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span class="loading"></span> Processing...';
            btn.disabled = true;
            
            // Simulate order processing
            setTimeout(() => {
                const orderId = 'OB' + Date.now().toString().slice(-8);
                const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
                
                alert(`Order Placed Successfully!\n\nOrder ID: ${orderId}\nTotal: ₦${total.toLocaleString()}\n\nThank you for choosing OWERI-BOLE! Your delicious Igbo cuisine will be prepared fresh and delivered soon.`);
                
                cart = [];
                updateCartUI();
                closeCheckout();
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 2000);
        }

        // Show Notification
        function showNotification(message) {
            const notification = document.getElementById('notification');
            const text = document.getElementById('notificationText');
            
            text.textContent = message;
            notification.classList.add('show');
            
            setTimeout(() => {
                notification.classList.remove('show');
            }, 3000);
        }

        // Toggle Mobile Menu
        function toggleMobileMenu() {
            const navLinks = document.querySelector('.nav-links');
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--dark)';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '2rem';
        }

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Navbar Scroll Effect
        window.addEventListener('scroll', () => {
            const navbar = document.getElementById('navbar');
            if (window.scrollY > 100) {
                navbar.style.padding = '0.5rem 5%';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.padding = '1rem 5%';
                navbar.style.boxShadow = 'none';
            }
        });

 // ============================================
// SCROLL ANIMATIONS SYSTEM
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationType = entry.target.dataset.animation;
                
                // Staggered delay for menu items
                if (animationType === 'menu-item') {
                    const index = parseInt(entry.target.dataset.index);
                    setTimeout(() => {
                        entry.target.classList.add('reveal');
                    }, index * 100);
                }
                // Staggered delay for special cards
                else if (animationType === 'special-card') {
                    const index = parseInt(entry.target.dataset.index);
                    setTimeout(() => {
                        entry.target.classList.add('reveal');
                    }, index * 150);
                }
                // Staggered delay for testimonials
                else if (animationType === 'testimonial-card') {
                    const index = parseInt(entry.target.dataset.index);
                    setTimeout(() => {
                        entry.target.classList.add('reveal');
                    }, index * 200);
                }
                else {
                    entry.target.classList.add('reveal');
                }
                
                // Unobserve after animation
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all elements with scroll-reveal class that haven't been observed yet
    document.querySelectorAll('.scroll-reveal:not([data-observed])').forEach((el) => {
        el.setAttribute('data-observed', 'true');
        observer.observe(el);
    });
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
    renderMenu('all');
    updateCartUI();
    initScrollAnimations();
});