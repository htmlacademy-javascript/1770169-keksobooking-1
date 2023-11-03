import {setActiveForm, moveendAdressHandler} from './form.js';
import {renderOffer} from './offers.js';

const map = L.map('map-canvas')
  .on('load', () => setActiveForm())
  .setView(
    {
      lat: 35.68949,
      lng: 139.69171
    }, 10);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: [52, 52],
    iconAnchor: [26, 52]
  }
);

const pinIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  }
);

L.marker(
  {
    lat: 35.68949,
    lng: 139.69171
  },
  {
    draggable: true,
    icon: mainPinIcon
  }
)
  .addTo(map)
  .on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    moveendAdressHandler(lat, lng);
  });

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const {lat, lng} = offer.offer.location;
  L.marker(
    {
      lat,
      lng
    },
    {
      icon: pinIcon,
    }
  )
    .addTo(markerGroup)
    .bindPopup(renderOffer(offer));
};

const initMap = (offers) => offers.forEach((offer) => createMarker(offer));

export {initMap};
