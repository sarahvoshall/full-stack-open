const express = require("express");
const app = express();
const cors = require("cors");

let data = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method);
  console.log("Path:", request.path);
  console.log("Body:", request.body);
  console.log("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.get("/", (request, response) => {
  response.send("henlo wherld");
});

app.get("/info", (request, response) => {
  response.send(
    `<p>Phonebook has info for ${data.length} people.</p>
    <p>${Date()}</p>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = data.find((person) => person.id === id);

  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.get("/api/persons", (request, response) => {
  response.json(data);
});

app.post("/api/persons", (request, response) => {
  const newPerson = request.body;
  newPerson.id = Math.floor(Math.random() * 100);

  if (data.find((person) => person.name === newPerson.name)) {
    response.status(400).send({ error: "name must be unique" });
  } else if (!newPerson.name || !newPerson.number) {
    response.status(400).send({ error: "name or number is missing" });
  } else {
    response.json(newPerson);
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  data = data.filter((person) => person.id !== id);

  response.status(204).end();
});

app.use(unknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}! :3`);
});
