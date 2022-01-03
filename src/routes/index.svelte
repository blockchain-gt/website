<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Newsletter, Result } from '$lib/types/prismic';

	import Prismic from '@prismicio/client';

	export const load = async ({ params }) => {
		const pagePromise = Client.getSingle('home', {});
		const newslettersPromise = Client.query(Prismic.Predicates.at('document.type', 'newsletter'), {
			pageSize: 10
		});

		const [page, newsletters] = await Promise.all([pagePromise, newslettersPromise]);

		return {
			props: {
				pageResult: page,
				newslettersResult: newsletters.results
			}
		};
	};
</script>

<script lang="ts">
	import NewsletterPreview from '$lib/NewsletterPreview.svelte';

	export let newslettersResult: Result<Newsletter>[];
</script>

<div>
	<h1 class=" text-5xl font-bold mb-1">Blockchain</h1>
	<h1 class=" text-4xl font-normal">at Georgia Tech</h1>

	<div class="my-8 ml-3 flex flex-wrap space-x-8">
		{#each newslettersResult as newsletter}
			<NewsletterPreview {newsletter} />
		{/each}
		<!-- <h2 class="page-subtitle">Newsletters</h2> -->
	</div>
	<div class="mt-4 mb-8">
		<h2 class="page-subtitle">Upcoming Events</h2>
	</div>
</div>
