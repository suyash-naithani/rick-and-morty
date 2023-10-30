/** @jsxImportSource @emotion/react */
import React from "react";
import { css } from "@emotion/react";

const buttonStyle = css`
  margin: 0 10px;
  padding: 8px 15px;
  cursor: pointer;
  background-color: #f2f2f2;
  border: none;
  border-radius: 5px;
  &:hover {
    background-color: #eee;
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    background-color: #ddd;
  }
`;

const paginationContainer = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
  width: 50%;
  margin-left: 25%;
`;

const pageSelectStyle = css`
  width: 80px;
  padding: 5px;
`;

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  handlePagination: (page: number) => void;
  handlePageSelect: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  handlePagination,
  handlePageSelect,
}) => {
  return (
    <div css={paginationContainer}>
      <button
        css={buttonStyle}
        disabled={currentPage === 1}
        onClick={() => handlePagination(1)}
      >
        First
      </button>
      <button
        css={buttonStyle}
        disabled={currentPage === 1}
        onClick={() => handlePagination(currentPage - 1)}
      >
        Previous
      </button>

      <span>{`${currentPage} of ${totalPages}`}</span>

      <button
        css={buttonStyle}
        disabled={currentPage === totalPages}
        onClick={() => handlePagination(currentPage + 1)}
      >
        Next
      </button>
      <button
        css={buttonStyle}
        disabled={currentPage === totalPages}
        onClick={() => handlePagination(totalPages)}
      >
        Last
      </button>

      <select
        css={pageSelectStyle}
        onChange={handlePageSelect}
        value={currentPage}
      >
        {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((page) => (
          <option key={page} value={page}>
            {page}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
