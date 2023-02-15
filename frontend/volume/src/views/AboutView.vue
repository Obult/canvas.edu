<script setup lang="ts">

</script>

<template>
  <div class="about">
    <h1 id="about_text">
      This is an about page
    </h1>
    <p>This project is meant for education and its pixels are not updateable on the frontend on purpose.<br>
      The project is due on the 6th of may, there will be 50 simultaneous users at most.<br><br>

      contribute on github: https://github.com/Obult/canvas.edu<br><br>

      edit the canvas through an api POST request to api.pixels.codam.nl<br>
      endpoint /canvas/single<br>
      send it a json:<br>
      {<br>
        width: [x value]<br>
        height: [y value]<br>
        data = [color as uint8 array of 4] (or gets rejected)<br>
      }<br>
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
