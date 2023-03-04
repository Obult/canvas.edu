<script>
		import { _ } from 'svelte-i18n'
	import Locale from './Locale.svelte';
</script>

<nav
  aria-label="Site Nav"
  class=" flex w-full items-center justify-between p-4"
>
  <a
    href="/"
    class="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-black"
  >
    <!-- <span class="sr-only">Logo</span> -->
    <img src="/images/Codam.svg" class="m-1 p-1 hover:scale-95 transition-all" alt="" srcset="">
  </a>

  <ul class="flex items-center gap-2 text-sm font-medium text-gray-500">
    <!-- <li class="hidden lg:block">
      <a class="rounded-lg px-3 py-2" href="/"> Home </a>
    </li> -->

    <li><a class="rounded-lg px-3 py-2" href="/"> {$_('header.canvas')} </a></li>

    <li>
      <a
        class="inline-flex items-center gap-2 rounded-lg px-3 py-2"
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
