const currentContainer = document.querySelector('#current-data-container');
const conditionImage = currentContainer.querySelector('.condition-image');

export default function setConditionImage(locationData) {
  console.log(locationData.name);
  conditionImage.src = locationData.icon;
}
