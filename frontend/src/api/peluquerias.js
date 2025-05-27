export async function getPeluquerias() {
  const token = localStorage.getItem("token");
  const res = await fetch("http://localhost:8000/api/peluquerias", {
    headers: {
      "X-AUTH-TOKEN": token
    }
  });
  return res.json();
}

export async function getPeluqueriaById(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`http://localhost:8000/api/peluquerias/${id}`, {
    headers: {
      "X-AUTH-TOKEN": token
    }
  });
  return res.json();
}