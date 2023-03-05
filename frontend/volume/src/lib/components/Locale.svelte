<script lang="ts">
	import { onMount } from 'svelte';
	import { locale } from 'svelte-i18n'
	import { localeStore as lang } from '$lib/Stores/Locale';
	// $: if (lang === 'en-gb') {lang = 'en'}

	// onMount(() => {
	// 	locale.set({locale:})
	// })

	$: console.log($lang.locale);
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

<button class="text-xl rounded-full bg-slate-100 hover:scale-95 transition-all p-1" on:click={handleLanguageChange}>
	{#if $lang.locale === 'en'}
		🇬🇧
	{:else if $lang.locale === 'nl'}
		🇳🇱
	{/if}
</button>