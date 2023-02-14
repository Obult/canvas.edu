<script setup lang="ts">

// defineProps<{
//   msg: string;
// }>();

</script>

<template>
  <div class="item">
    <div>
      <canvas
        id="pixels"
        width="800"
        height="800"
        style="border:1px solid #CCCCCC;"
      />
    </div>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client';

function increaseArraySize(inputArray: Uint8ClampedArray): Uint8ClampedArray {
  const outputArray = new Uint8ClampedArray(64);
  for (let i = 0; i < 64; i++) {
    outputArray[i] = inputArray[i % 4];
  }
  return outputArray;
}

export default {
  mounted() {
    var init: boolean = false;
    var canvas: HTMLCanvasElement = document.getElementById('pixels') as HTMLCanvasElement;
    var ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    var queue: ImageData[];

    const socket = io('http://localhost:3000/gw');
    socket.on('canvas-update', pxlData => {
      if (init)
      {
        var tmpData = new Uint8ClampedArray(pxlData.data);
        tmpData = increaseArraySize(tmpData);
        ctx.putImageData(new ImageData(tmpData, 4, 4), pxlData.width * 4, pxlData.height * 4);
        console.log('received update on canvas');
      }
      else
      {
        queue.push(new ImageData(pxlData.data, pxlData.width, pxlData.height));
      }
    });
    socket.on('canvas-init', canvasData => {
      if (!ctx) {
        return;
      }
      console.log('width: ', canvasData.width, ' H: ', canvasData.height);
      // console.log('data: ', canvasData.data);
      var tmpData = new Uint8ClampedArray(canvasData.data);
      console.log('ui8: ', tmpData, ' L: ', tmpData.length);
      ctx.putImageData(new ImageData(tmpData, canvasData.width, canvasData.height), 0, 0);
      // add everything from queue to canvas
      init = true;
      console.log('hope to have received the canvas-init');
    });
  }
};
</script>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;

  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin-top: 0;
    padding: 0.4rem 0 1rem calc(var(--section-gap) / 2);
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }

  .item:before {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    bottom: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:after {
    content: " ";
    border-left: 1px solid var(--color-border);
    position: absolute;
    left: 0;
    top: calc(50% + 25px);
    height: calc(50% - 25px);
  }

  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
