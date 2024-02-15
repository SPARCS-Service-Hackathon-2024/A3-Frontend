import React, { useState, ChangeEvent } from "react";
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
      <section className="flex flex-col h-screen items-center justify-start pt-20">
        <div className="text-center mb-6">
          <p className="text-4xl font-semibold mb-1">사진 올리기</p>
          <p className="text-2xl mt-4 font-normal">최대 5장까지 올릴 수 있습니다</p>
        </div>
        <div className="text-lg font-semibold">
          <label className="text-2xl cursor-pointer bg-green-50 text-green-700 hover:bg-green-100 py-3 px-5 rounded-full file:cursor-pointer">
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
                className="text-2xl rounded-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 "
                onClick={() => {
                  console.log(selectedImages);
                }}
              >
                사진 {selectedImages.length} 장을 제출하기
              </button>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-4 mt-4 w-full px-6">
          {selectedImages.map((image, index) => (
            <div key={image} className="relative">
              <img src={image} className="h-auto w-full object-cover rounded-lg" alt="upload" />
              <button
                className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
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
