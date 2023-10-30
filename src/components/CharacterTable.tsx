/** @jsxImportSource @emotion/react */
import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import Pagination from "./Pagination";
import {
  Character,
  fetchCharacters,
  searchCharacters,
  selectAllCharacters,
  selectCharacterPagination,
  selectNoData,
} from "../redux/slices/characterSlice";
import CharacterDetail from "./CharacterDetail";
import { MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { css } from "@emotion/react";
import SearchInput from "./SearchInput";

type SortDirection = "ascending" | "descending";

const tableContainerStyle = css`
  padding: 0 40px;
`;

const tableStyle = css`
  width: 100%;
  margin: 20px 0;
  border-collapse: collapse;
  th,
  td {
    padding: 15px;
    border: 1px solid #ddd;
  }
  tr:hover {
    background-color: #f5f5f5;
  }
  th {
    background-color: #f2f2f2;
    text-align: left;
  }
`;

const CharacterTable = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const noDataFromRedux = useSelector(selectNoData);
  const characters = useSelector(selectAllCharacters);
  const { totalPages } = useSelector(selectCharacterPagination);
  const [showDetail, setShowDetail] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [noData, setNoData] = useState<boolean>(false);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [sortConfig, setSortConfig] = useState<{
    key: "id" | "name";
    direction: SortDirection;
  } | null>(null);

  const [searchParams] = useSearchParams();
  const urlPage = Number(searchParams.get("page"));
  const urlName = searchParams.get("name"); // Extract search term from the URL

  useEffect(() => {
    setNoData(noDataFromRedux);
  }, [noDataFromRedux]);

  useEffect(() => {
    // setNoData(false);
    const fetchData = async () => {
      try {
        if (urlPage && urlName) {
          await dispatch(searchCharacters({ name: urlName, page: urlPage }));
        } else if (urlPage) {
          await dispatch(fetchCharacters({ page: urlPage }));
        } else {
          await dispatch(fetchCharacters({ page: 1 }));
        }
      } catch (errorAny) {
        console.log(errorAny);
      }
    };
    fetchData();
  }, [dispatch, urlPage, urlName]);

  const handleShowDetail = (character: Character) => {
    setSelectedCharacter(character);
    setShowDetail(true);
  };

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      dispatch(searchCharacters({ name: searchTerm }));
      navigate(`?name=${searchTerm}&page=1`); // Update URL with search term and reset page to 1
    } else {
      dispatch(fetchCharacters({ page: 1 }));
      navigate(`?page=1`); // Reset to base URL if no search term
    }
  };

  const handleCloseDetail = () => setShowDetail(false);

  const handlePagination = (pageNumber: number) => {
    if (searchTerm.trim()) {
      dispatch(searchCharacters({ name: searchTerm, page: pageNumber }));
      navigate(`?name=${searchTerm}&page=${pageNumber}`);
    } else {
      dispatch(fetchCharacters({ page: pageNumber }));
      navigate(`?page=${pageNumber}`);
    }
  };

  const handlePageSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPage = Number(event.target.value);

    if (searchTerm.trim()) {
      dispatch(searchCharacters({ name: searchTerm, page: selectedPage }));
      navigate(`?name=${searchTerm}&page=${selectedPage}`);
    } else {
      dispatch(fetchCharacters({ page: selectedPage }));
      navigate(`?page=${selectedPage}`);
    }
  };

  const sortedCharacters: Character[] = useMemo(() => {
    let sortableItems = [...characters];
    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [characters, sortConfig]);

  const requestSort = (key: "id" | "name") => {
    let direction: SortDirection = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const handleClearSearch = () => {
    setSearchTerm(""); // Clear the searchTerm state
    dispatch(fetchCharacters({ page: 1 })); // Fetch the first page of characters
    navigate(`?page=1`); // Navigate back to the first page in the URL
  };

  return (
    <div css={tableContainerStyle}>
      <SearchInput
        searchTerm={searchTerm}
        handleSearchInputChange={handleSearchInputChange}
        handleSearch={handleSearch}
        handleClearSearch={handleClearSearch}
      />
      {noData ? (
        <div>No data exists</div>
      ) : (
        <>
          <table css={tableStyle}>
            <thead>
              <tr>
                <th>
                  ID
                  <button onClick={() => requestSort("id")}>
                    {sortConfig &&
                    sortConfig.key === "id" &&
                    sortConfig.direction === "ascending" ? (
                      <MdArrowDropUp />
                    ) : (
                      <MdArrowDropDown />
                    )}
                  </button>
                </th>
                <th>
                  Name
                  <button onClick={() => requestSort("name")}>
                    {sortConfig &&
                    sortConfig.key === "name" &&
                    sortConfig.direction === "ascending" ? (
                      <MdArrowDropUp />
                    ) : (
                      <MdArrowDropDown />
                    )}
                  </button>
                </th>
                <th>Status</th>
                <th>Species</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedCharacters.map((character) => (
                <tr key={character.id}>
                  <td>{character.id}</td>
                  <td>{character.name}</td>
                  <td>{character.status}</td>
                  <td>{character.species}</td>
                  <td>
                    <button onClick={() => handleShowDetail(character)}>
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <Pagination
            currentPage={urlPage || 1}
            totalPages={totalPages}
            handlePagination={handlePagination}
            handlePageSelect={handlePageSelect}
          />
        </>
      )}
      {/* Character Detail Modal */}
      {showDetail && selectedCharacter && (
        <CharacterDetail
          character={selectedCharacter}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default CharacterTable;
