// Store selected timezones in localStorage
const STORAGE_KEY = 'selected_timezones';

// List of popular timezones
const TIMEZONES = {
    'America/New_York': 'New York',
    'America/Chicago': 'Chicago',
    'America/Denver': 'Denver',
    'America/Los_Angeles': 'Los Angeles',
    'Europe/London': 'London',
    'Europe/Paris': 'Paris',
    'Europe/Berlin': 'Berlin',
    'Asia/Tokyo': 'Tokyo',
    'Asia/Shanghai': 'Shanghai',
    'Asia/Dubai': 'Dubai',
    'Asia/Kolkata': 'India',
    'Australia/Sydney': 'Sydney',
    'Pacific/Auckland': 'Auckland'
};

// Initialize the app
function init() {
    loadTimezones();
    updateClocks();
    setInterval(updateClocks, 1000);
    setupEventListeners();
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('add-btn').addEventListener('click', addTimezone);
    document.getElementById('timezone-select').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTimezone();
        }
    });
}

// Load timezones from localStorage
function loadTimezones() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const timezones = stored ? JSON.parse(stored) : ['Asia/Kolkata', 'Europe/London', 'America/Los_Angeles'];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timezones));
    renderClocks(timezones);
}

// Add a new timezone
function addTimezone() {
    const select = document.getElementById('timezone-select');
    const timezone = select.value;
    
    if (!timezone) {
        alert('Please select a timezone');
        return;
    }
    
    const stored = localStorage.getItem(STORAGE_KEY);
    const timezones = JSON.parse(stored);
    
    if (timezones.includes(timezone)) {
        alert('This timezone is already added');
        return;
    }
    
    timezones.push(timezone);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timezones));
    select.value = '';
    renderClocks(timezones);
}

// Remove a timezone
function removeTimezone(timezone) {
    const stored = localStorage.getItem(STORAGE_KEY);
    let timezones = JSON.parse(stored);
    timezones = timezones.filter(tz => tz !== timezone);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(timezones));
    renderClocks(timezones);
}

// Render clock cards
function renderClocks(timezones) {
    const container = document.getElementById('clocks-container');
    
    if (timezones.length === 0) {
        container.innerHTML = '<div class="empty-state"><p>No timezones selected. Add one to get started!</p></div>';
        return;
    }
    
    container.innerHTML = timezones.map(timezone => `
        <div class="clock-card" data-timezone="${timezone}">
            <button class="remove-btn" onclick="removeTimezone('${timezone}')">×</button>
            <div class="timezone-name">${TIMEZONES[timezone] || timezone}</div>
            <div class="time-display">--:--:--</div>
            <div class="date-display">--/--/----</div>
        </div>
    `).join('');
}

// Update all clock displays
function updateClocks() {
    const stored = localStorage.getItem(STORAGE_KEY);
    const timezones = JSON.parse(stored);
    
    timezones.forEach(timezone => {
        const card = document.querySelector(`[data-timezone="${timezone}"]`);
        if (card) {
            const time = getTimeInTimezone(timezone);
            card.querySelector('.time-display').textContent = time.time;
            card.querySelector('.date-display').textContent = time.date;
        }
    });
}

// Get current time in a specific timezone
function getTimeInTimezone(timezone) {
    try {
        const now = new Date();
        const options = {
            timeZone: timezone,
            hour12: false,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        };
        
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(now);
        
        const partsMap = {};
        parts.forEach(part => {
            partsMap[part.type] = part.value;
        });
        
        const time = `${partsMap.hour}:${partsMap.minute}:${partsMap.second}`;
        const date = `${partsMap.month}/${partsMap.day}/${partsMap.year}`;
        
        return { time, date };
    } catch (error) {
        console.error(`Error getting time for ${timezone}:`, error);
        return { time: '--:--:--', date: '--/--/----' };
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);