import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Header from './components/Header';
import  Events  from './components/Events';
import { createStore } from 'redux';
import reducer from './reducers';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import  AddEvent  from './components/AddEvent';

declare let module: any
const store = createStore(reducer);
ReactDOM.render(<div className="flex-container">
<Provider store={store}>
<Router>
    <div>
        <Route exact path="/" component={Header}></Route>
        <Route exact path="/" component={Events}></Route>
        <Route path="/add" component={AddEvent}></Route>
        <Route path="/edit/:data" component={AddEvent}></Route>
    </div>
</Router>
</Provider>
</div>,
document.getElementById('root'));
// if (module.hot) {
//    module.hot.accept();
// }