// BlackHole Dashboard JavaScript - Tương tác Dashboard Hố Đen
// DOM elements / Các phần tử DOM
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('.nav-link');
const contentSections = document.querySelectorAll('.content-section');
const pageTitle = document.getElementById('pageTitle');

// Initialize dashboard / Khởi tạo dashboard
document.addEventListener('DOMContentLoaded', function() {
    initializeNavigation();
    initializeCharts();
    initializeCounters();
    initializeSystemStatus();
    startRealTimeUpdates();
});

// Navigation functionality / Chức năng điều hướng
function initializeNavigation() {
    // Sidebar toggle / Chuyển đổi sidebar
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
        });
    }

    // Navigation links / Liên kết điều hướng
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links / Xóa class active khỏi tất cả liên kết
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link / Thêm class active cho liên kết được click
            this.classList.add('active');
            
            // Get target section / Lấy phần mục tiêu
            const targetSection = this.getAttribute('data-section');
            showSection(targetSection);
            
            // Update page title / Cập nhật tiêu đề trang
            updatePageTitle(targetSection);
            
            // Close sidebar on mobile / Đóng sidebar trên mobile
            if (window.innerWidth <= 1024) {
                sidebar.classList.remove('open');
            }
        });
    });
}

// Show specific section / Hiển thị phần cụ thể
function showSection(sectionId) {
    // Hide all sections / Ẩn tất cả các phần
    contentSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section / Hiển thị phần mục tiêu
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        targetSection.classList.add('fade-in');
    }
}

// Update page title based on section / Cập nhật tiêu đề trang theo phần
function updatePageTitle(sectionId) {
    const titles = {
        overview: 'DASHBOARD',
        analytics: 'ANALYTICS',
        users: 'USER MANAGEMENT',
        data: 'DATA STORAGE',
        systems: 'SYSTEM CONTROL',
        settings: 'SETTINGS'
    };

    pageTitle.textContent = titles[sectionId] || 'DASHBOARD';
}

// Initialize charts / Khởi tạo biểu đồ
function initializeCharts() {
    // Quantum flux chart / Biểu đồ quantum flux
    const quantumCtx = document.getElementById('quantumChart');
    if (quantumCtx) {
        new Chart(quantumCtx, {
            type: 'line',
            data: {
                labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
                datasets: [{
                    label: 'Quantum Energy',
                    data: [65, 78, 90, 81, 95, 88, 92],
                    borderColor: '#6c5ce7',
                    backgroundColor: 'rgba(108, 92, 231, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#6c5ce7',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }, {
                    label: 'Dark Matter',
                    data: [45, 52, 48, 61, 55, 67, 73],
                    borderColor: '#00cec9',
                    backgroundColor: 'rgba(0, 206, 201, 0.1)',
                    borderWidth: 3,
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#00cec9',
                    pointBorderColor: '#ffffff',
                    pointBorderWidth: 2,
                    pointRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: 'Orbitron'
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        ticks: {
                            color: '#a0a0a0',
                            font: {
                                family: 'Exo 2'
                            }
                        },
                        grid: {
                            color: 'rgba(160, 160, 160, 0.1)'
                        }
                    },
                    y: {
                        ticks: {
                            color: '#a0a0a0',
                            font: {
                                family: 'Exo 2'
                            }
                        },
                        grid: {
                            color: 'rgba(160, 160, 160, 0.1)'
                        }
                    }
                }
            }
        });
    }

    // System distribution chart / Biểu đồ phân bố hệ thống
    const systemCtx = document.getElementById('systemChart');
    if (systemCtx) {
        new Chart(systemCtx, {
            type: 'doughnut',
            data: {
                labels: ['Core Systems', 'Quantum Drive', 'Shield Matrix', 'Backup Systems'],
                datasets: [{
                    data: [35, 25, 25, 15],
                    backgroundColor: [
                        '#6c5ce7',
                        '#00cec9',
                        '#fd79a8',
                        '#fdcb6e'
                    ],
                    borderColor: '#0a0a0f',
                    borderWidth: 3,
                    hoverBorderWidth: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            color: '#ffffff',
                            font: {
                                family: 'Exo 2'
                            },
                            padding: 20
                        }
                    }
                },
                cutout: '60%'
            }
        });
    }
}

// Initialize animated counters / Khởi tạo bộ đếm động
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseFloat(counter.textContent.replace(/[^0-9.]/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.id === 'totalUsers') {
                    counter.textContent = Math.floor(current).toLocaleString();
                } else if (counter.id === 'totalEnergy' || counter.id === 'totalSecurity') {
                    counter.textContent = current.toFixed(1);
                } else {
                    counter.textContent = Math.floor(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (counter.id === 'totalUsers') {
                    counter.textContent = target.toLocaleString();
                } else if (counter.id === 'totalEnergy' || counter.id === 'totalSecurity') {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = target;
                }
            }
        };
        
        // Start animation after a delay / Bắt đầu animation sau một khoảng delay
        setTimeout(updateCounter, Math.random() * 1000);
    });
}

