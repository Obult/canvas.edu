<!-- Script -->
<script lang="ts">
	import { dev } from '$app/environment';
	import Highlight from 'svelte-highlight';
	import python from 'svelte-highlight/languages/python';
	import json from 'svelte-highlight/languages/json';
	import { _ } from 'svelte-i18n';
	import atomOneDark from 'svelte-highlight/styles/atom-one-dark';
	import Button from '$lib/components/Button.svelte';

	const jsonExample = `{
	"width": 42,
	"height": 42,
	"data": [255, 0, 0, 255], // rgba
}`;

	const code = `import requests
import json

url = "http://api.pixels.codam.nl/canvas/single"
headers = {'Content-Type': 'application/json'}

pixel = {'width': 42, 'height': 42, 'data': [0, 25, 255, 255]}

response = requests.post(url, headers=headers, data=json.dumps(pixel))
# test
if response.ok:
    print("Pixel successfully changed!")
else:
    print("Failed to change pixel:", response.status_code)
`;

	let copyButton = 'Copy';

	function handleCopy(code:string) {
		navigator.clipboard.writeText(code);
		copyButton = 'Copied!';
		setTimeout(function () {
			copyButton = 'Copy';
		}, 2000);
	}
</script>

<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
	{@html atomOneDark}
</svelte:head>



<!-- HTML -->
<article class="text-column prose lg:prose-lg mx-auto">
	<div>
		<h1 class="font-bold text-3xl">{$_('info.title')}</h1>
		<blockquote class="text-sm font-light">
		{$_('info.subtitle')}
		</blockquote>
	</div>
	<h2 class="text-xl font-semibold">{$_('info.header1')}</h2>
	<p>
		{$_('info.content1')}
	</p>
	<h2 class="text-xl font-semibold">{$_('info.header2')}</h2>
	<p>
		{$_('info.content2')}
	</p>
	<h2 class="text-xl font-semibold">{$_('info.header4')}</h2>
	<p>
		{$_('info.content4')}
	</p>
	<div class="flex flex-col mt-2">
		<div
			class="flex justify-between h-16 -my-1 items-center bg-slate-100 rounded-t-xl"
		>
			<span class="font-semibold ml-2.5">{$_('code.json.title')}</span>
			<Button code={jsonExample} />

		</div>
		<Highlight class="bg-[#282c34] !mt-0" language={json} code={jsonExample} />
	</div>
	<h2 class="text-xl font-semibold">{$_('info.header5')}</h2>
	<p>
		{$_('info.content5')}
	</p>
	<div class="flex flex-col">
		<div
			class="flex justify-between h-16 -my-1 items-center bg-slate-100 rounded-t-xl"
		>
			<span class="font-semibold ml-2.5">{$_('code.python.title')}</span>
			<Button {code} />
		</div>
		<Highlight class="bg-[#282c34] !mt-0" language={python} {code} />
	</div>
	<h2 class="text-xl font-semibold">{$_('info.header3')}</h2>
	<p>
		{$_('info.content3')}
	</p>
</article>