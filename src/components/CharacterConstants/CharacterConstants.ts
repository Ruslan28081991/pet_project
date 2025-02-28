export interface ICharacter {
  id: number;
  name: string;
  status: string;
  species: string;
}

export const fields: string[] = ['name', 'status', 'species'];

export type TModal = {
  initialText: string;
  onSave: (newText: string) => void;
  onCancel: () => void;
}
