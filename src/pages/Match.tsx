import DogLargeView from "@components/DogLargeView";
import Navbar from "@components/Navbar";
import { RootState } from "@store";
import { fetchMatch } from "@utils";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Match() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [errorText, setErrorText] = useState("");
  const dogs = useSelector((state: RootState) => state.dogs.dogs);
  const favDogIds = useMemo(() => {
    const dogIds = Object.keys(dogs);

    return dogIds.filter((id) => dogs[id].isFavourite);
  }, [dogs]);

  const [matchId, setMatchId] = useState("");

  useEffect(() => {
    if (favDogIds.length === 0) {
      setErrorText("You need at least one favourite dog to be selected!");

      return;
    }
    setIsLoading(true);
    fetchMatch(favDogIds)
      .then((res) => {
        if (res.match) {
          setMatchId(res.match);
        }
      })
      .catch((err) => {
        console.error("Failed to retrieve a match!", err);
        setErrorText("Failed to retrieve a match!");
      })
      .finally(() => setIsLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col max-h-screen h-screen max-w-4xl mx-auto p-4 bg-blue-100">
      <Navbar />
      <div className="flex-1 flex-col flex items-center justify-center">
        {isLoading ? (
          <>
            <div className="loader"></div>
            <div className="text-blue-500 text-xl mt-5 font-bold">
              We are generating matched dog based on your favourites!
            </div>
          </>
        ) : (
          <div>
            {errorText && (
              <>
                <div className="text-red-500">{errorText}</div>
                <button
                  onClick={() => navigate("/search")}
                  className="flex items-center justify-center px-4 py-2 mt-4 cursor-pointer rounded-lg transition-colors duration-300 focus:outline-none bg-blue-500 text-white hover:bg-blue-600"
                >
                  Search Again!
                </button>
              </>
            )}
            {!errorText && matchId && (
              <DogLargeView id={matchId} showSearchBtn />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Match;
