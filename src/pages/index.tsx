import { useGamesContext } from "@/context/GamesContext";
import type { NextPage } from "next";
import ImageMarker from "react-image-marker";

const Home: NextPage = () => {  
  const { currentGame } = useGamesContext();
  if (currentGame === undefined) return (
    // game isn't defined
    // ask user to select a game
    <div>Select a Game</div>
  )
  // grabs markers from current game
  const markers = currentGame.markers.map(marker => {
    if (marker.left === null && marker.top === null) return null;
    return {
      top: Number(marker.top),
      left: Number(marker.left),
    }
  })
  // remove null markers (idk how it works either)
  const filteredMarkers = markers.filter((marker): marker is { top: number, left: number} => {
    return marker !== null;
  });
  return (
    <>
      <ImageMarker 
        src="field.png"
        markers={filteredMarkers}
      />      
    </>
  );
};

export default Home;
