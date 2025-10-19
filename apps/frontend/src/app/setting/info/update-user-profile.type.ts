export interface UploadFile {
  file: File;
  preview: string;
}
export interface PickImage {
  avatar?: UploadFile;
  banner?: UploadFile;
}

export interface ImageUploadProps {
  onPick(image: PickImage): void;
}
