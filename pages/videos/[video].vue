<script setup>
import * as prismic from "@prismicio/client";
import * as prismicH from "@prismicio/helpers";

const route = useRoute();

const routes = [
  {
    type: "video",
    path: "/:uid",
  },
];

function linkResolver(doc) {
  if (doc.type === "video") {
    return `/videos/${doc.uid}`;
  }
  return null;
}

const client = prismic.createClient("timbenniks", { routes });
const result = await client.getByUID("video", route.params.video);

const document = {
  title: prismicH.asText(result.data.title),
  tags: result.tags,
  embed: result.data.video_embed.html,
  content: prismicH.asHtml(result.data.content, linkResolver),
};
</script>

<template>
  <head>
    <title>{{ document.title }}</title>
  </head>
  <main class="mx-auto max-w-[1280px] my-12 px-4 lg:px-0">
    <p>
      <nuxt-link to="/" class="underline">&larr; Back to overview</nuxt-link>
    </p>
    <h1 class="text-4xl font-bold mb-4">{{ document.title }}</h1>
    <ul class="uppercase text-xs flex space-x-2 mb-12">
      <li
        v-for="tag in document.tags"
        class="rounded-lg px-2 py-1 bg-slate-200"
      >
        {{ tag }}
      </li>
    </ul>
    <div v-html="document.embed" class="aspect-video w-[800px] mb-12" />

    <div v-html="document.content" class="w-[800px] prose" />
  </main>
</template>

<style>
iframe {
  @apply aspect-video w-full h-auto block;
}
</style>
