export const questionsList = [
  {
    title: 'Advanced Array Sort',
    statement: `Create a function that takes in an array of <span class="prominent">numbers or strings</span> and returns an array with the items from the original array stored in <span class="prominent">subarrays</span>. Items of the same value should be in the same subarray.`,
    rules: [
      `The subarrays should be returned in the order of each element's first appearance in the given array.`
    ],
    illustrations: null,
    examples: [
      { input: '[2, 1, 2, 1]', output: '[[2, 2], [1, 1]]' },
      { input: '[5, 4, 5, 5, 4, 3]', output: '[[5, 5, 5], [4, 4], [3]]' },
      {
        input: '["b", "a", "b", "a", "c"]',
        output: '[["b", "b"], ["a", "a"], ["c"]]'
      }
    ],
    notes: [
      `The input array can contain a mixture of both numbers or strings.`
    ],
    funcName: 'advancedSort',
    paramString: 'arr',
    testCases: [
      { input: '[1,2,1,2]', expectedOutput: '[[1,1],[2,2]]' },
      { input: '[5,5,4,3,4,4]', expectedOutput: '[[5,5],[4,4,4],[3]]' },
      { input: '[2,1,2,1]', expectedOutput: '[[2,2],[1,1]]' },
      {
        input: '["c","c","b","c","b",1,1]',
        expectedOutput: '[["c","c","c"],["b","b"],[1,1]]'
      },
      {
        input: '[1234,1235,1234,1235,1236,1235]',
        expectedOutput: '[[1234,1234],[1235,1235,1235],[1236]]'
      }
    ]
  },
  {
    title: 'Cats and a Mouse',
    statement: `Two cats and a mouse are at various positions on a line. You will be given their starting positions. Your task is to determine which cat will reach the mouse first, assuming the mouse does not move and the cats travel at equal speed. If the cats arrive at the same time, the mouse will be allowed to move and it will escape while they fight.<br/>You are given the input in the form of <span class="prominent">x, y, and z</span> representing the respective positions for cats A and B, and for mouse C. Complete the function to return the appropriate answer`,
    rules: [
      `If cat A catches the mouse first, return Cat A.`,
      `If cat B catches the mouse first, return Cat B.`,
      `If both cats reach the mouse at the same time, return Mouse C as the two cats fight and mouse escapes.`
    ],
    illustrations: null,
    examples: [
      { input: '2, 5, 4', output: 'Cat B' },
      { input: '1, 2, 3', output: 'Cat B' },
      { input: '1, 3, 2', output: 'Mouse C' }
    ],
    notes: null,
    funcName: 'catAndMouse',
    paramString: 'x, y, z',
    testCases: [
      { input: '3, 6, 8', expectedOutput: 'Cat B' },
      { input: '1, 5, 3', expectedOutput: 'Mouse C' },
      { input: '5, 6, 1', expectedOutput: 'Cat A' },
      { input: '1, 9, 3', expectedOutput: 'Cat A' },
      { input: '4, 4, 8', expectedOutput: 'Mouse C' }
    ]
  },
  {
    title: 'Less or Equal',
    statement: `Given an array of integers arr and an integer k, find the lowest positive integer x so that <span class="prominent">exactly k elements of the given array are less than or equal to x.</span> Return null if the condition does not match.`,
    rules: null,
    illustrations: [
      {
        sample: `([3, 7, 6, 1, 10, 3, 20], 2) ➞ null`,
        explanation: `// 1, 3 = 2 elements <br/>// Not possible to return 3 because we have another 3 in the array`
      },
      { sample: '([10, 15, 20, 25], 0) ➞ 1', explanation: `// k = 0` }
    ],
    examples: [
      { input: '[3, 7, 6, 1, 10, 3, 20], 4', output: '6' },
      { input: '[3, 7, 6, 1, 10, 3, 20], 2', output: 'null' },
      { input: '[10, 15, 20, 25], 0', output: '1' }
    ],
    notes: [
      `All numbers of the given array and k will be ≥ 0.`,
      `Understanding the description of this challenge is the hardest part.`
    ],
    funcName: 'lessEqual',
    paramString: 'arr, k',
    testCases: [
      { input: '[3, 7, 6, 1, 10, 3, 20], 4', expectedOutput: '6' },
      { input: '[1, 1, 2, 3, 4], 1', expectedOutput: 'null' },
      { input: '[3, 7, 5, 1, 10, 3, 20], 4', expectedOutput: '5' },
      { input: '[1], 0', expectedOutput: 'null' },
      { input: '[3, 4, 5, 6, 7], 0', expectedOutput: '1' }
    ]
  },
  {
    title: 'Double Palindromes',
    statement: `Strings can be segregated into both their letter and digit components. You are given an array of strings. Write a function that maps <span class="prominent">double palindromes</span> to the number <span class="prominent">2, single palindromes</span> to the number <span class="prominent">1</span>, and everything else to the number <span class="prominent">0</span>.`,
    rules: [
      `A <span class="prominent">double palindrome</span> is when a string's letter component and digit component are both palindromes.`,
      `A <span class="prominent">single-palindrome</span> is when either (but <span class="prominent">not both</span>) the letter component or the digit component are palindromes.`
    ],
    illustrations: [
      {
        sample: `"cab97ac79" // double-palindrome`,
        explanation: `// "cabac" and "9779" are both palindromes.`
      },
      {
        sample: `"1abc4de1" // single-palindrome`,
        explanation: `// "141" is a palindrome.`
      }
    ],
    examples: [
      {
        input: '["cb77c", "ccc888", "ccc789", "abc89"]',
        output: '[2, 2, 1, 0]'
      },
      { input: '["789", "555", "ccc", "abba"]', output: '[0, 1, 1, 1]' },
      { input: '["7a", "5f", "6c"]', output: '[2, 2, 2]' }
    ],
    notes: [
      `If a string is composed of only letters or only numbers, it can be at most a single palindrome (see example #2).`,
      `All single character components are trivially palindromes (see example #3).`,
      `All letters will be lower cased.`
    ],
    funcName: 'palindromeSet',
    paramString: 'arr',
    testCases: [
      {
        input: '["18a99b89cc881ba", "p7o8p987", "p7o", "p7o8"]',
        expectedOutput: '[1, 2, 1, 0]'
      },
      { input: '["87ab", "15fc", "26cd"]', expectedOutput: '[0, 0, 0]' },
      { input: '[""]', expectedOutput: '[0]' },
      {
        input: '["ab9a", "abba", "aa78bb8bbaa7", "a88a"]',
        expectedOutput: '[2, 1, 2, 2]'
      },
      { input: '["7ab", "5fc", "6cd"]', expectedOutput: '[1, 1, 1]' }
    ]
  },
  {
    title: 'Balanced Words',
    statement: `We can assign a value to each character in a word, based on their position in the alphabet (a = 1, b = 2, ... , z = 26). A <span class="prominent">balanced word</span> is one where the sum of values on the left-hand side of the word equals the sum of values on the right-hand side. For odd length words, the middle character (balance point) is ignored.<br/>Write a function that returns true if the word is balanced, and false if it's not.`,
    rules: null,
    illustrations: [
      {
        sample: `balanced("zips") ➞ true`,
        explanation: `// "zips" = "zi|ps" = 26+9|16+19 = 35|35 = true`
      },
      {
        sample: `balanced("brake") ➞ false`,
        explanation: `// "brake" = "br|ke" = 2+18|11+5 = 20|16 = false`
      }
    ],
    examples: [
      { input: '"vegetation"', output: 'true' },
      { input: '"clever"', output: 'false' },
      { input: '"baseball"', output: 'true' }
    ],
    notes: [
      `All words will be lowercase, and have a minimum of 2 characters.`,
      `Palindromic words will always be balanced.`
    ],
    funcName: 'balanced',
    paramString: 'str',
    testCases: [
      { input: '"disillusioned"', expectedOutput: 'false' },
      { input: '"abstract"', expectedOutput: 'true' },
      { input: '"fossil"', expectedOutput: 'true' },
      { input: '"dolphin"', expectedOutput: 'true' },
      { input: '"immense"', expectedOutput: 'false' }
    ]
  },
  {
    title: 'Calculate Depth of Array',
    statement: `Given an array, write a function to calculate it's depth. Assume that a normal array has a depth of 1.`,
    rules: null,
    illustrations: null,
    examples: [
      { input: '[1, [2, 3, 4]]', output: '2' },
      { input: '[1, 2, 3, 4]', output: '1' },
      { input: '[1, [2, [3, [4]]]]', output: '4' }
    ],
    notes: null,
    funcName: 'depth',
    paramString: 'arr',
    testCases: [
      { input: '[1, 2, 3, 4, [[5]], [6], 7]', expectedOutput: '3' },
      { input: '[1, [2, [3, [4]]], 4]', expectedOutput: '4' },
      { input: '[1, [2], 3, [4], 5, [6]]', expectedOutput: '2' },
      { input: '[1, 2, 3, 4]', expectedOutput: '1' },
      { input: '[1, [2, [3, 4]]]', expectedOutput: '3' }
    ]
  },
  {
    title: 'Sort by Frequency',
    statement: `Create a function that takes an array of integers <span class="highlight">arr</span> and sort the elements of the array by <span class="prominent">decreasing frequency</span> of the elements. If two elements have the same frequency, sort them by <span class="prominent">increasing</span> value.`,
    rules: null,
    illustrations: null,
    examples: [
      {
        input: '[2, 3, 5, 3, 7, 9, 5, 3, 7]',
        output: '[3, 3, 3, 5, 5, 7, 7, 2, 9]'
      },
      {
        input: '[4, 4, 2, 5, 1, 1, 3, 3, 2, 8]',
        output: '[1, 1, 2, 2, 3, 3, 4, 4, 5, 8]'
      },
      {
        input: '[1, 2, 3, 0, 5, 0, 1, 6, 8, 8, 6, 9, 1]',
        output: '[1, 1, 1, 0, 0, 6, 6, 8, 8, 2, 3, 5, 9]'
      }
    ],
    notes: [`All input numbers will be between 0-9.`],
    funcName: 'sortFreq',
    paramString: 'arr',
    testCases: [
      {
        input: '[2, 3, 5, 3, 7, 9, 5, 3, 7]',
        expectedOutput: '[3, 3, 3, 5, 5, 7, 7, 2, 9]'
      },
      {
        input: '[1, 2, 3, 0, 5, 0, 1, 6, 8, 8, 6, 9, 1]',
        expectedOutput: '[1, 1, 1, 0, 0, 6, 6, 8, 8, 2, 3, 5, 9]'
      },
      {
        input: '[5, 9, 6, 9, 6, 5, 9, 9, 4, 4]',
        expectedOutput: '[9, 9, 9, 9, 4, 4, 5, 5, 6, 6]'
      },
      {
        input: '[4, 4, 2, 5, 1, 1, 3, 3, 2, 8]',
        expectedOutput: '[1, 1, 2, 2, 3, 3, 4, 4, 5, 8]'
      },
      {
        input: '[4, 9, 5, 0, 7, 3, 8, 4, 9, 0]',
        expectedOutput: '[0, 0, 4, 4, 9, 9, 3, 5, 7, 8]'
      }
    ]
  },
  {
    title: 'Length of a Nested Array',
    statement: `The <span class="highlight">.length</span> property on an array will return the number of elements in the array. Suppose we instead wanted to know the <span class="prominent">total number of non-nested items</span> in the nested array. Write a function that returns the total number of non-nested items in a nested array.`,
    rules: null,
    illustrations: [
      {
        sample: `getLength([1, [2, 3]]) --> ➞ 3`,
        explanation: `// 2 elements, number 1 and array [2, 3] <br/>// 3 non-nested items, 1, 2 and 3`
      }
    ],
    examples: [
      { input: '[1, [2, [3, 4]]]', output: '4' },
      { input: '[1, [2, [3, [4, [5, 6]]]]]', output: '6' },
      { input: '[1, [2], 1, [2], 1]', output: '5' }
    ],
    notes: [`An empty array should return 0.`],
    funcName: 'getLength',
    paramString: 'arr',
    testCases: [
      { input: '[2, [3], 4, [7]]', expectedOutput: '4' },
      { input: '[2, [3, [5, 7]], 4, [7]]', expectedOutput: '6' },
      { input: '[2, [3, [4, [5]]], [9]]', expectedOutput: '5' },
      { input: '[]', expectedOutput: '0' },
      { input: '[2]', expectedOutput: '1' }
    ]
  },
  {
    title: 'Working 9 to 5',
    statement: `Write a function that calculates overtime and pay associated with overtime. Your function gets an array with 4 values - <span class="prominent">Start of working day</span> (in decimal format, 24-hour day notation), <span class="prominent">End of working day</span> (same format), <span class="prominent">Hourly rate</span>, and <span class="prominent">Overtime multiplier</span>. Your function should return: <span class="highlight">$</span> + earned that day (rounded to the nearest hundreth).`,
    rules: [`Working 9 to 5: regular hours`, `After 5pm is overtime`],
    illustrations: [
      {
        sample: `overTime([16, 18, 30, 1.8]) ➞ "$84.00"`,
        explanation: `// From 16 to 17 is regular, so 1 * 30 = 30 <br/>// From 17 to 18 is overtime, so 1 * 30 * 1.8 = 54 <br/>// 30 + 54 = $84.00`
      }
    ],
    examples: [
      { input: '[9, 17, 30, 1.5]', output: '$240.00' },
      { input: '[13.25, 15, 30, 1.5]', output: '$52.50' }
    ],
    notes: null,
    funcName: 'overTime',
    paramString: 'arr',
    testCases: [
      { input: '[18, 20, 32.5, 2]', expectedOutput: '$130.00' },
      { input: '[9, 18, 40, 2]', expectedOutput: '$400.00' },
      { input: '[13, 20, 32.5, 2]', expectedOutput: '$325.00' },
      { input: '[13, 21, 38.6, 1.8]', expectedOutput: '$432.32' },
      { input: '[10.5, 17, 32.25, 1.5]', expectedOutput: '$209.63' }
    ]
  },
  {
    title: 'Numbers in Strings',
    statement: `Create a function that takes an array of strings and returns an array with only the strings that have numbers in them. If there are no strings containing numbers, return an empty array.`,
    rules: null,
    illustrations: null,
    examples: [
      { input: '["1a", "a", "2b", "b"]', output: '["1a", "2b"]' },
      { input: '["abc", "abc10"]', output: '["abc10"]' },
      { input: '["this is a test", "test1"]', output: '["test1"]' }
    ],
    notes: null,
    funcName: 'numInStr',
    paramString: 'arr',
    testCases: [
      { input: '["-/>", "10bc", "abc "]', expectedOutput: '["10bc"]' },
      { input: '["1", "a", " ", "b"]', expectedOutput: '["1"]' },
      { input: '["rct", "ABC", "Test", "XyZ"]', expectedOutput: '[]' },
      { input: '["abc", "abc10"]', expectedOutput: '["abc10"]' },
      {
        input: '["this IS","10xYZ", "xy2K77", "Z1K2W0", "xYz"]',
        expectedOutput: '["10xYZ", "xy2K77", "Z1K2W0"]'
      }
    ]
  }
];
