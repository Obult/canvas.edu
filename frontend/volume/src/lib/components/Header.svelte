<script>
		import { _ } from 'svelte-i18n'
	import Locale from './Locale.svelte';
	import { page } from '$app/stores';
</script>

<nav
  aria-label="Site Nav"
  class=" flex w-full items-center justify-between p-4"
>
  <a
    href="https://codam.nl"
    class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black"
  >
    <!-- <span class="sr-only">Logo</span> -->
    <img src="/images/Codam.svg" class="m-1 p-1 w-full h-full hover:scale-95 transition-all" alt="" srcset="">
  </a>

  <ul class="flex items-center gap-2 text-sm font-medium text-gray-500">
    <!-- <li class="hidden lg:block">
      <a class="rounded-lg px-3 py-2" href="/"> Home </a>
    </li> -->

    <li><a class="underline-offset-2 decoration-wavy decoration-slate-400 rounded-lg px-3 py-2" class:underline={$page.route.id === '/'} href="/"> {$_('header.canvas')} </a></li>

    <li>
      <a
        class="underline-offset-2 decoration-wavy decoration-slate-400 inline-flex items-center gap-2 rounded-lg px-3 py-2" class:underline={$page.route.id === '/info'}
        href="/info"
      >
		{$_('header.info')}
      </a>
    </li>
	<li>
		<a href="https://github.com/Obult/canvas.edu"><img src="/images/github.svg" alt="github" class="m-1 w-8 h-8 hover:scale-95 transition-all"></a>
	</li>
	<li>
		<Locale />
	</li>
  </ul>
</nav>
