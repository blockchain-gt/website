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
	<!-- <form
		accept-charset="UTF-8"
		action="https://www.formbackend.com/f/9455bd56a7ceca80"
		method="POST"
	>
		<div class="grid grid-cols-1 gap-6 max-w-md">
			<label class="block">
				<span class="text-gray-700">Full Name</span>
				<input
					type="text"
					id="name"
					name="name"
					class="mt-1 block w-full placeholder:text-gray-400 font-light"
					placeholder="Satoshi Nakamoto"
				/>
			</label>
			<label class="block">
				<span class="text-gray-700">Email Address</span>
				<input
					type="text"
					id="email"
					name="email"
					class="mt-1 block w-full placeholder:text-gray-400 font-light"
					placeholder="satoshi@nakamoto.com"
				/>
			</label>
			<label class="block">
				<span class="text-gray-700">Message</span>
				<textarea id="message" name="message" class="mt-1 block w-full" rows="3" />
			</label>
			<button class="p-4 bg-gray-100 rounded-sm">Submit</button>
		</div>
	</form> -->
</div>
