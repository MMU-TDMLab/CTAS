import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class HighlightService {

  private hardWords = [{
    word: 'Lorem',
    definition: 'First word of the Lorem Ipsum placeholder'
  }];

  words: BehaviorSubject<{
    word: string,
    definition: string
  }[]> = new BehaviorSubject(this.hardWords);

  constructor() { }

  /**
   * Returns the definitions
   */
  getDefinitions() {
    // Transform the subject in an observable, so that it can be monitored
    return this.words.asObservable();
  }

  /**
   * Creates a new, empty definition
   */
  createDefinition(word: string) {
    // Push into the array
    this.hardWords.push({
      word,
      definition: ''
    });
    // trigger an event on the subject : everyone monitoring it will receive an event.
    this.words.next(this.hardWords);
  }

  /**
   * Edits an existing definition
   */
  editDefinition(word: string, newDef: string) {
    // Find the item, set its definition, and trigger an event
    const found = this.hardWords.find(item => item.word === word);
    found.definition = newDef;
    this.words.next(this.hardWords);
  }

  /**
   * Deletes an existing definition
   */
  deleteDefinition(word: string) {
    // Filter the array so that it only keeps the words not matching the word to delete
    this.hardWords = this.hardWords.filter(item => item.word !== word);
    this.words.next(this.hardWords);
  }

  /**
   * Gets a definition for a word
   */
  getDefinitionForWord(word: string) {
    const found = this.hardWords.find(item => item.word === word);
    return found && found.definition || '';
  }
}
