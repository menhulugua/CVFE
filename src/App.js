import './App.scss';
import ToggleButton from './ToggleButton';
import jsondata from './data.json';
import { useEffect, useState } from 'react';
import {
  Chart,
  BarSeries,
  Title,
  ArgumentAxis,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Animation } from '@devexpress/dx-react-chart';


export default function App() {
  const [showing, setShowing] = useState(true);
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
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
    console.log(teamArray);
    setData2(teamArray);
  }, []);

  return (
    <div className="container">
      <div className="chart">
      <Chart
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
      <span>Chart showing</span><ToggleButton text1="AGE" text2="FOOTY" current={showing} handleClick={() => {setShowing((previous => !previous))}} />
      <table className="table">
        <tr className="header">
          <th>Name</th>
          <th>Age</th>
          <th>FootyTeam</th>
        </tr>
        {data.map((people, index) => {
           return (
            <tr key={index} className="row">
              <td>{people.Name}</td>
              <td>{people.Age}</td>
              <td>{people.FootyTeam}</td>
            </tr>
           ); 
        })}
      </table>
    </div>
  );
};
