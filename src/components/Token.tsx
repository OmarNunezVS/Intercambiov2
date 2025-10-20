import { useEffect, useState } from "react";
import Swal from "sweetalert2";

interface Assignment {
  giver: string;
  receiver: string;
  token: string;
}

function TokenPage() {
  const [assignment, setAssignment] = useState<Assignment | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      Swal.fire({
        icon: "error",
        title: "Token inválido",
        text: "No se encontró el token en la URL.",
      });
      return;
    }

    // ✅ Recuperar asignaciones desde localStorage
    const stored = localStorage.getItem("assignments");
    if (stored) {
      const allAssignments: Assignment[] = JSON.parse(stored);
      const found = allAssignments.find((a) => a.token === token);
      if (found) {
        setAssignment(found);
        Swal.fire({
          icon: "info",
          title: "Tu asignación",
          html: `<strong>${found.giver}</strong>, te toca regalar a <strong>${found.receiver}</strong> 🎁`,
          confirmButtonText: "OK",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Token no válido",
          text: "Este enlace no corresponde a ninguna asignación.",
        });
      }
    }
  }, []);

  return <div className="container mt-4">{assignment && <h2>Consulta exitosa</h2>}</div>;
}

export default TokenPage;
