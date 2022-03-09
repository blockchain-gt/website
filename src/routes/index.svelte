<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Newsletter, Result } from '$lib/types/prismic';

	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const load = async ({ params }) => {
		const pagePromise = Client.getSingle('home', {});
		const newslettersPromise = Client.query(Prismic.Predicates.at('document.type', 'newsletter'), {
			pageSize: 2
		});
		const eventsPromise = Client.query(Prismic.Predicates.at('document.type', 'event'), {
			pageSize: 10,
			orderings: '[my.event.date]'
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
	const tags = ['Basics', 'NFTs', 'Web3', 'Defi'];
	import NewsletterPreview from '$lib/NewsletterPreview.svelte';
	import type { Event } from '$lib/types/prismic';
	import EventPreview from '$lib/EventPreview.svelte';

	export let newslettersResult: Result<Newsletter>[];
	export let eventsResult: Result<Event>[];
</script>

<div>
	<h1 class=" text-5xl font-bold mb-1">Blockchain</h1>
	<h1 class=" text-4xl font-normal">at Georgia Tech</h1>

	<div class="my-8 flex flex-wrap gap-2">
		{#each newslettersResult as newsletter}
			<div class="m-4 mt-0">
				<NewsletterPreview {newsletter} />
			</div>
		{/each}
		<!-- <h2 class="page-subtitle">Newsletters</h2> -->
	</div>
	<div class="mt-4 mb-8">
		<h2 class="page-subtitle">Upcoming Events</h2>
		<div class="flex flex-row flex-wrap mt-4 mb-8">
			{#each eventsResult as upcomingEvent}
				<div class="m-4 mt-0">
					<EventPreview event={upcomingEvent.data} uid={upcomingEvent.uid} />
				</div>
			{/each}
		</div>
	</div>
	<div class="mt-4 mb-8">
		<h2 class="page-subtitle">Our Course</h2>
		<a href="/crypto-course">
			<div
				class="overflow-hidden mt-4 shadow-md hover:shadow-xl h-56 transition-all ml-4 duration-500 cursor-pointer rounded-lg flex flex-row max-w-screen-md"
			>
				<div class="image overflow-hidden w-60 flex-none hidden md:block object-cover">
					<img src="/blockchain.jpg" class="object-cover h-full" alt="" />
				</div>
				<div class="p-6 flex flex-col justify-between">
					<div>
						<h4 class="font-semibold text-primary text-lg">Crypto Fundamentals Course</h4>
						<p class="text-sm">
							Interested in learning more about blockchain technology, crypto, and web3? Blockchain
							at Georgia Tech has created a 10 week fundamentals course that will prepare you to
							start your crypto journey
						</p>
					</div>
					<div>
						{#each tags as tag}
							<span
								class="p-2 px-4 bg-blue-100 text-blue-900 font-medium text-sm rounded-[4px] mr-2"
							>
								{tag}
							</span>
						{/each}
					</div>
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
