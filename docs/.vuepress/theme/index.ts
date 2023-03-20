import type { Theme } from '@vuepress/core';
import type { DefaultThemeOptions } from '@vuepress/theme-default';
import { defaultTheme } from "@vuepress/theme-default";
import path from 'path';
import { navbar, sidebar } from '../configs';

const themeOrion = (options?: DefaultThemeOptions): Theme => {
	return (app) => {
		return {
			name: 'vuepress-theme-orion',
			clientConfigFile: path.resolve(__dirname, 'client.ts'),
			extends: defaultTheme({
				logo: '/orion-logo-brand.svg',
				locales: {
					'/': {
						navbar: navbar.en,
						sidebar: sidebar.en,
						sidebarDepth: 0,
						contributors: false,
					},
					'/fr/': {
						home: '/fr/',
						selectLanguageName: 'Français', 
						selectLanguageText: 'Langue',
						navbar: navbar.fr,
						sidebar: sidebar.fr,
						sidebarDepth: 0,
						contributors: false,
						//custom container
						tip: 'Astuce',
						warning: 'Attention'
					},
				},
			}),
		}
	}
};

export default themeOrion;
