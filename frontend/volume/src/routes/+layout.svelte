<script lang="ts">
  import "../app.postcss";
  import Header from "$lib/components/Header.svelte";
  import { browser } from '$app/environment'
  import '$lib/i18n'
  import { isLoading, _ } from 'svelte-i18n';
</script>
{#if $isLoading}
  Please wait...
{:else}
<div class="app">
  <Header />
  <main>
    <slot />
  </main>

  <footer>
    <p>
      {$_('footer')} <a href="https://github.com/Obult">Oswin</a>,
      <a href="https://github.com/W2Wizard">Leon</a> & <a href="https://github.com/LithiumOx">Mees</a>
    </p>
  </footer>
</div>
{/if}

<style>
  .app {
    display: flex;
    flex-direction: column;
    min-height: 90vh;
  }

  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    width: 100%;
    max-width: 64rem;
    margin: 0 auto;
    box-sizing: border-box;
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 12px;
  }

  footer a {
    font-weight: bold;
  }

  @media (min-width: 480px) {
    footer {
      padding: 12px 0;
    }
  }
</style>
