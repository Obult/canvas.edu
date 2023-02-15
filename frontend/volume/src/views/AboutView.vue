<script setup lang="ts">

</script>

<template>
  <div class="about">
    <h1 id="about_text">
      This is an about page
    </h1>
    <p>This project is meant for education and its pixels are not updateable on the frontend on purpose.
      The project is due on the 6th of may, there will be 50 simultaneous users at most.

      contribute on github: https://github.com/Obult/canvas.edu

      edit the canvas through an api POST request to api.pixels.codam.nl 
      endpoint /canvas/single
      send it a json:
      {
        width: [x value]
        height: [y value]
        data = [color as uint8 array of 4] (or gets rejected)
      }
    </p>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    align-items: center;
  }
}
</style>
