// import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
// import { Router } from '@angular/router';

// @Directive({
//   selector: '[appHardWordHighlight]'
// })
// export class HardWordHighlightDirective {

//   // This is the array of words that will be highlighted
//   @Input('appHardWordHighlight') words: string[];

//   // The is the HTML element containing the text to parse
//   div: HTMLElement;

//   constructor(
//     private el: ElementRef,
//     private renderer: Renderer2,
//     private router: Router
//   ) {
//     // Start by getting the HTML element
//     this.div = el.nativeElement;
//   }

//   ngOnInit() {
//     // Surround each word with spaces (avoid highlighting words in words)
//     const words: string[] = this.words
//       .map(word => ` ${word} `);

//     // Create a Regexp of the words : allows a on-line replacement in the paragraph.
//     // It will look like this : ( word1 | word2)
//     // using parenthesis captures the group : it means we will be able to reuse it.
//     // The pipe is the equivalent of a OR statement.
//     const regexpStr = '(' + words.join('|') + ')';

//     // 'gi' means : replace in all the text (g), without taking case into account (i)
//     const regexp = new RegExp(regexpStr, 'gi');

//     // get all matches in the paragraph
//     const match = this.div.innerText.match(regexp);

//     // then get all unique occurences
//     const uniqueMatch = match.filter((v, i, a) => a.indexOf(v) === i);

//     // for each match in the string (which is every hard word found)
//     for (const word of uniqueMatch) {
//       // Create an HTML element : this will allow you to create callbacks on click.
//       const link: HTMLLinkElement = this.renderer.createElement('a');

//       // Add the class (see style.css)
//       this.renderer.addClass(link, 'highlight');

//       // Set the text of the link
//       this.renderer.setProperty(link, 'innerText', word);

//       // Workaround : because we append outerHTML, events are deleted.
//       // To avoid that, we create a window method, that will be accessible with the good old onclick
//       this.renderer.setAttribute(link, 'onclick', `window.routeTo('${word.trim()}')`);

//       // Finally, replace the found words with the link
//       // (innerHTML = HTML inside the link, outerHTML = the link itself)
//       this.div.innerHTML = this.div.innerHTML.replace(word, link.outerHTML);
//     }

//     // Create the window function and bind it to our own function
//     window['routeTo'] = word => this.routeToDefinition(word);
//   }

//   routeToDefinition(word) {
//     this.router.navigate(['/definition', word]);
//   }
// }
