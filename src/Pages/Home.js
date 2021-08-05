import React, {useEffect,useState} from 'react';
import "../assets/css/Usercreate.css";
import TopNav from "../components/topnav/TopNav";
import axios from 'axios';



const Home = () => {

    const [listData, setListData] = useState({ lists: [] });
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(true);
    const macaddress = localStorage.getItem('macaddress')
    const productionrunId = localStorage.getItem('productionrunId')

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(
                `https://acl-automation.herokuapp.com/api/v1/createproductionrunIPC/${macaddress}/${productionrunId}/getall`,
            );
            setListData({lists:result.data.data.productionOrders})
            setLoading(false);
        };
        fetchData();
    }, [])



    return (
        <>

            <div id="container">
                <div className="position">
                    <div className="card full-height">
                                        <div className="textFieldContainer1">
                                            {/* <div className="right-corner">Date:</div> */}
                                                <div className="left-corner">Status:</div>
                                            </div>
                                            <div className="textFieldContainer1"></div>{/* to make space*/ }
                                                <div className="textFieldContainer1">
                                                    <label htmlFor="productionorder"><h1>Production Order</h1></label>
                                                    <label htmlFor="productionorder"><h1>{listData.lists[0].productionorderId}</h1></label>
                                                    </div>
                                                    <div className="textFieldContainer1">
                                                    <label htmlFor="productionorder"><h1>Product</h1></label>
                                                        <label htmlFor="productionorder"><h1>{listData.lists[0].productInfos.productName}</h1></label>
                                                    </div>
                                        <div className="textFieldContainer1">
                                            <label htmlFor="productionorder"><h1>Machine speed</h1></label>
                                            <label htmlFor="productionorder"><h1>{listData.lists[0].machineSpeed}</h1></label>
                                        </div>
                                        <div className="textFieldContainer1">
                                            <label htmlFor="productionorder"><h1>Planned total</h1></label>
                                            <label htmlFor="productionorder"><h1>{listData.lists[0].outputQuantity}</h1></label>
                                        </div>
                                    <div className="textFieldContainer1"></div>{/* to make space*/ }
                                    <div className="textFieldContainer1"></div>{/* to make space*/ }
                                <div className="textFieldContainer1"></div>{/* to make space*/ }
                            </div>
                        </div>
                <TopNav/>
            </div>
        </>
    )
}

export default Home