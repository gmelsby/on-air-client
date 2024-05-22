import { useEffect } from 'react';
import { LightCategory } from '../LightCategory';

// map from LightCategory to css background color class and favicon
const detailsMap = new Map([
  [LightCategory.Off, {backgroundColor: 'gray-background', favicon: '⚪️'}],
  [LightCategory.OnAir, {backgroundColor: 'red-background', favicon: '🔴'}],
  [LightCategory.OnCamera, {backgroundColor: 'blue-background', favicon: '🔵'}],
  [LightCategory.Offline, {backgroundColor: 'black-background', favicon: '⚫️'}],
]);

export default function PageDetailUpdater(
  lightState: LightCategory | undefined,
) {
  // every time lightState changes, change the class of the body element
  useEffect(() => {
    const updateDetails = detailsMap.get(lightState as LightCategory);
    if (updateDetails !== undefined) {
      // update background
      document.body.className = updateDetails['backgroundColor'];
      // update favicon
      const favSVG = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${updateDetails['favicon']}</text></svg>`;
      const favElement = document.getElementById('favicon');
      if(favElement && favElement instanceof HTMLLinkElement) {
        favElement.href = favSVG;
      }
    }
  }, [lightState]);
}
