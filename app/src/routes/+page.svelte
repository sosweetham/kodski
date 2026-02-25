<script lang="ts">
	export let data;
	import Stylish from '$lib/components/Stylish.svelte';
	import Tech from '$lib/components/ThreeD/Tech/Tech.svelte';
	import { modeCurrent } from '@skeletonlabs/skeleton';
	import { memeBanners, technologyBanners, hiBanners, cannonBanners } from './data';
	import { storeFooterVisible } from '$lib/stores/stores';
	import anime from 'animejs';
	import { onMount, onDestroy, tick } from 'svelte';
	import GhSkyLine from '$lib/components/ThreeD/GHSkyLine/GHSkyLine.svelte';
	$: otherStuff = [
		`AlpineJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Arduino`,
		`Astro`,
		`AutoCAD-${$modeCurrent ? 'Light' : 'Dark'}`,
		`AWS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Azure-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Babel`,
		`Bash-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Blender-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Bootstrap`,
		`C`,
		`Cloudflare-${$modeCurrent ? 'Light' : 'Dark'}`,
		`CMake-${$modeCurrent ? 'Light' : 'Dark'}`,
		`CodePen-${$modeCurrent ? 'Light' : 'Dark'}`,
		`CS`,
		`CSS`,
		`D3-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Discord`,
		`DiscordBots`,
		`Django`,
		`Docker`,
		`Electron`,
		`ExpressJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`FastAPI`,
		`Fediverse-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Figma-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Flask-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Git`,
		`Github-${$modeCurrent ? 'Light' : 'Dark'}`,
		`GithubActions-${$modeCurrent ? 'Light' : 'Dark'}`,
		`GitLab-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Godot-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Grafana-${$modeCurrent ? 'Light' : 'Dark'}`,
		`GraphQL-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Heroku`,
		`HTML`,
		`Illustrator`,
		`JavaScript`,
		`Kafka`,
		`Kubernetes`,
		`LaTeX-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Linux-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Lua-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Markdown-${$modeCurrent ? 'Light' : 'Dark'}`,
		`MaterialUI-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Matlab-${$modeCurrent ? 'Light' : 'Dark'}`,
		`MongoDB`,
		`MySQL-${$modeCurrent ? 'Light' : 'Dark'}`,
		`NeoVim-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Netlify-${$modeCurrent ? 'Light' : 'Dark'}`,
		`NextJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Nginx`,
		`NodeJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Photoshop`,
		`PostgreSQL-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Postman`,
		`Powershell-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Premiere`,
		`Prisma`,
		`Prometheus`,
		`Python-${$modeCurrent ? 'Light' : 'Dark'}`,
		`RabbitMQ-${$modeCurrent ? 'Light' : 'Dark'}`,
		`RaspberryPi-${$modeCurrent ? 'Light' : 'Dark'}`,
		`React-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Redis-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Redux`,
		`Remix-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Replit-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Sass`,
		`Sequelize-${$modeCurrent ? 'Light' : 'Dark'}`,
		`SQLite`,
		`StyledComponents`,
		`Supabase-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Svelte`,
		`SVG-${$modeCurrent ? 'Light' : 'Dark'}`,
		`TailwindCSS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`ThreeJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`TypeScript`,
		`Vercel-${$modeCurrent ? 'Light' : 'Dark'}`,
		`VIM-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Vite-${$modeCurrent ? 'Light' : 'Dark'}`,
		`VSCode-${$modeCurrent ? 'Light' : 'Dark'}`,
		`VueJS-${$modeCurrent ? 'Light' : 'Dark'}`,
		`Webpack-${$modeCurrent ? 'Light' : 'Dark'}`
	];
	const randomHi = () => hiBanners[Math.floor(Math.random() * hiBanners.length)];
	const randomBanner = () => cannonBanners[Math.floor(Math.random() * cannonBanners.length)];
	const randomMemeBanner = () => memeBanners[Math.floor(Math.random() * memeBanners.length)];
	const randomTechnologyBanner = () =>
		technologyBanners[Math.floor(Math.random() * technologyBanners.length)];

	let iconsContainer: HTMLDivElement;
	let scrollContainer: HTMLDivElement;
	let showScrollIndicator = true;

	let handleResize = () => {};
	let lastScrollTop = 0;
	const handleScroll = () => {
		if (!scrollContainer) return;
		const { scrollTop, scrollHeight, clientHeight } = scrollContainer;
		const atEnd = scrollTop + clientHeight >= scrollHeight - 10;
		showScrollIndicator = !atEnd;

		// Footer: show when near bottom (150px threshold), hide as soon as user scrolls up
		const nearBottom = scrollTop + clientHeight >= scrollHeight - 150;
		const scrollingUp = scrollTop < lastScrollTop;
		lastScrollTop = scrollTop;
		if (scrollingUp || !nearBottom) {
			storeFooterVisible.set(false);
		} else {
			storeFooterVisible.set(true);
		}
	};
	let createGrid = () => {};
	let handleTileClick = (index: number, tile: HTMLDivElement) => {};

	const createTile = (index: number) => {
		const tile = document.createElement('div');
		tile.classList.add('stagger-tile');
		tile.onclick = () => handleTileClick(index, tile);
		const image = `url(/icons/${otherStuff[index]}.svg)`;
		tile.style.setProperty('background-image', image);
		return tile;
	};

	$: $modeCurrent, createGrid();

	const createTiles = (quantity: number) => {
		Array.from(Array(quantity)).map((_, index) => {
			iconsContainer.appendChild(createTile(index));
		});
	};

	onMount(async () => {
		storeFooterVisible.set(false);
		let columns = 0;
		let rows = 0;
		let count = -1;
		handleTileClick = (index: number, tile: HTMLDivElement) => {
			const grid = [columns, rows];
			count += 1;
			anime({
				targets: '.stagger-tile',
				keyframes: [
					{
						translateX: anime.stagger('-1px', { grid: grid, from: index, axis: 'x' }),
						translateY: anime.stagger('-1px', { grid: grid, from: index, axis: 'y' }),
						duration: 100
					},
					{
						translateX: anime.stagger('2px', { grid: grid, from: index, axis: 'x' }),
						translateY: anime.stagger('2px', { grid: grid, from: index, axis: 'y' }),
						scale: anime.stagger([1.1, 1], { grid: grid, from: index }),
						duration: 225
					},
					{
						translateX: 0,
						translateY: 0,
						scale: 1,
						duration: 1200
					}
				],
				delay: anime.stagger(80, { grid: grid, from: index })
			});
		};
		createGrid = () => {
			if (!iconsContainer) return;
			iconsContainer.innerHTML = '';
			const minTiles = otherStuff.length;
			const icoWidth = iconsContainer.offsetWidth || iconsContainer.parentElement?.clientWidth || 800;
			columns = Math.max(1, Math.floor(icoWidth / 100));
			rows = Math.ceil(minTiles / columns);
			iconsContainer.style.setProperty('--columns', `${columns}`);
			iconsContainer.style.setProperty('--rows', `${rows}`);
			createTiles(columns * rows);
		};
		handleResize = () => {
			createGrid();
		};
		createGrid();
		await tick();
		handleScroll();
	});

	onDestroy(() => {
		storeFooterVisible.set(true);
	});
</script>

<div
	bind:this={scrollContainer}
	on:scroll={handleScroll}
	class="container mx-auto snap-y snap-mandatory overflow-y-auto overflow-x-hidden hide-scrollbar scroll-smooth"
	style="height: calc(100dvh - 6rem)"
>
	<section class="min-h-[calc(100dvh-6rem)] flex flex-col justify-center py-16 lg:py-24 snap-start">
		<div class="lg:flex items-center">
			<div class="w-full lg:w-1/2">
				<h1 class="h1 gotham-ultra text-8xl">
					Hi
					<img
						src={`/emojis/${randomHi()}`}
						alt="Hi! banner"
						loading="lazy"
						class="inline aspect-square h-20"
					/>
				</h1>
				<h1>
					<span class="h1 gotham-ultra text-8xl" style="margin-right:1rem">I'm </span>
					<Stylish class="h1 gotham-ultra text-8xl" banner={`/images/pfps/${randomBanner()}`}>Ham!</Stylish>
				</h1>
				<div class="text-2xl relative">
					<span>I am an </span>
					<Stylish style="margin-right: 0.025em" banner="/images/dev.gif"
						>Independent Developer.</Stylish
					>
					<span
						>I am based in
						<Stylish banner="/images/auto.gif">India</Stylish>
						and also an graduate in</span
					>
					<Stylish banner="/images/arduino.gif"
						>Electronics & Communications Engineering.</Stylish
					>
				</div>
				<div class="prose text-inherit mb-20">
					<svelte:component this={data.content} />
				</div>
			</div>
			<div class="lg:w-1/2 h-full hidden lg:flex justify-center flex-col gap-4">
				<GhSkyLine />
				<h1 class="h1 text-center w-full">
					GitHub SkyLine
				</h1>
			</div>
		</div>
	</section>
	<section class="min-h-[calc(100dvh-6rem)] flex flex-wrap lg:flex-nowrap gap-12 lg:gap-16 py-16 lg:py-24 snap-start items-center">
		<div class="w-full lg:w-1/2 lg:h-full">
			<div class="flex gap-2 flex-wrap text-center justify-center md:justify-start">
				<Stylish
					class="gotham-ultra text-5xl"
					banner={`/images/technology_memes/${randomTechnologyBanner()}`}
				>
					Tech
				</Stylish>
				<span class="gotham-ultra text-5xl"> I Like to Use...</span>
			</div>
			<div class="text-2xl flex relative mt-10 flex-wrap justify-center">
				<Tech class="md:w-1/3 sm:w-1/2" model="/models/svelteLogo.glb" />
				<Tech class="md:w-1/3 sm:w-1/2" model="/models/magicaVoxel.glb" />
				<Tech class="md:w-1/3 sm:w-1/2" model="/models/blenderLogo.glb" />
				<Tech
					class="md:w-1/3 sm:w-1/2"
					model="/models/asepriteLogo.glb"
					clickModel="/models/asepriteLogoPat.glb"
					hoverModel="/models/asepriteLogoBlush.glb"
				/>
			</div>
		</div>
		<div class="w-full lg:w-1/2 lg:h-full">
			<div class="flex gap-2 flex-wrap text-center justify-center md:justify-start">
				<Stylish
					class="gotham-ultra text-5xl"
					banner={`/images/programming_memes/${randomMemeBanner()}`}
				>
					Langs
				</Stylish>
				<span class="gotham-ultra text-5xl"> I Like to Use...</span>
			</div>
			<div class="text-2xl flex relative mt-10 flex-wrap justify-center">
				<Tech class="md:w-1/3 sm:w-1/2" model="/models/CLogo.glb" />
				<Tech class="md:w-1/3 sm:w-1/2" model="/models/CSharpLogo.glb" />
				<Tech class="md:w-1/3 sm:w-1/2" model="/models/PythonLogo.glb" />
				<Tech class="md:w-1/3 sm:w-1/2" model="/models/TSLogo.glb" />
			</div>
		</div>
	</section>
	<section class="min-h-[calc(100dvh-6rem)] w-full snap-start flex flex-col justify-center py-16 lg:py-24">
		<div class="flex flex-col justify-center items-center w-full">
			<div class="flex gap-2 justify-center w-full flex-wrap text-center">
				<span class="gotham-ultra text-5xl">Some other </span>
				<Stylish
					class="gotham-ultra text-5xl"
					banner={`/images/programming_memes/${randomMemeBanner()}`}
				>
					Things
				</Stylish>
				<span class="gotham-ultra text-5xl"> I have used... </span>
			</div>
			<div class="flex relative w-full mt-8 mb-12 px-4 custom-stagger" bind:this={iconsContainer} />
		</div>
	</section>
</div>

{#if showScrollIndicator}
	<div
		class="fixed bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-surface-500-600 dark:text-surface-400-500 animate-bounce pointer-events-none z-50"
		aria-hidden="true"
	>
		<span class="text-xs font-medium">Scroll for more</span>
		<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<path d="M12 5v14M19 12l-7 7-7-7" />
		</svg>
	</div>
{/if}

<svelte:window on:resize={handleResize} />

<style lang="postcss">
	.custom-stagger {
		display: grid;
		grid-template-columns: repeat(var(--columns), 1fr);
		grid-template-rows: repeat(var(--rows), 1fr);
	}

	:global(.stagger-tile) {
		width: calc(100% - 5px);
		height: 90px;
		margin-top: 5px;
		background-size: contain;
		background-repeat: no-repeat;
		background-position: center;
	}
</style>
