import React from 'react';
import ReactPaginate from 'react-paginate';

import style from './Pagination.module.scss'

type PaginationProps = {
	currentPage: number;
	onChangePage: (page: number) => void;
}

const Pagination:React.FC<PaginationProps> = ({currentPage,onChangePage}) => {
	return (
		
		<ReactPaginate
						
						className={style.root}
						breakLabel="..."
						previousLabel="<"
						nextLabel=">"
						onPageChange={(e) => onChangePage(e.selected + 1)}
						pageRangeDisplayed={4}
						pageCount={3}
						forcePage={currentPage}
		/>
	);
};

export default Pagination;