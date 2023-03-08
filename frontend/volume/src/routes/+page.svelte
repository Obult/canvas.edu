<script lang="ts">
import { onMount } from "svelte";
import io from 'socket.io-client';

let canvas: HTMLCanvasElement;

onMount(() => {
	const socket = io('http://api.pixels.codam.nl/canvas', {
		// transports: ['websocket'],
	});
	const ctx = canvas.getContext("2d")!; // TODO: Error handling
	ctx.imageSmoothingEnabled = false;
	ctx.scale(4, 4);

	/**
	 * Increase the size of the array to 64.
	 * @param inputArray The array to increase.
	 */
	function increaseArraySize(inputArray: Uint8ClampedArray) {
		const outputArray = new Uint8ClampedArray(64);
		for (let i = 0; i < 64; i++)
			outputArray[i] = inputArray[i % 4];
		return outputArray;
	}

	// Someone else updated the pixel
	socket.on('update', pixel => {
        let tmpData = increaseArraySize(new Uint8ClampedArray(pixel.data));
        ctx.putImageData(new ImageData(tmpData, 4, 4), pixel.x * 4, pixel.y * 4);
	});

		socket.on('multiple-update', pixel => {
		pixel.forEach((p: any) => {
			let tmpData = increaseArraySize(new Uint8ClampedArray(p.data));
			ctx.putImageData(new ImageData(tmpData, 4, 4), p.x * 4, p.y * 4);
		});
	});

	// We just connected, and we get the canvas data
	socket.on('init', canvas => {
		const imageData = new ImageData(new Uint8ClampedArray(canvas.data), canvas.width, canvas.height);

		// Absolutely disgusting hack to get the image data to the canvas
		const tmpCanvas = document.createElement('canvas');
		const tmpctx = tmpCanvas.getContext('2d')!;
		tmpCanvas.width = 800;
		tmpCanvas.height = 800;

		tmpctx.putImageData(imageData, 0, 0);
		ctx.imageSmoothingEnabled = false;
		ctx.drawImage(tmpctx.canvas, 0, 0);
	});
});

</script>

<svelte:head>
	<title>Codam - Canvas Project</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<section>
	<canvas class="hover:scale-[101%] transition-all duration-500" width="800" height="800" bind:this={canvas}></canvas>
</section>

<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
	}

	canvas {
		border: 2px solid rgb(226, 226, 226);
		border-radius: 6px;
		background-color: rgb(245, 245, 245);
	}
</style>
