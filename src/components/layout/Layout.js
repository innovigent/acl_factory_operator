import React, {useState,useEffect} from 'react'
import axios from 'axios';
import './layout.css'
import UserContext from '../../userContext'
import Routes from "../Routes";
import {BrowserRouter, Route} from 'react-router-dom'
import {HashLoader} from "react-spinners";

const Layout = () => {
    const [ userData, setUserData] = useState({
        token:"",
        user: "",
        role: "",
    });
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState("");
    useEffect(() => {
        const checkLoggedIn = async () => {
            let token = localStorage.getItem("Token");
            if(token === null){
                localStorage.setItem("Token", "");
                token = "";
            }
            try{
                const tokenResponse = await axios.post('https://acl-automation.herokuapp.com/api/v1/valid/token', null, {headers: {"x-auth-token": token}});
                setUserData({
                    token: tokenResponse.data.data.token,
                    user: tokenResponse.data.data.userId,
                    role : tokenResponse.data.data.permissionId,

                });
                setLoading(false)
            } catch(err) {
                setLoading(false)
                err.response.message && setErr(err.response.message)
            }

        }

        checkLoggedIn();
    }, []);
    if (loading) {
        return (
            <div style={{ padding: "10px 20px", textAlign: "center", justifyContent:"center", display:"flex", alignItems:"center", width:"100%", height:"100vh", backgroundColor:"#FFFFFF"}}>
                <HashLoader  loading={loading}  size={150} />
            </div>
        )
    }
        return (

            <BrowserRouter>
                <UserContext.Provider value={{ userData, setUserData }}>
                <Routes/>
                </UserContext.Provider>
            </BrowserRouter>

        )

}

export default Layout