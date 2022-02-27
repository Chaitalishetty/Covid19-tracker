import React,{useState,useEffect } from 'react';
import './App.css';
import {FormControl,Select,MenuItem,Card,CardContent} from "@material-ui/core";
import InfoBox from './InfoBox'; 
import Table from './Table';
import { sortData } from './util';
import LineGraph from './LineGraph';

function App() {
  // usestate declares a “state variable”. 
  const [countries, setCountries]  = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo,setCountryInfo]=useState({});
  const [tableData,setTableData]=useState([]);
  //State= variable in react
 useEffect(() => {
   fetch("https://disease.sh/v3/covid-19/all")
   .then(response=>response.json())
   .then(data=>{
     setCountryInfo(data)
   })
   
 }, []);
  //useeffect runs a piece of code based on given condition
  useEffect(()=>{
    const getCountriesData = async()=>{
      fetch('https://disease.sh/v3/covid-19/countries')
      .then((response)=>response.json())
      .then((data)=> {
        const countries =  data.map((country)=>(
          {
            name:country.country,
            value:country.countryInfo.iso2,
          }
        ));
        const sortedData=sortData(data);
        setTableData(sortedData);
        setCountries(countries);
      })

    };
    getCountriesData();

  },[]);

  const onCountryChange=async(event)=>{
    const countryCode=event.target.value;
    setCountry(countryCode);
    const url=countryCode==='worldwide'
    ? 'https://disease.sh/v3/covid-19/all'
    :`https://disease.sh/v3/covid-19/countries/${countryCode}`;
    await fetch(url)
    .then(response=>response.json())
    .then(data=>{
        setCountry(countryCode);
        setCountryInfo(data);
    })
  };

  /* Header */
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid 19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined" value={country} onChange={onCountryChange}
            >
            {/* JSX  */}
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map((country)=>(
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
            </Select>

          </FormControl>
        </div>
        <div className="app_stats">
          <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases}/>
          <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered}/>
          <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths}/>
        </div>
        <Card>
          <CardContent>
            <h3>Worldwide new cases</h3>
            <LineGraph />
          </CardContent>
        </Card>
        
      </div>
      <div className="app_right">
        <Card >
          <CardContent>
            <h3>Live Country Cases</h3>
            <Table countries={tableData}/>
            
          </CardContent>

        </Card>
      </div>
      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* InfoBoxs */}
      {/* Table */}
      {/* Graph */}
      {/* Map */}
    </div>
  );
}

export default App;
