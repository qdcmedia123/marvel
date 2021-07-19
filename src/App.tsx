import { HashRouter as Router, Route } from 'react-router-dom'
import Superheros from 'components/Superheros';
import Comics from 'components/Comics';
import { store } from 'state';
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      <Router basename="/">
        <Route exact path="/" component={Superheros} />
        <Route exact path="/comics/:id" component={Comics} />
      </Router>
    </Provider>
  );
}

export default App;
