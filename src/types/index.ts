export * from "./store";

export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC",
}

export interface Dog {
  id: string;
  img: string;
  name: string;
  age: number;
  zip_code: string;
  breed: string;
  isFavourite: boolean;
}

export interface ResponseSearchDog {
  total: number;
  resultIds: Array<string>;
  next: string;
}

export type ResponseFetchDog = {
  ids: Array<string>;
  total: number;
}

export type ResponseMatchDog = {
  match: string;
}

export interface DogsFilter {
  breeds?: string[];
  minAge?: number;
  maxAge?: number;
  sort?: SortOrder;
  from?: number;
  size?: number;
}
