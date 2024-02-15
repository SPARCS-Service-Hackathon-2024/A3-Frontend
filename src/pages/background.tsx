import React from 'react';
import Layout from "../components/layout"; 
import * as backgrounds from '../components/backgrounds/index';

function Background() {
    const [selectedBackground, setSelectedBackground] = React.useState('');
    // const { setSelectedBackground } = useBackground();
  // Convert backgrounds object to array and limit to the first 4 items for a 2x2 grid
  const backgroundImages = Object.values(backgrounds).slice(0, 4);

  return (
    <Layout>
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold my-4">책의 바탕 배경을 선택해주세요</h1>
          <div className="grid grid-cols-2 gap-4 mx-auto" style={{ maxWidth: '600px' }}>
            {backgroundImages.map((bg, index) => (
              <div key={index} className="cursor-pointer" onClick={() => setSelectedBackground(bg)}>
                {/* Ensure images have a consistent size. Adjust w-full, h-48 to desired dimensions */}
                <img src={bg} alt={`Background ${index + 1}`} className="rounded-md shadow-lg w-full h-48 object-cover" />
              </div>
            ))}
          </div>
          {selectedBackground && (
            <div className="mt-4">
              <p>선택된 배경</p>
              {/* Adjust size as needed */}
              <img src={selectedBackground} alt="Selected Background" className="inline-block rounded-md shadow-lg w-32 h-32 object-cover" />
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default Background;
