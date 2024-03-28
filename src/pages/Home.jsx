import React from 'react';

function LeaderExample() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Choosing a Leader: AHP Process</h1>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Decision Scenario</h2>
        <p>
          The company, established in 1960, is undergoing a transition as its founder prepares to retire. A consulting firm has crafted a comprehensive plan to ensure the company's continued success in the absence of its founder. This plan necessitates the appointment of a new leader who will navigate the forthcoming changes and challenges.
        </p>
        <p>
          f
          Six months ago, the board of directors identified four crucial criteria for selecting the new leader: experience, education, charisma, and age.
        </p>
      </section>
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-2">Candidates</h2>
        <table className="table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Candidate</th>
              <th className="px-4 py-2">Age</th>
              <th className="px-4 py-2">Experience</th>
              <th className="px-4 py-2">Education</th>
              <th className="px-4 py-2">Charisma</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border px-4 py-2">Tom</td>
              <td className="border px-4 py-2">50</td>
              <td className="border px-4 py-2">Moderate</td>
              <td className="border px-4 py-2">Moderate</td>
              <td className="border px-4 py-2">High</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Dick</td>
              <td className="border px-4 py-2">60</td>
              <td className="border px-4 py-2">Extensive</td>
              <td className="border px-4 py-2">Extensive</td>
              <td className="border px-4 py-2">Moderate</td>
            </tr>
            <tr>
              <td className="border px-4 py-2">Harry</td>
              <td className="border px-4 py-2">30</td>
              <td className="border px-4 py-2">Limited</td>
              <td className="border px-4 py-2">Limited</td>
              <td className="border px-4 py-2">Moderate</td>
            </tr>
          </tbody>
        </table>
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
              Using the priorities of candidates with respect to each criterion and the priorities of criteria with respect to the goal, the board calculates the final priorities of candidates with respect to the goal. The candidate with the highest priority
              is selected as the most suitable leader.</p>
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

export default LeaderExample;