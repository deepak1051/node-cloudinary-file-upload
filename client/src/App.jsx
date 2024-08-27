import { Fragment, useEffect, useState } from 'react';

import { getImages, searchImages } from './api';

export default function App() {
  const [imageList, setImageList] = useState([]);
  const [nextCursor, setNextCursor] = useState(null);
  const [searchValue, setSearchValue] = useState('');

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await searchImages(searchValue, nextCursor);
      setImageList(res.resources);
      setNextCursor(res.next_cursor);
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = async () => {
    try {
      const res = await getImages();
      setImageList(res.resources);
      setNextCursor(res.next_cursor);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          required
          placeholder="Enter a search value..."
        />
        <button type="submit">Search</button>
        <button type="button" onClick={resetForm}>
          Clear
        </button>
      </form>

      <div className="image-grid">
        {imageList?.map((item) => (
          <Fragment key={item.url}>
            {item.format === 'mp4' ? (
              <video width="320" height="240" controls>
                <source type="video/mp4" src={item.url} />
              </video>
            ) : (
              <img src={item.url} />
            )}
          </Fragment>
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
