import axios from "axios";
import { useEffect, useState } from "react";
import AddCrime from "./crimes/AddCrime.jsx";
import UpdateCrime from "./crimes/UpdateCrime.jsx";
import DeleteCrime from "./crimes/DeleteCrime.jsx";
import ViewCrimeModal from "./ViewCrimeModal.jsx";
import "./ViewAccidentModal.css";

const Crime = () => {
  const [name, setName] = useState("");
  const [crimes, setCrimes] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCrimeType, setSelectedCrimeType] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedCrime, setSelectedCrime] = useState(null);
  const [actionStatus, setActionStatus] = useState([]);
  const [selectedTab, setSelectedTab] = useState("All");
  const [assignedUsers, setAssignedUsers] = useState(new Array(crimes.length).fill(''));

  

  const filteredCrimesByStatus = () => {
    if (selectedTab === "All") {
      return filteredCrimes;
    } else {
      return filteredCrimes.filter((crime, index) => {
        return actionStatus[index] === selectedTab;
      });
    }
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  useEffect(() => {
    getUser();
    getCrimes();
  }, []);

  const getUser = () => {
    // const token = localStorage.getItem("token");
    axios.get(`http://localhost:5000/api/user`)
    .then(result => {
      console.log(result)
      setName(result.data)
    })
    .catch(err => console.log(err));

    // const user = data.data.data.name;
    // setName(user);
  };

  const getCrimes = () => {
    axios.get(`http://localhost:5000/api/crime-report`)
      .then((result) => {
        console.log(result);
        setCrimes(result.data);
        const initialActionStatus = result.data.map((crime) => crime.action_status);
        setActionStatus(initialActionStatus);
      })
      .catch((err) => console.log(err));
  };

  const filteredCrimes = crimes.filter((crime) => {
    const searchString = searchQuery.toLowerCase();
    const crimeMonth = new Date(crime.incident_date).toLocaleString("default", { month: "long" });

    return (
      (crime.location.toLowerCase().includes(searchString) ||
      crime.name_crime.toLowerCase().includes(searchString)) &&
      (!selectedCrimeType || crime.type_crime === selectedCrimeType) &&
      (!selectedLocation || crime.location === selectedLocation) &&
      (!selectedMonth || crimeMonth === selectedMonth)
    );
  });

  // open crime
   const openCrimeModal = (crimeData) => {
    setSelectedCrime(crimeData);
  };

  
  const closeCrimeModal = () => {
    setSelectedCrime(null);
  };


// status
  const updateActionStatus = (index, newStatus) => {
    const updatedStatus = [...actionStatus];
    updatedStatus[index] = newStatus;
    setActionStatus(updatedStatus);
  
    
    axios.put(`http://localhost:5000/api/crime-report/${crimes[index]._id}/action-status`, {
      actionStatus: newStatus,
    })
    .then((response) => {
      console.log('Action status updated:', response.data);
  
      
      window.alert('Status saved successfully!');
    })
    .catch((error) => {
      console.error('Failed to update action status:', error);
  
      
      window.alert('Failed to save status. Please try again.');
    });
  };

  const updateAssignedUser = (index, assignedUser) => {
    const updatedAssignedUsers = [...assignedUsers];
    updatedAssignedUsers[index] = assignedUser;
    setAssignedUsers(updatedAssignedUsers);

    const apiUrl = `http://localhost:5000/api/crime-report/${crimes[index]._id}/update-assigned-officer`;

    axios.put(apiUrl, { assigned_officer: assignedUser })
      .then((response) => {
        alert("Assigned officer updated:", response.data);
      })
      .catch((error) => {
        alert("Failed to update assigned officer:", error);
      });
  };


  return (
    <div className="ml-8 justify-center text-4xl">
      <h1 className="font-semibold mt-4 text-white">Crime Reports</h1>
      <div className="flex gap-5 mt-4">
        
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="px-5 py-2 fs-5 rounded-lg text-lg	"
        >
         <option value="">All Locations</option>
          <option value="Bacayao Norte">Bacayao Norte</option>
          <option value="Bacayao Sur">Bacayao Sur</option>
          <option value="Bolosan">Bolosan</option>
          <option value="Bonuan Binloc">Bonuan Binloc</option>
          <option value="Bonuan Boquig">Bonuan Boquig</option>
          <option value="Bonuan Gueset">Bonuan Gueset</option>
          <option value="Calmay">Calmay</option>
          <option value="Carael">Carael</option>
          <option value="Caranglaan">Caranglaan</option>
          <option value="Herrero">Herrero</option>
          <option value="Lasip Chico">Lasip Chico</option>
          <option value="Lasip Grande">Lasip Grande</option>
          <option value="Lomboy">Lomboy</option>
          <option value="Lucao">Lucao</option>
          <option value="Malued">Malued</option>
          <option value="Mamalingling">Mamalingling</option>
          <option value="Mangin">Mangin</option>
          <option value="Mayombo">Mayombo</option>
          <option value="Pantal">Pantal</option>
          <option value="Poblacion Oeste">Poblacion Oeste</option>
          <option value="Pogo Chico">Pogo Chico</option>
          <option value="Pogo Grande">Pogo Grande</option>
          <option value="Pugaro Suit">Pugaro Suit</option>
          <option value="Salapingao">Salapingao</option>
          <option value="Salisay">Salisay</option>
          <option value="Tambac">Tambac</option>
          <option value="Tapuac">Tapuac</option>
          <option value="Tebeng">Tebeng</option>
        </select>
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="px-5 py-2 fs-5 rounded-lg text-lg"
        >
          <option value="">All Months</option>
          <option value="January">January</option>
          <option value="February">February</option>
          <option value="March">March</option>
          <option value="April">April</option>
          <option value="May">May</option>
          <option value="June">June</option>
          <option value="July">July</option>
          <option value="August">August</option>
          <option value="September">September</option>
          <option value="October">October</option>
          <option value="November">November</option>
          <option value="December">December</option>
        </select>
      </div>
      <div className="mt-4">
      <div className="flex">
  {["All", "Solved", "Resolved", "Closed Case"].map((status) => (
    <button
      key={status}
      className={`tab ${selectedTab === status ? "active-tab" : ""}`}
      onClick={() => handleTabClick(status)}
    >
      <span className="tab-name">{status}</span>
    </button>
  ))}
</div>
</div>
      
      <div className="mt-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-5 py-2 fs-5 rounded-lg text-lg	"
        />
      </div>
      <div className="overflow-x-auto mt-4 justify-center">
        <table className="table justify-center">
          <thead>
            <tr>
              <th className="text-white text-lg font-semibold text-center">
                ID
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Crime 
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Location 
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Time
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Action Status
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Assigned
              </th>
              <th className="text-white text-lg font-semibold text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
          {filteredCrimesByStatus().map((crime, index) => (
              <tr key={crime.id}>
                <td className="text-white text-md font-base text-center">
                  {index + 1}
                </td>
                <td className="text-white text-md font-base text-center">
                  {crime.name_crime}
                </td>
                <td className="text-white text-md font-base text-center">
                  {crime.location}
                </td>
                <td className="text-white text-md font-base text-center">
                  {new Date(crime.incident_date).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </td>
                <td className="text-white text-md font-base text-center">
  <select
    value={actionStatus[index] || "InProgress"}
    onChange={(e) => updateActionStatus(index, e.target.value)}
    className="px-2 py-1 fs-5 rounded-lg text-md"
  >
    <option value="InProgress">In Progress</option>
    <option value="Solved">Solved</option>
    <option value="Resolved">Resolved</option>
    <option value="Closed Case">Closed Case</option>
  </select>
</td>
<td className="text-white text-md font-base text-center">
                  <select
                    value={assignedUsers[index] ||crime.assigned_officer|| ''}
                    onChange={(e) => updateAssignedUser(index, e.target.value)}
                    className="px-2 py-1 fs-5 rounded-lg text-md"
                  >
                    <option value="">Unassigned</option>
                    <option value="PO1 - Juan Dela Cruz">PO1 - Juan Dela Cruz</option>
                    <option value="SPO1 - Pedro Penduko">SPO1 - Pedro Penduko</option>
                    <option value="Officer Amber Gongalves">Officer Amber Gongalves</option>
                    <option value="Officer Mollie Jourdan">Officer Mollie Jourdan</option>
                    <option value="Officer Ulises Esmay">Officer Ulises Esmay</option>
                    <option value="Officer Braydon Linders">Officer Braydon Linders</option>
                    <option value="Officer Gordon Noda">Officer Gordon Noda</option>
                    <option value="Officer Emilio Daubenspeck">Officer Emilio Daubenspeck</option>
                    <option value="Officer Ted Varrato">Officer Ted Varrato</option>

                  </select>
</td>
                <td className="flex">
                  <div className="mr-1">
                    <UpdateCrime id={crime._id} />
                  </div>
                  <div className="mr-1">
                    <DeleteCrime id={crime._id} />
                  </div>
                  <div className="mr-1">
                    <button
                      className="btn btn-primary btn-sm text-white"
                      onClick={() => openCrimeModal(crime)}
                    >
                      View
                    </button>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        {selectedCrime && (
          <ViewCrimeModal crimeData={selectedCrime} onClose={closeCrimeModal} />
        )}
      </div>
    </div>
  );
};

export default Crime;
