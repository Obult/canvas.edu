<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<!-- Script -->
<script>
import { dev } from '$app/environment';

export const csr = dev;
export const prerender = true;

let jsonPostExample = {
	"width": 42,
	"height": 42,
	"data": [255, 0, 0, 255],
};
</script>

<!-- HTML -->
<div class="text-column">
	<h1>About this project</h1>
	<p>This project is meant for education and its pixels are not updateable on the frontend on purpose.</p>

	<h1>JSON Post example</h1>
	<span>Sending a post request with a JSON body:</span>
	<pre><code>{JSON.stringify(jsonPostExample)}</code></pre>
	<p>Will update the canvas for you and for everybody else.</p>
</div>
