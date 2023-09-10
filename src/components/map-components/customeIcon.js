import L from 'leaflet';

// Define the custom icon URL
const customIconUrl = '';

// Create a custom icon instance
const customIcon = new L.Icon({
  iconUrl: customIconUrl,
  iconSize: [32, 32], // Adjust the size as needed
  iconAnchor: [16, 32], // Anchor point for the icon
  popupAnchor: [0, -32], // Anchor point for popups relative to the icon
});

export default customIcon;
