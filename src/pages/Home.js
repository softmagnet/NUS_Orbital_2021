import React from 'react';
import algoliasearch from 'algoliasearch';
import { InstantSearch, Configure } from 'react-instantsearch-dom';
import SearchBox from '../components/homepage/SearchBox'
import InfiniteHits from '../components/homepage/InfiniteHits'

import FilterSidebar from '../components/homepage/FilterSidebar'
import { Container } from '@material-ui/core';

const searchClient = algoliasearch(
  'ES79ODFVNM',
  'c57f19049ad61dad541fc8f7659c0f92'
);

export default function Home() {
    console.log("rerendering home")
    return (
            <div style={{marginTop: '10px'}}>
                <Container>
                <InstantSearch
                    indexName="posts"
                    searchClient={searchClient}
                > 
                <Configure
                    hitsPerPage={8}
                />
                
                <div style={{display: 'flex'}}>
                    <div style={{flex: 1, marginRight: '2vw'}}>
                        <FilterSidebar />
                    </div>
                    <div style={{flex: 3, height: '5000px'}}>
                        <SearchBox /> 
                        <InfiniteHits />
                        
                    </div>
                </div>
                </InstantSearch>
                </Container>
            </div>
    )
}
