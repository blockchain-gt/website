<script context="module" lang="ts">
	import Client from '$lib/prismic/client';
	import type { Newsletter, Result } from '$lib/types/prismic';

	import PrismicDOM from 'prismic-dom';
	import Prismic from '@prismicio/client';

	export const load = async ({ params }) => {
		const pagePromise = Client.getSingle('home', {
			fetchLinks:
				'sponsors.name, sponsors.link, sponsors.image_light_mode, sponsors.image_dark_mode'
		});

		const newslettersPromise = Client.query(Prismic.Predicates.at('document.type', 'newsletter'), {
			pageSize: 2,
			orderings: '[document.first_publication_date desc]'
		});
		const eventsPromise = Client.query(Prismic.Predicates.at('document.type', 'event'), {
			pageSize: 10,
			orderings: '[my.event.date desc]'
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
				eventsResult: events.results
					.filter((event) => {
						return PrismicDOM.Date(event.data.date).getTime() > Date.now();
					})
					.reverse()
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
	export let pageResult: Result<{ sponsors: any[] }>;
	console.log(pageResult);
</script>

<div>
	<h1 class=" text-5xl font-bold mb-1">Blockchain</h1>
	<h1 class=" text-4xl font-normal">at Georgia Tech</h1>

	{#if newslettersResult.length}
		<div class="my-8 flex flex-wrap gap-2">
			{#each newslettersResult as newsletter}
				<div class="m-0 md:m-4 md:mt-0">
					<NewsletterPreview {newsletter} />
				</div>
			{/each}
		</div>
	{/if}
	{#if eventsResult.length}
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
	{/if}
	<div class="mt-4 mb-8">
		<h2 class="page-subtitle">Crypto 101 Course</h2>
		<a href="/crypto-class-fall-2022">
			<div
				class="overflow-hidden mt-4 shadow-md hover:shadow-xl dark:bg-gray-800 md:h-56 transition-shadow ml-4 duration-500 cursor-pointer rounded-lg flex flex-row max-w-screen-md"
			>
				<div class="image overflow-hidden w-60 flex-none hidden md:block object-cover">
					<img src="/logo-raw.jpeg" class="object-cover h-full" alt="" />
				</div>
				<div class="p-6 flex flex-col justify-between">
					<div>
						<h4 class="font-semibold text-primary text-lg">Crypto Fundamentals Course</h4>
						<p class="text-sm">
							Interested in learning more about blockchain technology, crypto, and web3? Blockchain
							at Georgia Tech has created an 8 week fundamentals course that will prepare you to
							start your crypto journey
						</p>
					</div>
					<div class="my-8 md:my-0 hidden md:inline">
						{#each tags as tag}
							<span
								class="p-2 px-4 bg-blue-100 text-blue-900 dark:bg-gray-900 font-medium text-sm rounded-[4px] mr-2"
							>
								{tag}
							</span>
						{/each}
					</div>
				</div>
			</div>
		</a>
	</div>
	<div class="mt-4 mb-8">
		<h2 class="page-subtitle">Partners</h2>
		<div class="grid grid-cols-1 md:grid-cols-3 gap-5 mt-3 ml-4">
			{#each pageResult.data?.sponsors || [] as sponsor}
				<a
					class="flex flex-col items-center justify-center rounded-md dark:bg-gray-800 fun-shadow bg-white h-40"
					href={sponsor.sponsor.data?.link.url}
					target="_blank"
				>
					<img
						src={sponsor.sponsor.data.image_light_mode?.url}
						class="only-on-light-mode "
						alt="Sponsor logo"
					/>
					<img
						src={sponsor.sponsor.data.image_dark_mode?.url}
						class="only-on-dark-mode "
						alt="Sponsor logo"
					/>
				</a>
			{/each}
		</div>
	</div>
</div>
