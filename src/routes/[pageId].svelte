<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';

	export const load = async ({ params }) => {
		const page = await Client.getByUID('page', params.pageId, {});

		return {
			props: {
				pageResult: page
			}
		};
	};
</script>

<script lang="ts">
	export let pageResult: Result<any>;
	$: page = pageResult ? pageResult.data : {};
</script>

<div>
	{#if page}
		<h1 class="page-title">{PrismicDOM.RichText.asText(page.title)}</h1>
		<div class="prose my-8">
			{@html PrismicDOM.RichText.asHtml(page.content)}
		</div>
		<!-- <pre>{JSON.stringify(page, null, 2)}</pre> -->
	{/if}
</div>
