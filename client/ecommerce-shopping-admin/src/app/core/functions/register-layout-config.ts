import {LayoutConfigService} from '@drop-shipping/shared/services/public-api';
import {LayoutConfig} from '../configs/public-api';

export function initializeLayoutConfig(appConfig: LayoutConfigService) {
  // initialize app by loading default demo layout config
  return () => {
    if (appConfig.getConfig() === null) {
      appConfig.loadConfigs(new LayoutConfig().configs);
    }
  };
}
