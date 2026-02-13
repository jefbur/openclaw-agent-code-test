// Smooth scrolling function
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize chart
    initTrendChart();
    
    // Add scroll effects
    addScrollEffects();
    
    // Add interactive card effects
    addCardInteractions();
    
    // Add typing effect to hero title
    addTypingEffect();
    
    // Initialize parallax effects
    initParallaxEffects();
});

// Chart initialization
function initTrendChart() {
    const canvas = document.getElementById('trendChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Chart data
    const data = [
        { label: 'AI', value: 340, color: '#667eea' },
        { label: 'Green Tech', value: 280, color: '#4facfe' },
        { label: 'AR/VR', value: 220, color: '#f093fb' },
        { label: 'IoT', value: 190, color: '#00f2fe' },
        { label: 'Quantum', value: 180, color: '#764ba2' },
        { label: 'Blockchain', value: 150, color: '#f5576c' }
    ];
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart settings
    const margin = 40;
    const chartWidth = width - (margin * 2);
    const chartHeight = height - (margin * 2);
    const maxValue = Math.max(...data.map(d => d.value));
    const barWidth = chartWidth / data.length;
    
    // Draw bars with animation
    data.forEach((item, index) => {
        const barHeight = (item.value / maxValue) * chartHeight;
        const x = margin + (index * barWidth) + (barWidth * 0.1);
        const y = margin + chartHeight - barHeight;
        const width = barWidth * 0.8;
        
        // Create gradient
        const gradient = ctx.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, item.color);
        gradient.addColorStop(1, item.color + '40');
        
        // Draw bar
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, width, barHeight);
        
        // Draw label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(item.label, x + width/2, height - 10);
        
        // Draw value
        ctx.fillStyle = '#b0b0b0';
        ctx.font = '10px Inter';
        ctx.fillText(item.value + '%', x + width/2, y - 5);
    });
    
    // Draw chart title
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 16px Inter';
    ctx.textAlign = 'center';
    ctx.fillText('Tech Trend Growth (YoY %)', width/2, 25);
}

// Scroll effects
function addScrollEffects() {
    const cards = document.querySelectorAll('.trend-card');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Initially hide elements
    [...cards, ...timelineItems].forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(element);
    });
}

// Card interactions
function addCardInteractions() {
    const cards = document.querySelectorAll('.trend-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add glow effect
            this.style.boxShadow = '0 20px 40px rgba(102, 126, 234, 0.3)';
            
            // Scale other cards down slightly
            cards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.style.transform = 'scale(0.95)';
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset all cards
            cards.forEach(card => {
                card.style.transform = '';
                card.style.opacity = '';
                card.style.boxShadow = '';
            });
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            const trend = this.getAttribute('data-trend');
            showTrendDetails(trend);
        });
    });
}

// Show trend details (modal-like effect)
function showTrendDetails(trend) {
    const trendData = {
        ai: {
            title: "Artificial Intelligence Revolution",
            description: "AI is transforming every industry from healthcare to finance. Large Language Models, computer vision, and machine learning are becoming essential tools.",
            keyPoints: [
                "GPT models reaching human-level performance",
                "AI coding assistants increasing developer productivity by 40%",
                "Healthcare AI diagnosing diseases faster than specialists",
                "Autonomous systems becoming mainstream"
            ]
        },
        quantum: {
            title: "Quantum Computing Breakthrough",
            description: "Quantum computers are solving problems impossible for classical computers, opening new frontiers in cryptography and scientific research.",
            keyPoints: [
                "IBM's 1000+ qubit processors now available",
                "Quantum advantage achieved in optimization problems",
                "Post-quantum cryptography being standardized",
                "Pharmaceutical companies using quantum for drug discovery"
            ]
        },
        arvr: {
            title: "Extended Reality Ecosystem",
            description: "AR, VR, and Mixed Reality are creating new ways to work, learn, and play. The metaverse is becoming a practical reality.",
            keyPoints: [
                "Apple Vision Pro setting new standards",
                "Remote work transformed by VR collaboration",
                "AR shopping changing retail forever",
                "Training simulations reducing costs by 60%"
            ]
        }
    };
    
    const data = trendData[trend];
    if (!data) return;
    
    // Create modal
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        backdrop-filter: blur(10px);
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
            border: 1px solid rgba(255,255,255,0.1);
            border-radius: 20px;
            padding: 3rem;
            max-width: 600px;
            margin: 2rem;
            backdrop-filter: blur(20px);
            transform: scale(0.8);
            transition: transform 0.3s ease;
        ">
            <h3 style="font-size: 2rem; margin-bottom: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${data.title}</h3>
            <p style="color: #b0b0b0; margin-bottom: 2rem; line-height: 1.6;">${data.description}</p>
            <ul style="list-style: none; margin-bottom: 2rem;">
                ${data.keyPoints.map(point => `
                    <li style="padding: 0.5rem 0; padding-left: 1.5rem; position: relative; color: #ffffff;">
                        <span style="position: absolute; left: 0; color: #667eea;">▶</span>
                        ${point}
                    </li>
                `).join('')}
            </ul>
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                border: none;
                padding: 1rem 2rem;
                border-radius: 25px;
                color: white;
                font-weight: 600;
                cursor: pointer;
                transition: transform 0.3s ease;
            " onmouseover="this.style.transform='translateY(-2px)'" onmouseout="this.style.transform='translateY(0)'">
                Close
            </button>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Animate in
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.firstElementChild.style.transform = 'scale(1)';
    }, 10);
    
    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// Typing effect for hero title
function addTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = heroTitle.textContent;
    heroTitle.textContent = '';
    
    let i = 0;
    const typeSpeed = 100;
    
    function typeWriter() {
        if (i < originalText.length) {
            heroTitle.textContent += originalText.charAt(i);
            i++;
            setTimeout(typeWriter, typeSpeed);
        }
    }
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
}

// Parallax effects
function initParallaxEffects() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        floatingElements.forEach((element, index) => {
            const rate = scrolled * -0.5 * (index + 1) * 0.1;
            element.style.transform = `translateY(${rate}px) rotate(${scrolled * 0.01}deg)`;
        });
        
        // Parallax for hero background
        const hero = document.querySelector('.hero');
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Add some interactive particles
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
    `;
    
    document.body.appendChild(particleContainer);
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(102, 126, 234, 0.3);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: twinkle ${3 + Math.random() * 3}s infinite;
        `;
        
        particleContainer.appendChild(particle);
    }
}

// Add twinkle animation
const style = document.createElement('style');
style.textContent = `
    @keyframes twinkle {
        0%, 100% { opacity: 0; transform: scale(0.5); }
        50% { opacity: 1; transform: scale(1); }
    }
`;
document.head.appendChild(style);

// Initialize particles
setTimeout(createParticles, 2000);

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        // Close any modals
        const modals = document.querySelectorAll('[style*="position: fixed"]');
        modals.forEach(modal => {
            if (modal.parentElement === document.body) {
                modal.remove();
            }
        });
    }
});

// Performance optimization: throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Any scroll-based animations here
}, 16); // ~60fps

window.addEventListener('scroll', throttledScrollHandler);

console.log('🚀 TechTrends 2026 - Interactive elements loaded!');
console.log('💡 Try clicking on the trend cards for more details!');