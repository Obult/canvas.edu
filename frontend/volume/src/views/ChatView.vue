<script setup lang="ts">

</script>

<template>
  <div class="chat">
    <!-- <h1 id="chat_text">This is the chat page (for now)</h1> -->
    <body class="chat-body">
      <div class="join-container">
        <header class="join-header">
          <h1><i class="fas fa-smile" /> ChatCord</h1>
        </header>
        <main class="join-main">
          <form action="/chatroom">
            <div class="form-control">
              <label for="username">Username</label>
              <input
                id="username"
                type="text"
                name="username"
                placeholder="Enter username..."
                required
              >
            </div>
            <div class="form-control">
              <label for="room">Room</label>
              <select
                id="room"
                name="room"
              >
                <option value="Room 1">
                  Room 1
                </option>
                <option value="Room 2">
                  Room 2
                </option>
                <option value="Room 3">
                  Room 3
                </option>
                <option value="Room 4">
                  Room 4
                </option>
                <option value="Room 5">
                  Room 5
                </option>
                <option value="Room 6">
                  Room 6
                </option>
              </select>
            </div>
            <button
              type="submit"
              class="btn"
            >
              Join Chat
            </button>
          </form>
        </main>
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
