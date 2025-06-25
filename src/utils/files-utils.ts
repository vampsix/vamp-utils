import axios, { AxiosResponse } from "axios";
import JSZip from "jszip";
import { randomString } from "./string-utils";

export function randomFilename(filename: string): string {
  const index = filename.lastIndexOf(".");
  //   const suffix = filename.substr(index);
  const suffix = filename.substring(index);
  //   const suffix = filename.slice(index);
  return randomString() + suffix;
}

export function getFilenameByUrl(url: string): string {
  const index = url.lastIndexOf("/");
  // return url.substr(index + 1);
  return url.substring(index + 1);
}

export function downloadFile(response: AxiosResponse, filename?: string): void {
  // 提取文件名
  const disposition = response.headers["content-disposition"];

  const fileName = filename || disposition.match(/filename=(.*)/)[1];

  // 将二进制流转为blob
  const blob = new Blob([response.data], { type: "application/octet-stream" });
  downloadBlob(blob, fileName);
}

export function downloadBlob(blob: Blob, fileName: string): void {
  if (typeof window.navigator.msSaveBlob !== "undefined") {
    // 兼容IE，window.navigator.msSaveBlob：以本地方式保存文件
    window.navigator.msSaveBlob(blob, decodeURI(fileName));
  } else {
    // 创建新的URL并指向File对象或者Blob对象的地址
    const blobURL = window.URL.createObjectURL(blob);
    // 创建a标签，用于跳转至下载链接
    const tempLink = document.createElement("a");
    tempLink.style.display = "none";
    tempLink.href = blobURL;
    tempLink.setAttribute("download", decodeURI(fileName));
    // 兼容：某些浏览器不支持HTML5的download属性
    if (typeof tempLink.download === "undefined") {
      tempLink.setAttribute("target", "_blank");
    }

    // 挂载a标签
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);
    // 释放blob URL地址
    window.URL.revokeObjectURL(blobURL);
  }
}

export interface RemoteZipFile {
  url: string;
  filename: string;
}

export function downloadAndZipFiles(
  zipFilename: string,
  files: RemoteZipFile[]
): Promise<void> {
  const zipInstance = new JSZip();
  const downloadTasks = files.map(({ url, filename }) => {
    return axios
      .get(url, {
        responseType: "blob",
      })
      .then((response: { data: any }) => {
        return {
          filename,
          data: response.data,
        };
      });
  });
  return Promise.all(downloadTasks)
    .then((files) => {
      files.forEach((item: { filename: any; data: any }) => {
        zipInstance.file(item.filename, item.data);
      });
      return zipInstance.generateAsync({ type: "blob" });
    })
    .then((blob) => {
      downloadBlob(blob, `${zipFilename}.zip`);
    });
}

export interface BlobFile {
  filename: string;
  data: Blob;
}

export function zipBlobs(filename: string, files: BlobFile[]): Promise<void> {
  const zipInstance = new JSZip();
  files.forEach((item) => {
    zipInstance.file(item.filename, item.data);
  });
  return zipInstance.generateAsync({ type: "blob" }).then((zipData: Blob) => {
    downloadBlob(zipData, `${filename}.zip`);
  });
}
