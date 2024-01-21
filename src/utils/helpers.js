export const generateEditorCode = (funcName, paramString) => {
  return `function ${funcName}(${paramString}) {
  // Write code here
  // REMEMBER to remove all console.log statements before submitting
}

/**
 * DO NOT TOUCH CODE BELOW THIS
 * Leave the code below this comment as is to be able to test your solution
 */

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});


rl.question('', answer => {
  const result = ${funcName}(...JSON.parse('[' + answer + ']'));
  const stringifiedResult = result === undefined ? 'undefined' : JSON.stringify(result);
  process.stdout.write(stringifiedResult);
  rl.close();
});

rl.on('close', () => process.exit(0));
`;
};
