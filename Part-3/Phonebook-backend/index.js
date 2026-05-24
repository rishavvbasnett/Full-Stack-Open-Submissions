import express, { json, request, response } from "express";
import numbersList from "./data.json" with { type: "json" };

const app = express();

app.get("/", (request, response) => {
  response.send("<h1>Welcome to my server</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(numbersList);
});

app.get('/info' , (request, response) => {
  response.send(`
    <p>Phonebook has info for ${numbersList.length} entries </p>
    <p>${new Date(Date.now()).toString()}</p>
    `)
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const requestedPerson = numbersList.find(person => person.id === id)
  
  if (requestedPerson) {
    response.json(requestedPerson)
  } else {
    response.status(404).json({"error": "Id doesn't exist"})
  }

})



app.listen(3001);
