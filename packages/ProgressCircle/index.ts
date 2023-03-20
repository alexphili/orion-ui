import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionProgressCircle from './src/OrionProgressCircle.vue';
import OrionProgressCircleSetupService from './src/OrionProgressCircleSetupService';

export const OrionProgressCirclePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}ProgressCircle`, OrionProgressCircle);
	},
};

export { OrionProgressCircle, OrionProgressCircleSetupService };
