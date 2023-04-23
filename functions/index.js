const functions = require("firebase-functions");
const {Client} = require("@googlemaps/google-maps-services-js");

exports.getNearbyCoordinates = functions.https.onRequest(async (req, res) => {
  const {latitude, longitude} = req.body;

  const client = new Client({});

  try {
    const response = await client.placesNearby({
      params: {
        location: `${latitude},${longitude}`,
        radius: 100,
        key: functions.config().googlemaps.key,
      },
      timeout: 1000,
    });

    const nearbyCoordinates = response.data.results.map((result) => {
      return result.geometry.location;
    });

    res.send(nearbyCoordinates);
  } catch (e) {
    console.error(e);
    res.status(500).send("Erro ao buscar as coordenadas próximas.");
  }
});
