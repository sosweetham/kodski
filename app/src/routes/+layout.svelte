<script lang="ts">
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, Drawer, LightSwitch, initializeStores, popup } from '@skeletonlabs/skeleton';
	import Header from '$lib/fragments/Header/Header.svelte';
	import Transition from '$lib/components/Transition.svelte';
	import Icon from '@iconify/svelte';
	import { enhance } from '$app/forms';
	import { storeTheme } from '$lib/stores/stores';
	import { themes } from '$lib/config';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { page } from '$app/stores';
	import { storeFooterVisible } from '$lib/stores/stores';
	export let data
	initializeStores();
	const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();
		if (theme) {
			document.body.setAttribute('data-theme', theme);
			$storeTheme = theme;
		}
	};
</script>

<Drawer>
	<div class="flex flex-col justify-between h-full p-4">
		<div class="flex flex-col items-center gap-8 w-full">
			<div class="flex flex-col gap-4 mt-4 items-center w-full">
				<a href="/">
					<h2 class="h2">Kodski</h2>
				</a>
			</div>
			<div class="flex flex-col items-center w-full gap-4">
				<a class="btn btn-sm variant-ghost-surface" href="/" rel="noreferrer">🏡 Home </a>
				<a class="btn btn-sm variant-ghost-surface" href="/stuff" rel="noreferrer">🪀 Stuff </a>
				<a class="btn btn-sm variant-ghost-surface" href="/achievements" rel="noreferrer">🏆 Achievements </a>
				<a class="btn btn-sm variant-ghost-surface" href="/publications" rel="noreferrer">📄 Publications </a>
				<a class="btn btn-sm variant-ghost-surface" href="/blog" rel="noreferrer">📜 Blog</a>
			</div>
		</div>
			<div class="flex flex-col gap-4 items-center">
				<button
				class="btn hover:variant-soft-primary"
				use:popup={{ event: 'click', target: 'theme', closeQuery: 'a[href]' }}
				>
				<Icon icon="fa6-solid:palette" class="text-lg" />
				<span class="hidden md:inline-block">Theme</span>
				<Icon icon="fa-solid:caret-down" class="opacity-50" />
				</button>
				<!-- popup -->
				<div class="card p-4 w-60 shadow-xl" data-popup="theme">
					<div class="space-y-4">
						<section class="flex justify-between items-center">
							<h6 class="h6">Mode</h6>
							<LightSwitch />
						</section>
						<hr />
						<nav class="list-nav p-4 -m-4 max-h-64 lg:max-h-[500px] overflow-x-hidden overflow-y-auto">
							<form method="post" action="/api/v1/setTheme" use:enhance={setTheme}>
								<ul>
									<!-- , badge -->
									{#each themes as { icon, name, type }}
									<li>
										<button
										class="option w-full h-full"
										type="submit"
										name="theme"
										value={type}
										class:bg-primary-active-token={$storeTheme === type}
										>
										<span>{icon}</span>
										<span class="flex-auto text-left">{name}</span>
										<!-- {#if badge}<span class="badge variant-filled-secondary">{badge}</span>{/if} -->
									</button>
								</li>
								{/each}
							</ul>
						</form>
					</nav>
				</div>
			</div>
			</div>
	</div>
</Drawer>

<!-- App Shell -->
<AppShell regionPage="scroll-smooth">
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<!-- Page Route Content -->
	<div class="container mx-auto mt-24">
		<Transition url={data.url}>
			<slot />
		</Transition>
	</div>
	<svelte:fragment slot="pageFooter">
		{#if $page.pathname !== '/' || $storeFooterVisible}
			<div class="container mx-auto mb-2">
				<hr class="mb-2" />
				<div class="flex justify-center text-center align-center">
					I enjoyed making this, I hope you enjoyed reading it :D
				</div>
			</div>
		{/if}
	</svelte:fragment>
</AppShell>
