import store from "../reducers/index";
import { AsyncStorage, Share } from "react-native";
import { toggleFavorite } from "../actions/favoriteActions";

/**
 * handleShare is used in the TripReportFooter which is created by
 * both the TripReportCard component and TripReportScreen.
 */
export const handleShare = async slug => {
  try {
    await Share.share({
      message: `Check out this Trip Report on Wanderlist:\nhttps://www.wanderlist.dev/p/${slug}/`
    });
  } catch (error) {
    console.log(error.message);
  }
};

/**
 * handleFavorite is used in the TripReportFooter which is created by
 * both the TripReportCard component and TripReportScreen.
 */
export const handleFavorite = async id => {
  const token = await AsyncStorage.getItem("token");
  store.dispatch(toggleFavorite(id, token));
};
