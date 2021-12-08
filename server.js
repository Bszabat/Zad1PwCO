//import framework
import express from 'express';
import fetch from 'node-fetch';

// Zmienne stale: port, data, autor
const PORT = 8080;
const HOST = '0.0.0.0'
const DATE = new Date().toLocaleDateString('pl-PL');
const NAME = "Bartlomiej Szabat"

//fukncja do pobrania daty i czasu na podstawie adresu IP
async function getDateTimeFromIP(ip)
{
  try
  {
    var site = await fetch('http://ip-api.com/json/${ip}');
    var data = await site.json();
    var timezone = data['timezone'];
    var local = new Date().toLocaleString('pl-PL', {timeZone: timezone});
    
    return `${local}`;
  }
  catch(e)
  {
    console.log(e);
    return 'Pobieranie danych nie powiodlo sie';
  }
}

// aplikacja
const app = express();

//ip
app.set('trust proxy', true);
app.use(async (req,res) =>
{
  var date = await getDateTimeFromIP(req.ip);
  res.send(`<p>Odczytywanie IP oraz Daty. Zadanie 1.</p><p>IP: ${req.ip}</p><p>Data oraz Czas:  ${date}</p>`);
});

//logi
console.log('Autor: ${NAME');
console.log('Port: ${PORT}');
console.log('Data i czas: ${DATE}');


app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
