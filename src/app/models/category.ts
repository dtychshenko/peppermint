export type CategoryId = string;

export interface Category {
  id: CategoryId;
  name: string;
  description?: string;
  createdDateTime: Date;
  updatedDateTime: Date;
}
