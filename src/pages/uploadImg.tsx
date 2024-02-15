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

      // Reset the value to handle the bug in Chrome
      event.target.value = "";
    }
  };

  const deleteHandler = (image: string) => {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  };

  return (
    <Layout>
    <section className="p-4">
      <label className="block mb-4 text-lg font-semibold">
        + Add Images
        <span className="block text-sm font-normal">up to 10 images</span>
        <input
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-green-50 file:text-green-700
            hover:file:bg-green-100
          "
          type="file"
          name="images"
          onChange={onSelectFile}
          multiple
          accept="image/png, image/jpeg, image/webp"
        />
      </label>

      {selectedImages.length > 0 && (
        <div>
          {selectedImages.length > 10 ? (
            <p className="text-red-500">
              You can't upload more than 10 images! <br />
              <span>
                please delete <b>{selectedImages.length - 10}</b> of them
              </span>
            </p>
          ) : (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                console.log(selectedImages);
              }}
            >
              UPLOAD {selectedImages.length} IMAGE{selectedImages.length === 1 ? "" : "S"}
            </button>
          )}
        </div>
      )}

      <div className="flex flex-wrap gap-4 mt-4">
        {selectedImages.map((image, index) => (
          <div key={image} className="relative">
            <img src={image} className="h-40 w-40 object-cover rounded-lg" alt="upload" />
            <button
              className="absolute top-0 right-0 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded-full"
              onClick={() => deleteHandler(image)}
            >
              Delete
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
