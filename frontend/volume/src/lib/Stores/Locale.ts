import { persisted } from 'svelte-local-storage-store'
import { derived } from 'svelte/store';

export const localeStore = persisted('locale', {
  locale: 'en'
})

// create a dervied store that changes the locale when the locale store changes
export const i18n = derived(localeStore, $l => {
	return {
		lang: $l.locale as string,
		setLocale: (lang: string) => {
			localeStore.set({ locale: lang })
		}
	}
});