import './App.css';
import "antd/dist/antd.css";
import React, { useEffect, useState, useRef } from "react";
import 'animate.css';
import { Tabs, InputNumber} from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import GMSL_x from "./plot_data/GMSL_x";
import GMSL from "./plot_data/GMSL";
import GMSL_reg from "./plot_data/GMSL_reg";
import co2_x from "./plot_data/co2_x";
import co2 from "./plot_data/co2";
import co2_mean from "./plot_data/co2_mean"
import temp_x from "./plot_data/temp_x";
import temp from "./plot_data/temp";
import temp_mean from "./plot_data/temp_mean"
import missi from "./plot_data/Missi"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {position: 'top',},
  },
  elements: {
    point: {radius: 0.5, pointStyle: 'circle'}
  }
};
//data of CO2
const data1 = {
  labels: co2_x,
  datasets: [
    {
      label: 'Gobal CO2 Concentration (ppm)',
      data: co2,
      backgroundColor: 'rgba(200, 200, 20, 0.3)',
      borderColor: 'rgba(200, 200, 20, 1)',
      borderWidth: 0.5,
      fill: true, // 是否填滿色彩
    },
    {
      label: 'Annual Average (ppm)',
      data: co2_mean,
      backgroundColor: 'rgba(54, 162, 54, 0.3)',
      borderColor: 'rgba(54, 162, 54, 1)',
      borderWidth: 1,
      fill: true, // 是否填滿色彩
    },
  ],
};
//data of temperture
const data2 = {
  labels: temp_x,
  datasets: [
    {
      label: 'Land-Ocean Temperature Index',
      data: temp,
      backgroundColor: 'rgba(200, 122, 20, 0.3)',
      borderColor: 'rgba(200, 122, 20, 1)',
      borderWidth: 1,
      fill: true, // 是否填滿色彩
    },
    {
      label: 'Trend',
      data: temp_mean,
      backgroundColor: 'rgba(200, 62, 54, 0.3)',
      borderColor: 'rgba(200, 62, 54, 1)',
      borderWidth: 2,
      fill: true, // 是否填滿色彩
    },
  ],
};
// data of sea level
const Missi_year = [1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012];
const Missi = [0.8746875, 0.7318571, 0.9424705, 1.0752439, 1.0126136, 1.04, 0.9739394, 0.7925, 1.1518792, 1.3045541, 1.3466935, 1.2368496, 1.1166752, 1.3170803]
const data3 = {
  labels: GMSL_x,
  datasets: [
    {
      label: 'Gobal Mean Sea Level (mm)',
      data: GMSL,
      backgroundColor: 'rgba(54, 162, 235, 0.3)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 0.5,
      fill: true, // 是否填滿色彩
    },
    {
      label: 'Regression Line (mm)',
      data: GMSL_reg,
      backgroundColor: 'rgba(54, 162, 54, 0.3)',
      borderColor: 'rgba(54, 162, 54, 1)',
      borderWidth: 1,
      fill: true, // 是否填滿色彩
    },
    {
      label: 'Mississippi river water level (cm)',
      data: missi,
      backgroundColor: 'rgba(162, 54, 54, 0.8)',
      borderColor: 'rgba(162, 54, 54, 0.8)',
      borderWidth: 4,
      fill: true, // 是否填滿色彩
    },
    
  ],
};


