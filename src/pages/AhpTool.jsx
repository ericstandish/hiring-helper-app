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
          inputValue = prompt(
            `Enter pairwise comparison value for ${alternatives[i]} and ${alternatives[j]} with respect to ${criteria[criterionIndex]}:`
          );
        }

        if (inputValue !== null) {
          const comparisonValue = parseFloat(inputValue);
          comparisonMatrix[i][j] = comparisonValue;
          comparisonMatrix[j][i] = 1 / comparisonValue;
        }
      }
    }

    updatedMatrices[criterionIndex] = comparisonMatrix;
    setComparisonMatrices(updatedMatrices);

    const calculatedPriorities = calculatePriorities(comparisonMatrix);
    setPriorities([...priorities, calculatedPriorities]);
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
          inputValue = prompt(
            `Enter pairwise comparison value for ${criteria[i]} and ${criteria[j]}:`
          );
        }

        if (inputValue !== null) {
          const comparisonValue = parseFloat(inputValue);
          comparisonMatrix[i][j] = comparisonValue;
          comparisonMatrix[j][i] = 1 / comparisonValue;
        }
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
      <h1 className="text-3xl font-bold mb-4">Decision Making Using Analytic Hierarchy Process (AHP)</h1>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Alternatives</h2>
        <ul>
          {alternatives.map((alternative, index) => (
            <li key={index}>{alternative}</li>
          ))}
        </ul>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddAlternative}>Add Alternative</button>
      </div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Criteria</h2>
        <ul>
          {criteria.map((criterion, index) => (
            <li key={index}>{criterion}</li>
          ))}
        </ul>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleAddCriterion}>Add Criterion</button>
      </div>
      {criteria.map((criterion, criterionIndex) => (
        <div className="mb-6" key={criterionIndex}>
          <h2 className="text-xl font-semibold mb-2">Pairwise Comparisons for {criterion}</h2>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleComparisonInput(criterionIndex)}>
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
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCriterionComparisonInput}>
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
<div>
<h2 className="text-xl font-semibold mb-2">Calculate Overall Priorities</h2>
<button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCalculateOverallPriorities}>Calculate Overall Priorities</button>
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
</div>
);
};

export default AhpTool;