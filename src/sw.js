// See: https://developers.google.com/web/tools/workbox/modules/workbox-recipes
import {
  pageCache,
  imageCache,
  staticResourceCache,
  googleFontsCache,
  offlineFallback,
} from 'workbox-recipes';
import {precacheAndRoute} from 'workbox-precaching';
import {registerRoute} from 'workbox-routing';
import * as strategies from 'workbox-strategies';

precacheAndRoute(self.__WB_MANIFEST);

pageCache();

googleFontsCache();

staticResourceCache();

imageCache();

//offlineFallback();

registerRoute(
  /manifest[^/]*\.json$/,
  new strategies.CacheFirst()
);

registerRoute(
  ({url}) => url.origin === 'https://jsonplaceholder.typicode.com',
  new strategies.NetworkFirst()
);