import React,{useState} from 'react'

import {BrowserRouter, Route, Switch} from 'react-router-dom'


import Dashboard from '../Pages/Dashboard'
import Loginadmin from "../Pages/Loginadmin";
import Home from "../Pages/Home";
import Loginexecutive from "../Pages/Loginexecutive";
import Loginmanagement from '../Pages/Loginmanagement';
import Usercreate from "../Pages/Usercreate";
import Admin from "../Pages/Admin";
import Department from '../Pages/Department';
import Factory from "../Pages/Factories";
import Device from "../Pages/Device";
import ProductLine from "../Pages/ProductLine";
import Settings from "../Pages/Settings";
import Fault from "../Pages/FaultReason";
import ProductInfo from "../Pages/ProductInfo";
import ProductionOrder from "../Pages/ProductionOrder";
import ProductCard from "../Pages/ProductCard";
import ProductCalendar from "../Pages/ProductCalendar";
import ProductionSort from "../Pages/ProductionSort";
import Shift from "../Pages/Shift";
import SpecialCase from "../Pages/SpecialCase";
import SpecialCasesEmail from "../Pages/SpecialCasesEmail";
import VerifyAdmin from "../Pages/VerifyAdmin";
import VerifyExecutive from "../Pages/VerifyExecutive";
import VerifyManagement from "../Pages/VerifyManagement";
import Pleaseverify from "../Pages/Pleaseverify";
import SendEmail from "../Pages/SendEmail";
import ForgotPasswordAdmin from "../Pages/ForgotPasswordAdmin";
import SendEmailexecutive from "../Pages/SendEmailexecutive";
import ForgotPasswordExecutive from "../Pages/ForgotPasswordExecutive";
import SendEmailmanagement from "../Pages/SendEmailmanagement";
import ForgotPasswordManagement from "../Pages/ForgotPasswordManagement";


const Routes = () => {

    return (

            <Switch>

                <Route path="/Loginmanagement" component={Loginmanagement} />
                <Route path="/Loginexecutive" component={Loginexecutive} />
                <Route path="/Loginadmin" component={Loginadmin}/>
                <Route path="/Home" component={Home}/>
                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/Usercreate" component={Usercreate} />
                <Route path="/Admin" component={Admin} />
                <Route path="/Department" component={Department} />
                <Route path="/Factory" component={Factory} />
                <Route path="/Device" component={Device} />
                <Route path="/ProductLine" component={ProductLine} />
                <Route path="/Settings" component={Settings} />
                <Route path="/Fault" component={Fault} />
                <Route path="/ProductInfo" component={ProductInfo} />
                <Route path="/ProductionOrder" component={ProductionOrder} />
                <Route path="/ProductCard" component={ProductCard} />
                <Route path="/ProductCalendar" component={ProductCalendar} />
                <Route path="/ProductionSort" component={ProductionSort} />
                <Route path="/Shift" component={Shift} />
                <Route path="/SpecialCase" component={SpecialCase} />
                <Route path="/SpecialCasesEmail" component={SpecialCasesEmail} />
                <Route path="/VerifyAdmin/:confirmationCode" component={VerifyAdmin} />
                <Route path="/VerifyExecutive/:confirmationCode" component={VerifyExecutive} />
                <Route path="/VerifyManagement/:confirmationCode" component={VerifyManagement} />npm start
                <Route path="/Pleaseverify" component={Pleaseverify} />
                <Route path="/SendEmail" component={SendEmail} />
                <Route path="/ForgotPasswordAdmin/:confirmationCode" component={ForgotPasswordAdmin} />
                <Route path="/SendEmailexecutive" component={SendEmailexecutive} />
                <Route path="/ForgotPasswordExecutive/:confirmationCode" component={ForgotPasswordExecutive} />
                <Route path="/SendEmailmanagement" component={SendEmailmanagement} />
                <Route path="/ForgotPasswordManagement/:confirmationCode" component={ForgotPasswordManagement} />

            </Switch>




    )
}

export default Routes