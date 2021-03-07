import {  Menu } from 'semantic-ui-react';
import SortRadio from './MenuItems/SortRadio';
import FilterGenre from './MenuItems/FilterGenre';
import FilterRating from './MenuItems/FilterRating';



// Need to divdie this component
// For genre gonna use filter also for rating
// can move sort and filter components to helper function outside component



export default function Sidebar(){

    return(
      <div style={{flex: '1.8', alignSelf: "flex-start", margin: ' 10px 20px 0 0'}}>
        <Menu vertical>
          <Menu.Item>
            <p>Sort by</p>
            <SortRadio />
          </Menu.Item>
        <Menu.Item>
          Genre
          <FilterGenre />
        </Menu.Item>
          
        <Menu.Item>
          Rating
          <Menu.Menu>
            <FilterRating />
          </Menu.Menu>
        </Menu.Item>
      </Menu>
      </div>
    )
}