const express = require('express');
const request = require('request');

const cytricRouter = express.Router();

const cytricLoginUrl = 'https://apac.amadeus.cytric.net/rlogin';
const bodyContent = '<?xml version="1.0" encoding="utf-8"?><Request><Head><Username>0f4dd0ce77dc24f9f5e9057b6b978621</Username><Password>v0Auj1TCfQdD</Password><RequestType>HotelSearch</RequestType></Head><Body><CityId>248245</CityId><CheckInDate>2016-05-05</CheckInDate><CheckOutDate>2016-05-07</CheckOutDate><Rooms><Room><NumAdults>2</NumAdults></Room></Rooms><Nationality>US</Nationality><Currency>USD</Currency></Body></Request>';

const loginRequest = {
  url: cytricLoginUrl,
  port: 443,
  method: 'POST',
  body: bodyContent,
  headers: {
    Accept: 'text/xml; charset=UTF-8',
    'Content-Length': Buffer.byteLength(bodyContent)
  }
};

cytricRouter.route('/')
  .get((req, res) => {
    request.post(loginRequest, (err, response, body) => {
      res.send(body);
    });
  });

module.exports = cytricRouter;