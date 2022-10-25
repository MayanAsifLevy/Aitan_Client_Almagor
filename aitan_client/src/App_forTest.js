import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/mainPage/mainPageStyle.css'
import './components/general_comp/genericUpdatePageStyle.css'
import { useRoutes, BrowserRouter as Router } from 'react-router-dom';
import store from './redux/store';
import { Provider } from "react-redux";
import Login from './components/login/LogIn';
import MainPage from './components/mainPage/MainPage';
import GrowersPage from './components/rec_fruit_comp/growers/Growers';
import PackingHousePage from './components/rec_fruit_comp/packingHouse/PackingHouse'
import FruitsPage from './components/rec_fruit_comp/fruits/Fruits'
import PlotsPage from './components/rec_fruit_comp/plots/Plots'
import PackingMaterialPage from './components/rec_fruit_comp/packingMaterial/PackingMaterial'
// import FruitDeals from './components/rec_fruit_comp/fruitDeals/FruitDeals'
import DealNamesPage from './components/rec_fruit_comp/dealNames/DealNames'
import ReceiveFruitsPage from './components/rec_fruit_comp/receivingFruits/ReceiveFruits'
import DealsPage from './components/rec_fruit_comp/deals/Deals'


function AppRoutes() {
  let element = useRoutes([
    { path: "/", element: <Login /> },
    {
      path: "/mainPage/", element: <MainPage />,
      children: [
        { path: "growers", element: <GrowersPage /> },
        { path: "packingHouse", element: <PackingHousePage /> },
        { path: "fruits", element: <FruitsPage /> },
        { path: "plots", element: <PlotsPage /> },
        { path: "packingMaterials", element: <PackingMaterialPage /> },
        { path: "dealNames", element: <DealNamesPage /> },
        { path: "deals", element: <DealsPage /> },
        { path: "receiveFruits", element: <ReceiveFruitsPage /> },
      ],
    },
  ]);

  return element;
}

function App() {

  return (
    <Router>
      <Provider store={store}>
        <div id='root'>
          <div className="app">
            <AppRoutes />
          </div>
        </div>
      </Provider>
    </Router>
  )
}

export default App;
