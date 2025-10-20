// src/components/AssignmentResult.tsx
import type { Assignment } from "../App";

interface Props {
  assignments: Assignment[];
}

function AssignmentResult({ assignments }: Props) {
  if (assignments.length === 0) return null;

  return (
    <div className="mt-4">
      <h2>🎉 Resultados</h2>
      <ul className="list-group">
        {assignments.map((a, idx) => (
          <li key={idx} className="list-group-item">
            {a.giver} regala a {a.receiver}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AssignmentResult;
