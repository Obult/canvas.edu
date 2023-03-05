import { init, register } from 'svelte-i18n';

const defaultLocale = 'en';
const initialLocale = 'en';
register('en', () => import('./locales/en.json'));
register('nl', () => import('./locales/nl.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: initialLocale,
});
