<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import Prismic from '@prismicio/client';
	import type { SidebarSection, Result } from '$lib/types/prismic';

	export const load = async () => {
		const sections = await Client.query(Prismic.Predicates.at('document.type', 'sidebar'), {
			pageSize: 10
		});

		return {
			props: {
				sections: sections.results as Result<SidebarSection>[]
			}
		};
	};
</script>

<script lang="ts">
	import '../app.css';
	import Sidebar from '$lib/Sidebar.svelte';
	import { page } from '$app/stores';

	export let sections: Result<SidebarSection>[];

	import { onMount } from 'svelte';
	import { fade, fly } from 'svelte/transition';

	let ParticlesComponent;

	onMount(async () => {
		const module = await import('svelte-particles');

		if (window.innerWidth < 600) {
			particlesConfig.particles.number.value = 50;
		}
		ParticlesComponent = module.default;
	});

	let particlesConfig = {
		particles: {
			number: {
				value: 100
			},
			color: {
				value: '#182552'
			},
			links: {
				enable: true,
				color: '#182552'
			},
			move: {
				enable: true,
				out_mode: 'out',
				speed: 0.5
			}
		}
	};

	let scrollY;
	let showParticles = true;
	$: {
		if (typeof window !== 'undefined' && scrollY > 192) {
			showParticles = false;
			console.log('dont show');
		} else showParticles = true;
	}

	let menuOpen = false;

	function titleCase(str) {
		str = str.toLowerCase().split(' ');
		for (var i = 0; i < str.length; i++) {
			str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
		}
		return str.join(' ');
	}
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>{titleCase($page.url.pathname.substring(1)) || 'Home'} - Blockchain at Georgia Tech</title>
	<script src="https://kit.fontawesome.com/e2f8d7b5d6.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="md:flex md:flex-row w-full max-w-screen-xl mx-auto h-29">
	<div class="absolute top-0 left-0 w-screen -z-20 h-screen !overflow-hidden min-w-0">
		<div class="absolute z-50 w-full h-screen flex flex-col">
			<div id="gradient-div" class=" flex-none bg-gradient-to-t from-white to-[#ffffff00] w-full" />
			<div class=" flex-grow bg-white" />
		</div>
		{#if showParticles}
			<div class="absolute w-full h-full min-w-0 !overflow-hidden -z-50">
				<svelte:component this={ParticlesComponent} id="tsparticles" options={particlesConfig} />
			</div>
		{/if}
	</div>
	<div class="w-56 h-full hidden md:block flex-none md:fixed">
		<Sidebar {sections} />
	</div>
	<div class="w-full fixed block md:hidden p-4 opacity-30" on:click={() => (menuOpen = !menuOpen)}>
		<svg
			version="1.1"
			id="Capa_1"
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			x="0px"
			y="0px"
			width="20px"
			viewBox="0 0 283.426 283.426"
			style="enable-background:new 0 0 283.426 283.426;"
			xml:space="preserve"
		>
			<g>
				<rect x="0" y="40.84" style="fill:#010002;" width="283.426" height="42.735" />
				<rect x="0" y="117.282" style="fill:#010002;" width="283.426" height="42.735" />
				<rect x="0" y="194.851" style="fill:#010002;" width="283.426" height="42.735" />
			</g>
		</svg>
	</div>
	{#if menuOpen}
		<div
			class="h-screen w-[90vw] bg-gray-100 z-50 fixed"
			transition:fly={{ delay: 250, duration: 100, x: -1 * window.innerWidth, y: 0, opacity: 0.5 }}
		>
			<Sidebar {sections} />
		</div>
	{/if}

	<div
		class="opacity-0 bg-black w-screen h-screen fixed -z-10 transition-all"
		class:opacity-50={menuOpen}
	/>
	<div class="p-10 pt-16 w-full md:ml-56">
		<slot />
	</div>
</div>
