import {
  configureIosSplashScreen,
  IosSplashScreenConfig,
  SplashScreenImageResizeMode,
} from '@expo/configure-splash-screen';

import { ExpoConfig } from '../Config.types';
import { ConfigPlugin } from '../Plugin.types';
import { addWarningIOS } from '../WarningAggregator';
import { withDangerousMod } from '../plugins/ios-plugins';

export const withSplashScreen: ConfigPlugin = config => {
  return withDangerousMod(config, async config => {
    await setSplashScreenAsync(config, config.modRequest.projectRoot);
    return config;
  });
};

export function getSplashScreen(config: ExpoConfig): IosSplashScreenConfig | undefined {
  if (!config.splash && !config.ios?.splash) {
    return;
  }

  const result: IosSplashScreenConfig = {
    imageResizeMode:
      config.ios?.splash?.resizeMode ??
      config.splash?.resizeMode ??
      SplashScreenImageResizeMode.CONTAIN,
    backgroundColor:
      config.ios?.splash?.backgroundColor ?? config.splash?.backgroundColor ?? '#FFFFFF', // white
    image: config.ios?.splash?.image ?? config.splash?.image,
  };

  return result;
}

export async function setSplashScreenAsync(config: ExpoConfig, projectRoot: string) {
  const splashScreenIsSupported = config.sdkVersion === '39.0.0' || !config.sdkVersion;
  if (!splashScreenIsSupported) {
    addWarningIOS(
      'splash',
      'Unable to automatically configure splash screen. Please refer to the expo-splash-screen README for more information: https://github.com/expo/expo/tree/master/packages/expo-splash-screen'
    );
    return;
  }

  const splashConfig = getSplashScreen(config);

  if (!splashConfig) {
    return;
  }
  try {
    await configureIosSplashScreen(projectRoot, splashConfig);
  } catch (e) {
    addWarningIOS('splash', e);
  }
}
