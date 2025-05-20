export async function getPeluquerias() {
  const res = await fetch("http://localhost:8000/api/peluquerias");
  return res.json();
}