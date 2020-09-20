import React, {useState, useEffect} from 'react';
//import logo from './logo.svg';
import {MenuItem,FormControl,Select} from "@material-ui/core";
import './App.css';
import InfoBox from './infoBox';
import Map from './map';
import Table from "./table";
import Tablevac from "./tablevac";
import { sortData, prettyPrintStat } from "./util";
import LineGraph from "./linegraph";
import { Card, CardContent, Typography } from '@material-ui/core';
import "leaflet/dist/leaflet.css";


function App() {
  // Hooks as Short Term Memory
   const [countries, setCountries] = useState(['USA','UK','India']);
   const [country, setCountry] = useState("worldwide");
   const [countryInfo, setCountryInfo] = useState({});
   const [tableData, setTableData] = useState([]);
   const [tablevacData, setTablevacData] = useState([]);
   const [mapCountries, setMapCountries] = useState([]);
   const [casesType, setCasesType] = useState("cases");
   const [mapCenter, setMapCenter] = useState({ lat: 15, lng:19 });//lat: 34.80746, lng: -40.4796 });
   const [mapZoom, setMapZoom] = useState(2);
 
   // https://disease.sh/v3/covid-19/countries

   // UseEffect : Runs a piece of code based on given conditions
   const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const d = new Date();

   useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/vaccine")
      .then((response) => response.json())
      .then((data) => {
        const vaccinesInfo = (data.data).map((vaccineinfo ) =>
        ({
          name : vaccineinfo.candidate,
          phase : vaccineinfo.trialPhase,
          details : vaccineinfo.details,
          mechanism : vaccineinfo.mechanism,
          institution : vaccineinfo.institutions,
          sponsors : vaccineinfo.sponsors,

        }));
        setTablevacData(vaccinesInfo);
      });
  }, []);

   useEffect(() => {

    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) =>{
        const countries = data.map((country) =>({
          name: country.country,
          value: country.countryInfo.iso2,
        }));
        const sortedData = sortData(data);
        setTableData(sortedData);
        setCountries(countries);
        setMapCountries(data);
      });
    };

    

    getCountriesData();

   }, []);

  //  const onCountryChange = (event) => {

  //    const countryCode = event.target.value;
   
  //    setCountry(countryCode);
  //   };

  const onCountryChange = async (e) => {
    const countryCode = e.target.value;
    console.log(countryCode + "<<<<<<<<<<<<<<<<<<<<<");
    const url =
      (countryCode === "worldwide")
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
        
    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);
       // console.log(data.countryInfo.lat + "<<<<<<<<<<<<<<<<<<<<<");
       // console.log(data.countryInfo.long + "<<<<<<<<<<<<<<<<<<<<<");
        if(url === "https://disease.sh/v3/covid-19/all")
             {
              setMapCenter([20,77]);
              setMapZoom(2);
              }

            else {
              setMapCenter([data.countryInfo.lat,data.countryInfo.long]);
              setMapZoom(4);
              } 
            

        
      });
  };
    
  return (
    <div className="AppB">
    <div className="App">

      <div className="app__left">
      {/* Header */}
      <div className="app__header">
      <h1 className="app__header__title">COVID-19 Tracker</h1>
      <h4>{monthNames[d.getMonth()] +" "+ d.getDate()+", "+d.getFullYear()+" | "+d.toLocaleTimeString().substr(0, 4)+d.toLocaleTimeString().substr(7)}</h4>
      <FormControl className="app__dropdown">
        <Select variant ="outlined" value={country} onChange={onCountryChange} >
        <MenuItem value="worldwide">Worldwide</MenuItem>
        {/* Loop through all Countries in a list */}
        {
          countries.map((country)=>(<MenuItem value={country.value}>{country.name}</MenuItem>))
        }

        {/*
        <MenuItem>Hello</MenuItem>
        <MenuItem>Hello</MenuItem>
        <MenuItem>Hello</MenuItem>
        <MenuItem>Hello</MenuItem>
         */}
        </Select>
      </FormControl>
      </div>

      

      {/* Title + Select input dropdown file */}
      
      <div className="app__stats">
        <InfoBox onClick={e => setCasesType('cases')} title="CoronaVirus cases" cases = {prettyPrintStat(countryInfo.todayCases)} total={countryInfo.cases} colr="orange"/>
        <InfoBox onClick={e => setCasesType('recovered')} title="Recovered" cases = {prettyPrintStat(countryInfo.todayRecovered)} total={countryInfo.recovered} colr="green" />
        <InfoBox onClick={e => setCasesType('deaths')} title="Deaths" total={countryInfo.deaths} cases = {prettyPrintStat(countryInfo.todayDeaths)} colr="red"/>
         {/* InfoBoxes */}
         {/* InfoBoxes */}
         {/* InfoBoxes */}
      </div>
      

      {/* Table  */}
      {/* Graphs */}

      {/* Maps */}
      <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
        />

    </div>
    <div className="app__right">
      
    <Card className = "">
      <CardContent>
    
        <h3 className="">Live cases by countries</h3>
        <Table countries = {tableData}/>
        <h3 className="" style={{marginBottom:20}}>Worldwide New {casesType}</h3>
         <LineGraph casesType={casesType} country= {country} />
      </CardContent>
      <h6 style={{textAlign: 'center', padding:20}}>Made for Awareness 🎈 by Shubham 😷 </h6>
    </Card>

    </div>
    </div>

    <div className="tablevac">
    <Tablevac vaccines = {tablevacData}/>
    </div>

    <h3 style={{textAlign: 'center' , padding: 50}}>Made for Awareness 🎈 by Shubham    😷   Stay Healthy Stay Safe </h3>
    </div>

  );
}

export default App;
