import { axiosInstance } from "./axios";
import {
  Dog,
  DogsFilter,
  ResponseFetchDog,
  ResponseMatchDog,
  ResponseSearchDog,
  SortOrder,
} from "@types";

export function login(name: string, email: string) {
  return axiosInstance.post("/auth/login", {
    name,
    email,
  });
}

export function logout() {
  return axiosInstance.post("/auth/logout");
}

export function fetchMatch(dogIds: string[]): Promise<ResponseMatchDog> {
  return axiosInstance
    .post<ResponseMatchDog>("/dogs/match", dogIds)
    .then((res) => res.data);
}

export function fetchBreeds(): Promise<Array<string>> {
  return axiosInstance
    .get<Array<string>>("/dogs/breeds")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.error("Failed to fetch breeds", err);

      return [];
    });
}

export function fetchDogs(
  filter: DogsFilter,
  saveDogToStore: (dogs: Array<Dog>) => void,
  savedDogs: Record<string, Dog>
): Promise<ResponseFetchDog> {
  return new Promise((resolve) => {
    const params = buildParamsfromFilter(filter);
    axiosInstance
      .get<ResponseSearchDog>("/dogs/search", {
        params: params,
      })
      .then((res) => {
        // just retrieve dogIds which is not available in store
        const unAvailableDogs = res.data.resultIds.filter(
          (id) => !savedDogs[id]
        );

        // if all dogs returned by search is available then we don't need to call dogs api to fetch dog data
        if (unAvailableDogs.length === 0) {
          resolve({
            ids: res.data.resultIds,
            total: res.data.total,
          });

          return;
        }

        axiosInstance
          .post<Array<Dog>>("/dogs", unAvailableDogs)
          .then((response) => {
            const dogs: Array<Dog> = response.data;

            // Save fetched dogs to store
            saveDogToStore(dogs);

            resolve({ ids: res.data.resultIds, total: res.data.total });
          })
          .catch((err) => {
            console.error("Failed to fetch dogs!", err);
            resolve({ ids: [], total: 0 });
          });
      })
      .catch((err) => {
        console.error("Failed to fetch dogs!", err);
        resolve({ ids: [], total: 0 });
      });
  });
}

function buildParamsfromFilter(filter: DogsFilter) {
  const params: {
    breeds?: string[];
    ageMin?: number;
    ageMax?: number;
    sort?: string;
    from?: number;
    size?: number;
  } = {
    size: 25, // want to make it static and pass to params to make sure even api default changes
  };

  if (filter.breeds && filter.breeds.filter((v) => !!v).length > 0) {
    params.breeds = [...filter.breeds];
  }
  params.ageMin = filter.minAge;
  params.ageMax = filter.maxAge;
  params.from = filter.from ?? 0;
  params.sort = filter.sort == SortOrder.ASC ? "breed:asc" : "breed:desc";

  return params;
}
