import React from "react";
import "./App.css";

const dateArray = ['24-Apr-2024', '02-May-2024', '09-May-2024', '31-May-2024', '21-Jun-2024'];
const strategyArray = [
  {
    'View': 'Bullish',
    'Value': {
      '24-Apr-2024': ['Bull Call Spread', 'Bull Put Spread', 'Bull Put Spread', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Bull Call Spread'],
      '02-May-2024': ['Bull Call Spread', 'Bull Call Spread', 'Bull Put Spread', 'Long Call', 'Long Call', 'Long Call', 'Bull Put Spread', 'Bull Call Spread', 'Strategy1', 'Bull Call Spread', 'Strategy2', 'Strategy1', 'Strategy2', 'Bull Call Spread'],
      '09-May-2024': ['Strategy Put', 'Strategy Call', 'Strategy Call', 'Strategy Call', 'Strategy Put'],
    },
  },
  {
    'View': 'Bearish',
    'Value': {
      '24-Apr-2024': ['Bear Call Spread', 'Bear Call Spread', 'Bear Call Spread', 'Long Put', 'Long Put', 'Long Put', 'Bear Call Spread'],
      '31-May-2024': ['Long Put', 'Long Put', 'Long Put', 'Long Put', 'Long Put'],
      '21-Jun-2024': ['Strategy3', 'Strategy3', 'Bear Put Spread', 'Strategy3', 'Long Put', 'Long Put'],
    },
  },
  {
    'View': 'RangeBound',
    'Value': {
      '24-Apr-2024': ['Short Straddle', 'Short Strangle', 'Short Strangle', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Short Straddle'],
      '02-May-2024': ['Short Straddle', 'Short Straddle', 'Short Strangle', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Short Strangle', 'Short Straddle', 'Strategy1', 'Short Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Short Straddle'],
      '21-Jun-2024': ['Iron Condor', 'Iron Butterfly', 'Iron Butterfly', 'Iron Butterfly', 'Iron Condor'],
    },
  },
  {
    'View': 'Volatile',
    'Value': {
      '02-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy1', 'Strategy1', 'Spread-Strategy', 'Long Straddle'],
      '09-May-2024': ['Long Straddle', 'Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Straddle', 'Strategy1', 'Long Straddle', 'Strategy2', 'Strategy1', 'Strategy2', 'Long Straddle'],
      '31-May-2024': ['Long Straddle', 'Long Strangle', 'Long Strangle', 'Long Strangle', 'Long Straddle'],
    },
  },
];

const App = () => {
  const [selectedView, setSelectedView] = React.useState('Bullish');
  const [selectedDate, setSelectedDate] = React.useState(dateArray[0]);

  const handleViewChange = (view) => {
    setSelectedView(view);
  };

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  const getStrategiesForDate = () => {
    const selectedStrategies = strategyArray.find(item => item.View === selectedView)?.Value[selectedDate] || [];
    const strategyCount = selectedStrategies.reduce((acc, strategy) => {
      acc[strategy] = (acc[strategy] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(strategyCount);
  };

  const strategies = getStrategiesForDate();

  return (
    <div className="container">
      <div className="toggle-container">
        {['Bullish', 'Bearish', 'RangeBound', 'Volatile'].map(view => (
          <div
            key={view}
            className={`toggle-button ${selectedView === view ? 'active' : ''}`}
            onClick={() => handleViewChange(view)}
          >
            {view}
          </div>
        ))}
      </div>
      <div className="dropdown">
        <select value={selectedDate} onChange={handleDateChange}>
          {dateArray.map(date => (
            <option key={date} value={date}>{date}</option>
          ))}
        </select>
      </div>
      {strategies.length > 0 ? (
        strategies.map(([name, count]) => (
          <div key={name} className="card">
            <h3>{name}</h3>
            <p>{count} {count > 1 ? 'Strategies' : 'Strategy'}</p>
           
          </div>
        ))
      ) : (
        <div className="empty-state">
        There are no strategies for 
        <br />
        {selectedDate}
      </div>
      )}
    </div>
  );
};

export default App;
