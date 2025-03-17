import { RootState, ActionSetFavourite } from "@store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

interface DogLargeViewProps {
  id: string | undefined;
  showFavourite?: boolean;
  showMatchBtn?: boolean;
  showSearchBtn?: boolean;
}

function DogLargeView({
  id,
  showFavourite,
  showMatchBtn,
  showSearchBtn,
}: DogLargeViewProps) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const dog = useSelector((state: RootState) =>
    id ? state.dogs.dogs[id] : undefined
  );

  const handleFavourite = (isFav: boolean) => {
    if (!id) {
      console.error("Dog Id is not provided!");

      return;
    }

    dispatch(
      ActionSetFavourite({
        id,
        value: isFav,
      })
    );
  };

  const gotoMatch = () => {
    navigate("/match");
  };

  const gotoSearch = () => {
    navigate("/search");
  };

  if (!dog || !id) {
    return (
      <div className="max-w-0 transition-[max-width] duration-500 ease-in-out"></div>
    );
  }

  return (
    <div className="max-w-md rounded overflow-y-auto overflow-x-hidden shadow-lg ml-5 p-5 bg-white transition-[max-width] duration-500 ease-in-out">
      <div className="min-w-72">
        <img
          className="w-72 h-auto max-h-100 object-cover"
          src={dog.img}
          alt={dog.name}
        />
        <div className="px-6 py-4 w-72 text-center flex flex-col items-center">
          <div className="font-bold text-xl mb-2">{dog.name}</div>
          <p className="text-gray-700 text-base">Breed: {dog.breed}</p>
          <p className="text-gray-700 text-base">Age: {dog.age} years</p>
          <p className="text-gray-700 text-base">Zip Code: {dog.zip_code}</p>
          {showFavourite && (
            <button
              onClick={() => handleFavourite(!dog.isFavourite)}
              className={
                "flex items-center justify-center px-4 py-2 mt-4 cursor-pointer rounded-lg transition-colors duration-300 focus:outline-none " +
                (dog.isFavourite
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-gray-200 text-gray-600 hover:bg-gray-300")
              }
            >
              {dog.isFavourite ? "Remove from Favorites" : "Add to Favorites"}
            </button>
          )}
          {showMatchBtn && (
            <button
              onClick={() => gotoMatch()}
              className="flex items-center justify-center px-4 py-2 mt-4 cursor-pointer rounded-lg transition-colors duration-300 focus:outline-none bg-blue-500 text-white hover:bg-blue-600"
            >
              Generate Match
            </button>
          )}
          {showSearchBtn && (
            <button
              onClick={() => gotoSearch()}
              className="flex items-center justify-center px-4 py-2 mt-4 cursor-pointer rounded-lg transition-colors duration-300 focus:outline-none bg-blue-500 text-white hover:bg-blue-600"
            >
              Search Again!
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default DogLargeView;
