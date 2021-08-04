import React, {useEffect,useState,useRef} from 'react';
import "../assets/css/Usercreate.css";
import "../assets/css/chooseButton.css";
import "../assets/css/operatorfrm.css";
import { makeStyles } from '@material-ui/core/styles';
import { css } from '@emotion/css' ;
import CreatableSelect from 'react-select/creatable';
import TopNav from "../components/topnav/TopNav";




function createData(name,empty) {
    return { name,empty};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

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


const Device = () => {
    const classes = useStyles();
    const [uuid, setUuid] = useState("");
    const [timerDays, setTimerDays] = useState("00");
  const [timerHours, setTimerHours] = useState("00");
  const [timerMinutes, setTimerMinutes] = useState("00");
  const [timerSeconds, setTimerSeconds] = useState("00");

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





    // create a preview as a side effect, whenever selected file is changed
    

    // function validateForm() {
    //     return email.length > 0 && password.length > 0;
    // }
    // const handleChange = (event) => {
    //     setType(event.target.value);
    // };
    // const imagehandleChange = (event) => {
    //     setImage(event.target.files[0]);
    // };

    function handleSubmit(event) {
        event.preventDefault();
    }

    // const onSelectFile = e => {
    //     if (!e.target.files || e.target.files.length === 0) {
    //         setSelectedFile(undefined)
    //         return
    //     }

    //     // I've kept this example simple by using the first image instead of multiple
    //     setSelectedFile(e.target.files[0])
    // }

    return (
        <>
        
                <div className="layout__content-main">
                 
                    <div className="row">
                        <div className="col-12">
                            <div className="card full-height">

                                
                                <div>

                                       
        

                                
                                <div className="textFieldContainer1">
                                    {/* <div className="right-corner">Date:</div>

                                    <div className="left-corner">Status:</div> */}
                                    </div>
                                    <div className="textFieldContainer1"></div>{/* to make space*/ }

                                    <div className="textFieldContainer1">
         
         timerDays: {timerDays} &nbsp; timerHours: {timerHours} &nbsp;
         timerMinutes: {timerMinutes} &nbsp; timerSeconds: {timerSeconds} &nbsp;
       </div>



                            <div className="textFieldContainer1">
                                <label>Production Order</label>
                                        <input type="text" autoFocus placeholder="" value={uuid}  onChange={(e) => setUuid(e.target.value)} />
                                    
                                    </div>

                                    <div className="textFieldContainer1">
                                <label>Excegetive Info</label>
                                        <input type="text" autoFocus placeholder="" value={uuid}  onChange={(e) => setUuid(e.target.value)} />
                                    
                                    </div>

                                    <div className="textFieldContainer1">
                                <label>Department</label>
                                        <input type="text" autoFocus placeholder="" value={uuid}  onChange={(e) => setUuid(e.target.value)} />
                                    
                                    </div>

                                    <div className="textFieldContainer1">
    <label htmlFor="productionorder">Reason</label>

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

                                    <div className="textFieldContainer1"></div>{/* to make space*/ }
                                    <div className="textFieldContainer1"></div>{/* to make space*/ }


                                   


                                        <button   onClick={handleSubmit}  className="submita">submit</button>
                                     
                                  
                                        <div className="textFieldContainer1"></div>{/* to make space*/ }
                               


                                </div>
                            </div>
                        </div>
                            {/* <Grid item xs={6}>
                            <div className="card full-height">

                            </div>
                            </Grid> */}
                        </div>
                    <TopNav/>
                </div>
          
        </>
    )
}

export default Device