<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Result } from '$lib/types/prismic';
	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';
	import { dataset_dev } from 'svelte/internal';

	export const load = async ({ params }) => {
		const pagePromise = await Client.getByUID('page', 'about', {});

		const teamPromise = await Client.getSingle('people', {
			fetchLinks: 'person.image, person.bio, person.name'
		});

		const [page, team] = await Promise.all([pagePromise, teamPromise]);

		return {
			props: {
				pageResult: page,
				team: team.data.people
			}
		};
	};
</script>

<script lang="ts">
	export let pageResult: Result<any>;
	export let team: any[];
	$: page = pageResult ? pageResult.data : {};
</script>

<div>
	{#if page}
		<h1 class="page-title">{PrismicDOM.RichText.asText(page.title)}</h1>
		<div class="prose my-8">
			{@html PrismicDOM.RichText.asHtml(page.content)}
		</div>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-16 mt-20 px-4">
			{#each team as person}
				<!-- {JSON.stringify(person.person)} -->
				<div>
					<div class="flex flex-row justify-center">
						<img
							class="rounded-full w-2/3 aspect-square object-cover bg-gray-200"
							src={person.person.data.image.url}
							alt={''}
						/>
					</div>
					<h2 class="font-bold text-2xl mt-4 mb-0">
						{PrismicDOM.RichText.asText(person.person.data.name)}
					</h2>
					{PrismicDOM.RichText.asText(person.person.data.bio)}
				</div>
			{/each}
		</div>
	{/if}
</div>
