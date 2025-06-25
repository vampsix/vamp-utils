interface Navigator {
  msSaveBlob?: (blob: Blob, fileName: string) => boolean;
  msSaveOrOpenBlob?: (blob: Blob, fileName: string) => boolean;
}