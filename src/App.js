import './App.css';
import "antd/dist/antd.css";
import React, { useEffect, useState, useRef } from "react";
import { Tabs } from "antd";
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
      label: 'Gobal CO2 Concentration',
      data: co2,
      backgroundColor: 'rgba(200, 200, 20, 0.3)',
      borderColor: 'rgba(200, 200, 20, 1)',
      borderWidth: 0.5,
      fill: true, // 是否填滿色彩
    },
    {
      label: 'Annual Average',
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
const data3 = {
  labels: GMSL_x,
  datasets: [
    {
      label: 'Gobal Mean Sea Level',
      data: GMSL,
      backgroundColor: 'rgba(54, 162, 235, 0.3)',
      borderColor: 'rgba(54, 162, 235, 1)',
      borderWidth: 0.5,
      fill: true, // 是否填滿色彩
    },
    {
      label: 'Regression Line',
      data: GMSL_reg,
      backgroundColor: 'rgba(54, 162, 54, 0.3)',
      borderColor: 'rgba(54, 162, 54, 1)',
      borderWidth: 1,
      fill: true, // 是否填滿色彩
    },
  ],
};

function App() {
  const [imgKey, setImgKey] = useState(1);
  const onChange = (key) => {
    setImgKey(key);
    console.log(imgKey);
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
      {/*Delta-X datas*/}
      <div style={{ width:'60%', minWidth: '30rem', marginTop: "3rem",  align_self: 'center', padding:'3rem 4rem', background: 'white', borderRadius: '2rem'}}>
        <h1 className='block_title'>DELTA-X</h1>
        <h1 className='intro'>NASA</h1>
        <img src='https://github.com/YellowJason/nasa_hack/blob/main/src/plot_data/loss_gain.gif?raw=true' style={{width: '100%'}}></img>
      </div>
      {/*Global datas*/}
      <div style={{ width:'60%', minWidth: '30rem', marginTop: "3rem",  align_self: 'center', padding:'3rem 4rem', background: 'white', borderRadius: '2rem'}}>
        <h1 className='block_title'>Global Climate data</h1>
        <h1 className='intro'>NASA</h1>
        <Tabs onChange={onChange} type="card" items={items}/>
        <div style={{border: '2px #D0D0D0 solid'}}>
          {imgKey==3? co2Plot : imgKey==2 ? tempPlot:seaPlot}
        </div>
      </div>
    </div>
  );
}

export default App;
