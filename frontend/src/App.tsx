import './App.css'
import {GithubCalender} from "./githubCalender.tsx";
import {Container} from "react-bootstrap";
import DigitalCreationsGallery from './component/DigitalCreationsGallery.tsx';

function App() {
    return (
        <Container fluid>
            <div>
                <GithubCalender/>
                <DigitalCreationsGallery/>
            </div>
            {/*<GitHubCalendar blockMargin={16} hideTotalCount blockRadius={1} colorScheme="light" username="vaibhav2002" hideColorLegend  />*/ }
        </Container>
    )
}

export default App
