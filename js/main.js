import {addMarkers} from './map.js';
import {initFilters} from './filters.js';
import {getData} from './api.js';
import {showAlert} from './message.js';

try {
  const data = await getData();
  addMarkers(data);
  initFilters(data);
} catch (error) {
  showAlert(error);
}
