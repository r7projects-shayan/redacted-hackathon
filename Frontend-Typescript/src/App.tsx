import './App.css'
import {GithubCalender} from "./githubCalender.tsx";
import {Container} from "react-bootstrap";
import {TokenHomeScreen} from "./Screen/tokenHomeScreen.tsx";
import {Route , Routes} from "react-router-dom";
import MainGallery from "./component/mainGallery.tsx";
import Collectibles from "./component/collectibles.tsx";
import Virtual_world from "./component/virtual world.tsx";
import Music from "./component/music.tsx";
import DigitalCreationsGallery from "./component/DigitalCreationsGallery.tsx";

function App() {
    return (
        <div>
            {/*<GithubCalender/>*/}
            <TokenHomeScreen/>
            <Routes>
                <Route path="/art" element={<MainGallery/>}></Route>
                <Route path="/collectibles" element={<Collectibles/>}></Route>
                <Route path="/virtual_worlds" element={<Virtual_world/>}></Route>
                <Route path="/music" element={<Music/>}></Route>
                <Route path="/digitalGallery" element={<DigitalCreationsGallery/>}></Route>
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

export default App
