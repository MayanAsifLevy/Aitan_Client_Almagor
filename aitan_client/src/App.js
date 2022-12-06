import React from 'react';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './components/mainPage/mainPageStyle.css'
import './components/general_comp/genericUpdatePageStyle.css'

import { Route, Routes } from 'react-router-dom';

import Login from './components/login/LogIn';
import SeasonSelect from './components/login/SeasonSelect';

import MainPage from './components/mainPage/MainPage';

import GrowersPage from './components/rec_fruit_comp/growers/Growers';
import PackingHousePage from './components/rec_fruit_comp/packingHouse/PackingHouse'
import FruitsPage from './components/rec_fruit_comp/fruits/Fruits'

import PlotsPage from './components/rec_fruit_comp/plotsDunam/PlotsDunam'
import PackingMaterialPage from './components/rec_fruit_comp/packingMaterial/PackingMaterial'
import DealNamesPage from './components/rec_fruit_comp/dealNames/DealNames'
import ReceiveFruitsPage from './components/rec_fruit_comp/receivingFruits/ReceiveFruits'
import DealsPage from './components/rec_fruit_comp/deals/Deals'

import FixedInfoPage from './components/local_market_comp/fixedInfo/FixedInfo'
import FruitSizePage from './components/local_market_comp/fruitSize/FruitSize'
import TradersPage from './components/local_market_comp/traders/Traders'
import PalletsMatPage from './components/local_market_comp/palletsMat/PalletMat'
import PalletsMatCostPage from './components/local_market_comp/palletsMatCost/PalletMatCost'
import MarketPackingMatPage from './components/local_market_comp/marketPackingMat/MarketPackingMat'
import MarketFruitsPage from './components/local_market_comp/marketFruits/MarketFruits'

import CreatePalletPage from './components/local_market_comp/createPallet/CreatePallet'
import DeliveryNotePage from './components/local_market_comp/deliveryNote/DeliveryNote'
import DeliveryNoteReport from './components/local_market_comp/deliveryNote/DeliveryNoteReport'
import DeliveryNote2prctReport from './components/local_market_comp/deliveryNote/DeliveryNote2prctReport'
import ManufacturerInvoicePage from './components/local_market_comp/manufacturerInvoice/ManufacturerInvoice'
import ClosingDataPage from './components/local_market_comp/closingData/ClosingData'
import InvoicesPage from './components/local_market_comp/invoices/Invoices'
import InvoiceReport from './components/local_market_comp/invoices/report/InvoiceReport'
import ReceiptsPage from './components/local_market_comp/receipts/receipts'


import ReportsReceiveMainPage from './components/reports/rec_fruits_reports/a_general/ReportsReceiveMainPage'
import ReportsLocalMainPage from './components/reports/local/a_general/ReportsLocalMainPage'

import MonthlyReportFilter from './components/reports/rec_fruits_reports/monthly/MonthlyReportFilter'
import MonthlyReportGrowerFruitType from './components/reports/rec_fruits_reports/monthly/MonthlyReportGrowerFruitType'
import MonthlyReportGrowerDeal from './components/reports/rec_fruits_reports/monthly/MonthlyReportGrowerDeal'

import DailyReportFilter from './components/reports/rec_fruits_reports/daily/DailyReportFilter'
import DailyReportGrower from './components/reports/rec_fruits_reports/daily/DailyReportGrower'

import SeasonReportFilter from './components/reports/rec_fruits_reports/season/SeasonReportFilter'
import SeasonReportGrower from './components/reports/rec_fruits_reports/season/SeasonReportGrower'

import SummaryReportFilter from './components/reports/rec_fruits_reports/summary/SummaryReportFilter'
import SummaryMonthReport from './components/reports/rec_fruits_reports/summary/SummaryMonthReport'
import SummaryMonthPackingMatReport from './components/reports/rec_fruits_reports/summary/SummaryMonthPackingMatReport'
import SummarySeasonReport from './components/reports/rec_fruits_reports/summary/SummarySeasonReport'
import SummarySeasonGrowersReport from './components/reports/rec_fruits_reports/summary/SummarySeasonGrowersReport'
import SummarySeasonFruitPackhouseReport from './components/reports/rec_fruits_reports/summary/SummarySeasonFruitPackhouseReport'

