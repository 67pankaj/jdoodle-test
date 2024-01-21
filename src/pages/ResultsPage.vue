<template>
  <q-page class="flex justify-center bg-grey-2 text-grey-9">
    <div
      v-if="
        !problemStore.challengeStarted ||
        problemStore.submittedProblems.length < 5
      "
      class="column flex-center q-gutter-y-lg"
    >
      <img class="banner-img" src="/img/home_banner.svg" />
      <div
        v-if="!problemStore.challengeStarted"
        class="text-h5 text-weight-medium"
      >
        <div class="q-pb-lg">You have not yet started the challenge</div>
        <q-btn
          class="full-width text-h6 text-weight-medium"
          :to="{ name: 'solve' }"
          color="secondary"
          label="Start Coding Challenge"
          no-caps
        />
      </div>
      <template v-else>
        <div
          v-if="problemStore.submittedProblems.length < 5"
          class="text-h5 text-weight-medium"
        >
          <div class="q-pb-lg">You have not yet completed the challenge</div>
          <q-btn
            class="full-width text-h6 text-weight-medium"
            :to="{ name: 'solve' }"
            color="secondary"
            label="Continue Coding Challenge"
            no-caps
          />
        </div>
      </template>
    </div>
    <div v-else class="q-pa-lg column items-center q-gutter-y-lg">
      <div class="text-h4 text-weight-bold">Your Score</div>
      <q-circular-progress
        class="text-grey-8 q-ma-md"
        :thickness="0.2"
        :value="scorePercent"
        color="warning"
        show-value
        size="90px"
        track-color="grey-4"
      >
        <span class="text-h6 text-weight-thick">{{ scorePercent }}%</span>
      </q-circular-progress>

      <div class="text-subtitle1 text-weight-medium text-grey-8">
        {{ totalPassedTestCases }} out of 25 Test cases passed
      </div>

      <q-btn
        class="text-h6 text-weight-medium"
        :to="{ name: 'solve' }"
        color="primary"
        label="Retake Challenge"
        no-caps
        @click="onRetakeChallenge"
      />

      <!-- problem submission details -->
      <div class="submitted-solutions column q-gutter-y-md">
        <q-expansion-item
          v-for="(solution, solutionIndex) in submittedSolutions"
          :key="`solution-${solutionIndex}`"
          class="rounded-borders-sm overflow-hidden shadow-2"
          :caption="`${solution.passedCount} of 5 passed`"
          :label="solution.title"
          expand-separator
          header-class="bg-blue-grey-2 text-subtitle1 text-weight-thick"
          icon="fa-solid fa-code"
        >
          <q-card class="bg-grey-2" flat>
            <q-card-section class="q-gutter-y-sm q-mt-none">
              <div
                v-for="(
                  caseResult, caseResultIndex
                ) in solution.testCaseResults"
                :key="`solution-${solutionIndex}-case-${caseResultIndex}`"
                class="boxed shadow-1 q-pa-sm text-weight-light column"
                :class="[caseResult.passed ? 'boxed--pased' : 'boxed--failed']"
              >
                <div>
                  <span class="text-weight-thick text-dark">Input: </span
                  >&nbsp;{{ caseResult.input }}
                </div>
                <div>
                  <span class="text-weight-thick text-dark"
                    >Expected Output: </span
                  >&nbsp;{{ caseResult.expectedOutput }}
                </div>
                <div class="row" style="max-width: 640px">
                  <span class="text-weight-thick text-dark"
                    >Actual Output: </span
                  >&nbsp;<span class="col ellipsis">{{
                    caseResult.actualOutput
                  }}</span>
                </div>
              </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </div>
    </div>
  </q-page>
</template>

<script setup>
  import { useProblemStore } from 'stores/problem';
  import { computed } from 'vue';

  const problemStore = useProblemStore();

  const scorePercent = computed(() => {
    return (problemStore.scoreDetails.totalPassed / 25) * 100;
  });

  const totalPassedTestCases = computed(() => {
    return problemStore.scoreDetails?.totalPassed || 0;
  });

  const submittedSolutions = computed(() => {
    return problemStore.scoreDetails?.submitted || [];
  });

  const onRetakeChallenge = (e, go) => {
    e.preventDefault();
    problemStore.$reset();
    go();
  };
</script>

<style lang="scss" scoped>
  .banner-img {
    max-width: 320px;
  }
  .submitted-solutions {
    min-width: 640px;
    max-width: 720px;
  }
  .boxed {
    border-left-width: 4px;
    border-left-style: solid;
    border-radius: map-get($flex-gutter, 'xs');
    background-color: $grey-3;
    &--passed {
      border-left-color: $red;
    }
    &--failed {
      border-left-color: $negative;
    }
  }
</style>
