<script setup lang="ts">
import type Item from '~/model/Item'
import seed from '~/lib/SeedData'

const items = ref<Item[]>(seed)
const sortedItems = computed(() => [...items.value].sort((a, b) => b.score - a.score))
function getRank(item: Item) {
  const i = sortedItems.value.findIndex(i => i === item)
  if (i > 0 && sortedItems.value[i].score === sortedItems.value[i - 1].score)
    return i - 1
  return i
}
const showRank = (item: Item) => sortedItems.value.findIndex(i => i === item) < 3
</script>

<template lang="pug">
.flex.justify-center.bg-color
  div.w-200
    .flex.text-3xl.justify-center.my-2.font-bold SCOREBOARD
    div(v-for='item in items')
      .flex.border-b-1px.score-board-bg.text-white
        .flex.flex-grow.items-center.pl-4.text-2xl
          span {{ item.name }}
          span.ml-2(v-if='showRank(item) & item.score > 0') （第 {{ getRank(item) + 1 }} 名）
        .flex.text-3xl
          .button.p-4.bg-red(@click='item.score--') -
          .flex.w-16.justify-center.items-center {{  item.score }}
          .button.p-4.bg-green(@click='item.score++') +
</template>

<style lang="scss">
.bg-color {
  background-color: #D5D5D5;
}
.score-board-bg {
  background-color: #333333;
}
.button {
  cursor: pointer;
}
</style>
