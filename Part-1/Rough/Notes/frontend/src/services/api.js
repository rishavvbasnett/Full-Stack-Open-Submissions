import axios from "axios";

const url = "http://localhost:3001/api/notes";

async function fetchNotes() {
  const response = await axios.get(url);
  return response.data;
}

async function postNote(note) {
  const response = await axios.post(url, note);
  return response.data;
}

const api = {
  fetchNotes: fetchNotes,
  postNote: postNote,
};

export default api;
