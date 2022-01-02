<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import Prismic from '@prismicio/client';
	import type { SidebarSection, Result } from '$lib/types/prismic';

	// similar to getStaticProps
	export const load = async () => {
		const sections = await Client.query(Prismic.Predicates.at('document.type', 'sidebar'), {
			pageSize: 10
		});

		console.log(sections.results);

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

	export let sections: Result<SidebarSection>[];
</script>

<div class="flex flex-row w-full h-screen overflow-hidden">
	<div class="w-56 h-full flex-none">
		<Sidebar {sections} />
	</div>
	<div class="p-10 overflow-scroll w-full">
		<slot />
	</div>
</div>
