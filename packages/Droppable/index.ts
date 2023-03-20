import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionDroppable from './src/OrionDroppable.vue';
import OrionDroppableSetupService from './src/OrionDroppableSetupService';

export const OrionDroppablePlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}Droppable`, OrionDroppable);
	},
};

export { OrionDroppable, OrionDroppableSetupService };
