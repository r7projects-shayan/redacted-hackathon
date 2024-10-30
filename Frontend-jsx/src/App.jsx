import './App.css';
import {TokenHomeScreen} from "./Screen/tokenHomeScreen.jsx";
import {Routes} from "react-router-dom";
import MainGallery from "./component/mainGallery.jsx";
import Collectibles from "./component/collectibles.jsx";
import Virtual_world from "./component/virtual world.jsx";
import DigitalCreationsGallery from "./component/DigitalCreationsGallery.jsx";
import {Homepage} from "./Screen/Landing_Page/Homepage.jsx";


function App() {
  return (
      <div>
        {/*<GithubCalender/>*/}
        {/*<TokenHomeScreen/>*/}
          <Homepage/>
        <Routes>
          {/*<Route path="/art" element={<MainGallery/>}></Route>*/}
          {/*<Route path="/collectibles" element={<Collectibles/>}></Route>*/}
          {/*<Route path="/virtual_worlds" element={<Virtual_world/>}></Route>*/}
          {/*<Route path="/music" element={<Music/>}></Route>*/}
          {/*<Route path="/digitalGallery" element={<DigitalCreationsGallery/>}></Route>*/}
        </Routes>
      </div>
      // <Container fluid>
      //     <div>
      //
      //         {/*<GithubCalender/>*/}
      //     </div>
      //     {/*<GitHubCalendar blockMargin={16} hideTotalCount blockRadius={1} colorScheme="light" username="vaibhav2002" hideColorLegend  />*/ }
      // </Container>
  )
}

export default App;

