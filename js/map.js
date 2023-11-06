import {setFormActive, moveendAddressHandler} from './form.js';
import {renderOffer} from './offers.js';

const MarkerLocation = {
  LAT: 35.68172,
  LNG: 139.75392,
};

const MainIconPosition = {
  SIZE: [52, 52],
  ANCHOR: [26, 52]
};
const IconPosition = {
  SIZE: [40, 40],
  ANCHOR: [20, 40]
};

const MARKER_COUNTS = 10;

const map = L.map('map-canvas')
  .on('load', () => setFormActive())
  .setView(
    {
      lat: MarkerLocation.LAT,
      lng: MarkerLocation.LNG
    }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }
).addTo(map);

const mainPinIcon = L.icon(
  {
    iconUrl: './img/main-pin.svg',
    iconSize: MainIconPosition.SIZE,
    iconAnchor: MainIconPosition.ANCHOR
  }
);

const pinIcon = L.icon(
  {
    iconUrl: './img/pin.svg',
    iconSize: IconPosition.SIZE,
    iconAnchor: IconPosition.ANCHOR
  }
);

const mainMarker = L.marker(
  {
    lat: MarkerLocation.LAT,
    lng: MarkerLocation.LNG
  },
  {
    draggable: true,
    icon: mainPinIcon
  }
)
  .addTo(map)
  .on('moveend', (evt) => {
    const {lat, lng} = evt.target.getLatLng();
    moveendAddressHandler(lat, lng);
  });

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (offer) => {
  const {lat, lng} = offer.location;
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

const addMarkers = (offers) => {
  for (let i = 0; i < MARKER_COUNTS; i++) {
    createMarker(offers[i]);
  }
};

const resetMarkers = () => {
  mainMarker.setLatLng([MarkerLocation.LAT, MarkerLocation.LNG]);
  map.closePopup();
};

const clearMarkers = () => markerGroup.clearLayers();

export {addMarkers, resetMarkers, clearMarkers};
