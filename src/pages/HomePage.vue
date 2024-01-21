<template>
  <q-page class="column flex-center bg-grey-2">
    <div class="column flex-center q-gutter-y-xl">
      <img class="banner-img" src="/img/home_banner.svg" />
      <q-btn
        v-if="!problemStore.challengeStarted"
        class="full-width text-h6 text-weight-medium"
        :to="{ name: 'solve' }"
        color="secondary"
        label="Start Coding Challenge"
        no-caps
      />
      <template v-else>
        <q-btn
          v-if="problemStore.submittedProblems.length < 5"
          class="full-width text-h6 text-weight-medium"
          :to="{ name: 'solve' }"
          color="secondary"
          label="Continue Coding Challenge"
          no-caps
        />
        <template v-else>
          <q-btn
            class="full-width text-h6 text-weight-medium"
            :to="{ name: 'results' }"
            color="secondary"
            label="See Challenge Results"
            no-caps
          />
          <q-btn
            class="full-width text-h6 text-weight-medium"
            :to="{ name: 'solve' }"
            color="primary"
            label="Restart Coding Challenge"
            no-caps
            @click="onChallengeRestart"
          />
        </template>
      </template>
    </div>
  </q-page>
</template>

<script setup>
  import { useProblemStore } from 'stores/problem';

  const problemStore = useProblemStore();

  const onChallengeRestart = (e, go) => {
    e.preventDefault();
    problemStore.$reset();
    go();
  };
</script>

<style lang="scss" scoped>
  .banner-img {
    max-width: 420px;
  }
</style>
