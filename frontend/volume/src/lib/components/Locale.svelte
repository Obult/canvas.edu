<script lang="ts">
	import { locale } from 'svelte-i18n'
	import { localeStore as lang } from '$lib/Stores/Locale';
	function handleLanguageChange() {
		if ($lang.locale === 'en') {
			locale.set('nl')
			lang.set({locale: 'nl'})
		} else {
			locale.set('en')
			lang.set({locale: 'en'})
		}
	}
</script>

<button class="text-2xl rounded-full px-0.5 hover:scale-95 transition-all" on:click={handleLanguageChange}>
	{#if $lang.locale === 'en'}
		🇬🇧
	{:else if $lang.locale === 'nl'}
		🇳🇱
	{/if}
</button>