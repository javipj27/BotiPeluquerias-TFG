export async function getPeluquerias() {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/peluquerias", {
    headers: {
      "X-AUTH-TOKEN": token
    }
  });
  return res.json();
}

export async function getPeluqueriaById(id) {
  const token = localStorage.getItem("token");
  const res = await fetch(`/api/peluquerias/${id}`, {
    headers: {
      "X-AUTH-TOKEN": token
    }
  });
  return res.json();
}