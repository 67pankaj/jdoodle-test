<template>
  <q-page class="problems-page relative-position column q-pa-md">
    <div class="editor-container col-grow row">
      <q-card
        class="editor-wrapper col-grow bg-grey-3 relative-position rounded-borders-sm"
        bordered
      >
        <v-ace-editor
          v-model:value="editorContent"
          class="absolute-full"
          :options="{
            useWorker: true,
            enableBasicAutocompletion: true,
            enableSnippets: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false
          }"
          lang="javascript"
          theme="chrome"
          @init="editorInit"
        />
      </q-card>
    </div>
    <q-page-sticky
      class="page-actions bg-grey-2 q-pa-md shadow-up-4"
      expand
      position="bottom"
    >
      <div class="col-grow row no-wrap">
        <div
          class="test-cases-container shadow-1 col-grow row no-wrap rounded-borders-sm overflow-hidden"
        >
          <!-- test input container  -->
          <div class="col-6 column no-wrap">
            <div
              class="q-pa-sm bg-grey-4 text-subtitle2 text-weight-thick text-dark"
            >
              Test Input
            </div>
            <q-separator color="grey-5" />
            <div class="col-grow row relative-position overflow-hidden">
              <q-input
                v-model="sampleInput"
                class="col-grow absolute-full"
                borderless
                input-class="sample-input resize-none"
                type="textarea"
              />
            </div>
          </div>

          <q-separator color="grey-5" vertical />

          <!-- test input container  -->
          <div class="col-grow column no-wrap">
            <div
              class="q-pa-sm bg-grey-4 text-subtitle2 text-weight-thick text-dark"
            >
              Test Output
            </div>
            <q-separator color="grey-5" />
            <div class="relative-position col">
              <q-scroll-area
                class="absolute-full q-pa-sm"
                :thumb-style="{
                  right: '3px',
                  borderRadius: '3px',
                  width: '3px',
                  opacity: 0.5
                }"
              >
                {{ sampleOutput }}
              </q-scroll-area>
            </div>
          </div>
        </div>
        <div class="code-runner-container col-grow column no-wrap q-pl-md">
          <div class="col row flex-center text-h4 text-weight-light">
            Problem:
            <span class="q-ml-md text-h3 text-weight-light"
              >{{ problemStore.currentProblemIndex + 1 }} / 5</span
            >
          </div>
          <div class="row items-end justify-end q-gutter-x-lg">
            <q-btn
              class="col"
              color="blue-grey-6"
              label="Run code"
              no-caps
              padding="2px 16px"
              @click="handleRun"
            />
            <q-btn
              class="col"
              color="secondary"
              label="Submit"
              no-caps
              padding="2px 16px"
              @click="handleSubmit"
            />
          </div>
        </div>
      </div>
    </q-page-sticky>
  </q-page>
</template>

<script setup>
  import 'config/ace';
  import { useQuasar } from 'quasar';
  import { generateEditorCode } from 'src/utils/helpers';
  import { useProblemStore } from 'stores/problem';
  import { computed, inject, onMounted, onUnmounted, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { VAceEditor } from 'vue3-ace-editor';

  const $q = useQuasar();
  const router = useRouter();
  const problemStore = useProblemStore();
  const bus = inject('bus');

  const currentProblem = computed(() => {
    return JSON.parse(JSON.stringify(problemStore.currentProblem));
  });

  const editorContent = ref(
    generateEditorCode(
      currentProblem.value.funcName,
      currentProblem.value.paramString
    )
  );
  const sampleInput = ref(currentProblem.value.examples[0].input);
  const sampleOutput = ref('');

  const editorInit = () => {};

  const handleRun = async () => {
    sampleOutput.value = 'Compiling...';
    const script = editorContent.value;
    const testCases = [{ input: sampleInput.value, expectedOutput: undefined }];
    const testCaseResults = await problemStore.runCode({ script, testCases });
    const { actualOutput } = testCaseResults[0] || {};
    sampleOutput.value = actualOutput;
  };
  const handleSubmit = async () => {
    bus.emit('nextProblem', false);
  };

  const handleNextProblem = async () => {
    const script = editorContent.value;
    const { testCases } = currentProblem.value;
    const testCaseResults = await problemStore.runCode({ script, testCases });
    problemStore.$patch((state) => {
      state.submittedProblems.push({
        ...currentProblem.value,
        testCaseResults
      });
    });
    if (problemStore.currentProblemIndex < 4) {
      const nextIndex = ++problemStore.currentProblemIndex;
      problemStore.$patch({
        currentProblemIndex: nextIndex
      });
      bus.emit('resetEditor');
    } else {
      router.push({ name: 'results' });
    }
  };

  onMounted(() => {
    problemStore.$patch({ challengeStarted: true });
    bus.on('resetEditor', () => {
      const { funcName, paramString } = currentProblem.value;
      editorContent.value = generateEditorCode(funcName, paramString);
      sampleInput.value = currentProblem.value.examples[0].input;
      sampleOutput.value = '';
    });
    bus.on('nextProblem', async (needConfirm = true) => {
      if (needConfirm) {
        $q.dialog({
          title: 'Confirm submit?',
          message: 'Moving to next problem will submit the current problem.',
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
          handleNextProblem();
        });
      } else {
        handleNextProblem();
      }
    });
  });

  onUnmounted(() => {
    bus.off('resetEditor');
    bus.off('nextProblem');
  });
</script>

<style lang="scss" scoped>
  .problems-page {
    padding-bottom: 192px;
  }
  .page-actions {
    z-index: 10;
  }
  .editor-container {
    .editor-wrapper {
      min-height: 420px;
    }
  }
  .test-cases-container {
    border: 1px solid $grey-5;
    // max-width: 640px;
    height: 150px;
    :deep(.sample-input) {
      padding: 8px !important;
    }
  }
  .code-runner-container {
    min-width: 240px;
    max-width: 320px;
  }
</style>
