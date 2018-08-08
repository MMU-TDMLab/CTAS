/**
 * DocWord is the interface that is required to be used for every time that DocWord gets used.
 * This would mean that DocWord requires a Word, Annotation and a document_id in order to be used/created.
 * This model will help guide whoever is coding this further from generating more errors.
 */
export interface DocWord {
  _id?: string;
  word: string;
  annotation: string;
  document_id: string;
}
