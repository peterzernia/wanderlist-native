import { Share } from "react-native";

/**
 * handleShare is used in the TripReportFooter which is created by
 * both the TripReportCard component and TripReportScreen.
 */
export const handleShare = async slug => {
  try {
    const result = await Share.share({
      message: `Check out this Trip Report on Wanderlist:\nhttps://www.wanderlist.dev/p/${slug}/`
    });

    if (result.action === Share.sharedAction) {
      if (result.activityType) {
      } else {
        // shared
      }
    } else if (result.action === Share.dismissedAction) {
    }
  } catch (error) {
    alert(error.message);
  }
};
