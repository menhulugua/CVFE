import './App.scss';
import ToggleButton from './ToggleButton';
import jsondata from './data.json';
import { useEffect, useState } from 'react';
import {
  Chart,
  BarSeries,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


export default function App() {
  const [showing, setShowing] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true); // disable button animation on first load
  useEffect(() => {
    setData(jsondata);
    const team = {};
    data.forEach(people => {
      team[people.FootyTeam] = team[people.FootyTeam] === undefined? 1 : team[people.FootyTeam] + 1; 
    });
    const teamArray = [];
    for (const [key, value] of Object.entries(team)) {
      teamArray.push({
        team: key,
        count: value
      })
    }
    teamArray.sort((a, b) => a.name < b.name);
    setData2(teamArray);
  }, [data]);

  const text1 = <span><img src="./icon-age.png" alt="icon-age" /> AGE</span>;
  const text2 = <span><img src="./icon-footy.png" alt="icon-footy" /> FOOTY</span>;

  const handleClick = () => {
    setShowing((previous => !previous));
    setFirstLoad(false);
  }

  return (
    <div className="container">
      <div className="chart">
      <Chart className="chart"
          data={showing? data : data2}
        >
          <ArgumentAxis />
          <ValueAxis max={showing? 100: 10} />

          <BarSeries
            valueField={showing? "Age" : "count"}
            argumentField={showing? "Name" : "team"} 
          />
          <Animation />
        </Chart>
      </div>
      <div className="button-box">
        <span>Chart showing</span><ToggleButton text1={text1} text2={text2} current={showing} firstLoad={firstLoad} handleClick={handleClick} />
      </div>
      <table  cellSpacing="0" cellPadding="0" className="table">
        <thead>
          <tr className="header">
            <th>Name</th>
            <th>Age</th>
            <th>FootyTeam</th>
          </tr>
        </thead>
        <tbody>
          {data.map((people, index) => {
            return (
              <tr key={index} className="row">
                <td>{people.Name}</td>
                <td>{people.Age}</td>
                <td>{people.FootyTeam}</td>
              </tr>
            ); 
          })}
        </tbody>
      </table>
    </div>
  );
};
