import React from 'react';
import "./tablevac.css";
//import numeral from "numeral";
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();
function Tablevac({vaccines}) {
    return (
    
    <div className="vaccine">
     <h1 className="vaccine__header__title">VACCINE Tracker</h1> 
     <h4 className="vaccine__header__title">{monthNames[d.getMonth()] +" "+ d.getDate()+", "+d.getFullYear()+" | "+d.toLocaleTimeString().substr(0, 4)+d.toLocaleTimeString().substr(7)}</h4>  
    <div className="tablevac" style={{marginBottom:20}}>
    
      {vaccines.map((vaccine) => (
        <div>
        <tr>
          <td>
              <h2>{vaccine.name}</h2>
          </td>
          <td>
          {/* <div className="tableDetails"> */}
            <strong>
                <h3 style={{marginLeft: 25}}>{vaccine.phase}</h3>
                </strong>
            {/* </div> */}
              </td>
          <td>
              <h3>{vaccine.mechanism}</h3>
          </td>          
        </tr>
        
        <div className="institute">

            
        
        <div style={{marginLeft: 50, marginRight: 50}}>
         <h3 style={{marginTop:30, marginBottom:20 }}> Sponsers </h3>   
        {
        (vaccine.sponsors).map((sponsor)=>
        (
            <div className="tableDetails1" >{sponsor}</div>
        )
        )
        }
        </div>

        <div style={{marginLeft: 50, marginRight: 50}}>
        <h3 style={{marginTop:30, marginBottom:20}}> Institutes </h3>
            {
        (vaccine.institution).map((institute)=>
        (
            <div className="tableDetails1">{institute}</div>
        )
        )
        }
        </div>
        
        </div>

        <div className="tableDetails">{vaccine.details}</div>
           
        
        </div>

      ))}
      </div>

      </div>

    
    
    
    )
}

export default Tablevac
