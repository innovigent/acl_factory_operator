import React, {useEffect,useState,useRef} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { makeStyles } from '@material-ui/core/styles';
import { css } from '@emotion/css' ;
import CreatableSelect from 'react-select/creatable';
import TopNav from "../components/topnav/TopNav";
import Table from "../components/table/Table";
import axios from "axios";
import moment from 'moment';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const fields = [
    "Department Name",
    "Created At",
    "Action"
]

const rows = [
    {
        "id": 1,
        "firstName": "mujeeb",
        "lastName": "singham",
        "email": "chandulagayan@gmail.com",
        "verificationtoken": "1234",
        "epfNo": null,
        "phoneNo": "0776465645",
        "image": null,
        "statusId": 1,
        "password": "$2y$10$zrrjILLqTKyxYiR3jrOdvuaE.tEG3U148gVPoe7zYQLpitytXpyU2 ",
        "createdAt": "2021-07-16T10:38:11.002Z",
        "updatedAt": "2021-07-16T10:38:11.002Z",
    },
    {
        "id": 9,
        "firstName": "Gayath",
        "lastName": "Chandula",
        "email": "chandulagayan1@gmail.com",
        "verificationtoken": "g96wx6",
        "epfNo": "47586598",
        "phoneNo": null,
        "image": "uploads/dashboard.JPG-1626512057383.jpeg",
        "statusId": 50,
        "password": "$2b$10$vqy4Pln0C.V88NOCdpOOFOKZYHbVGWv.yV/7XLn7cpYxLQnV2PzPi",
    }
];

const renderOrderHead = (item, index) => (
    <th key={index}>{item}</th>
)
const renderOrderBody = (item, index) => (
    <tr key={index}>
        <td>{item.firstName}</td>
        <td>{moment(item.createdAt).format("MMM Do YY")}</td>
        <td>
            <button className="usertblbutton" >Delete</button>
        </td>
    </tr>
)

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

const SingleValue = ({
    cx,
    getStyles,
    selectProps,
    data,
    isDisabled,
    className,
    ...props
}) => {
console.log(props);
return (
<div
className={cx(
css(getStyles("singleValue", props)),
{
"single-value": true,
"single-value--is-disabled": isDisabled,

},
className
)}
>
<div>{selectProps.getOptionLabel(data)}</div>
</div>
);
};


const Downtime = () => {

      const classes = useStyles();
      const [uuid, setUuid] = useState("");
      const [timerDays, setTimerDays] = useState("00");
      const [timerHours, setTimerHours] = useState("00");
      const [timerMinutes, setTimerMinutes] = useState("00");
      const [timerSeconds, setTimerSeconds] = useState("00");
      const [type, setType] = React.useState('');

  let interval = useRef();

  const startTimer = (countdownDate) => {
    const now = new Date().getTime();
    const distance = countdownDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (distance < 0) {
      clearInterval(interval.current);
    } else {
      setTimerDays(days);
      setTimerHours(hours);
      setTimerMinutes(minutes);
      setTimerSeconds(seconds);
    }
  };

  function saveInLocalStorage(time) {
    localStorage.setItem("timer", time);
  }

  function getTimeFromLocalStorage() {
    return localStorage.getItem("timer");
  }

  useEffect(() => {
    const localTimer = getTimeFromLocalStorage();

    if (localTimer) {
      interval.current = setInterval(() => {
        startTimer(+localTimer);
      }, 1000);
    } else {
      const countdownDate = new Date().getTime() + 14 * 24 * 60 * 1000;
      saveInLocalStorage(countdownDate);
      interval.current = setInterval(() => {
        startTimer(+countdownDate);
      }, 1000);
    }

    return () => clearInterval(interval.current);
  }, []);


    function handleSubmit(event) {
        event.preventDefault();
    }

    const handleChange = (event) => {
        setType(event.target.value);
    };

    return (
        <>

                <div className="layout__content-main">

                    <div className="row">
                        <div className='col-12'>
                            <div className="card full-height">


                                <div>

                                <div className="textFieldContainer1">
                                    <div className="right-corner">Date:</div>
                                    <div className="middle">Line No:</div>

                                    <div className="left-corner">Status:</div>
                                    </div>
                                    <div className="textFieldContainer1"></div>{/* to make space*/ }

                                    <div className="textFieldContainer1">

                                         timerDays: {timerDays} &nbsp; timerHours: {timerHours} &nbsp;
                                         timerMinutes: {timerMinutes} &nbsp; timerSeconds: {timerSeconds} &nbsp;
                                       </div>



                            <div className="textFieldContainer1">
                                <label>Product</label>
                                        <input type="text" autoFocus placeholder="" value={uuid}  onChange={(e) => setUuid(e.target.value)} />

                                    </div>


                                    <div className="textFieldContainer1">
                                        <label htmlFor="productionorder">Production Order</label>

                                              <CreatableSelect
                                                options={""}
                                                className="orderNo"
                                                components={{ SingleValue}}
                                                isValidNewOption={() => false}
                                                // styles={customStyles}
                                                styles={{
                                                    menu: (provided, state) => ({
                                                        ...provided,
                                                        width: "90%",
                                                        padding: 30,
                                                    }),
                                                    singleValue: (provided, state) => ({
                                                        ...provided,
                                                        display: "flex",
                                                        alignItems: "center",
                                                        opacity : 0.5
                                                    })
                                                }}
                                             />
                                             </div>


                                            <div className="textFieldContainer1">
                                            <label htmlFor="Department">Department</label>

                                            <div className="wrapper1">
                                                <RadioGroup  aria-label="type" name="type" value={type} onChange={handleChange} row>
                                                    <FormControlLabel value="Electrical" control={<Radio color="primary" />} label="Electrical" />
                                                    <FormControlLabel value="Mechanical" control={<Radio color="primary" />} label="Mechanical" />
                                                    <FormControlLabel value="Production" control={<Radio color="primary" />} label="Production" />
                                                </RadioGroup>
                                            </div>
                                            </div>
                                    <div className="textFieldContainer1">
                                        <div className="wrapper1">
                                            <RadioGroup  aria-label="type" name="type" value={type} onChange={handleChange} row>
                                                <FormControlLabel value="uncategorized" control={<Radio color="primary" />} label="uncategorized" />
                                                <FormControlLabel value="EndShift" control={<Radio color="primary" />} label="End Shift" />
                                                <FormControlLabel value="Changeover" control={<Radio color="primary" />} label="Change over" />
                                            </RadioGroup>
                                        </div>
                                    </div>

                                    <div className="textFieldContainer1"></div>{/* to make space*/ }
                                    <div className="textFieldContainer1"></div>{/* to make space*/ }





                                        <button   onClick={handleSubmit}  className="submita">submit</button>

                                           <div className="textFieldContainer1"></div>{/* to make space*/ }





                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className='col-12'>
                            <div className="card full-height">
                                <Table
                                    limit="5"
                                    headData={fields}
                                    renderHead={(item, index) => renderOrderHead(item, index)}
                                    bodyData={rows}
                                    renderBody={(item, index) => renderOrderBody(item, index)}
                                />
                            </div>
                        </div>
                    </div>
                    <TopNav/>
                </div>

        </>
    )
}

export default Downtime