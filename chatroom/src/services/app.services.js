import axios from "axios";

export function GetAllMessages() {
  return axios.get("/api/getAllMessages");
}

export function InsertMessage(data) {
  return axios.post("/api/insertMessage", data);
}
