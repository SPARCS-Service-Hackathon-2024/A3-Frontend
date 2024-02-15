import { useState, ChangeEvent } from "react";
import Layout from "../components/layout";

function UploadImg() {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);

  const onSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
      const imagesArray: string[] = selectedFilesArray.map((file) => {
        return URL.createObjectURL(file);
      });

      setSelectedImages((previousImages) => previousImages.concat(imagesArray));

      event.target.value = ""; // Reset the value to handle the bug in Chrome
    }
  };

  const deleteHandler = (image: string) => {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  };

  return (
    <Layout>
      <section className="flex h-screen flex-col items-center justify-start pt-20">
        <div className="mb-6 text-center">
          <p className="mb-1 text-4xl font-semibold">사진 올리기</p>
          <p className="mt-4 text-2xl font-normal">
            최대 5장까지 올릴 수 있습니다
          </p>
        </div>
        <div className="text-lg font-semibold">
          <label className="cursor-pointer rounded-full bg-green-50 px-5 py-3 text-2xl text-green-700 file:cursor-pointer hover:bg-green-100">
            파일 선택
            <input
              className="hidden"
              type="file"
              name="images"
              onChange={onSelectFile}
              multiple
              accept="image/png, image/jpeg, image/webp"
            />
          </label>
        </div>

        {selectedImages.length > 0 && (
          <div className="mt-4">
            {selectedImages.length > 5 ? (
              <p className="text-red-500">
                5장 이상 올릴 수 없습니다 <br />
                <span>
                  사진 <b>{selectedImages.length - 5}</b> 장을 삭제해주세요
                </span>
              </p>
            ) : (
              <button
                className="rounded-full bg-blue-500 px-4 py-2 text-2xl font-bold text-white hover:bg-blue-700 "
                onClick={() => {
                  console.log(selectedImages);
                }}
              >
                사진 {selectedImages.length} 장을 제출하기
              </button>
            )}
          </div>
        )}

        <div className="mt-4 grid w-full grid-cols-2 gap-4 px-6">
          {selectedImages.map((image, index) => (
            <div key={image} className="relative">
              <img
                src={image}
                className="h-auto w-full rounded-lg object-cover"
                alt="upload"
              />
              <button
                className="absolute right-0 top-0 rounded-full bg-red-500 px-2 py-1 font-bold text-white hover:bg-red-700"
                onClick={() => deleteHandler(image)}
              >
                삭제
              </button>
              <p className="text-center">{index + 1}</p>
            </div>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export default UploadImg;
