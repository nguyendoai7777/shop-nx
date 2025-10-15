'use client';
import './setting-info-page.scss';
import { ImageUpload, PickImage } from './components/image-upload';

export default function SettingInfoPage() {
  const handlePickImage = (data: PickImage) => {};

  return <ImageUpload onPick={handlePickImage} />;
}
