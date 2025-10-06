export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};

export type CastString<T> = T | (string & {});

export interface BaseRecord {
  id: number;
  updatedAt: string
  createdAt: string
}