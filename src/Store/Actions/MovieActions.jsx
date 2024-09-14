import Axios from "../../Utils/Axios";
export {removeMovie} from '../Reducers/MovieSlice'
import {loadMovie} from '../Reducers/MovieSlice'

export const asyncLoadMovie = (id)=> async (dispatch,getState)=>{
    try {
        const detail = await Axios.get(`/movie/${id}`)
        const externalId = await Axios.get(`/movie/${id}/external_ids`)
        const recommendations = await Axios.get(`/movie/${id}/recommendations`)
        const similar = await Axios.get(`/movie/${id}/similar`)
        const videos = await Axios.get(`/movie/${id}/videos`)
        const watchProviders = await Axios.get(`/movie/${id}/watch/providers`)

        let fullData = {
            detail: detail.data,
            externalId: externalId.data,
            recommendations: recommendations.data.results,
            similar: similar.data.results,
            videos: videos.data.results.find(movie=>movie.type === "Trailer"),
            watchProviders: watchProviders.data.results.IN,
        }

        console.log(fullData)
        dispatch(loadMovie(fullData))

    } catch (error) {
        console.log(error)
    }
}