<template>
  <div class="">
    <!-- question container -->
    <div class="q-pa-md q-gutter-y-lg text-grey-9">
      <!-- title -->
      <div class="text-h6 text-weight-thick text-dark">{{ title }}</div>

      <!-- statement -->
      <p class="" v-html="statement"></p>

      <!-- rules -->
      <div v-if="rules" class="ques-segment">
        <div
          class="ques-segment-title text-subtitle1 text-weight-thick text-dark"
        >
          Rules:
        </div>
        <ol class="q-my-sm q-pl-lg">
          <li
            v-for="(rule, ruleIndex) in rules"
            :key="`rule-${ruleIndex}`"
            v-html="rule"
          ></li>
        </ol>
      </div>

      <!-- illustrations -->
      <div v-if="illustrations" class="ques-segment">
        <div
          class="ques-segment-title text-subtitle1 text-weight-thick text-dark q-pb-xs"
        >
          Illustrations:
        </div>
        <div class="boxed shadow-1 q-mt-xs q-col-gutter-y-sm">
          <div
            v-for="(illustration, illustrationIndex) in illustrations"
            :key="`rule-${illustrationIndex}`"
            class="text-weight-light q-pb-sm"
          >
            <div class="text-weight-medium text-dark">
              {{ illustration.sample }}
            </div>
            <div v-html="illustration.explanation"></div>
          </div>
        </div>
      </div>

      <!-- examples -->
      <div class="ques-segment">
        <div
          class="ques-segment-title text-subtitle1 text-weight-thick text-dark q-pb-xs"
        >
          Examples:
        </div>
        <div class="boxed shadow-1 q-mt-xs q-col-gutter-y-sm">
          <div
            v-for="(example, exampleIndex) in examples"
            :key="`rule-${exampleIndex}`"
            class="text-weight-light q-pb-sm"
          >
            <div>
              <span class="text-weight-thick text-dark">Input: </span>&nbsp;{{
                example.input
              }}
            </div>
            <div>
              <span class="text-weight-thick text-dark">Output: </span>&nbsp;{{
                example.output
              }}
            </div>
          </div>
        </div>
      </div>

      <!-- notes -->
      <div v-if="notes" class="ques-segment">
        <div
          class="ques-segment-title text-subtitle1 text-weight-thick text-dark"
        >
          Notes:
        </div>
        <ul class="q-my-sm q-pl-lg">
          <li v-for="(note, noteIndex) in notes" :key="`rule-${noteIndex}`">
            {{ note }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
  defineProps({
    title: {
      type: String,
      required: true
    },
    statement: {
      type: String,
      required: true
    },
    rules: {
      type: Array,
      required: false
    },
    illustrations: {
      type: Array,
      required: false
    },
    examples: {
      type: Array,
      required: true
    },
    notes: {
      type: Array,
      required: false
    }
  });
</script>

<style lang="scss" scoped>
  :deep(.prominent) {
    color: $dark;
    font-weight: map-get($text-weights, 'bold');
  }
  :deep(.highlight) {
    border: 1px solid $grey-6;
    // border-radius: map-get($flex-gutter, 'xs');
    background-color: $grey-4;
    padding-right: 2px;
    padding-left: 2px;
    font-weight: map-get($text-weights, 'medium');
  }

  .ques-segment {
    &-title {
      text-decoration-line: underline;
      text-decoration-style: solid;
      text-underline-offset: 3px;
    }
    .boxed {
      border-left: 4px solid $secondary;
      border-radius: map-get($flex-gutter, 'xs');
      background-color: $grey-3;
      padding: 0 8px;
    }
  }
</style>
