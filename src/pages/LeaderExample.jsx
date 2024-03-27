import React from 'react';

function LeaderSelection() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Choosing a Leader: AHP Process</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Decision Scenario</h2>
        <p>
          The company, established in 1960, is undergoing a transition as its founder prepares to retire. A consulting firm has crafted a comprehensive plan to ensure the company's continued success in the absence of its founder. This plan necessitates the appointment of a new leader who will navigate the forthcoming changes and challenges.
        </p>
        <p>
          Six months ago, the board of directors identified four crucial criteria for selecting the new leader: experience, education, charisma, and age.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Candidates</h2>
        <ul className="list-disc pl-6">
          <li><strong>Tom:</strong> 50 years old, moderate experience and education, high charisma.</li>
          <li><strong>Dick:</strong> 60 years old, extensive experience and education, moderate charisma.</li>
          <li><strong>Harry:</strong> 30 years old, limited experience and education, moderate charisma.</li>
        </ul>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Analytic Hierarchy Process (AHP)</h2>
        <ol className="list-decimal pl-6">
          <li>
            <h3 className="text-xl font-bold mb-2">Pairwise Comparisons of Candidates for Each Criterion</h3>
            <p>
              The board of directors conducts pairwise comparisons of each candidate for every criterion. For example, they compare Tom and Dick based on experience, Tom and Harry based on education, Dick and Harry based on charisma, and so on.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-2">Derivation of Priorities for Candidates Regarding Each Criterion</h3>
            <p>
              After conducting pairwise comparisons, the board assigns relative weights to each candidate based on their performance in each criterion. They then calculate the priority of each candidate with respect to each criterion.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-2">Pairwise Comparisons of Criteria for Their Importance</h3>
            <p>
              The board evaluates the importance of each criterion by conducting pairwise comparisons. They compare experience against education, experience against charisma, experience against age, education against charisma, and so on.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-2">Derivation of Priorities for Criteria with Respect to the Goal</h3>
            <p>
              Based on the pairwise comparisons, the board determines the relative importance of each criterion in achieving the overall goal of selecting the best leader. They calculate the priorities of criteria with respect to the goal.
            </p>
          </li>
          <li>
            <h3 className="text-xl font-bold mb-2">Calculation of Final Priorities for Candidates with Respect to the Goal</h3>
            <p>
              Using the priorities of candidates with respect to each criterion and the priorities of criteria with respect to the goal, the board calculates the final priorities of candidates with respect to the goal. The candidate with the highest priority is selected as the most suitable leader.
            </p>
          </li>
        </ol>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Decision</h2>
        <p>
          Based on the AHP process, Dick emerges as the most suitable candidate with the highest priority, followed by Tom and then Harry.
        </p>
      </section>
    </div>
  );
}

export default LeaderSelection;
