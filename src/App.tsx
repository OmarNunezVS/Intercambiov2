import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import PersonList from "./components/PersonList";
import Snowfall from "react-snowfall";

interface Assignment {
  giver: string;
  receiver: string;
  token: string;
}

function App() {
  const [names, setNames] = useState<string[]>([]);
  const [assignments, setAssignments] = useState<Assignment[]>([]);

  // Mostrar asignación si hay token en la URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      const stored = localStorage.getItem("assignments");
      if (!stored) return;

      const assignments: Assignment[] = JSON.parse(stored);
      const match = assignments.find((a) => a.token === token);

      if (match) {
        Swal.fire({
          icon: "success",
          title: "🎁 ¡Tu regalo es para!",
          html: `<strong>${match.receiver}</strong>`,
          confirmButtonText: "¡Qué emoción!",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Token inválido",
          text: "Este enlace no es válido o ha expirado.",
        });
      }
    }
  }, []);

  const handleAssign = () => {
    if (names.length < 2) {
      Swal.fire({
        icon: "warning",
        title: "¡Agrega más personas!",
        text: "Necesitas al menos 2 participantes.",
      });
      return;
    }

    Swal.fire({
      title: "Generando asignaciones...",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    setTimeout(() => {
      let receivers = [...names];
      let result: Assignment[] = [];

      for (let giver of names) {
        let possibleReceivers = receivers.filter((r) => r !== giver);
        if (possibleReceivers.length === 0) return handleAssign(); // Reintentar si no hay opciones válidas
        const receiver = possibleReceivers[Math.floor(Math.random() * possibleReceivers.length)];
        const token = Math.random().toString(36).substring(2, 8); // Token único
        result.push({ giver, receiver, token });
        receivers = receivers.filter((r) => r !== receiver);
      }

      setAssignments(result);
      localStorage.setItem("assignments", JSON.stringify(result));

      Swal.fire({
        icon: "success",
        title: "¡Asignaciones listas!",
        text: "Comparte los enlaces con cada persona.",
      });

      console.log("Asignaciones completas:");
      result.forEach((a) => console.log(`${a.giver} → ${a.receiver} (token: ${a.token})`));
    }, 2000);
  };

  return (
    <div className="container mt-4">
      <h1>🎁 Intercambio Navideño</h1>
      <PersonList names={names} setNames={setNames} />
      <button className="btn btn-primary mt-3" onClick={handleAssign}>
        Generar asignaciones
      </button>

      {assignments.length > 0 && (
        <div className="mt-4">
          <h3>Enlaces para compartir</h3>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Participante</th>
                <th>Enlace único</th>
              </tr>
            </thead>
            <tbody>
              {assignments.map((a, idx) => (
                <tr key={idx}>
                  <td>{a.giver}</td>
                  <td>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        const url = `${window.location.origin}?token=${a.token}`;
                        navigator.clipboard.writeText(url).then(() => {
                          Swal.fire({
                            icon: "success",
                            title: "¡Enlace copiado!",
                            text: `Comparte este enlace con ${a.giver}`,
                            timer: 2000,
                            showConfirmButton: false,
                          });
                        });
                      }}
                    >
                      Copiar enlace
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Snowfall snowflakeCount={100} />
    </div>
  );
}

export default App;
