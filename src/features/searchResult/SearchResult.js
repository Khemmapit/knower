import React from 'react';
import { useSelector } from 'react-redux';
import "./SearchResult.css";
import { selectSearch } from './searchSlice';
import SearchVideoSet from './SearchVideoSet';

const SearchResult = () => {
    const search = useSelector(selectSearch);

    console.log(search);
    return (
        <div className="searchResult">
            <div className="searchResult__mainHashtag">
                <h1>#{search.hashtag}</h1>    
                {/* Videoset result */}
                <SearchVideoSet />
            </div>
            
            {/* other hashtag relate to user search */}
            <div className="searchResult__relatedHashtag">
                <h1>#related search hashtag </h1>    
                {/* Videoset result */}
                <SearchVideoSet />
            </div>
            <div className="searchResult__relatedHashtag">
                <h1>#related search hashtag </h1>    
                {/* Videoset result */}
                <SearchVideoSet />
            </div>
            <div className="searchResult__relatedHashtag">
                <h1>#related search hashtag </h1>    
                {/* Videoset result */}
                <SearchVideoSet />
            </div>
            <div className="searchResult__relatedHashtag">
                <h1>#related search hashtag </h1>    
                {/* Videoset result */}
                <SearchVideoSet />
            </div>
        </div>
    )
};

export default SearchResult
