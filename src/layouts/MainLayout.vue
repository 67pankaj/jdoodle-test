<template>
  <q-layout view="hHh Lpr lff">
    <AppHeader />

    <q-drawer
      v-model="leftDrawerOpen"
      class="bg-grey-2"
      :width="480"
      elevated
      show-if-above
    >
      <div
        class="problem-container full-height relative-position column no-wrap"
      >
        <QuestionDisplay v-bind="currentProblem" />
        <q-space />
        <div
          class="problem-controls row q-pa-md bg-grey-3 shadow-up-4 q-gutter-x-md"
        >
          <q-btn
            class="col text-subtitle2 text-weight-medium"
            color="blue-grey-6"
            icon="fa-solid fa-arrows-rotate"
            label="Reset Editor"
            no-caps
            @click="onResetEditor"
          />
          <q-btn
            class="col text-subtitle2 text-weight-medium"
            color="secondary"
            icon-right="fa-solid fa-hand-point-right"
            label="Next Problem"
            no-caps
            @click="onNextProblem"
          />
        </div>
      </div>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import AppHeader from 'components/AppHeader.vue';
  import QuestionDisplay from 'components/QuestionDisplay.vue';
  import { useQuasar } from 'quasar';
  import { useProblemStore } from 'stores/problem';
  import { computed, inject, ref } from 'vue';

  const bus = inject('bus');
  const $q = useQuasar();

  const problemStore = useProblemStore();

  const leftDrawerOpen = ref(false);

  const currentProblem = computed(() => {
    return JSON.parse(JSON.stringify(problemStore.currentProblem));
  });

  const onResetEditor = () => {
    $q.dialog({
      title: 'Confirm reset?',
      message: 'You will lose all your changes for the current problem.',
      ok: {
        color: 'secondary',
        noCaps: true
      },
      cancel: {
        outline: true,
        color: 'negative',
        noCaps: true
      },
      persistent: true
    }).onOk(() => {
      bus.emit('resetEditor');
    });
  };

  const onNextProblem = () => {
    bus.emit('nextProblem');
  };
</script>

<style lang="scss" scoped>
  .problem-container {
    .problem-controls {
      position: sticky;
      right: 0;
      bottom: 0;
      left: 0;
    }
  }
</style>
