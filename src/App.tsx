import styled from 'styled-components';
import MainComponent from './components/MainComponent';
import { MobileProvider } from './context/MobileContext';
import { DateProvider } from './context/DateContext';

const App = () => {
    return (
        <Wrapper>
            <MobileProvider>
                <DateProvider>
                    <MainComponent />
                </DateProvider>
            </MobileProvider>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
`;

export default App;
