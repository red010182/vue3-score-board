<script setup lang="ts">
import type Item from '~/model/Item'
import seed from '~/lib/SeedData'

const items = ref<Item[]>(seed)
const sortedItems = computed(() => [...items.value].sort((a, b) => b.score - a.score))
const getRank = (item: Item) => [...new Set(sortedItems.value.map(i => i.score))].findIndex(score => score === item.score) + 1
const showRank = (item: Item) => getRank(item) < 4 && item.score > 0
const isTop1 = (item: Item) => getRank(item) === 1 && item.score > 0
</script>

<template lang="pug">
.flex.justify-center.bg-color
  .w-200.noselect
    .flex.text-3xl.justify-center.my-2.font-bold SCOREBOARD
    div(v-for='item in items')
      .flex.border-b-1px.score-board-bg.text-white
        .flex.flex-grow.items-center.pl-4.text-2xl
          span {{ item.name }}
          span.ml-2(v-if='showRank(item)') （第 {{ getRank(item) }} 名）
          .i-icon-park-twotone-crown-three.text-yellow(v-if='isTop1(item)')
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
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
}
</style>
