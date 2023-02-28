// import { useQuery } from "react-query";
// import axios from "axios";

// const getCIDs = async () => {
//   return axios
//     .get("api/v1/getAll")
//     .then((response) => {
//       const paragraph = response.data;
//       console.log("paragraph 🦾", paragraph);

//       return paragraph;
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
//     .finally(function () {});
// };

// const useGetCIDs = () => {
//   return useQuery(["filebaseCIDs"], () => getCIDs());
// };

// export default useGetCIDs;
