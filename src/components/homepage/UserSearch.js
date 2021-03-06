import React from 'react'
import { InstantSearch, Configure, connectStateResults } from 'react-instantsearch-dom';

import SearchBox from './SearchBox';
import UserHits from './UserHits';

import '../../pages/css/Home.css'


const Results = connectStateResults(({ searchState }) => {
    console.log("connecting results")
    return searchState && searchState.query 
        ? <UserHits />
        : null
})

export default function UserSearch({searchClient, setSearchFor, searchFor}) {
  return (
      <InstantSearch
        indexName="users"
        searchClient={searchClient}
      > 
          <Configure
              hitsPerPage={8}
          />
          
          <div className="homeContainer" >
              <div className="posts" >
                  <SearchBox searchFor={searchFor} setSearchFor={setSearchFor} /> 
                  <Results />
              </div>
          </div>
      </InstantSearch>
  )
}
