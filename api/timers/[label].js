import fs from "fs";
import path from "path";

const filePath = path.resolve("timers.json");

function readTimers() {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, "[]");
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
}

function writeTimers(data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export default function handler(req, res) {
  const {
    query: { label },
    method,
  } = req;

  if (method === "DELETE") {
    const timers = readTimers();
    const updated = timers.filter((t) => t.label !== label);
    writeTimers(updated);
    return res.status(204).end();
  }

  return res.status(405).end(); // Método não permitido
}
