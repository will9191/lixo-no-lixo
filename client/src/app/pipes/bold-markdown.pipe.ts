import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boldMarkdown',
})
export class BoldMarkdownPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

     // 1. Negrito com **texto**
    let formatted = value.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

    // 2. Títulos automáticos: "1. Texto:" ou "- Texto:"
    let firstTitleMatched = false;
    formatted = formatted.replace(
      /^(\s*(?:\d+\.\s|- )[^:]+):/gm,
      (_, match) => {
        if (!firstTitleMatched) {
          firstTitleMatched = true;
          return `<strong>${match}</strong>:<br>`;
        }
        return `<br><strong>${match}</strong>:<br>`;
      }
    );

    // 3. Itens com "* Texto"
    let firstBulletMatched = false;
    formatted = formatted.replace(
      /^\*\s*(.*)/gm,
      (_, item) => {
        if (!firstBulletMatched) {
          firstBulletMatched = true;
          return `${item}`; // sem <br> no primeiro
        }
        return `<br>${item}`; // com <br> nos demais
      }
    );


    return formatted;
  }
}
