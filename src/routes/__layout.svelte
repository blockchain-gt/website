<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import Prismic from '@prismicio/client';
	import type { SidebarSection, Result } from '$lib/types/prismic';

	// similar to getStaticProps
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
</script>

<svelte:head>
	<title>{$page.url.pathname.substring(1) || 'Home'} - Blockchain at Georgia Tech</title>
</svelte:head>

<div class="flex flex-row w-full h-screen overflow-hidden">
	<div class="absolute top-0 left-0 w-screen -z-20 h-32 overflow-hidden">
		<div class="absolute bg-gradient-to-t from-white to-[#ffffff00] w-full h-full" />
		<div class="w-full h-full" id="top" />
		<!-- bg-gradient-to-t from-white to-[#ffffff00] -->
	</div>
	<div class="w-56 h-full flex-none">
		<Sidebar {sections} />
	</div>
	<div class="p-10 overflow-scroll w-full">
		<slot />
	</div>
</div>
