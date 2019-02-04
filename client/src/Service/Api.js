import axios from "axios";

const Api = axios.create({
  baseURL: "https://zabcode-dynamic-dlzkqlv7g.now.sh/"
});

export default {
  convert(payload) {
    return Api.post("/shorten", payload);
  }
};
