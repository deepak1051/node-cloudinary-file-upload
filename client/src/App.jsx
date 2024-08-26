import { useState } from 'react';
import images from './api-mock.json';

export default function App() {
  const [imageList, setImageList] = useState(images.resources);

  return (
    <div className="image-grid">
      {imageList.map((item) => (
        <img src={item.url} key={item.url} />
      ))}
    </div>
  );
}
