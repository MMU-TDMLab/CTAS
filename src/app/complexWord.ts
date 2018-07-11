/*
* Dummy function to identify complex words in a text. Final version will do
* something a bit more interesting. For now, it just matches a precompiled
* list of phrases to the text and returns the begin + end end offsets
* according to the original text. The text is identified too as a failsafe.
* If an empty array is returned, then no complex words were found.
*/

function complexWordIdentification(text) {
  // list of "complex words"
  const complexWords = ['Hello', 'World', 'Complex Phrase'];
  // array will be populated with results.
  const results = [];
  // loop through each complex word and see if it occurs in the text
  for (let i = 0; i < complexWords.length; i++) {
    // the complex word we are checking in this iteration
    const complexWord = complexWords[i];
    // a match (will be -1 if no match is found)
    const match = text.search(complexWord);
    // if a match is found then create an object and add it to the results
    if (match !== -1) {
      // the results object
      const result = {
        begin: match,
        end: match + complexWord.length,
        text: complexWord
      };
      // add the object to the results array
      const index = results.length;
      results[index] = result;
    } // if
  } // for i
  // return the results array when done
  return results;
} // complexWordIdentification
