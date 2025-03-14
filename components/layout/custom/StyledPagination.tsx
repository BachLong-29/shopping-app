import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

type PaginationProps = {
  pageSize: number;
  total: number;
  styles: string;
  onChange: (value: number) => void;
  currentPage: number;
};

const StyledPagination = ({
  pageSize,
  total,
  styles,
  onChange,
  currentPage,
}: PaginationProps) => {
  return (
    <Pagination className={styles}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onChange(currentPage > 1 ? currentPage - 1 : 1);
            }}
          />
        </PaginationItem>
        {[...Array(Math.ceil(total / pageSize))].map((_, index) => (
          <PaginationItem
            key={index}
            className={
              index + 1 === currentPage
                ? "rounded-md bg-[hsl(var(--muted-custom))]"
                : ""
            }
          >
            <PaginationLink
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onChange(index + 1);
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
              onChange(
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
