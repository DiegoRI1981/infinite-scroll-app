import React, { useState, useEffect } from "react"
import InfiniteScroll from "react-infinite-scroll-component"

function Pictures() {

    const URL = 'https://picsum.photos/v2/list?limit=10&page='

    const [pictures, setPictures] = useState([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)

    const getPictures = async () => {
        const response = await fetch(URL + page)
        const data = await response.json()
        if (data.length === 0) {
            setHasMore(false)
            return
        }
        setPictures([...pictures, ...data])
        setPage(page + 1)
    }

    useEffect(() => {
        getPictures()
    }, [])

    return (
        <>
            <InfiniteScroll
                dataLength={pictures.length}
                next={getPictures}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
            >
                {pictures.map((pictures) => (
                    <div className="container" key={pictures.id}>
                        <img style={{ width: 'auto', height: '300px' }} src={pictures.download_url} alt="" />
                    </div>
                ))}
            </InfiniteScroll>
        </>
    )
}
export default Pictures