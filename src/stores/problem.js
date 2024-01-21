import { firebaseFunctions } from 'boot/firebase';
import { httpsCallable } from 'firebase/functions';
import { sampleSize } from 'lodash';
import { defineStore } from 'pinia';
import { Loading } from 'quasar';
import { questionsList } from 'src/utils/questions';
import { computed, ref } from 'vue';

export const useProblemStore = defineStore('problem', () => {
  // State (refs)
  const challengeStarted = ref(false);
  const problemsPool = ref(sampleSize(questionsList, 5));
  const currentProblemIndex = ref(0);
  const submittedProblems = ref([]);

  // Getters (computed)
  const currentProblem = computed(() => {
    return problemsPool.value[currentProblemIndex.value];
  });

  const scoreDetails = computed(() => {
    let totalPassed = 0;
    const result = { submitted: [] };
    submittedProblems.value.forEach((submittedProblem) => {
      const upatedTestCaseResults = [];
      let passedCount = 0;
      submittedProblem.testCaseResults.forEach((result) => {
        const updatedResult = { ...result, passed: false };
        const expectedOutput = result.expectedOutput.replace(/\s+/g, '');
        const actualOutput = result.actualOutput.replace(/\s+/g, '');
        if (expectedOutput === actualOutput) {
          updatedResult.passed = true;
          passedCount++;
        }
        upatedTestCaseResults.push(updatedResult);
      });
      totalPassed += passedCount;
      result.submitted.push({
        ...submittedProblem,
        testCaseResults: upatedTestCaseResults,
        passedCount
      });
    });
    result.totalPassed = totalPassed;
    return result;
  });

  // Actions (functions)
  /**
   * Resets the problem store
   * @function $reset
   */
  function $reset() {
    challengeStarted.value = false;
    problemsPool.value = sampleSize(questionsList, 5);
    currentProblemIndex.value = 0;
    submittedProblems.value = [];
  }

  /**
   * Run code and get output(s)
   *
   * @async
   * @function runCode
   *
   * @param {Object} payload - Payload for running code
   * @param {String} payload.script - Script/ code to run
   * @param {Object[]} payload.testCases - Test cases to run code against
   * @param {String} payload.testCases[].input - Input for a single test case
   * @param {String} payload.testCases[].expectedOutput - Expected output for the test case
   */
  async function runCode({ script, testCases }) {
    Loading.show();

    // Variable to store action result
    let testCaseResults = [];

    try {
      const executeSolution = httpsCallable(
        firebaseFunctions,
        'executeSolution'
      );
      await executeSolution({
        script,
        testCases
      })
        .then((result) => {
          testCaseResults = result.data;
        })
        .catch((error) => {
          console.error(error);
        });

      return testCaseResults;
    } finally {
      Loading.hide();
    }
  }

  // return store members
  return {
    $reset,
    challengeStarted,
    problemsPool,
    currentProblemIndex,
    currentProblem,
    submittedProblems,
    scoreDetails,
    runCode
  };
});
