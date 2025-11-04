import { XLoadingCircular } from '@components';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <>
      <h1 className="pb-2 font-semibold text-2xl mt-1">Danh sách</h1>
      <div className="flex justify-center">
        <XLoadingCircular />
      </div>
    </>
  );
}
