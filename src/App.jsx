import React from "react";
import axios from "axios";
import { useState, useEffect } from "react"
import Card from "./components/Card";
import Search from "./components/Search";

function App() {

  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [term, setTerm] = useState('');

  useEffect(() => {
    axios.get(`https://pixabay.com/api/?key=${import.meta.env.VITE_PIXABAY_API_KEY}&q=${term}&image_type=photo&pretty=true`)
      .then((res) => {
        setImages(res.data.hits);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching images:", error));
  }, [term])

  return (
    <div className="container mx-auto">
      <Search searchText={(text) => setTerm(text)}/>

      {!isLoading && images.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Images Found</h1>}

      {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <div className="grid grid-cols-3 gap-4">
        {images.map((image) => (
          <Card key={image.id} imgLink={image.webformatURL} user={image.user} views={image.views} downloads={image.downloads} tags={image.tags} likes={image.likes} id={image.id}/>
        ))}
      </div>}
    </div>
  )
}

export default App