function App() {
  const [imgKey, setImgKey] = useState(1);
  // CO2 reduction num
  const [tree_r, setTree_r] = useState(10);
  const [car_r, setCar_r] = useState(1000);
  const [reduction, setReduction] = useState(267);
  const co2_speed = 4500;
  const tree = 12;
  const car = 0.147;

  const onChange = (key) => {
    setImgKey(key);
    console.log(imgKey);
  };
  const onChange1 = (value) => {
    setTree_r(value);
    setReduction(tree*value + car*car_r);
    console.log(reduction);
  };
  const onChange2 = (value) => {
    setCar_r(value);
    setReduction(tree*tree_r + car*value);
    console.log(reduction);
  };

  const co2Plot = (<Line options={options} data={data1}/>);
  const tempPlot = (<Line options={options} data={data2}/>);
  const seaPlot = (<Line options={options} data={data3}/>);
  const items = [
    {label: `Sea Level`,key: 1},
    {label: `Global Temperture`,key: 2},
    {label: `CO2 Concentration`,key: 3}
  ];

  return (
    <div style={{width:'100%', padding:'2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#D0D0D0'}}>
      <h1 className='ProjectName'>From Mississippi to the Earth</h1>
      <h1 className='ProjectIntro'>- What do we learn from NASA Delta-X mission -</h1>
      <a className="YT-link" href="https://www.youtube.com/watch?v=N6DNqbOZ3yM" target="_blank" rel="noopener noreferrer">Introduction video on youtube</a>
      {/*Delta-X datas*/}
      <div style={{ width:'60%', minWidth: '30rem', marginTop: "3rem",  align_self: 'center', padding:'3rem 4rem', background: 'white', borderRadius: '2rem'}}>
        <h1 className='block_title'>DELTA-X</h1>
        <h1 className='intro'>
          The Delta-X mission is a NASA mission studying the Mississippi River Delta, which has suffered a massive land loss from mid 20th century.
        </h1>
        <img src='https://github.com/YellowJason/nasa_hack/blob/main/src/plot_data/loss_gain.gif?raw=true' style={{width: '100%'}}></img>
        <a className="App-link" href="https://deltax.jpl.nasa.gov/" target="_blank" rel="noopener noreferrer">Learn more on NASA Delta-X website</a>
      </div>
      {/*Global datas*/}
      <div style={{ width:'60%', minWidth: '30rem', marginTop: "3rem",  align_self: 'center', padding:'3rem 4rem', background: 'white', borderRadius: '2rem'}}>
        <h1 className='block_title'>Global Climate data</h1>
        <h1 className='intro'>The main factor causing Mississippi River Delta lossing is "River Level Rising",
        and many scientists suspect the real murderer behind is Global climate change.
        So we collect some global climate datas from NASA. Trying to find out the relation between the Delta and the Earth.</h1>
        <Tabs onChange={onChange} type="card" items={items}/>
        <div style={{border: '2px #D0D0D0 solid'}}>
          {imgKey==3? co2Plot : imgKey==2 ? tempPlot:seaPlot}
        </div>
        <a className="App-link" href="https://climate.nasa.gov/vital-signs/carbon-dioxide/" target="_blank" rel="noopener noreferrer">Learn more on NASA vital signs website</a>
      </div>
      <div style={{ width:'60%', minWidth: '30rem', marginTop: "3rem",  align_self: 'center', padding:'3rem 4rem', background: 'white', borderRadius: '2rem'}}>
        <h1 className='block_title'>Did you find something ?</h1>
        <h1 className='intro_2'>As you can see from above plot, Mississippi water level was following sea level as suspection.
        Furthermore, it's very sensitive. Few mm of sea level rising will cause 10x rising in Mississippi water level, thus causing huge land lossing.
        So in order to save Mississippi Delta, we need to save the sea level first.</h1>
        <img src='https://github.com/YellowJason/nasa_hack/raw/main/nasa_data/regression.jpg' style={{width: '60%', margin: '0% 20%'}}></img>
        <h1 className='intro_2'>We further study the relationship of Sea Level and CO2 concentration, find out those two data are highly related.
        So we make a bold assumption that reduce CO2 emission can slow down sea level rising to a certain degree</h1>
      </div>
      <div style={{ width:'60%', minWidth: '30rem', marginTop: "3rem",  align_self: 'center', padding:'3rem 4rem', background: 'white', borderRadius: '2rem'}}>
        <h1 className='block_title'>What can we do</h1>
        <h1 className='intro'>The CO2 emission per capita now is ...</h1>
        <p class='wow slideInUp' className='amp'>4.5 tonne/year</p>
        <h1 className='intro'>According to this speed, sea level will rise 1cm within next</h1>
        <p className='amp'>2.85 years</p>
        <h1 className='intro'>Everyone on the planet working together is the only way to  save this severe situation.</h1>
        <h1 className='intro'>If everyone ...</h1>
        <div style={{height: '2rem', width: '100%'}}></div>
        <div style={{display: 'flex', flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center', alignItems: 'center',}}>
          <h1 className='intro_3' style={{align_self: 'center'}}>Plants&nbsp;</h1>
          <InputNumber size="large" min={0} max={200} value={tree_r} onChange={onChange1}/>
          <h1 className='intro_3' style={{align_self: 'center'}}>&nbsp;Trees and reduces car mileage&nbsp;</h1>
          <InputNumber size="large" min={0} max={10000} value={car_r} onChange={onChange2}/>
          <h1 className='intro_3' style={{align_self: 'center'}}>&nbsp;km/year.</h1>
          <h1 className='intro_3' style={{align_self: 'center'}}>The global CO2 emission will decreased by {Math.round(reduction/co2_speed*10000)/100}%</h1>
          <h1 className='intro_4'>*Estimate by : Tree absorbs CO2 12kg/year, Car emits CO2 0.147kg/km</h1>
        </div>
        <div style={{height: '2rem', width: '100%'}}></div>
        <h1 className='intro'>And the time it takes for sea level to rise 1cm will be extended to</h1>
        <p className='amp'>{Math.round(2.85*co2_speed/(co2_speed-reduction)*100)/100} years</p>
      </div>
      <div style={{height: '4rem', width: '100%'}}></div>
      <h1 className='intro'>Made by Nanchi318 @NASA Space Apps Challenge 2022</h1>
      <div style={{width: '100%', display: 'flex', flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <a className="App-link" href="https://github.com/YellowJason/nasa_hack" target="_blank" rel="noopener noreferrer">Visit the Github repository of this website</a>
      <a className="App-link" href="https://colab.research.google.com/drive/15tlxEjaLg2qNI0JwZpfNkOY3MbhWGmyk?usp=sharing" target="_blank" rel="noopener noreferrer">View our analysis on Colab</a>
      </div>
      
    </div>
  );
}

export default App;
