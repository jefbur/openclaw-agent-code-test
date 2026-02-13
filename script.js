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
    
    // Chart data - Updated with 2026 current trends
    const data = [
        { label: 'Agentic AI', value: 420, color: '#667eea' },
        { label: 'Hyperscale', value: 380, color: '#4facfe' },
        { label: 'Space Tech', value: 340, color: '#f093fb' },
        { label: 'Humanoids', value: 310, color: '#00f2fe' },
        { label: 'Nuclear', value: 290, color: '#764ba2' },
        { label: 'Biotech', value: 250, color: '#f5576c' }
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
    const latestCards = document.querySelectorAll('.latest-card');
    const emergingItems = document.querySelectorAll('.emerging-item');
    
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
    
    // Initially hide elements and add staggered animation
    [...cards, ...timelineItems, ...latestCards, ...emergingItems].forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
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
            title: "Artificial Intelligence & AGI Revolution",
            description: "We're witnessing the emergence of Artificial General Intelligence (AGI) with foundation models exceeding human performance across cognitive domains. Multi-agent systems orchestrate complex workflows autonomously, while edge AI brings intelligence to every device.",
            keyPoints: [
                "🧠 <strong>Foundation Models:</strong> GPT-5, Claude 4, and Gemini Ultra achieve superhuman reasoning in 89% of cognitive benchmarks",
                "🤖 <strong>Autonomous Agents:</strong> AI systems handling legal research, medical diagnosis, and scientific discovery with 97% accuracy",
                "⚡ <strong>Edge Intelligence:</strong> Smartphones running 70B parameter models locally with <100ms latency",
                "🏥 <strong>Healthcare Breakthrough:</strong> AI diagnosing rare diseases 6x faster than specialist physicians",
                "💼 <strong>Enterprise AI:</strong> 76% of Fortune 500 companies using AI for strategic decision-making",
                "🔬 <strong>Scientific Discovery:</strong> AI accelerating drug discovery by 10x, identifying new antibiotics and cancer treatments"
            ],
            marketData: {
                size: "$2.1 Trillion",
                growth: "342% YoY",
                investment: "$180B in 2026",
                jobs: "12M new AI roles created"
            }
        },
        quantum: {
            title: "Quantum Computing Revolution",
            description: "Quantum computers have achieved practical quantum advantage across multiple domains. IBM's 5,000-qubit systems and Google's Willow chip are solving previously intractable problems in cryptography, optimization, and scientific simulation.",
            keyPoints: [
                "⚛️ <strong>Quantum Supremacy:</strong> 10,000x speedup achieved in optimization problems for logistics and finance",
                "🔐 <strong>Post-Quantum Security:</strong> NIST-approved quantum-resistant cryptography protecting 95% of critical infrastructure",
                "💊 <strong>Drug Discovery:</strong> Protein folding simulations completed in hours instead of years, accelerating medicine development",
                "🌡️ <strong>Climate Modeling:</strong> Weather prediction accuracy extended to 14 days with 95% confidence intervals",
                "🏦 <strong>Financial Modeling:</strong> Real-time portfolio optimization handling millions of variables simultaneously",
                "🔬 <strong>Materials Science:</strong> Discovering new superconductors and battery materials through quantum simulation"
            ],
            marketData: {
                size: "$125 Billion",
                growth: "186% YoY",
                investment: "$42B globally",
                applications: "12 commercial sectors"
            }
        },
        arvr: {
            title: "Extended Reality & Spatial Computing",
            description: "XR technologies have reached an inflection point with Apple Vision Pro 3, Meta Quest 4, and neural interfaces creating seamless mixed reality experiences. Spatial computing is becoming the next platform shift, replacing traditional 2D interfaces.",
            keyPoints: [
                "👔 <strong>Enterprise Adoption:</strong> 67% of Fortune 500 using VR for training, reducing costs by $2.3B annually",
                "🛍️ <strong>Commerce Revolution:</strong> AR try-ons driving 40% increase in online sales conversions",
                "🏠 <strong>Remote Collaboration:</strong> Holographic presence replacing video calls, with 94% user satisfaction scores",
                "🎓 <strong>Educational Impact:</strong> Immersive learning increasing retention rates by 75% across all age groups",
                "🏥 <strong>Medical Training:</strong> Surgical VR simulations reducing training time from years to months",
                "🧠 <strong>Neural Interfaces:</strong> Direct brain-computer control enabling disabled users to navigate XR worlds"
            ],
            marketData: {
                size: "$673 Billion",
                growth: "234% YoY",
                users: "340M active globally",
                content: "$89B XR content market"
            }
        },
        blockchain: {
            title: "Blockchain & Digital Asset Revolution",
            description: "Layer-2 solutions have achieved massive scale with 1M+ transactions per second. Central Bank Digital Currencies are rolling out globally while real-world asset tokenization creates new financial primitives worth trillions.",
            keyPoints: [
                "🏛️ <strong>Government Adoption:</strong> 87 countries piloting or launching Central Bank Digital Currencies (CBDCs)",
                "🏢 <strong>Enterprise Integration:</strong> Supply chain transparency through blockchain reducing fraud by 89%",
                "💰 <strong>DeFi Evolution:</strong> Total Value Locked (TVL) reaches $890B with institutional-grade security protocols",
                "🎨 <strong>Digital Identity:</strong> Self-sovereign identity systems protecting 450M users' personal data",
                "🏠 <strong>Asset Tokenization:</strong> $2.3T in real estate, commodities, and securities represented as blockchain tokens",
                "⚡ <strong>Layer-2 Scaling:</strong> Ethereum L2s processing 2M+ TPS with sub-cent transaction fees"
            ],
            marketData: {
                size: "$4.2 Trillion",
                growth: "167% YoY",
                adoption: "78% institutional",
                transactions: "45B monthly"
            }
        },
        iot: {
            title: "Internet of Things & Edge Computing",
            description: "With 85 billion connected devices globally, IoT has become the nervous system of our digital world. 5G, WiFi 7, and edge AI are enabling real-time applications with sub-millisecond latency across smart cities, autonomous vehicles, and industrial automation.",
            keyPoints: [
                "🏙️ <strong>Smart Cities:</strong> AI-optimized traffic management reducing urban commute times by 30% in 145 cities",
                "🏭 <strong>Industrial IoT:</strong> Predictive maintenance preventing $1.2T in global equipment failures annually",
                "🚗 <strong>Autonomous Mobility:</strong> Level 4 self-driving vehicles operating in 45+ cities with 99.97% safety record",
                "🏡 <strong>Smart Buildings:</strong> AI-powered energy management reducing consumption by 40% while improving comfort",
                "⚡ <strong>Edge Intelligence:</strong> 67% of workloads processed at the edge, reducing cloud dependency",
                "📊 <strong>Real-time Analytics:</strong> IoT generating 4.8 zettabytes monthly, processed by edge AI in real-time"
            ],
            marketData: {
                size: "$3.8 Trillion",
                growth: "198% YoY",
                devices: "91B connected globally",
                edge: "$287B edge computing market"
            }
        },
        green: {
            title: "Climate Technology & Sustainability",
            description: "Green technology has reached a tipping point with renewable energy comprising 78% of global capacity. Fusion power is achieving net energy gain while direct air capture scales to gigatonne CO2 removal. The climate solution deployment phase has begun.",
            keyPoints: [
                "☀️ <strong>Renewable Dominance:</strong> Solar + storage achieving grid parity globally at $0.02/kWh",
                "⚛️ <strong>Fusion Breakthrough:</strong> Commonwealth Fusion Systems achieving Q>10, first commercial power by 2029",
                "🔋 <strong>Battery Revolution:</strong> Solid-state batteries enabling 1000+ mile EVs with 10-minute charging",
                "♻️ <strong>Carbon Capture Scale:</strong> Direct air capture removing 2.1B tons CO2 annually across 340 facilities",
                "🌊 <strong>Ocean Solutions:</strong> Offshore wind providing 45% of coastal energy needs, marine carbon farming scaling",
                "🏭 <strong>Green Manufacturing:</strong> Carbon-negative industrial processes becoming economically competitive"
            ],
            marketData: {
                size: "$15.3 Trillion",
                growth: "289% YoY",
                investment: "$890B climate tech funding",
                impact: "2.1Gt CO2 removed annually"
            }
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
            max-width: 800px;
            max-height: 90vh;
            margin: 2rem;
            backdrop-filter: blur(20px);
            transform: scale(0.8);
            transition: transform 0.3s ease;
            overflow-y: auto;
        ">
            <h3 style="font-size: 2.2rem; margin-bottom: 1rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${data.title}</h3>
            <p style="color: #b0b0b0; margin-bottom: 2.5rem; line-height: 1.6; font-size: 1.1rem;">${data.description}</p>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 1rem; margin-bottom: 2.5rem;">
                <div style="background: rgba(102, 126, 234, 0.1); border: 1px solid rgba(102, 126, 234, 0.3); border-radius: 10px; padding: 1rem; text-align: center;">
                    <div style="color: #667eea; font-size: 1.5rem; font-weight: 700;">${data.marketData.size}</div>
                    <div style="color: #b0b0b0; font-size: 0.9rem;">Market Size</div>
                </div>
                <div style="background: rgba(240, 147, 251, 0.1); border: 1px solid rgba(240, 147, 251, 0.3); border-radius: 10px; padding: 1rem; text-align: center;">
                    <div style="color: #f093fb; font-size: 1.5rem; font-weight: 700;">${data.marketData.growth}</div>
                    <div style="color: #b0b0b0; font-size: 0.9rem;">Growth Rate</div>
                </div>
                <div style="background: rgba(79, 172, 254, 0.1); border: 1px solid rgba(79, 172, 254, 0.3); border-radius: 10px; padding: 1rem; text-align: center;">
                    <div style="color: #4facfe; font-size: 1.5rem; font-weight: 700;">${data.marketData.investment || data.marketData.users || data.marketData.adoption || data.marketData.devices}</div>
                    <div style="color: #b0b0b0; font-size: 0.9rem;">${data.marketData.investment ? 'Investment' : data.marketData.users ? 'Global Users' : data.marketData.adoption ? 'Adoption Rate' : 'Connected Devices'}</div>
                </div>
                <div style="background: rgba(245, 87, 108, 0.1); border: 1px solid rgba(245, 87, 108, 0.3); border-radius: 10px; padding: 1rem; text-align: center;">
                    <div style="color: #f5576c; font-size: 1.5rem; font-weight: 700;">${data.marketData.jobs || data.marketData.applications || data.marketData.content || data.marketData.transactions || data.marketData.edge || data.marketData.impact}</div>
                    <div style="color: #b0b0b0; font-size: 0.9rem;">${data.marketData.jobs ? 'New Jobs' : data.marketData.applications ? 'Industries' : data.marketData.content ? 'Content Market' : data.marketData.transactions ? 'Monthly TX' : data.marketData.edge ? 'Edge Market' : 'CO2 Removed'}</div>
                </div>
            </div>
            
            <h4 style="color: #ffffff; font-size: 1.3rem; margin-bottom: 1.5rem;">Key Developments & Impact</h4>
            <ul style="list-style: none; margin-bottom: 2.5rem;">
                ${data.keyPoints.map(point => `
                    <li style="padding: 0.8rem 0; padding-left: 0.5rem; position: relative; color: #ffffff; border-bottom: 1px solid rgba(255,255,255,0.05); line-height: 1.6;">
                        ${point}
                    </li>
                `).join('')}
            </ul>
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="this.parentElement.parentElement.parentElement.remove()" style="
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