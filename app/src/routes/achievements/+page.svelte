<script lang="ts">
	export let data;

	const kindLabels: Record<string, string> = {
		employment: 'Employment',
		education: 'Education',
		distinction: 'Award / Distinction',
		'invited-position': 'Invited Position',
		membership: 'Membership',
		qualification: 'Qualification',
		service: 'Service'
	};

	function formatDateRange(item: {
		kind: string;
		startYear?: string;
		startMonth?: string;
		endYear?: string;
		endMonth?: string;
	}): string {
		const start = item.startYear
			? item.startMonth
				? `${item.startYear}-${String(item.startMonth).padStart(2, '0')}`
				: item.startYear
			: '';
		if (!start) return '';
		// Distinctions/awards are single-date (no end date), not a range
		if (item.kind === 'distinction') return start;
		const end = item.endYear
			? item.endMonth
				? `${item.endYear}-${String(item.endMonth).padStart(2, '0')}`
				: item.endYear
			: 'Present';
		return `${start} – ${end}`;
	}

	function formatLocation(item: { city?: string; region?: string; country?: string }): string {
		const parts = [item.city, item.region, item.country].filter(Boolean);
		return parts.join(', ');
	}
</script>

<ol class="breadcrumb mb-2">
	<li class="crumb"><a class="anchor" href="/">Home</a></li>
	<li class="crumb-separator" aria-hidden>&rsaquo;</li>
	<li>Achievements</li>
</ol>

<h1 class="text-7xl mb-4">Achievements</h1>

<p class="prose text-inherit mb-8">
	Professional activities from
	<a class="orcid-link" href="https://orcid.org/0000-0002-7870-6367" target="_blank" rel="noopener noreferrer">ORCID</a>.
</p>

{#if data.activities?.length > 0}
	<ul class="list-none p-0 space-y-6">
		{#each data.activities as item}
			<li class="card variant-soft-surface p-4">
				<div class="flex flex-wrap gap-2 items-center mb-2">
					<span class="badge variant-filled-primary text-xs">
						{kindLabels[item.kind] ?? item.kind}
					</span>
					{#if item.startYear || item.endYear}
						<span class="text-sm opacity-80">{formatDateRange(item)}</span>
					{/if}
				</div>
				<h2 class="h4 mb-1">{item.roleTitle}</h2>
				{#if item.department}
					<p class="text-sm opacity-90 mb-1">{item.department}</p>
				{/if}
				<p class="font-medium">{item.organization}</p>
				{#if formatLocation(item)}
					<p class="text-sm opacity-80">{formatLocation(item)}</p>
				{/if}
				{#if item.url}
					<p class="mt-2">
						<a href={item.url} target="_blank" rel="noopener noreferrer" class="anchor text-sm">
							View details →
						</a>
					</p>
				{/if}
			</li>
		{/each}
	</ul>
{:else}
	<p class="prose text-inherit">No professional activities found.</p>
{/if}
