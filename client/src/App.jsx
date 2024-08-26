import { useEffect, useState } from 'react';

import { getImages } from './api';

export default function App() {
  const [imageList, setImageList] = useState([]);

  const [nextCursor, setNextCursor] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getImages();

      setImageList(res.resources);
      setNextCursor(res.next_cursor);
    };
    fetchData();
  }, []);

  const handleLoadMore = async () => {
    const res = await getImages(nextCursor);
    setImageList((prev) => [...prev, ...res.resources]);
    setNextCursor(res.next_cursor);
  };

  return (
    <div>
      <div className="image-grid">
        {imageList?.map((item) => (
          <img src={item.url} key={item.url} />
        ))}
      </div>
      <div className="footer">
        {nextCursor ? (
          <button onClick={handleLoadMore}>Load More</button>
        ) : null}
      </div>
    </div>
  );
}
