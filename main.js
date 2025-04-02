// Get token from localStorage
function getAuthToken() {
    return localStorage.getItem('token');
}

// Fetch and display data functions
async function fetchData(endpoint) {
    try {
        const token = getAuthToken();
        let url = `https://Groshn.onrender.com/api${endpoint}`;
        
        // Special case for orders endpoint
        if (endpoint === '/orders') {
            url = 'https://Groshn.onrender.com/api/orders/all';
        }

        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            if (response.status === 401) {
                // Handle unauthorized access
                window.location.href = 'login.html';
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

// Update order status
async function updateOrderStatus(orderId, newStatus) {
    try {
        const token = getAuthToken();
        const response = await fetch(`https://Groshn.onrender.com/api/orders/${orderId}`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        });

        if (!response.ok) {
            if (response.status === 401) {
                window.location.href = 'login.html';
                return null;
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error updating order:', error);
        return null;
    }
}

// Format date
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('ar-SA');
}

// Check if user is authenticated
function checkAuth() {
    const token = getAuthToken();
    if (!token) {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Initialize tables based on current page
document.addEventListener('DOMContentLoaded', () => {
    if (!checkAuth()) return;

    const currentPage = window.location.pathname;
    
    if (currentPage.includes('orders.html')) {
        initializeOrdersTable();
    } else if (currentPage.includes('crops.html')) {
        initializeCropsTable();
    } else if (currentPage.includes('recycling.html')) {
        initializeRecyclingTable();
    } else if (currentPage.includes('accounts.html')) {
        initializeAccountsTable();
    }
});

// Logout function
function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}