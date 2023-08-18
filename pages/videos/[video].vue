<script setup>
const route = useRoute();
const { client } = usePrismic();
const { data: document } = await useAsyncData(route.params.video, () =>
  client.getByUID("video", route.params.video)
);
</script>

<template>
  <head>
    <title>{{ document.data.title }}</title>
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
  </main>
</template>

<style>
iframe {
  @apply aspect-video w-full h-auto block;
}
</style>
