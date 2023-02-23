import { useQuery } from "react-query";
import axios from "axios";

const getImages = async () => {
  return axios
    .get("https://midjourney.com/showcase/recent/")
    .then((response) => {
      const paragraph = response.data;
      // console.log("paragraph 🦾", paragraph);
      const regex = `https:\/\/cdn\.midjourney\.com\/[a-z0-9-/_]*\.png`;
      const allImgUrls = [...paragraph.matchAll(regex)];

      const oddImgUrls = allImgUrls.map((element, index) => {
        if (element) {
          if (element[0]) {
            if (index % 2 === 0) {
              return element[0];
            }
          }
        }
      });

      return oddImgUrls;
    })
    .catch(function (error) {
      console.log(error);
    })
    .finally(function () {});
};

const useGetAlbumImages = () => {
  return useQuery(["mjAlbumArt"], () => getImages());
};

export default useGetAlbumImages;
