<script setup>
const route = useRoute();
const { client } = usePrismic();
const { data: document } = await useAsyncData(route.params.video, () =>
  client.getByUID("video", route.params.video)
);

const { result: recommend, get } = useAlgoliaRecommend();

onMounted(async () => {
  await get({
    queries: [
      {
        indexName: "VIDEOS",
        model: "related-products",
        objectID: document.value.uid,
        maxRecommendations: 3,
      },
    ],
  });
});

function sendEvent() {
  console.log("send event");
}
</script>

<template>
  <head>
    <title>{{ document.data.title[0].text }}</title>
  </head>
  <main class="mx-auto max-w-[1280px] my-12 px-4 lg:px-0">
    <p>
      <nuxt-link to="/" class="underline">&larr; Back to overview</nuxt-link>
    </p>

    <prismic-text
      wrapper="h1"
      class="text-4xl font-bold mb-4"
      :field="document.data.title"
    />

    <section class="mb-8">
      <button
        @click="sendEvent()"
        class="bg-slate-800 text-slate-100 hover:bg-slate-700 hover:underline uppercase font-bold py-1 px-2 rounded-md"
      >
        I like this
      </button>
    </section>
    <ul class="uppercase text-xs flex space-x-2 mb-12">
      <li
        v-for="tag in document.tags"
        class="rounded-lg px-2 py-1 bg-slate-200"
      >
        {{ tag }}
      </li>
    </ul>

    <prismic-embed
      :field="document.data.video_embed"
      class="aspect-video w-[800px] mb-12"
    />

    <prismic-rich-text :field="document.data.content" class="w-[800px] prose" />

    <section class="mt-24">
      <h2 class="text-3xl font-bold mb-4">Recommendations</h2>
      <ul
        v-if="recommend"
        class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        <li v-for="reco in recommend.results[0].hits">
          <a :href="`/videos/${reco.slug}`">
            <p class="text-xs uppercase mb-1 text-slate-700">
              Match: {{ reco._score }}%
            </p>
            <img
              :src="reco.image"
              :alt="reco.title"
              class="mb-2 aspect-video block"
              loading="lazy"
              width="1920"
              height="1080"
            />
            <p class="font-bold mb-2 text-lg">{{ reco.title }}</p>

            <ul class="uppercase text-xs flex space-x-2">
              <li
                v-for="tag in reco.tags"
                class="rounded-lg px-2 py-1 bg-slate-200"
              >
                {{ tag }}
              </li>
            </ul>
          </a>
        </li>
      </ul>
    </section>
  </main>
</template>

<style>
iframe {
  @apply aspect-video w-full h-auto block;
}
</style>
