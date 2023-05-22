import React from 'react'
import ReactPaginate from 'react-paginate'
import styles from './Pagination.module.scss'


type PaginationProps ={
  pageCount: number,
  onChangePage: (id: number ) =>(void)  
}

const Pagination: React.FC <PaginationProps> = ({pageCount, onChangePage})=>{
    
  return (
      <div className={styles.pagination}>  
          <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => onChangePage(e.selected +1)}  
            pageRangeDisplayed={4}
            pageCount={3}
            previousLabel="<"
            forcePage={pageCount}  
            />
      </div>
      
  )
}

export default Pagination   