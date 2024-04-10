let units = 'imperial';

export default function toggleUnits() {
  if (units === 'imperial') {
    units = 'metric';
  } else if (units === 'metric') {
    units = 'imperial';
  }
}

export function getUnitsValue() {
  return units;
}
