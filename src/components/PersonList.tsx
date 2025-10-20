import { useState } from "react";

interface Props {
  names: string[];
  setNames: (names: string[]) => void;
}

function PersonList({ names, setNames }: Props) {
  const [input, setInput] = useState("");

  const addName = () => {
    if (input.trim() && !names.includes(input.trim())) {
      setNames([...names, input.trim()]);
      setInput("");
    }
  };

  const removeName = (nameToRemove: string) => {
    setNames(names.filter((name) => name !== nameToRemove));
  };

  return (
    <div>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="Nombre"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addName();
          }}
        />
        <button className="btn btn-success" onClick={addName}>
          Agregar
        </button>
      </div>

      <ul className="mt-3 list-group">
        {names.map((name, idx) => (
          <li
            key={idx}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            {name}
            <button className="btn btn-danger btn-sm" onClick={() => removeName(name)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PersonList;
