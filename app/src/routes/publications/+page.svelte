<script lang="ts">
	export let data;

	function toStr(val: unknown): string {
		if (val == null) return '';
		if (typeof val === 'string') return val;
		if (typeof val === 'object' && val !== null) {
			const v = val as Record<string, unknown>;
			return (v['@value'] ?? v.value ?? '').toString();
		}
		return String(val);
	}
</script>

<ol class="breadcrumb mb-2">
	<li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>Publications</li>
</ol>

<h1 class="text-7xl mb-4">Publications</h1>

<p class="prose text-inherit mb-8">
	Research and academic publications. Full record at
	<a class="orcid-link" href="https://orcid.org/0000-0002-7870-6367" target="_blank" rel="noopener noreferrer">ORCID</a>.
</p>

{#if data.works?.length > 0}
	<ul class="list-none p-0 space-y-6">
		{#each data.works as work}
			{@const workType = toStr(work.type)}
			{@const workJournal = toStr(work.journal)}
			{@const workYear = toStr(work.year)}
			<li class="card variant-soft-surface p-4">
				<h2 class="h4 mb-2">{toStr(work.title)}</h2>
				<div class="text-sm opacity-80 space-y-1">
					{#if workType}
						<p class="capitalize">{workType.replace(/-/g, ' ')}</p>
					{/if}
					{#if workJournal}
						<p><em>{workJournal}</em></p>
					{/if}
					{#if workYear}
						<p>{workYear}</p>
					{/if}
					{#if work.doiUrl}
						<p>
							<a href={work.doiUrl} target="_blank" rel="noopener noreferrer" class="anchor">
								DOI: {toStr(work.doi) || 'Link'}
							</a>
						</p>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{:else}
	<p class="prose text-inherit">No publications found.</p>
{/if}
