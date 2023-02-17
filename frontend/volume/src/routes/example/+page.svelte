<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<!-- Script -->
<script>
import { dev } from '$app/environment';

export const csr = dev;
export const prerender = true;

import { onMount } from 'svelte';

// @ts-ignore
let copyButton;

  onMount(() => {
    const codeBlock = copyButton.parentNode.querySelector('code');
    if (copyButton) {
      copyButton.addEventListener('click', function() {
        if (codeBlock) {
          navigator.clipboard.writeText(codeBlock.textContent);
          copyButton.textContent = 'Copied!';
          setTimeout(function() {
            copyButton.textContent = 'Copy';
          }, 2000);
        }
      });
    }
  });

</script>

<!-- HTML -->
<div class="text-column">
	<h1>About this project</h1>
	<p>This project is meant for education and its pixels are not updateable on the frontend on purpose.</p>

	<h1>JSON Post example</h1>
	<span>Sending a post request with a JSON body:</span>
	<p>Will update the canvas for you and for everybody else.</p>
	<p>In python this will look like this:</p>
	<div class="code-block">
		<pre><code class="language-python">
			import requests
import json

url = "http://api.pixels.codam.nl/canvas/single"
headers = &#123;'Content-Type': 'application/json'&#125;

class pxlInfo:
  def __init__(self, width, height, data):
    self.width = width
    self.height = height
    self.data = data
		
    data = pxlInfo(42, 42, [0, 25, 255, 255])
    response = requests.post(url, headers=headers, data=json.dumps(data.__dict__))

if response.status_code == 200 | 201:
  print("Successfully sent data")
else:
  print("Failed to send data", response.status_code)

		</code></pre>
		<button class="copy-button" bind:this={copyButton}>Copy</button>
	</div>
</div>

<style>
.code-block {
  position: relative;
}

.copy-button {
  position: absolute;
  top: 0;
  right: 0;
}

/* code {
  font-family: Consolas, Courier, monospace;
  background-color: #252424;
	color: #aaa;
  counter-reset: line;
  padding: 1em;
	border: 4px solid #aaa;
	border-radius: 6px;
}

code:before {
  content: counter(line);
  counter-increment: line;
  display: inline-block;
  width: 2em;
  margin-right: 0.5em;
  color: #999;
}

pre code {
  display: block;
  padding: 1em;
} */
</style>
