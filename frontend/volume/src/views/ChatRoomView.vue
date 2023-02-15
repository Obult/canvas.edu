<script setup lang="ts">

</script>

<template>
  <div class="chat">
    <!-- <h1 id="chat_text">This is the chat page (for now)</h1> -->
    <body>
      <div class="chat-container">
        <header class="chat-header">
          <h1><i class="fas fa-smile" /> ChatCord</h1>
          <a
            href="/chat"
            class="btn"
          >Leave Room</a>
        </header>
        <main class="chat-main">
          <div class="chat-sidebar">
            <h3><i class="fas fa-comments" /> Room Name:</h3>
            <h2 id="room-name">
              Room 1
            </h2>
            <h3><i class="fas fa-users" /> Users</h3>
            <ul id="users">
              <li>Ruben 1</li>
              <li>Ruben 2</li>
              <li>Lindsay</li>
              <li>Oswin</li>
              <li>Dagmar</li>
            </ul>
          </div>
          <div class="chat-messages">
            <div class="message">
              <p class="meta">
                Ruben 1<span>9:12pm</span>
              </p>
              <p class="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                repudiandae.
              </p>
            </div>
            <div class="message">
              <p class="meta">
                Ruben 2<span>9:15pm</span>
              </p>
              <p class="text">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi,
                repudiandae.
              </p>
            </div>
          </div>
        </main>
        <div class="chat-form-container">
          <form id="chat-form">
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autocomplete="off"
            >
            <button class="btn">
              <i class="fas fa-paper-plane" /> Send
            </button>
          </form>
        </div>
      </div>
    </body>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .chat {
    min-height: 100vh;
    align-items: center;
  }
}
</style>
