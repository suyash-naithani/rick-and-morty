import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

// Define a type for the slice state
export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  gender: string;
  image: string;
  location: {
    name: string;
  };
  origin: {
    name: string;
  };
}

interface CharactersState {
  entities: Character[];
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  currentPage: number;
  totalPages: number;
  noData: boolean;
  favorites:number[]
}

type SearchParams = {
  name: string;
  page?: number;
};

// Define the initial state using that type
const initialState: CharactersState = {
  entities: [],
  loading: "idle",
  error: null,
  currentPage: 1,
  totalPages: 0,
  noData: false,
  favorites:[]
};

export const fetchCharacters = createAsyncThunk<
  { characters: Character[]; totalPages: number },
  { page: number },
  { rejectValue: string }
>("characters/fetchCharacters", async ({ page }, { rejectWithValue }) => {
  try {
    const response = await axios.get(
      `https://rickandmortyapi.com/api/character/?page=${page}`
    );
    return {
      characters: response.data.results,
      totalPages: response.data.info.pages,
    };
  } catch (error: any) {
    if (error.response?.status === 404) {
      return rejectWithValue("There is nothing here");
    }
    return rejectWithValue(error.message || "Error fetching characters");
  }
});

export const searchCharacters = createAsyncThunk<
  { characters: Character[]; totalPages: number },
  SearchParams,
  { rejectValue: string }
>(
  "characters/searchByName",
  async ({ name, page = 1 }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/character/?name=${name}&page=${page}`
      );
      return {
        characters: response.data.results,
        totalPages: response.data.info.pages,
      };
    } catch (error: any) {
      if (error.response?.status === 404) {
        return rejectWithValue("There is nothing here");
      }
      return rejectWithValue(error.message || "Error fetching characters");
    }
  }
);

const characterSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {toggleFavourites:((state,action:PayloadAction<number>)=>{
    if(state.favorites.indexOf(action.payload)>0)
    state.favorites.splice(state.favorites.indexOf(action.payload),1)
    else
    state.favorites.push(action.payload)
  })
},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = action.payload.characters;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.meta.arg.page;
      })
      .addCase(searchCharacters.pending, (state) => {
        state.loading = "pending";
      })
      .addCase(searchCharacters.fulfilled, (state, action) => {
        state.loading = "succeeded";
        state.entities = action.payload.characters;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(searchCharacters.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload === "There is nothing here") {
          state.noData = true;
          state.error = null;
        } else {
          state.error = action.payload || "Failed to fetch characters";
        }
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = "failed";
        if (action.payload === "There is nothing here") {
          state.noData = true;
          state.error = null;
        } else {
          state.error = action.payload || "Failed to fetch characters";
        }
      });
  },
});

export const selectNoData = (state: { characters: CharactersState }) =>
  state.characters.noData;

  export const {toggleFavourites} = characterSlice.actions

// Selectors
export const selectAllCharacters = (state: { characters: CharactersState }) =>
  state.characters.entities;
export const selectCharacterPagination = (state: {
  characters: CharactersState;
}) => ({
  currentPage: state.characters.currentPage,
  totalPages: state.characters.totalPages,
});

export default characterSlice.reducer;
