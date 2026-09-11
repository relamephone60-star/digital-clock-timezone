# Digital Clock - Multiple Time Zones

A beautiful, responsive digital clock application that displays the current time in different time zones around the world.

## Features

✨ **Key Features:**
- 🌍 Display current time in multiple time zones simultaneously
- 💾 Persistent storage using browser's localStorage
- 🎨 Modern, responsive UI with gradient design
- ⏰ Real-time clock updates every second
- ➕ Easy to add/remove time zones
- 📱 Mobile-friendly responsive design
- 🌙 Dark theme support for clock cards

## Supported Time Zones

The application includes support for popular time zones:
- **Americas:** New York, Chicago, Denver, Los Angeles
- **Europe:** London, Paris, Berlin
- **Asia:** Tokyo, Shanghai, Dubai, India
- **Pacific:** Sydney, Auckland

## How to Use

1. **Open** `index.html` in your web browser
2. **Select a time zone** from the dropdown menu
3. **Click "Add"** to display the clock for that time zone
4. **Remove clocks** by clicking the × button on any clock card
5. Your selected time zones are **automatically saved** and will persist when you return

## Technologies Used

- **HTML5:** Semantic markup structure
- **CSS3:** Responsive grid layout, gradients, animations
- **JavaScript (ES6+):** DOM manipulation, localStorage API, Intl API for timezone handling
- **LocalStorage:** Persistent data storage

## File Structure

```
├── index.html      # Main HTML structure
├── style.css       # Styles and responsive design
├── script.js       # JavaScript logic and functionality
└── README.md       # Documentation
```

## Browser Compatibility

- Chrome/Edge: ✅ Full support
- Firefox: ✅ Full support
- Safari: ✅ Full support
- IE11: ⚠️ Limited support (no timezone support)

## LocalStorage Details

The application stores selected timezones in the browser's localStorage under the key `selected_timezones` as a JSON array.

**Example stored data:**
```json
["America/New_York", "Europe/London", "Asia/Tokyo"]
```

## Customization

### Add More Time Zones

Edit the `TIMEZONES` object in `script.js`:

```javascript
const TIMEZONES = {
    'Your/Timezone': 'Display Name',
    // ... more timezones
};
```

Also add corresponding `<option>` tags in `index.html` select element.

### Change Color Scheme

Modify the gradient colors in `style.css`:

```css
body {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

## Future Enhancements

- [ ] 12-hour time format toggle
- [ ] Analog clock display option
- [ ] Alarm functionality
- [ ] Temperature display by timezone
- [ ] Timezone search functionality
- [ ] Export/Import timezone settings
- [ ] Dark mode toggle

## License

MIT License - Feel free to use this project for personal or commercial purposes.

## Contributing

Contributions are welcome! Feel free to submit issues and enhancement requests.
