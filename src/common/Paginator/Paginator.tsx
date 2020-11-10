import React, {useState} from 'react';
import styles from '../Paginator/Paginator.module.css';

type PaginatorType = {
    pageSize: number
    totalUsersCount: number
    currentPage?: number
    portionSize?: number
    onPageChanged: (pageNumber: number) => void
}


export const Paginator = (props: PaginatorType) => {
    const {pageSize, totalUsersCount, currentPage, onPageChanged, portionSize = 10} = props

    let pagesCount = Math.ceil(totalUsersCount / pageSize);
    let pages = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);

    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    const nameClass = (p: number) => currentPage === p ? `${styles.pageNumber}  ${styles.selectedPage}` : styles.pageNumber

    return (
        <div className={styles.paginator}>

            {(portionNumber > 1) ?
                <span>
                    <button onClick={() => setPortionNumber(1)}>to start</button>
                    <button onClick={() => setPortionNumber(portionNumber - 1)}>PREV</button>
                </span>
                : ''
            }

            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p) => {
                    return <span className={nameClass(p)}
                                 key={p}
                                 onClick={(e) => {
                                     onPageChanged(p);
                                 }}>{p}</span>
                })}
            {portionCount > portionNumber
                ? <span>
                    <button className={styles.paginator_btn}
                            onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</button>
                  <button onClick={() => setPortionNumber(portionCount)}>to end</button>
                </span>
                : ''
            }
        </div>
    )
}
