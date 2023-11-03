import {generateAds} from './mocks.js';
import {initMap} from './map.js';
import {setActiveFilters} from './filters.js';

initMap(generateAds());
setActiveFilters();
