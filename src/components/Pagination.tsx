import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  isLoading: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  isLoading,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  return (
    <div className="flex space-x-2 justify-center mt-4">
      {/* First Page */}
      {currentPage > 1 && (
        <button
          className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:text-gray-400"
          disabled={isLoading}
          onClick={() => onPageChange(1)}
        >
          1
        </button>
      )}

      {currentPage > 3 && (
        <button className="px-3 py-1 bg-transparent rounded">...</button>
      )}

      {/* Previous Page */}
      {currentPage > 2 && (
        <button
          className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:text-gray-400"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={isLoading}
        >
          {currentPage - 1}
        </button>
      )}

      {/* Current Page */}
      <button className="px-3 py-1 bg-blue-500 text-white rounded">
        {currentPage}
      </button>

      {/* Next Page */}
      {currentPage < totalPages - 1 && (
        <button
          className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:text-gray-400"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={isLoading}
        >
          {currentPage + 1}
        </button>
      )}

      {currentPage < totalPages - 2 && (
        <button className="px-3 py-1 bg-transparent rounded">...</button>
      )}

      {/* Last Page */}
      {currentPage < totalPages && (
        <button
          className="px-3 py-1 bg-gray-200 rounded cursor-pointer disabled:text-gray-400"
          onClick={() => onPageChange(totalPages)}
          disabled={isLoading}
        >
          {totalPages}
        </button>
      )}
    </div>
  );
};

export default Pagination;
