import { Directive, ElementRef, Input, Renderer2, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HighlightService } from '../highlight/highlight.service';

@Directive({
  selector: '[appHardWordHighlight]'
})
export class HardWordHighlightDirective implements OnInit {

  // The list of words to highlight
  // tslint:disable-next-line:no-input-rename
  @Input('appHardWordHighlight') words: {
    word: string,
    definition: string
  }[];

  // The bunch of text to search in
  private paragraph: HTMLElement;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    private highlightService: HighlightService
  ) {
    setTimeout(() => {
      // Store the HTML paragraph to work on it
      this.paragraph = el.nativeElement;
    }, 200);
  }

  ngOnInit() {
    // trigger the function of that directive
    this.highlightWords();

    // Bind an event to the window (see below)
    window['propagateWordEvent'] = (word) => {
      this.highlightService.wordChange.next(word);
    };
  }

  highlightWords() {
    // For each item in the list of hard words
    for (const item of this.words) {
      // Create a span element
      const span: HTMLSpanElement = this.renderer.createElement('span');
      // Add an highlight class
      this.renderer.addClass(span, 'highlight');
      // Set its content to the hard word
      this.renderer.setProperty(span, 'innerText', item.word);
      // Set the title to the definition (hover over the word to see it)
      this.renderer.setProperty(span, 'title', item.definition);
      // tslint:disable-next-line:max-line-length
      // Workaround : because we append already compiled code to a paragraph, we need to be able to call the function. To do that, we can bind a function to the window.
      this.renderer.setAttribute(span, 'onclick', `window.routeTo('${item.word}')`);
      // replace the hard word with the enriched span (innerHTML = HTML inside the span, outerHTML = the span itself)
      // A Regexp is used to replace every occurence of the word in the paragraph.
      this.paragraph.innerHTML = this.paragraph.innerHTML
        .replace(new RegExp(item.word, 'g'), span.outerHTML);
    }
  }
}
