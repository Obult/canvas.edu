<script lang="ts">
	import { locale } from 'svelte-i18n'

	let lang:any = 'en';
	// $: if (lang === 'en-gb') {lang = 'en'}

	function handleLanguageChange() {
		if (lang === 'en') {
			locale.set('nl')
			lang = 'nl'
		} else {
			locale.set('en')
			lang = 'en'
		}
	}
</script>

<button class="text-xl rounded-full bg-slate-100 hover:scale-95 transition-all p-1" on:click={handleLanguageChange}>
	{#if lang === 'en'}
		🇬🇧
	{:else if lang === 'nl'}
		🇳🇱
	{/if}
</button>