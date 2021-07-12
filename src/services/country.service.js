import http from "../http-common";

class countryService {
  getAll() {
    return http.get("/country");
  }

  get(id) {
    return http.get(`/country/${id}`);
  }

  create(data) {
    return http.post("/country", data);
  }
}

export default new countryService();
