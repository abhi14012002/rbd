// Products Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS for products page
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Product category interactions
    initProductCategories();
    
    // Technology features animations
    initTechnologyFeatures();
    
    // CTA button interactions
    initCTAButtons();
    
    // Smooth scrolling for internal links
    initSmoothScrolling();
});

function initProductCategories() {
    const productCategories = document.querySelectorAll('.product-category');
    
    productCategories.forEach((category, index) => {
        // Add staggered animation delay
        category.style.animationDelay = `${index * 0.2}s`;
        
        // View details button functionality
        const viewDetailsBtn = category.querySelector('.view-details-btn');
        if (viewDetailsBtn) {
            viewDetailsBtn.addEventListener('click', function() {
                const categoryTitle = category.querySelector('h3').textContent;
                showProductDetails(categoryTitle);
            });
        }
        
        // Feature tag hover effects
        const featureTags = category.querySelectorAll('.feature-tag');
        featureTags.forEach(tag => {
            tag.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-3px) scale(1.05)';
            });
            
            tag.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    });
}

function showProductDetails(productName) {
    // Create modal or redirect to detailed product page
    const modal = createProductModal(productName);
    document.body.appendChild(modal);
    
    // Animate modal appearance
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

function createProductModal(productName) {
    const modal = document.createElement('div');
    modal.className = 'product-modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <div class="modal-header">
                <h3>${productName} Details</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                <p>Detailed information about ${productName} would be displayed here.</p>
                <div class="modal-actions">
                    <button class="btn-primary">Request Quote</button>
                    <button class="btn-secondary">Download Brochure</button>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles
    const modalStyles = `
        .product-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        
        .product-modal.show {
            opacity: 1;
            visibility: visible;
        }
        
        .modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .modal-content {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.8);
            background: white;
            border-radius: 16px;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow-y: auto;
            transition: transform 0.3s ease;
        }
        
        .product-modal.show .modal-content {
            transform: translate(-50%, -50%) scale(1);
        }
        
        .modal-header {
            padding: 30px 30px 20px;
            border-bottom: 1px solid #f0f0f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .modal-close {
            background: none;
            border: none;
            font-size: 24px;
            cursor: pointer;
            color: #666;
            transition: color 0.3s ease;
        }
        
        .modal-close:hover {
            color: var(--primary-orange);
        }
        
        .modal-body {
            padding: 30px;
        }
        
        .modal-actions {
            display: flex;
            gap: 15px;
            margin-top: 30px;
        }
    `;
    
    // Add styles to head if not already added
    if (!document.querySelector('#modal-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'modal-styles';
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
    }
    
    // Close modal functionality
    const closeBtn = modal.querySelector('.modal-close');
    const overlay = modal.querySelector('.modal-overlay');
    
    [closeBtn, overlay].forEach(element => {
        element.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        });
    });
    
    return modal;
}

function initTechnologyFeatures() {
    const techFeatures = document.querySelectorAll('.tech-feature');
    
    // Intersection Observer for tech features
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, index * 200);
            }
        });
    }, {
        threshold: 0.3
    });
    
    techFeatures.forEach(feature => {
        observer.observe(feature);
        
        // Add hover sound effect (optional)
        feature.addEventListener('mouseenter', function() {
            // You can add a subtle sound effect here
            this.style.transform = 'translateY(-15px)';
        });
        
        feature.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-buttons button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText.includes('Quote')) {
                handleQuoteRequest();
            } else if (buttonText.includes('Brochure')) {
                handleBrochureDownload();
            }
        });
    });
}

function handleQuoteRequest() {
    // Simulate quote request
    showNotification('Quote request form will open here', 'success');
    
    // You can redirect to contact page or open a quote form modal
    // window.location.href = '../pages/contact.html';
}

function handleBrochureDownload() {
    // Simulate brochure download
    showNotification('Brochure download started', 'success');
    
    // You can trigger actual file download here
    // const link = document.createElement('a');
    // link.href = 'path/to/brochure.pdf';
    // link.download = 'rehoboth-products-brochure.pdf';
    // link.click();
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Notification styles
    const notificationStyles = `
        .notification {
            position: fixed;
            top: 100px;
            right: 20px;
            background: var(--white);
            color: var(--dark-gray);
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: var(--shadow-medium);
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            border-left: 4px solid var(--primary-orange);
        }
        
        .notification.show {
            transform: translateX(0);
        }
        
        .notification-success {
            border-left-color: #28a745;
        }
        
        .notification-error {
            border-left-color: #dc3545;
        }
    `;
    
    // Add styles if not already added
    if (!document.querySelector('#notification-styles')) {
        const styleSheet = document.createElement('style');
        styleSheet.id = 'notification-styles';
        styleSheet.textContent = notificationStyles;
        document.head.appendChild(styleSheet);
    }
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // Hide notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

function initSmoothScrolling() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Parallax effect for page hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector('.page-hero .hero-background img');
    
    if (heroImage && scrolled < window.innerHeight) {
        const rate = scrolled * -0.3;
        heroImage.style.transform = `translateY(${rate}px)`;
    }
});

// Add loading animation for images
function addImageLoadingAnimation() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.transform = 'scale(0.95)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
}

// Initialize image loading animations
addImageLoadingAnimation();

// Add scroll progress indicator
function addScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    
    const progressStyles = `
        .scroll-progress {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: rgba(255, 255, 255, 0.1);
            z-index: 9999;
        }
        
        .progress-fill {
            height: 100%;
            background: var(--gradient-primary);
            width: 0%;
            transition: width 0.1s ease;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = progressStyles;
    document.head.appendChild(styleSheet);
    document.body.appendChild(progressBar);
    
    const progressFill = progressBar.querySelector('.progress-fill');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressFill.style.width = scrollPercent + '%';
    });
}

// Initialize scroll progress
addScrollProgress();

console.log('Products page loaded successfully! 🚀');