import {setActiveForm} from './form.js';

const map = L.map('map-canvas')
  .on('load', () => setActiveForm())
  .setView({
    lat: 35.68949,
    lng: 139.69171
  }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);
