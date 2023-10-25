import { useEffect, useState } from "react";
import axios from "axios";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill } from 'react-icons/bs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Welcome = () => {
  const [crimeData, setCrimeData] = useState([]);
  const [accidentData, setAccidentData] = useState([]);
  const [solvedCrime, setSolvedCrimeData] = useState([]);
  const [unSolvedCrime, setUnSolvedCrimeData] = useState([]);
  const [solvedAccident, setSolvedAccident] = useState([]);
  const [unSolvedAccident, setUnSolvedAccident] = useState([]);
  useEffect(() => {
    // getUser();
    getCrimes()
    getAccidents()
    getUnsolvedCrime()
    getSolvedCrime()
    getUnsolvedAccident()
    getSolvedAccident()
  }, []);

  // const getUser = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     const response = await axios.get(`http://localhost:5000/api/user`, {
  //       headers: {
  //         Authorization: `${token}`,
  //       },
  //     });
  //     const users = response.data.data.name;
  //     setName(users);
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //   }
  // };

  const getCrimes = () => {
    axios.get(`http://localhost:5000/api/crime-report`)
      .then(result => {
        setCrimeData(result.data)
      })
      .catch(err => console.log(err));
  };

  const getAccidents = () => {
    axios.get(`http://localhost:5000/api/accident-report`)
      .then(result => {
        setAccidentData(result.data)
      })
      .catch(err => console.log(err));
  };

  const getUnsolvedCrime = () => {
    axios.get(`http://localhost:5000/api/solved-crime/unsolved-crime`)
      .then(result => {
        console.log('Unsolved Crime:', result.data)
        setUnSolvedCrimeData(result.data)
      })
      .catch(err => console.log(err));
  }

  const getSolvedCrime = () => {
    axios.get(`http://localhost:5000/api/solved-crime/solved-crime`)
      .then(result => {
        console.log('Solved  Crime: ',result.data)
        setSolvedCrimeData(result.data)
      })
      .catch(err => console.log(err));
  }

  const getUnsolvedAccident = () => {
    axios.get(`http://localhost:5000/api/solved-accident/unsolved-accidents`)
      .then(result => {
        console.log('Unsolved Accident:', result.data)
        setUnSolvedAccident(result.data)
      })
      .catch(err => console.log(err));
  }

  const getSolvedAccident = () => {
    axios.get(`http://localhost:5000/api/solved-accident/solved-accidents`)
      .then(result => {
        console.log('Solved  Accident: ',result.data)
        setSolvedAccident(result.data)
      })
      .catch(err => console.log(err));
  }


  const combineData = () => {
    const combinedData = [];
  
    // Combine solved and unsolved crime data
    const allCrimeData = [...solvedCrime, ...unSolvedCrime];
    const allAccidentData = [...solvedAccident, ...unSolvedAccident];
  
    const uniqueDates = [...new Set(allCrimeData.map(item => item.incident_date).concat(allAccidentData.map(item => item.date)))];
  
    uniqueDates.forEach(date => {
      const solvedCrimeCount = countSolvedCrimesOnDate(date);
      const unSolvedCrimeCount = countUnsolvedCrimesOnDate(date);
      const solvedAccidentCount = countSolvedAccidentsOnDate(date);
      const unSolvedAccidentCount = countUnsolvedAccidentsOnDate(date);
  
      combinedData.push({
        date,
        solvedCrime: solvedCrimeCount,
        unSolvedCrime: unSolvedCrimeCount,
        solvedAccident: solvedAccidentCount,
        unSolvedAccident: unSolvedAccidentCount,
      });
    });
  
    return combinedData;
  };

  const countSolvedCrimesOnDate = (date) => {
    return solvedCrime.filter(crime => crime.incident_date === date && crime.isSolved).length;
  };
  
  const countUnsolvedCrimesOnDate = (date) => {
    return unSolvedCrime.filter(crime => crime.incident_date === date && !crime.isSolved).length;
  };
  
  // Define count functions for solved and unsolved accidents
  const countSolvedAccidentsOnDate = (date) => {
    return solvedAccident.filter(accident => accident.date === date && accident.isSolved).length;
  };
  
  const countUnsolvedAccidentsOnDate = (date) => {
    return unSolvedAccident.filter(accident => accident.date === date && !accident.isSolved).length;
  };



  return (
    <main className='main-container'>
      <div className='main-title font-semibold'>
        <h3>Welcome to the Crime and Accident Data Admin Dashboard</h3>
      </div>

      <div className='main-cards'>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Total Crime Reported</h3>
            <BsFillArchiveFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">{crimeData.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Total Accident Reported</h3>
            <BsFillGrid3X3GapFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">{accidentData.length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Total Crime Solved</h3>
            <BsPeopleFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">{crimeData.filter(crime => crime.action_status === "Solved").length}</h1>
        </div>
        <div className='card'>
          <div className='card-inner'>
            <h3 className="text-lg font-bold">Ongoing Crimes</h3>
            <BsFillBellFill className='card_icon' />
          </div>
          <h1 className="text-2xl font-bold">{unSolvedCrime.length}</h1>
        </div>
      </div>
      <div className="crime-chart">
        <h2>Crime Data</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={combineData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="solvedCrime" name="Solved Crime" stroke="#8884d8" />
            <Line type="monotone" dataKey="unSolvedCrime" name="Unsolved Crime" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="accident-chart">
        <h2>Accident Data</h2>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={combineData()}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="solvedAccident" name="Solved Accident" stroke="#8884d8" />
            <Line type="monotone" dataKey="unSolvedAccident" name="Unsolved Accident" stroke="#82ca9d" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className=" mt-4 justify-center text-4x text-white">
        <h5 className="mt-4 text-2xl">
        We are proud to present a platform specifically designed to provide up-to-date information on crime and accident data. Our goal is to provide easy and transparent access to relevant data, so you can understand and explore trends, patterns and statistics related to crime and accidents.
        </h5>
        <h5 className="mt-4 text-2xl">
        Through this website, you can explore various types of crime, including street crime, robbery, theft, and more. We also provide information regarding traffic accidents, road incidents, and other accident data that can help you understand the factors that contribute to accidents and take appropriate preventive measures. 
        </h5>
        <h5 className="mt-4 text-2xl">
          We collect data from various reliable sources and we continuously update the information to keep it accurate and useful. We hope that through easy access to this data, the public can raise awareness of the problem of crime and accidents and contribute to creating a safer and better environment for all.

        </h5>
      </div>
  
    </main>
  );
};

export default Welcome;
