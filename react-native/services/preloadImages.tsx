import { Asset } from 'expo-asset';

async function preloadImages(images) {
    try {
      // Preload images
      await Asset.loadAsync(images);
    } catch (e) {
      console.warn(e);
    }
}

export default preloadImages