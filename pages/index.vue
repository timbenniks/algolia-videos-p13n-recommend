<script lang="ts" setup>
import { simple } from "instantsearch.js/es/lib/stateMappings";
import { history } from "instantsearch.js/es/lib/routers";

const indexName = "VIDEOS";
const algolia = useAlgoliaRef();
import {
  AisInstantSearch,
  AisRefinementList,
  AisHits,
  AisClearRefinements,
  AisConfigure,
  AisSearchBox,
  AisHighlight,
} from "vue-instantsearch/vue3/es";

const routing = {
  router: history(),
  stateMapping: simple(),
};

onMounted(() => {
  window.aa("init", {
    useCookie: true,
    partial: true,
  });
});
</script>

<template>
  <ais-instant-search
    :index-name="indexName"
    :search-client="algolia"
    :insights="{
      insightsInitParams: {
        useCookie: true,
      },
    }"
    :routing="routing"
  >
    <ais-configure :hits-per-page.camel="65" />

    <div class="flex flex-col lg:flex-row p-4 mb-12">
      <div class="lg:pr-4 w-full md:w-1/6">
        <ais-search-box
          autofocus
          :class-names="{
            'ais-SearchBox': 'mb-4',
            'ais-SearchBox-input': 'border border-1 rounded-md px-2 mr-2',
          }"
          placeholder="Search videos"
        />

        <ais-refinement-list
          :sort-by="['name']"
          attribute="tags"
          class="mb-4 py-2 px-3"
          operator="and"
          :limit="15"
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
          <template v-slot:item="{ item, sendEvent }">
            <img
              :src="item.image"
              :alt="item.title"
              class="mb-2 aspect-video block"
              loading="lazy"
              width="1920"
              height="1080"
            />

            <a :href="`/videos/${item.slug}`">
              <p class="font-bold mb-2 text-lg">
                <ais-highlight :hit="item" attribute="title" />
              </p>
            </a>
            <ul class="uppercase text-xs flex space-x-2">
              <li>
                <button
                  @click="sendEvent('click', item, 'Item Starred')"
                  class="bg-slate-800 text-slate-100 hover:bg-slate-700 hover:underline uppercase text-xs font-bold px-2 py-1 rounded-lg"
                >
                  I like this
                </button>
              </li>
              <li
                v-for="tag in item.tags"
                class="rounded-lg px-2 py-1 bg-slate-200"
              >
                {{ tag }}
              </li>
            </ul>
          </template>
        </ais-hits>
      </div>
    </div>
  </ais-instant-search>
</template>
