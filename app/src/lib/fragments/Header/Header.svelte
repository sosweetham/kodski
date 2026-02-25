<script lang="ts">
	import { enhance } from '$app/forms';
	import Dog from '$lib/components/pets/dog/Dog.svelte';
	import { LightSwitch, popup, storePopup, type DrawerSettings, getDrawerStore } from '@skeletonlabs/skeleton';
	import Icon from '@iconify/svelte';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { storeTheme } from '$lib/stores/stores';
	// Floating UI for Popups
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { themes } from '$lib/config';
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	const setTheme: SubmitFunction = ({ formData }) => {
		const theme = formData.get('theme')?.toString();
		if (theme) {
			document.body.setAttribute('data-theme', theme);
			$storeTheme = theme;
		}
	};
	const drawerStore = getDrawerStore();
	const drawerSettings: DrawerSettings = {
		position: 'left',
		width: 'w-[280px] md:w-[480px]',
		padding: 'p-4',
		rounded: 'rounded-lg'
	};
</script>

<nav
	class="card variant-glass-surface p-2 mt-7 h-12 fixed md:flex container mx-auto"
>
	<div class="pet-space absolute">
		<Dog />
	</div>
	<button
		class="btn btn-icon hamburger flex flex-col justify-evenly opacity-100 w-full sm:w-0 sm:opacity-0 transition-all duration-300"
		on:click={() => {
			drawerStore.open(drawerSettings);
		}}
	>
		<Icon icon="mdi:hamburger-menu" />
</button>
	<div
		class="justify-between items-center opacity-0 overflow-hidden sm:opacity-100 transition-all duration-300 sm:flex sm:w-full"
	>
		<div class="flex gap-4">
			<a class="btn btn-sm variant-ghost-surface" href="/" rel="noreferrer"> Home </a>
			<a class="btn btn-sm variant-ghost-surface" href="/stuff" rel="noreferrer"> Stuff </a>
			<a class="btn btn-sm variant-ghost-surface" href="/achievements" rel="noreferrer"> Achievements </a>
			<a class="btn btn-sm variant-ghost-surface" href="/publications" rel="noreferrer"> Publications </a>
		</div>
		<div class="flex gap-4 items-center">
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
		<a class="btn btn-sm variant-ghost-surface" href="/blog" rel="noreferrer">📜 Blog</a>
		</div>
	</div>
</nav>

<style lang="postcss">
	nav {
		.hamburger {
			height: 100%;
		}
		.pet-space {
				transform: translate(0, -135%);
				width: calc(100% - 16px);
			}
		left: 16px;
		transition: all 500ms cubic-bezier(0.4, 0, 0.2, 1);
		width: 48px;
		@media (min-width: 640px) {
			left: 16px;
			right: 16px;
			width: calc(100% - 32px);
			height: auto;
			display: flex;
			.pet-space {
				transform: translate(0, -135%);
				width: calc(100% - 16px);
			}
		}
		@media (min-width: 768px) {
			display: flex;
		}
		@media (min-width: 1024px) {
			display: flex;
		}
	}
</style>
