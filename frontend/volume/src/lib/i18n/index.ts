import { init, register } from 'svelte-i18n';

const defaultLocale = 'en-GB';

register('en', () => import('./locales/en.json'));
register('nl', () => import('./locales/nl.json'));

init({
	fallbackLocale: defaultLocale,
	initialLocale: 'en'
});
