<script context="module" lang="ts">
	export async function load(stuff) {
		console.log('test', stuff);

		return {
			props: {
				name: 'World'
			}
		};
	}
</script>

<div>
	<h1 class=" text-5xl font-bold mb-1">Blockchain</h1>
	<h1 class=" text-4xl font-normal">at Georgia Tech</h1>
</div>
