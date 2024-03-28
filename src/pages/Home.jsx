import React from 'react';

function Home() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-orange-500">Analytic Hierarchy Process (AHP)</h1>
      <section className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">What is AHP?</h2>
        <p className="text-gray-700">
          The Analytic Hierarchy Process (AHP) is a structured decision-making methodology developed by Thomas L. Saaty in the 1970s. It is designed to help individuals and organizations make complex decisions by breaking them down into smaller, more manageable parts.
        </p>
      </section>
      <section className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Importance of AHP</h2>
        <p className="text-gray-700">
          AHP is widely used in various fields, including business, engineering, healthcare, and public policy, due to its ability to handle multiple criteria and alternatives in decision-making. Its structured approach helps in prioritizing criteria and alternatives based on their relative importance, leading to more informed and rational decisions.
        </p>
      </section>
      <section className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">How AHP Works</h2>
        <p className="text-gray-700">
          AHP involves the following key steps:
        </p>
        <ol className="list-decimal pl-6 text-gray-700">
          <li>
            <h3 className="text-xl font-bold mb-2">Define Decision Criteria</h3>
            <p>
              Identify and define the criteria that are important for making the decision. These criteria could include factors such as cost, time, quality, and risk.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-2">Evaluate Alternatives</h3>
            <p>
              Identify the alternatives or options available for the decision and evaluate them against each criterion.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-2">Perform Pairwise Comparisons</h3>
            <p>
              Conduct pairwise comparisons between criteria and alternatives to determine their relative importance or preference.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-2">Calculate Priorities</h3>
            <p>
              Calculate the priorities of criteria and alternatives based on the pairwise comparison results.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-2">Make the Decision</h3>
            <p>
              Use the calculated priorities to make the final decision. The alternative with the highest priority is typically selected as the best choice.
            </p>
          </li>
        </ol>
      </section>
      <section className="mb-8 bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Example</h2>
        <p className="text-gray-700">
          Consider a scenario where a company needs to choose a new leader. The company's board of directors evaluates candidates based on criteria such as experience, education, charisma, and age using the AHP process.
        </p>
      </section>
    </div>
  );
}

export default Home;
