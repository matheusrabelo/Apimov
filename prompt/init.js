import readlineSync from 'readline-sync';

export default () => {
  // Wait for user's response.
  var userName = readlineSync.question('May I have your name? ');
  console.log('Hi ' + userName + '!');

  // Handle the secret text (e.g. password).
  var favFood = readlineSync.question('What is your favorite food? ', {
    hideEchoBack: true // The typed text on screen is hidden by `*` (default).
  });
  console.log('Oh, ' + userName + ' loves ' + favFood + '!');
};
