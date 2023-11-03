import {
  addZeroPad,
  generateRandomElements,
  generateRandomFloatNumber,
  generateRandomNumber,
  getRandomElement
} from './utils.js';

const AD_COUNT = 10;
const Price = {
  MIN: 1000,
  MAX: 10000
};
const Room = {
  MIN: 1,
  MAX: 4
};
const Guest = {
  MIN: 1,
  MAX: 8
};
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const CHECKINS = ['12:00', '13:00', '14:00'];
const CHECKOUTS = ['12:00,', '13:00', '14:00'];
const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TITLES = [
  'Wilderness Hotel Inari & Igloos',
  'Holiday Village Inari',
  'Hotel Arno Bellariva',
  'Villa Augusto',
  'House San Severo'
];
const DESCRIPTIONS = [
  'Светлая, чистая, большая, теплая квартира в самом центре города.',
  'Квартира укомплектована всей необходимой мебелью и техникой для вашего комфортного проживания.',
  'Квартира с дизайнерским ремонтом в тихом и зеленом квартале!',
  'Удобная транспортная развязка, метро находится в пешей доступности.',
  'В пешей доступности магазины, несколько школ, детские сады, кафе и рестораны.'
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];
const Avatar = {
  MIN: 1,
  MAX: 10
};
const Longitude = {
  MIN: 139.70000,
  MAX: 139.80000,
  DECIMALS: 5
};
const Latitude = {
  MIN: 35.65000,
  MAX: 35.70000,
  DECIMALS: 5
};

const createAd = () => ({
  author: {
    avatar: `img/avatars/user${addZeroPad(generateRandomNumber(Avatar.MIN, Avatar.MAX))}.png`
  },
  offer: {
    title: getRandomElement(TITLES),
    address: `${generateRandomFloatNumber(Latitude.MIN, Latitude.MAX, Latitude.DECIMALS)}, ${generateRandomFloatNumber(Longitude.MIN, Longitude.MAX, Longitude.DECIMALS)}`,
    price: generateRandomNumber(Price.MIN, Price.MAX),
    type: getRandomElement(TYPES),
    rooms: generateRandomNumber(Room.MIN, Room.MAX),
    guests: generateRandomNumber(Guest.MIN, Guest.MAX),
    checkin: getRandomElement(CHECKINS),
    checkout: getRandomElement(CHECKOUTS),
    features: generateRandomElements(FEATURES),
    description: getRandomElement(DESCRIPTIONS),
    photos: generateRandomElements(PHOTOS),
    location: {
      lat: generateRandomFloatNumber(Latitude.MIN, Latitude.MAX, Latitude.DECIMALS),
      lng: generateRandomFloatNumber(Longitude.MIN, Longitude.MAX, Longitude.DECIMALS)
    }
  }
});

export const generateAds = () => Array.from({length: AD_COUNT}, createAd);
