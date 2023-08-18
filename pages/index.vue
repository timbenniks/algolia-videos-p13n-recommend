<script lang="ts" setup>
const indexName = "VIDEOS";
const algolia = useAlgoliaRef();
import {
  AisInstantSearch,
  AisRefinementList,
  AisHits,
  AisClearRefinements,
  AisConfigure,
} from "vue-instantsearch/vue3/es";
</script>

<template>
  <ais-instant-search :index-name="indexName" :search-client="algolia">
    <ais-configure :hits-per-page.camel="65" />

    <div class="flex flex-col lg:flex-row p-4 mb-12">
      <div class="lg:pr-4 w-full md:w-1/6">
        <ais-refinement-list
          :sort-by="['name']"
          attribute="tags"
          class="mb-4 py-2 px-3"
          :class-names="{
            'ais-RefinementList-item': 'mb-1',
            'ais-RefinementList-checkbox': 'mr-2',
            'ais-RefinementList-label': 'w-full flex',
            'ais-RefinementList-count': 'ml-auto',
          }"
        />
        <ais-clear-refinements class="mb-2 text-sm" />
      </div>
      <div class="lg:pl-4 w-full md:w-5/6">
        <ais-hits
          :class-names="{
            'ais-Hits-list':
              'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3',
          }"
        >
          <template v-slot:item="{ item }">
            <a :href="`/videos/${item.slug}`">
              <img :src="item.image" :alt="item.title" class="mb-2" />
              <p class="font-bold mb-2 text-lg">{{ item.title }}</p>
              <ul class="uppercase text-xs flex space-x-2">
                <li
                  v-for="tag in item.tags"
                  class="rounded-lg px-2 py-1 bg-slate-200"
                >
                  {{ tag }}
                </li>
              </ul>
            </a>
          </template>
        </ais-hits>
      </div>
    </div>
  </ais-instant-search>
</template>
