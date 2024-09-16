import Axios from "../../Utils/Axios";
export {removeTv} from '../Reducers/TvSlice'
import {loadTv} from '../Reducers/TvSlice'

export const asyncLoadTv = (id) => async (dispatch, getState) => {
  try {
    const details = await Axios.get(`/tv/${id}`);
    const externalId = await Axios.get(`/tv/${id}/external_ids`);
    const recommendations = await Axios.get(`/tv/${id}/recommendations`);
    const similar = await Axios.get(`/tv/${id}/similar`);
    const videos = await Axios.get(`/tv/${id}/videos`);
    const watchProviders = await Axios.get(`/tv/${id}/watch/providers`);

    let fullData = {
      details: details.data,
      externalId: externalId.data,
      recommendations: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find(tv=>tv.type === "Trailer"),
      watchProviders: watchProviders.data.results.IN,
    };

    dispatch(loadTv(fullData));
  } catch (error) {
    console.log(error);
  }
};
