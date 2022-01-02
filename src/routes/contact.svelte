<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import linkResolver from '$lib/prismic/linkResolver';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';

	export const load = async ({ params }) => {
		const page = await Client.getSingle('contact', {});

		return {
			props: {
				pageResult: page
			}
		};
	};
</script>

<script lang="ts">
	export let pageResult: Result<any>;
	let page = pageResult.data;
</script>

<div>
	<h1 class="page-title">{PrismicDOM.RichText.asText(page.title)}</h1>
	<div class="prose my-8">
		{@html PrismicDOM.RichText.asHtml(page.body)}
	</div>
	<form action="" on:submit|preventDefault>
		<input type="text" /> <br />
		<button class="p-4 bg-gray-200">Submit</button>
	</form>
</div>
