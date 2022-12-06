import { combineReducers } from "redux";

import usersReducers from "./login/user_reducer"

import general_reducer from "./mainPage/general_reducer";
import growers_reducer from "./rec_fruit_actions/growers/growers_reducer";
import packingHouse_reducer from "./rec_fruit_actions/packingHouse/packingHouse_reducer";
import fruits_reducer from "./rec_fruit_actions/fruits/fruits_reducer";

import plotsDunam_reducer from "./rec_fruit_actions/plotDunam/plotsDunam_reducer";
import packingMaterials_reducer from "./rec_fruit_actions/packingMaterial/packingMaterial_reducer";
import dealNames_reducer from "./rec_fruit_actions/dealNames/dealNames_reducer";
import dealsReducer from "./rec_fruit_actions/deals/deals_reducer";
import receivingFruitsReducer from "./rec_fruit_actions/receivingFruits/receivingFruits_reducer";

import reportsReducer from "./reports/rec_fruits/reports_reducer";
import localreportsReducer from "./reports/local/localReports_reducer";

import fixedInfo_reducer from "./local_market_actions/fixedInfo/fixedInfo_reducer"
import fruitSize_reducer from "./local_market_actions/fruitSize/fruitSize_reducer"
import traders_reducer from "./local_market_actions/traders/traders_reducer"
import palletsMat_reducer from "./local_market_actions/palletsMat/palletsMat_reducer"
import palletsMatCost_reducer from "./local_market_actions/palletsMatCost/palletsMatCost_reducer"
import marketPackingMat_reducer from "./local_market_actions/marketPackingMat/marketPackingMat_reducer"
import marketFruits_reducer from "./local_market_actions/marketFruits/marketFruits_reducer"
import createPallet_reducer from "./local_market_actions/createPallet/createPallet_reducer"
import delivery_reducer from "./local_market_actions/deliveryNote/deliveryNote_reducer"
import manufacturerInvoice_reducer from "./local_market_actions/manufacturerInvoice/manufacturerInvoice_reducer"
import closingData_reducer from "./local_market_actions/closingData/closingData_reducer"
import invoices_reducer from "./local_market_actions/invoices/invoices_reducer"
import receipts_reducer from "./local_market_actions/receipts/receipts_reducer"

const appReducer = combineReducers({
  login: usersReducers,
  general: general_reducer,
  growers: growers_reducer,
  packingHouse: packingHouse_reducer,
  fruits: fruits_reducer,
  plotsDunam: plotsDunam_reducer,
  packingMaterials: packingMaterials_reducer,
  dealNames: dealNames_reducer,
  deals: dealsReducer,
  receivingFruits: receivingFruitsReducer,
  reportsReducer: reportsReducer,
  fixedInfo: fixedInfo_reducer,
  fruitSize: fruitSize_reducer,
  traders: traders_reducer,
  palletsMat: palletsMat_reducer,
  palletsMatCost: palletsMatCost_reducer,
  marketPacking: marketPackingMat_reducer,
  marketFruits: marketFruits_reducer,
  createPallet: createPallet_reducer,
  deliveryNote: delivery_reducer,
  manufacturerInvoice: manufacturerInvoice_reducer,
  closingData: closingData_reducer,
  invoices: invoices_reducer,
  receipts: receipts_reducer,
  localReports: localreportsReducer
});


// reset the store in case the user clicks on logout
const rootReducer = (state, action) => {
  if (action.type === 'RESET_APP') {
    state = undefined;
  }

  return appReducer(state, action);
}

export default rootReducer;

