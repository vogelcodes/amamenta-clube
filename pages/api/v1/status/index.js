function status(request, response) {
  response.status(200).json({ server: "OK" });
}

export default status;
