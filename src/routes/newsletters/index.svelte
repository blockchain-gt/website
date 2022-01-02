<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import linkResolver from '$lib/prismic/linkResolver';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const load = async ({ params }) => {
		const pagePromise = Client.getSingle('newsletter_home', {});
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
	export let pageResult: Result<any>;
	export let newslettersResult: Result<any>[];

	let page = pageResult.data;
	let newsletters = newslettersResult;
</script>

<div>
	<h1 class="page-title">{PrismicDOM.RichText.asText(page.title)}</h1>
	<div class="prose my-8">
		{@html PrismicDOM.RichText.asHtml(page.body)}
	</div>
	{#each newsletters as newsletter}
		<a href="/newsletters/{newsletter.uid}" class="underline text-gray-600 font-medium">
			{PrismicDOM.RichText.asText(newsletter.data.title)}
		</a>
	{/each}
</div>
