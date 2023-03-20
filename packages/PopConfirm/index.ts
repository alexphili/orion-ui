import { App, Plugin } from 'vue';
import { upperFirst } from 'lodash-es';
import OrionPopConfirm from './src/OrionPopConfirm.vue';
import OrionPopConfirmSetupService from './src/OrionPopConfirmSetupService';

export const OrionPopConfirmPlugin: Plugin = {
	install (app: App, prefix: string = 'o') {
		app.component(`${upperFirst(prefix)}PopConfirm`, OrionPopConfirm);
	},
};

export { OrionPopConfirm, OrionPopConfirmSetupService };
