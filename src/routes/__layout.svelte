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
	import { fade } from 'svelte/transition';

	let ParticlesComponent;
	let scrollY;
	let showParticles = true;
	$: {
		if (typeof window !== 'undefined' && scrollY > window.innerHeight / 4) {
			showParticles = false;
		} else showParticles = true;
	}

	onMount(async () => {
		const module = await import('svelte-particles');

		ParticlesComponent = module.default;
	});

	let particlesConfig = {
		particles: {
			number: {
				value: 60
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
</script>

<svelte:window bind:scrollY />

<svelte:head>
	<title>{$page.url.pathname.substring(1) || 'Home'} - Blockchain at Georgia Tech</title>
	<script src="https://kit.fontawesome.com/e2f8d7b5d6.js" crossorigin="anonymous"></script>
</svelte:head>

<div class="flex flex-row w-full max-w-screen-xl mx-auto h-29">
	<div class="absolute top-0 left-0 w-screen -z-20 h-screen !overflow-hidden min-w-0">
		<div class="absolute z-50 w-full h-screen flex flex-col">
			<div class=" flex-none bg-gradient-to-t from-white to-[#ffffff00] h-32 w-full " />
			<div class=" flex-grow bg-white" />
		</div>
		{#if showParticles && ($page.url.pathname === '/' || $page.url.pathname.includes('/newsletters/'))}
			<div
				transition:fade={{ duration: 500 }}
				class="absolute w-full h-full min-w-0 !overflow-hidden -z-50"
			>
				<svelte:component this={ParticlesComponent} id="tsparticles" options={particlesConfig} />
			</div>
		{/if}
		<!-- bg-gradient-to-t from-white to-[#ffffff00] -->
	</div>
	<!-- <div class="w-56 h-full flex-none fixed">
		<Sidebar {sections} />
	</div> -->
	<div class="p-10 pt-16 w-full ml-56">
		<slot />
	</div>
</div>
