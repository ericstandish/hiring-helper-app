import React, { useState } from 'react';

const roundToThreeDecimals = (num) => {
  return Math.round((num + Number.EPSILON) * 1000) / 1000;
};

const calculatePriorities = (matrix) => {
  const n = matrix.length;
  const rowSums = new Array(n).fill(0);

  // Calculate row sums
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rowSums[i] += matrix[i][j];
    }
  }

  // Calculate priority vector
  const priorities = rowSums.map((sum) => sum / n);

  // Normalize priorities
  const totalPriority = priorities.reduce((acc, val) => acc + val, 0);
  const normalizedPriorities = priorities.map((priority) => priority / totalPriority);

  return normalizedPriorities.map(roundToThreeDecimals);
};

const AhpTool = () => {

  const [alternatives, setAlternatives] = useState([]);
  const [criteria, setCriteria] = useState([]);
  const [comparisonMatrices, setComparisonMatrices] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [criterionComparisonMatrix, setCriterionComparisonMatrix] = useState([]);
  const [criterionPriorities, setCriterionPriorities] = useState([]);
  const [overallPriorities, setOverallPriorities] = useState([]);

  // Function to export AHP tool state to JSON
  const exportToJson = () => {
    const exportData = {
      alternatives,
      criteria,
      comparisonMatrices,
      priorities,
      criterionComparisonMatrix,
      criterionPriorities,
      overallPriorities
    };

    const json = JSON.stringify(exportData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    
    // Trigger download
    const a = document.createElement("a");
    a.href = url;
    a.download = "ahp_tool_data.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  // Function to import AHP tool state from JSON
  const importFromJson = (jsonData) => {
    try {
      const importedData = JSON.parse(jsonData);
      setAlternatives(importedData.alternatives || []);
      setCriteria(importedData.criteria || []);
      setComparisonMatrices(importedData.comparisonMatrices || []);
      setPriorities(importedData.priorities || []);
      setCriterionComparisonMatrix(importedData.criterionComparisonMatrix || []);
      setCriterionPriorities(importedData.criterionPriorities || []);
      setOverallPriorities(importedData.overallPriorities || []);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // Handle error (e.g., display error message to the user)
    }
  };

  const handleAddAlternative = () => {
    const newAlternative = prompt('Enter alternative name:');
    if (newAlternative) {
      setAlternatives([...alternatives, newAlternative]);
    }
  };

  const handleAddCriterion = () => {
    const newCriterion = prompt('Enter criterion name:');
    if (newCriterion) {
      setCriteria([...criteria, newCriterion]);
    }
  };
  
  const handleComparisonInput = (criterionIndex) => {
    const updatedMatrices = [...comparisonMatrices];
    const comparisonMatrix = alternatives.map(() => Array(alternatives.length).fill(0));
  
    for (let i = 0; i < alternatives.length; i++) {
      for (let j = i; j < alternatives.length; j++) {
        let inputValue;
        if (i === j) {
          inputValue = '1'; // Default to 1 if alternatives match
        } else {
          do {
            inputValue = prompt(
              `What is the importance of ${alternatives[i]} over ${alternatives[j]} with respect to ${criteria[criterionIndex]} (0.01-9):
              1: Both elements are equally important.
              2-4: Low to moderate preference or importance.
              5: Moderate preference or importance.
              6-8: Strong to extreme preference or importance.
              9: Extreme preference or importance. `
            );
  
            if (inputValue === null) return; // If user cancels, exit the function
  
            const parsedValue = parseFloat(inputValue);
            if (inputValue.trim() === '' || isNaN(parsedValue) || parsedValue < 0.11 || parsedValue > 9) {
              alert("Invalid input. Please enter a number between 0.11 and 9.");
            }
          } while (inputValue.trim() === '' || isNaN(inputValue) || parseFloat(inputValue) < 0.11 || parseFloat(inputValue) > 9);
        }
  
        const comparisonValue = parseFloat(inputValue);
        comparisonMatrix[i][j] = comparisonValue;
        comparisonMatrix[j][i] = 1 / comparisonValue;
      }
    }
  
    updatedMatrices[criterionIndex] = comparisonMatrix;
    setComparisonMatrices(updatedMatrices);
  
    const calculatedPriorities = calculatePriorities(comparisonMatrix);
      // Update existing priorities if already filled out before
      if (priorities[criterionIndex]) {
        const updatedPriorities = [...priorities];
        updatedPriorities[criterionIndex] = calculatedPriorities;
        setPriorities(updatedPriorities);
      } else {
        setPriorities([...priorities, calculatedPriorities]);
      }
  };
  
  const handleCriterionComparisonInput = () => {
    const updatedMatrix = [];
    const comparisonMatrix = criteria.map(() => Array(criteria.length).fill(0));
  
    for (let i = 0; i < criteria.length; i++) {
      for (let j = i; j < criteria.length; j++) {
        let inputValue;
        if (i === j) {
          inputValue = '1'; // Default to 1 if criteria match
        } else {
          do {
            inputValue = prompt(
              `What is the importance of ${criteria[i]} over ${criteria[j]} (0.01-9):
              1: Both elements are equally important.
              2-4: Low to moderate preference or importance.
              5: Moderate preference or importance.
              6-8: Strong to extreme preference or importance.
              9: Extreme preference or importance. `
            );
  
            if (inputValue === null) return; // If user cancels, exit the function
  
            const parsedValue = parseFloat(inputValue);
            if (inputValue.trim() === '' || isNaN(parsedValue) || parsedValue < 0.11 || parsedValue > 9) {
              alert("Invalid input. Please enter a number between 0.11 and 9.");
            }
          } while (inputValue.trim() === '' || isNaN(inputValue) || parseFloat(inputValue) < 0.11 || parseFloat(inputValue) > 9);
        }
  
        const comparisonValue = parseFloat(inputValue);
        comparisonMatrix[i][j] = comparisonValue;
        comparisonMatrix[j][i] = 1 / comparisonValue;
      }
    }
  
    updatedMatrix.push(comparisonMatrix);
    setCriterionComparisonMatrix(updatedMatrix);
  
    const calculatedPriorities = calculatePriorities(comparisonMatrix);
    setCriterionPriorities(calculatedPriorities);
  };  

  const calculateOverallPriorities = () => {
    const overallPriorities = alternatives.map(() => 0);

    for (let i = 0; i < alternatives.length; i++) {
      for (let j = 0; j < criteria.length; j++) {
        overallPriorities[i] += priorities[j][i] * criterionPriorities[j];
      }
    }

    return overallPriorities.map(roundToThreeDecimals);
  };

  const handleCalculateOverallPriorities = () => {
    const calculatedOverallPriorities = calculateOverallPriorities();
    setOverallPriorities(calculatedOverallPriorities);
  };


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">Decision Making Using Analytic Hierarchy Process (AHP)</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Alternatives</h2>
        <ul>
          {alternatives.map((alternative, index) => (
            <li key={index}>{alternative}</li>
          ))}
        </ul>
        <button className="px-4 py-2 rounded-lg bg-teal-500 text-white transition duration-300 ease-in-out hover:bg-orange-300 hover:text-white-500 focus:outline-none transform hover:scale-105" onClick={handleAddAlternative}>Add Alternative</button>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Criteria</h2>
        <ul>
          {criteria.map((criterion, index) => (
            <li key={index}>{criterion}</li>
          ))}
        </ul>
        <button className="px-4 py-2 rounded-lg bg-teal-500 text-white transition duration-300 ease-in-out hover:bg-orange-300 hover:text-white-500 focus:outline-none transform hover:scale-105" onClick={handleAddCriterion}>Add Criterion</button>
      </div>
      {criteria.map((criterion, criterionIndex) => (
        <div className="mb-6" key={criterionIndex}>
          <h2 className="text-xl font-semibold mb-2">Pairwise Comparisons for {criterion}</h2>
          <button className="px-4 py-2 rounded-lg bg-teal-500 text-white transition duration-300 ease-in-out hover:bg-orange-300 focus:outline-none transform hover:scale-105" onClick={() => handleComparisonInput(criterionIndex)}>
            Fill Pairwise Comparisons for {criterion}
          </button>
          {comparisonMatrices[criterionIndex] && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Matrix for {criterion}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 px-4 py-2"></th>
                      {alternatives.map((alternative, index) => (
                        <th key={index} className="border border-gray-400 px-4 py-2">{alternative}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {alternatives.map((alternative1, rowIndex) => (
                      <tr key={rowIndex}>
                        <td className="border border-gray-400 px-4 py-2">{alternative1}</td>
                        {alternatives.map((alternative2, colIndex) => (
                          <td key={colIndex} className="border border-gray-400 px-4 py-2">
                            {comparisonMatrices[criterionIndex][rowIndex][colIndex]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {priorities[criterionIndex] && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Priorities for {criterion}</h3>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-400">
                  <thead>
                    <tr>
                      <th className="border border-gray-400 px-4 py-2">Alternative</th>
                      <th className="border border-gray-400 px-4 py-2">Priority</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alternatives.map((alternative, index) => (
                      <tr key={index}>
                        <td className="border border-gray-400 px-4 py-2">{alternative}</td>
                        <td className="border border-gray-400 px-4 py-2">{priorities[criterionIndex][index]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      ))}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Pairwise Comparisons for Criteria</h2>
        <button className="px-4 py-2 rounded-lg bg-teal-500 text-white transition duration-300 ease-in-out hover:bg-orange-300 hover:text-white-500 focus:outline-none transform hover:scale-105" onClick={handleCriterionComparisonInput}>
          Fill Pairwise Comparisons for Criteria
        </button>
        {criterionComparisonMatrix.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Matrix for Criteria</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2"></th>
                    {criteria.map((criterion, index) => (
                      <th key={index} className="border border-gray-400 px-4 py-2">{criterion}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion1, rowIndex) => (
                    <tr key={rowIndex}>
                      <td className="border border-gray-400 px-4 py-2">{criterion1}</td>
                      {criteria.map((criterion2, colIndex) => (
                        <td key={colIndex} className="border border-gray-400 px-4 py-2">
                          {criterionComparisonMatrix[0][rowIndex][colIndex]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        {criterionPriorities.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-2">Priorities for Criteria</h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Criterion</th>
                    <th className="border border-gray-400 px-4 py-2">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {criteria.map((criterion, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2">{criterion}</td>
                      <td className="border border-gray-400 px-4 py-2">{criterionPriorities[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Calculate Overall Priorities</h2>
        <button className="px-4 py-2 rounded-lg bg-teal-500 text-white transition duration-300 ease-in-out hover:bg-orange-300 hover:text-white-500 focus:outline-none transform hover:scale-105" onClick={handleCalculateOverallPriorities}>Calculate Overall Priorities</button>
        {overallPriorities.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2">Overall Priorities</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-400">
                <thead>
                  <tr>
                    <th className="border border-gray-400 px-4 py-2">Alternative</th>
                    <th className="border border-gray-400 px-4 py-2">Sum</th>
                    <th className="border border-gray-400 px-4 py-2">Priority</th>
                  </tr>
                </thead>
                <tbody>
                  {alternatives.map((alternative, index) => (
                    <tr key={index}>
                      <td className="border border-gray-400 px-4 py-2">{alternative}</td>
                      <td className="border border-gray-400 px-4 py-2">
                        {criteria.map((criterion, criterionIndex) => (
                          <span key={criterionIndex}>
                            {priorities[criterionIndex][index]} *
                            {criterionPriorities[criterionIndex]}
                            {criterionIndex !== criteria.length - 1 ? " + " : " = "}
                          </span>
                        ))}
                      </td>
                      <td className="border border-gray-400 px-4 py-2">{overallPriorities[index]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      {/* Export button */}
      <div className="mb-4">
      <button className="px-4 py-2 rounded-lg bg-teal-500 text-white transition duration-300 ease-in-out hover:bg-orange-300 hover:text-white-500 focus:outline-none transform hover:scale-105" onClick={exportToJson}>Export to JSON</button>
      </div>
      {/* Import file input */}
      <div className="mb-4">
      <input type="file" onChange={(e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
          const jsonData = event.target.result;
          importFromJson(jsonData);
        };
        reader.readAsText(file);
      }} />
      </div>
    </div>
  );
};

export default AhpTool;