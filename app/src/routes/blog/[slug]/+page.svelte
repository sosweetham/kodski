<script lang='ts'>
  import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
  export let data
</script>

<svelte:head>
  <title>{data.meta.title}</title>
  <meta property="og:type" content="article" />
  <meta property="og:title" content={data.meta.title} />
  <meta property="og:description" content={data.meta.description} />
</svelte:head>

<ol class="breadcrumb mb-2">
  <li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li class="crumb"><a class="anchor" href="/blog">Blog</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>{data.meta.title}</li>
</ol>

<article>
  <hgroup>
    <h1 class="h1 text-5xl mb-2">{data.meta.title}</h1>
    <p>Published at {(new Date(data.meta.date)).toLocaleDateString()}</p>
  </hgroup>
  <div class="flex gap-1">
    {#each data.meta.categories as category} 
      <span class="badge variant-filled">{'#' + category}</span>
    {/each}
  </div>
  <p class="mt-2 mb-3">
    {data.meta.description}
  </p>
  <hr class='my-2' />
  <div class="flex gap-16 lg:gap-24 mt-2 justify-between">
    <div class="prose text-inherit flex-1 min-w-0 max-w-3xl" use:tocCrawler={{ mode: 'generate', scrollTarget: '#page' }}>
      <svelte:component this={data.content} />
    </div>
    <aside class="hidden md:block w-56 shrink-0">
      <TableOfContents class="card sticky top-24 p-4 text-inherit max-h-[calc(100vh-8rem)] overflow-y-auto overflow-x-hidden hide-scrollbar" />
    </aside>
  </div>
</article>