// Initialize system status indicators / Khởi tạo chỉ báo trạng thái hệ thống
function initializeSystemStatus() {
    const statusIndicators = document.querySelectorAll('.status-indicator');
    
    statusIndicators.forEach(indicator => {
        // Add random pulse delay / Thêm delay pulse ngẫu nhiên
        const delay = Math.random() * 2;
        indicator.style.animationDelay = `${delay}s`;
    });
}

// Real-time updates simulation / Mô phỏng cập nhật thời gian thực
function startRealTimeUpdates() {
    setInterval(() => {
        updateSystemMetrics();
        updateStatusIndicators();
    }, 5000); // Update every 5 seconds / Cập nhật mỗi 5 giây
}

// Update system metrics / Cập nhật số liệu hệ thống
function updateSystemMetrics() {
    const energyElement = document.getElementById('totalEnergy');
    const signalsElement = document.getElementById('totalSignals');
    const securityElement = document.getElementById('totalSecurity');
    
    if (energyElement) {
        const currentEnergy = parseFloat(energyElement.textContent);
        const newEnergy = currentEnergy + (Math.random() - 0.5) * 2;
        energyElement.textContent = Math.max(0, Math.min(100, newEnergy)).toFixed(1);
    }
    
    if (signalsElement) {
        const currentSignals = parseInt(signalsElement.textContent);
        const newSignals = currentSignals + Math.floor((Math.random() - 0.5) * 10);
        signalsElement.textContent = Math.max(0, newSignals);
    }
    
    if (securityElement) {
        const currentSecurity = parseFloat(securityElement.textContent);
        const newSecurity = currentSecurity + (Math.random() - 0.5) * 0.5;
        securityElement.textContent = Math.max(0, Math.min(100, newSecurity)).toFixed(1);
    }
}

// Update status indicators randomly / Cập nhật chỉ báo trạng thái ngẫu nhiên
function updateStatusIndicators() {
    const statusItems = document.querySelectorAll('.status-item');
    
    statusItems.forEach(item => {
        const indicator = item.querySelector('.status-indicator');
        const value = item.querySelector('.status-value');
        
        // Randomly change status / Thay đổi trạng thái ngẫu nhiên
        if (Math.random() < 0.1) { // 10% chance to change / 10% cơ hội thay đổi
            const statuses = ['online', 'warning', 'offline'];
            const statusTexts = ['ONLINE', 'WARNING', 'OFFLINE'];
            const currentStatus = indicator.classList.contains('online') ? 0 : 
                                indicator.classList.contains('warning') ? 1 : 2;
            
            let newStatus = currentStatus;
            while (newStatus === currentStatus) {
                newStatus = Math.floor(Math.random() * 3);
            }
            
            // Remove all status classes / Xóa tất cả class trạng thái
            indicator.classList.remove('online', 'warning', 'offline');
            value.classList.remove('online', 'warning', 'offline');

            // Add new status class / Thêm class trạng thái mới
            indicator.classList.add(statuses[newStatus]);
            value.classList.add(statuses[newStatus]);
            value.textContent = statusTexts[newStatus];
        }
    });
}

// Chart control buttons / Nút điều khiển biểu đồ
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('chart-btn')) {
        // Remove active class from all chart buttons / Xóa class active khỏi tất cả nút biểu đồ
        const chartBtns = e.target.parentElement.querySelectorAll('.chart-btn');
        chartBtns.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked button / Thêm class active cho nút được click
        e.target.classList.add('active');
        
        // Here you would typically update the chart data / Ở đây bạn thường sẽ cập nhật dữ liệu biểu đồ
        console.log('Chart period changed to:', e.target.textContent);
    }
});

// Keyboard shortcuts / Phím tắt
document.addEventListener('keydown', function(e) {
    // Toggle sidebar with Ctrl+B / Chuyển đổi sidebar với Ctrl+B
    if (e.ctrlKey && e.key === 'b') {
        e.preventDefault();
        sidebar.classList.toggle('open');
    }
    
    // Quick navigation with number keys / Điều hướng nhanh với phím số
    if (e.key >= '1' && e.key <= '6') {
        const sectionIndex = parseInt(e.key) - 1;
        const navLink = navLinks[sectionIndex];
        if (navLink) {
            navLink.click();
        }
    }
});

// Window resize handler / Xử lý thay đổi kích thước cửa sổ
window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
        sidebar.classList.remove('open');
    }
});

// Console welcome message / Thông báo chào mừng console
console.log(`
🌌 Dashboard Initialized
🚀 Welcome to the system, Admin!
⚡ All systems operational
🛸 Ready for system management
`);

// Export functions for external use / Xuất functions để sử dụng bên ngoài
window.Dashboard = {
    showSection,
    updatePageTitle,
    updateSystemMetrics
};
