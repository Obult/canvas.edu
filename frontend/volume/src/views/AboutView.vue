<script setup lang="ts">

// This function describes what the Meow-button does onclick.
// It either runs a GET request to "/cat" of the back-end, and sets the
// about_text to the text received as a response. Or it changes the
// about_text to be "dog" if the value is currently "cat".
function onclickMeow(){
  const about_text_element = document.getElementById('about_text');

  if (about_text_element.innerHTML === 'cat')
    about_text_element.innerHTML = 'dog';
  else
  {
    console.log('Fetching...');
    fetch('http://localhost:3000/cat')
      .then(function(res){
        // console.log(res);
        return res.text();
      })
      .then(function(data){
        about_text_element.innerHTML = data;
        console.log(data);
      });
  }
}

</script>

<template>
  <div class="about">
    <h1 id="about_text">
      This is an about page
    </h1>
    <button @click="onclickMeow">
      Meow
    </button>
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
