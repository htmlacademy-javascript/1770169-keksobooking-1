const OFFER_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const mapElement = document.querySelector('.map__canvas');
const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');
const featureTemplate = document.querySelector('#feature').content.querySelector('.popup__feature');

const renderElement = (isEmpty, container, className, text) => {
  if (!isEmpty) {
    return container.querySelector(className).remove();
  }

  if (className === '.popup__avatar') {
    container.querySelector(className).src = text;
    return;
  }

  container.querySelector(className).textContent = text;
};

const renderFeature = (type) => {
  const featureElement = featureTemplate.cloneNode(true);
  featureElement.classList.add(`popup__feature--${type}`);

  return featureElement;
};

const renderPhoto = (path) => {
  const photoElement = photoTemplate.cloneNode(true);
  photoElement.src = path;

  return photoElement;
};

const renderOffer = ({offer, author}) => {
  const {
    title,
    address,
    price,
    type,
    rooms,
    guests,
    checkin,
    checkout,
    features,
    description,
    photos,
  } = offer;
  const popupElement = popupTemplate.cloneNode(true);
  const featuresElement = popupElement.querySelector('.popup__features');
  const photosElement = popupElement.querySelector('.popup__photos');

  renderElement(!!title, popupElement, '.popup__title', title);
  renderElement(!!address, popupElement, '.popup__text--address', address);
  renderElement(!!price, popupElement, '.popup__text--price', `${price} ₽/ночь`);
  renderElement(!!type, popupElement, '.popup__type', OFFER_TYPE[type]);
  renderElement(!!rooms && !!guests, popupElement, '.popup__text--capacity', `${rooms} комнаты для ${guests} гостей`);
  renderElement(!!checkin && !!checkout, popupElement, '.popup__text--time', `${checkin}, выезд до ${checkout}`);
  renderElement(!!description, popupElement, '.popup__description', description);
  renderElement(!!author.avatar, popupElement, '.popup__avatar', author.avatar);

  if (features) {
    features.forEach((feature) => featuresElement.append(renderFeature(feature)));
  }

  if (photos) {
    photos.forEach((photo) => photosElement.append(renderPhoto(photo)));
  }

  return popupElement;
};

const initOffers = (offers) => {
  mapElement.append(renderOffer(offers[0]));
};

export {initOffers};
