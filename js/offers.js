const OFFER_TYPE = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель'
};

const popupTemplate = document.querySelector('#card').content.querySelector('.popup');
const photoTemplate = document.querySelector('#photo').content.querySelector('.popup__photo');
const featureTemplate = document.querySelector('#feature').content.querySelector('.popup__feature');

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

const renderElements = (values, container, cb) => {
  if (!values) {
    return container.remove();
  }
  values.forEach((value) => container.append(cb(value)));
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

  const addValue = (value, className) => {
    if (!value) {
      return popupElement.querySelector(className).remove();
    }
    popupElement.querySelector(className).textContent = value;
  };

  const addAvatar = () => {
    if (!author.avatar) {
      return popupElement.querySelector('.popup__avatar').remove();
    }
    popupElement.querySelector('.popup__avatar').src = author.avatar;
  };

  const addPrice = () => {
    if (!price) {
      return popupElement.querySelector('.popup__text--price').remove();
    }
    popupElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  };

  const addType = () => {
    if (!type) {
      return popupElement.querySelector('.popup__type').remove();
    }
    popupElement.querySelector('.popup__type').textContent = OFFER_TYPE[type];
  };

  const addCapacity = () => {
    if (!rooms && !guests) {
      return popupElement.querySelector('.popup__text--capacity').remove();
    }
    popupElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`;
  };

  const addTime = () => {
    if (!checkin && !checkout) {
      return popupElement.querySelector('.popup__text--time').remove();
    }
    popupElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  };


  addValue(title, '.popup__title');
  addValue(address, '.popup__text--address');
  addPrice();
  addType();
  addCapacity();
  addTime();
  addValue(description, '.popup__description');
  addAvatar();
  renderElements(features, featuresElement, renderFeature);
  renderElements(photos, photosElement, renderPhoto) ;

  return popupElement;
};

export {renderOffer};
