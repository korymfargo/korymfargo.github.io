import { useEffect, useState } from "react";
import { fetchBreeds } from "@utils";
import { SortOrder } from "@types";

interface FilterbarProps {
  handleFilter: (
    breed: string,
    minAge: number,
    maxAge: number,
    sort: SortOrder
  ) => void;
  isLoading: boolean;
}

function Filterbar({ handleFilter, isLoading }: FilterbarProps) {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [selectedBreed, setSelectedBreed] = useState<string>("");
  const [minAge, setMinAge] = useState<number>(0);
  const [maxAge, setMaxAge] = useState<number>(50);
  const [order, setOrder] = useState<SortOrder>(SortOrder.ASC);

  const fetchAllBreeds = () => {
    fetchBreeds().then((breeds) => {
      setBreeds(breeds);
    });
  };

  useEffect(() => {
    fetchAllBreeds();
  }, []);

  return (
    <div className="w-full shadow-md flex p-5 rounded-md bg-white">
      <div className="mb-4 mr-4 flex-1">
        <label
          className="w-full block text-sm font-medium mb-2"
          htmlFor="breeds"
        >
          Breeds
        </label>
        <select
          className="p-2 border rounded w-full"
          id="breeds"
          value={selectedBreed}
          onChange={(e) => setSelectedBreed(e.target.value)}
        >
          <option value="">All Breeds</option>
          {breeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4 mr-4">
        <label className="block text-sm font-medium mb-2" htmlFor="minAge">
          Min Age
        </label>
        <input
          type="number"
          id="minAge"
          placeholder="Min Age"
          className="p-2 border rounded-lg w-30"
          value={minAge}
          onChange={(e) => setMinAge(parseInt(e.target.value))}
        />
      </div>

      <div className="mb-4 mr-4">
        <label className="block text-sm font-medium mb-2" htmlFor="maxAge">
          Max Age
        </label>
        <input
          type="number"
          id="maxAge"
          placeholder="Max Age"
          className="p-2 border rounded-lg w-30"
          value={maxAge}
          onChange={(e) => setMaxAge(parseInt(e.target.value))}
        />
      </div>

      <div className="mb-4 mr-4">
        <label className="block text-sm font-medium mb-2" htmlFor="order">
          Sort by Breeds
        </label>
        <select
          className="p-2 border rounded w-25"
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value as SortOrder)}
        >
          <option value={SortOrder.ASC}>A-Z</option>
          <option value={SortOrder.DESC}>Z-A</option>
        </select>
      </div>

      <div className="mb-4 w-25 items-end flex">
        <button
          className={
            (isLoading ? "bg-gray-500" : "bg-blue-500") +
            " w-full text-white py-3 rounded-md font-bold cursor-pointer"
          }
          onClick={() => handleFilter(selectedBreed, minAge, maxAge, order)}
          disabled={isLoading}
        >
          Filter
        </button>
      </div>
    </div>
  );
}

export default Filterbar;
