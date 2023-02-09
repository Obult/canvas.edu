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
        width="200"
        height="200"
        style="border:1px solid #CCCCCC;"
      />
    </div>
  </div>
</template>

<script lang="ts">
import io from 'socket.io-client';

export default {
  // data() {
  //   const canvas: HTMLCanvasElement = document.getElementById('pixels') as HTMLCanvasElement;
  //   const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
  //   const imgData: ImageData = ctx.createImageData(canvas.width, canvas.height);
  //   const data: Uint8ClampedArray = imgData.data;

  // },
  mounted() {
    var canvas: HTMLCanvasElement = document.getElementById('pixels') as HTMLCanvasElement;
    var ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    // var imgData: ImageData = ctx.createImageData(canvas.width, canvas.height);
    // var data: Uint8ClampedArray = imgData.data;

    const socket = io('http://localhost:3000');
    socket.on('canvas-update', pxlData => {
      ctx.fillStyle = "green";
      ctx.fillRect(pxlData.x, pxlData.y, 10, 10);
      console.log('received update on canvas');
    });
    socket.on('canvas-init', canvasData => {
      if (!ctx) {
        return;
      }
      console.log('width: ', canvasData.w);
      console.log('data: ', canvasData.data);
      var tmpData = new Uint8ClampedArray(canvasData.data);
      console.log('ui8: ', tmpData);
      ctx.putImageData(new ImageData(tmpData, canvasData.w, canvasData.h), 0, 0);
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
