import store from './config/redux/store';
import Routes from './config/routes';
import { Provider } from 'react-redux';
function App() {
    return (
        <Provider store={store}>
            <Routes />
        </Provider>
    );
}

export default App;
