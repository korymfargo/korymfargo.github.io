import { RootState, ActionSetFavourite } from "@store";
import { useDispatch, useSelector } from "react-redux";

interface DogCardProps {
  id: string;
  handleClick: (id: string) => void;
}

function DogCard({ id, handleClick }: DogCardProps) {
  const dispatch = useDispatch();

  const dog = useSelector((state: RootState) => state.dogs.dogs[id]);

  const handleFavourite = (event: React.MouseEvent<SVGSVGElement>, isFav: boolean) => {
    event.stopPropagation();

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

  if (!dog) {
    return <h2>No Available Data</h2>;
  }

  return (
    <div
      className="flex items-center w-full p-4 rounded-lg cursor-pointer hover:bg-gray-50 transition"
      onClick={() => handleClick(id)}
    >
      {/* Dog Image */}
      <img
        className="w-16 h-16 rounded-md object-cover mr-4"
        src={dog.img}
        alt={dog.name}
      />

      {/* Dog Details */}
      <div className="flex-1">
        <h3 className="font-bold text-lg">{dog.name}</h3>
        <p className="text-gray-600 text-sm">Breed: {dog.breed}</p>
        <p className="text-gray-600 text-sm">Age: {dog.age} years</p>
        <p className="text-gray-600 text-sm">Zip Code: {dog.zip_code}</p>
      </div>

      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 20 20"
          className={
            (dog.isFavourite ? "text-yellow-500" : "text-gray-500") + " w-6 h-6"
          }
          onClick={(e) => handleFavourite(e, !dog.isFavourite)}
        >
          <path d="M10 15l-5.866 3.09 1.125-6.568L.72 6.662l6.599-.96L10 0l2.581 5.702 6.599.96-4.54 5.86 1.125 6.568z" />
        </svg>
      </div>
    </div>
  );
}

export default DogCard;
