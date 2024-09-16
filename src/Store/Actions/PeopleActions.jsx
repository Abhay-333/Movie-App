import Axios from "../../Utils/Axios";
export {  removePeople } from "../Reducers/PeopleSlice";
import {loadPeople} from "../Reducers/PeopleSlice";

export const asyncLoadPeople = (id) => async (dispatch, getState) => {
  try {
    const details = await Axios.get(`/person/${id}`);
    const externalId = await Axios.get(`/person/${id}/external_ids`);
    const combinedCredits = await Axios.get(`/person/${id}/combined_credits`);
    const movieCredits = await Axios.get(`/person/${id}/movie_credits`);
    const tvCredits = await Axios.get(`/person/${id}/tv_credits`);

    const fullData = {
      details: details.data,
      externalId: externalId.data,
      combinedCredits: combinedCredits.data,
      movieCredits: movieCredits.data,
      tvCredits: tvCredits.data,
    };

    dispatch(loadPeople(fullData))
  } catch (error) {
    console.log(error);
  }
};
