import React from 'react';
import style from '../Paginator/Paginator.module.css';

type PaginatorType= {
    pageSize: number
    totalUsersCount: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
}


export const Paginator = (props: PaginatorType) => {
    const {pageSize,totalUsersCount,currentPage,onPageChanged} = props

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    return (
        <div>
            {
                pages.map((p) => <span key={Math.random()}
                                       onClick={() => onPageChanged(p)}
                                       className={currentPage === p ? style.selectedMode : ''}>{p}</span>)
            }
        </div>
    )
}