import PlotReportFilter from './components/reports/rec_fruits_reports/plot/PlotReportFilter'
import PlotReportPerdates from './components/reports/rec_fruits_reports/plot/PlotReportPerdates'

import PalletsWOinvoicesReportFilter from './components/reports/local/palletsWOinvoices/PalletsWOinvoicesReportFilter'
import PalletsWOinvoicesReport from './components/reports/local/palletsWOinvoices/PalletsWOinvoicesReport'

function App() {

  return (
    <div id='root'>
      <div className="app">
        <Routes>
       
      
          <Route path="/" element={<Login />} />
          {/* <Route path="/createAccount" element= {<CreateAccount/>} / > */}
          
          <Route path="/monthlyReportGrowerFruitType" element={<MonthlyReportGrowerFruitType />} />
          <Route path="/monthlyReportGrowerDeal" element={<MonthlyReportGrowerDeal />} />
          <Route path="/dailyReportGrower" element={<DailyReportGrower />} />
          <Route path="/seasonReportGrower" element={<SeasonReportGrower />} />
          <Route path="/SummaryMonthReport" element={<SummaryMonthReport />} />
          <Route path="/SummaryMonthPackingMatReport" element={<SummaryMonthPackingMatReport />} />
          <Route path="/summarySeasonReport" element={<SummarySeasonReport />} />
          <Route path="/summarySeasonGrowersReport" element={<SummarySeasonGrowersReport />} />
          <Route path="/summarySeasonFruitPackhouseReport" element={<SummarySeasonFruitPackhouseReport />} />
          <Route path="/plotReportPerDates" element={<PlotReportPerdates />} />

          <Route path="/deliveryNoteReport" element={<DeliveryNoteReport />} />
          <Route path="/deliveryNote2prctReport" element={<DeliveryNote2prctReport />} />
          <Route path="/invoiceReport" element={<InvoiceReport />} />
          <Route path="/palletsWOinvoicesReport" element={<PalletsWOinvoicesReport />} />

          <Route path="/seasonSelect" element={<SeasonSelect />} />
          
          
          <Route path='/mainPage/*' element={<MainPage />}>
                <Route path="growers" element={<GrowersPage />} />
                <Route path="packingHouse" element={<PackingHousePage />} />
                <Route path="fruits" element={<FruitsPage />} />
                <Route path="plots" element={<PlotsPage />} />
                <Route path="packingMaterials" element={<PackingMaterialPage />} />
                <Route path="dealNames" element={<DealNamesPage />} />
                <Route path="deals" element={<DealsPage />} />
                <Route path="receiveFruits" element={<ReceiveFruitsPage />} />   
               
                  
                <Route path="fruitSize" element={<FruitSizePage />} />  
                <Route path="traders" element={<TradersPage />} />
                <Route path="palletsMat" element={<PalletsMatPage />} />
                <Route path="palletsMatCost" element={<PalletsMatCostPage />} />
                <Route path="marketPackingMat" element={<MarketPackingMatPage />} />
                <Route path="marketFruits" element={<MarketFruitsPage />} />
                <Route path="fixedInfo" element={<FixedInfoPage />} />
                

                <Route path="createPallet" element={<CreatePalletPage />} /> 
                <Route path="deliveryNote" element={<DeliveryNotePage />} /> 
                <Route path="manufacturerInvoice" element={<ManufacturerInvoicePage />} /> 
                <Route path="closingData" element={<ClosingDataPage />} /> 
                <Route path="invoices" element={<InvoicesPage />} /> 
                <Route path="receipts" element={<ReceiptsPage />} /> 
                
                

                <Route path="reportsReceiveMain/*" element={<ReportsReceiveMainPage/>}>
                  <Route path="dailyReportFilter" element={<DailyReportFilter />} />
                  <Route path="monthlyReportFilter" element={<MonthlyReportFilter />} />
                  <Route path="seasonReportFilter" element={<SeasonReportFilter />} />
                  <Route path="summaryReportFilter" element={<SummaryReportFilter />} />
                  <Route path="plotReportFilter" element={<PlotReportFilter />} />
                </Route>

                <Route path="reportsLocalMain/*" element={<ReportsLocalMainPage/>}>
                  <Route path="palletsWOinvoicesReportFilter" element={<PalletsWOinvoicesReportFilter />} />
                </Route>
          </Route>


        </Routes>
      </div>
    </div>
  )
}

export default App;
