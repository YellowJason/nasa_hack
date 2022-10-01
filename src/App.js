import './App.css';
import "antd/dist/antd.css";
import React, { useEffect, useState, useRef } from "react";
import {Input, Select} from "antd";
const { Option } = Select;

const handleChange = (value) => {
  console.log(`selected ${value}`);
};

function App() {
  return (
    <div className="App">
      <p1>hellow world</p1>
      <Select defaultValue="lucy" style={{width: 120,}} onChange={handleChange}>
        <Option value="jack">Jack</Option>
        <Option value="lucy">Lucy</Option>
        <Option value="disabled" disabled>Disabled</Option>
        <Option value="Yiminghe">yiminghe</Option>
      </Select>
      <Select defaultValue="lucy" style={{width: 120,}}>
        <Option value="lucy">Lucy</Option>
      </Select>
    </div>
  );
}

export default App;
