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
  if (req.method === "GET") {
    const timers = readTimers();
    return res.status(200).json(timers);
  }

  if (req.method === "POST") {
    const timers = readTimers();
    timers.push(req.body);
    writeTimers(timers);
    return res.status(204).end();
  }

  return res.status(405).end(); // Método não permitido
}
