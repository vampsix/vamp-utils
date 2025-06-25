import { AxiosResponse } from "axios";
export declare function randomFilename(filename: string): string;
export declare function getFilenameByUrl(url: string): string;
export declare function downloadFile(response: AxiosResponse, filename?: string): void;
export declare function downloadBlob(blob: Blob, fileName: string): void;
export interface RemoteZipFile {
    url: string;
    filename: string;
}
export declare function downloadAndZipFiles(zipFilename: string, files: RemoteZipFile[]): Promise<void>;
export interface BlobFile {
    filename: string;
    data: Blob;
}
export declare function zipBlobs(filename: string, files: BlobFile[]): Promise<void>;
