import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import './styles.css';
function App() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedBranch, setSelectedBranch] = useState('');
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/students`);
        setStudents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);
  const processedStudents = () => {
      let filteredStudents = [...students].filter(student => {
    const yearMatch = !selectedYear || 
                      selectedYear === 'AllYear' || 
                      student.Year === selectedYear;
    const branchMatch = !selectedBranch || 
                        selectedBranch === 'AllBranch' || 
                        student.Branch === selectedBranch;
    return yearMatch && branchMatch;
  });
    // Filter out invalid SGPA values and sort
   filteredStudents.sort((a, b) => b.CGPA - a.CGPA);
   // Assign ranks with tie handling
    let rankedStudents = [];
    if (filteredStudents.length > 0) {
      let currentRank = 1,SNo =1;
      rankedStudents.push({ ...filteredStudents[0], rank: currentRank, SNo: SNo });

      for (let i = 1; i <filteredStudents.length; i++) {
        SNo+=1;
        if (filteredStudents[i].CGPA === filteredStudents[i-1].CGPA) {
          // Same SGPA as previous student - same rank
          rankedStudents.push({ ...filteredStudents[i], rank: currentRank,SNo: SNo });
        } else {
          // Different SGPA - increment rank by position
          currentRank+=1;
          rankedStudents.push({ ...filteredStudents[i], rank: currentRank,SNo:SNo});
        }
      }
    }
    return rankedStudents;
  };

  if (loading) return <div className="loading">Loading...</div>;
  return (
    <div className="App">
      <a href="" class="text-blue-600 hover:text-blue-800 hover:underline">Home</a>
      <a href="https://nitkkr.ac.in/" class="text-blue-600 hover:text-blue-800 hover:underline">Website</a>
        <a href="https://nitkurukshetra-repo.vercel.app/" class="text-blue-600 hover:text-blue-800 hover:underline">PYQs</a>
      <center><h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">CGPA LEADERBOARD</h1>
  <div id="select">
   <select  value={selectedYear}
    onChange={(e) => setSelectedYear(e.target.value==="AllYear"?'AllYear':Number(e.target.value))}>
    <option value="">Select Year</option>
    <option value="AllYear">All</option>
    <option value="2024">2024</option>
    <option value="2023">2023</option>
    <option value="2022">2022</option>
    <option value="2021">2021</option>
</select>
 <select value={selectedBranch}
    onChange={(e) => setSelectedBranch(e.target.value)}>
    <option value="">Select Branch</option>
    <option value="AllBranch">All</option>
    <option value="CSE">CSE</option>
    <option value="IT">IT</option>
    <option value="AIML">AIML</option>
    <option value="MnC">MnC</option>
</select>
</div>  
      <table class="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">
        <thead>
          <tr>
            <th>SNo.</th>
            <th>Roll No</th>
            <th>Name</th>
            <th>SGPA</th>
            <th>CGPA</th>
            <th >Rank</th>
          </tr>
        </thead>
         <tbody>
            {processedStudents().length > 0 ? (
              processedStudents().map(student => (
                <tr key={student._id || student.RollNo}>
                  <td>{student.SNo}</td>
                  <td>{student.RollNo}</td>
                  <td>{student.Name}</td>
                  <td>{student.SGPA}</td>
                  <td>{student.CGPA}</td>
                  <td>{student.rank}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center p-4">
                  Will be available soon!Currently data is available for 2023 batch CSE,IT,MnC, AIML only.
                </td>
              </tr>
            )}
          </tbody>
      </table>
      </center>
    </div>
  );
}
export default App;
