import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import React, { useState } from "react";

type PaginationProps = {
  pageSize: number;
  total: number;
  styles: string;
};

const StyledPagination = ({ pageSize, total, styles }: PaginationProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <Pagination className={styles}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(currentPage > 1 ? currentPage - 1 : 1);
            }}
          />
        </PaginationItem>
        {[...Array(Math.ceil(total / pageSize))].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                setCurrentPage(index + 1);
              }}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(
                currentPage < Math.ceil(total / pageSize)
                  ? currentPage + 1
                  : currentPage
              );
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default StyledPagination;
