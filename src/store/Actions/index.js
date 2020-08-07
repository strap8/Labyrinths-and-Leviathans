import axios from "axios"

const AxiosGoogle = () =>
  axios.create({
    baseURL: "https://www.googleapis.com/youtube/v3/",
  })

export { AxiosGoogle }
