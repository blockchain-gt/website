<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Newsletter, Result } from '$lib/types/prismic';

	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const load = async ({ params }) => {
		const pagePromise = Client.getSingle('home', {});
		const newslettersPromise = Client.query(Prismic.Predicates.at('document.type', 'newsletter'), {
			pageSize: 10
		});
		const eventsPromise = Client.query(Prismic.Predicates.at('document.type', 'event'), {
			pageSize: 10
		});

		const [page, newsletters, events] = await Promise.all([
			pagePromise,
			newslettersPromise,
			eventsPromise
		]);

		return {
			props: {
				pageResult: page,
				newslettersResult: newsletters.results,
				eventsResult: events.results.filter(
					(event) => PrismicDOM.Date(event.data.date).getTime() > Date.now()
				)
			}
		};
	};
</script>

<script lang="ts">
	import NewsletterPreview from '$lib/NewsletterPreview.svelte';
	import type { Event } from '$lib/types/prismic';
	import EventPreview from '$lib/EventPreview.svelte';

	export let newslettersResult: Result<Newsletter>[];
	export let eventsResult: Result<Event>[];
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
		<div class="flex flex-row flex-wrap space-x-8 mt-4 mb-8">
			{#each eventsResult as upcomingEvent}
				<EventPreview event={upcomingEvent.data} uid={upcomingEvent.uid} />
			{/each}
		</div>
	</div>
	<div class="mt-4 mb-8">
		<h2 class="page-subtitle">Our Course</h2>
		<a href="/crypto-course">
			<div
				class="mt-4 shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer rounded-lg flex flex-row max-w-screen-md"
			>
				<div class="image">
					<img src="" alt="" />
				</div>
				<div class="p-6">
					<h4 class="font-semibold text-primary text-lg">Crypto Fundamentals Course</h4>
					<p>
						Interested in learning more about blockchain technology, crypto, and web3? Blockchain at
						Georgia Tech as created a 10 week fundamentals course that will prepare you to start you
						crypto journey
					</p>
				</div>
			</div>
		</a>
	</div>
	<!-- <div class="mt-4 mb-8">
		<h2 class="page-subtitle">Our Services</h2>
		<div class="grid grid-cols-2 gap-8 mt-4 mb-8">
			<div
				class="shadow-md p-8 rounded-lg hover:shadow-xl ease-in transition-shadow cursor-pointer"
			>
				<h3 class=" text-primary text-xl font-semibold mb-2">For Students</h3>
				<p class=" leading-snug">
					Our services lorem ipsum dolor sit amte lorem ipsum dolor sit amtelorem ipsum dolor sit
					amtelorem ipsum dolor sit amte
				</p>
			</div>
			<div
				class="shadow-md p-8 rounded-lg hover:shadow-xl ease-in transition-shadow cursor-pointer"
			>
				<h3 class="text-primary text-xl font-semibold mb-2">For Companies</h3>
				<p class="leading-snug">
					Our services lorem ipsum dolor sit amte lorem ipsum dolor sit amtelorem ipsum dolor sit
					amtelorem ipsum dolor sit amte
				</p>
			</div>
		</div>
	</div> -->
	<!-- <div class="mt-4 mb-8">
		<h2 class="page-subtitle">Upcoming Events</h2>
		<div class="flex flex-row flex-wrap space-x-8 mt-4 mb-8" />
	</div> -->
</div>

<!-- THINGS TO FIX: Author, date, overlap issue with particles -->
