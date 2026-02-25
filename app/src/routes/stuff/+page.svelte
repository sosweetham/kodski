<script lang="ts">
  export let data
</script>

<ol class="breadcrumb mb-2">
	<li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>Stuff</li>
</ol>

<main class="prose text-inherit mb-2">
  <svelte:component this={data.content} />
</main>