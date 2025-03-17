import DogCard from "@components/DogCard";
import DogLargeView from "@components/DogLargeView";
import Filterbar from "@components/Filterbar";
import Navbar from "@components/Navbar";
import Pagination from "@components/Pagination";
import { ActionAddDogs, RootState } from "@store";
import { Dog, SortOrder } from "@types";
import { fetchDogs } from "@utils";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Search() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const dogs = useSelector((state: RootState) => state.dogs.dogs);
  const [dogIds, setDogIds] = useState<Array<string>>([]);
  const [selectedDog, setSelectedDog] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalItemCount, setTotalItemCount] = useState<number>(0);
  const [savedFilter, setSavedFilter] = useState<{
    breed: string;
    minAge: number;
    maxAge: number;
    sort: SortOrder;
  } | null>(null);
  const pageSize = 25;

  const saveDogToStore = (dogs: Array<Dog>) => dispatch(ActionAddDogs(dogs));

  const handleFilter = async (
    breed: string,
    minAge: number,
    maxAge: number,
    sort: SortOrder,
    from?: number
  ) => {
    if (isLoading) {
      // prevent multiple api calls
      return;
    }

    setSavedFilter({
      breed,
      minAge,
      maxAge,
      sort,
    });

    setIsLoading(true);
    await fetchDogs(
      { breeds: [breed], minAge, maxAge, sort, from },
      saveDogToStore,
      dogs
    )
      .then(({ ids, total }) => {
        setDogIds(ids);
        setTotalItemCount(total);
      })
      .finally(() => setIsLoading(false));
  };

  const handlePageChange = (pageNum: number) => {
    if (!savedFilter) {
      console.warn("Something went wrong, no saved filter!");

      return;
    }
    setCurrentPage(pageNum);
    handleFilter(
      savedFilter?.breed,
      savedFilter?.minAge,
      savedFilter?.maxAge,
      savedFilter?.sort,
      (pageNum - 1) * pageSize
    );
  };

  const handleSelectDog = (id: string) => {
    setSelectedDog((prev) => (prev === id ? undefined : id));
  };

  return (
    <div className="flex flex-col max-h-screen max-w-4xl mx-auto p-4 bg-blue-100">
      <Navbar />

      <Filterbar handleFilter={handleFilter} isLoading={isLoading} />

      <div className="flex-1 my-2 flex flex-row overflow-hidden">
        <div className="flex-1 max-h-full overflow-y-auto">
          {dogIds.map((dogId) => (
            <DogCard id={dogId} key={dogId} handleClick={handleSelectDog} />
          ))}
        </div>

        <DogLargeView id={selectedDog} showFavourite showMatchBtn />
      </div>
      {/* pagination */}
      {totalItemCount > pageSize && (
        <Pagination
          isLoading={isLoading}
          totalItems={totalItemCount}
          itemsPerPage={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}

export default Search;
