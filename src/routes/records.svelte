<script lang="ts">
	import records from '$lib/data/records.json';
</script>

<svelte:head>
	<title>Records</title>
</svelte:head>

<article class="grid grid-cols-3 md:grid-cols-4 gap-1">
	{#each records as record}
		{@const info = record['basic_information']}
		{@const artist = info['artists'][0]}
		{@const fullName = `${artist.name} ${info.title}`}
		{@const discogsUrl = `https://www.discogs.com/release/${info.id}`}
		{#if info.thumb}
			<a href={discogsUrl}>
				<img src={info.cover_image} alt={fullName} lazy={true} />
			</a>
		{/if}
	{/each}
</article>
