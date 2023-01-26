import { Configuration, OpenAIApi } from "openai";
import {  useState } from "react"
import placeholderImg from "../images/placeholder.webp"
import Loading from "../utils/Loading/Loading";

export default function Search() {
  const [imgUrl, setImgUrl] = useState(placeholderImg)
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [limit, setLimit] = useState(false)

  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const generateImage = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const response = await openai.createImage({
        prompt: query,
        n: 1,
        size: "512x512"
      });
      setImgUrl(response.data.data[0].url)
      setLoading(false)
      setLimit(false)
    } catch (error) {
      console.log(error)
      setLimit(true)
    }
  }

  return (
    <div className="search" id="search">
      <div className="container">
        <form onSubmit={generateImage}>
          <input type="text" placeholder="Enter Something..." required value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit">Generate</button>
        </form>
        {
          !limit ? (
            <div className="image-wrapper">
              {!loading ? (
                <img src={imgUrl} alt="img" />
              ) : (
                <Loading />
              )}
            </div>
          ) : (
            <div className="limit-wrapper">
              <h1>Api reached at its limit</h1>
              <a href="#search" className="git-btn">See on Github<i className="fa-brands fa-github"></i></a>
            </div>
          )
        }
      </div>
    </div>
  )
}