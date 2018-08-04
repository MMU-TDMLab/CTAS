/**
 * ComplexWord is the interface that is required to be used for every time that ComplexWord gets used.
 * This would mean that ComplexWord requires a Word and an Annotation in order to be used/created.
 * This model will help guide whoever is coding this further from generating more errors.
 */
export interface ComplexWord {
  // id: string;
  word: string;
  annotation: string;
}
