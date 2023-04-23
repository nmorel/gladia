export type MediaFile =
  | {file: File; dataUrl: string; url: string}
  | {file?: null; dataUrl?: null; url: string}
