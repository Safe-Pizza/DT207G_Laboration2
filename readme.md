# Laboration 2, DT207G REST API
Detta är en laboration i _Webbutveckingsprogrammet_ på Mittuniveristetet.

Repot innehåller kod för ett enkelt REST API som är byggt med express.
APIet är byggt för att hantera tidigare arbetserfarenheter såsom arbetsplats, typ av jobb, beskrivning och anställningstid.
CRUD (Create, Read, Update and Delete) är implementerat.

## Redovsning
[Redovisningsvideo](https://youtu.be/c6IRwHEpC5g)

## Installation och Databas
APIet använder SQlite3 (better-sqlite3) som databas. 

1. Klona repot
    ```sh
    git clone https://github.com/safe-pizza/DT207G_Laboration2.git
    ```

2. Gå in i projektmappen
    ```sh
    cd DT207G_Laboration2
    ```

3. Installera npm-paket
    ```sh
    npm install
    ```

4. Installation för databas, skapar databas med tabell. Se tabell-info längre ned.
    ```sh
    node install.js
    ```

4. Starta en utvecklingsserver
    ```sh
    npm run dev
    ```

| Tabellnamn  | Fält        |
| ----------- | ----------- |
| job         | **id**(INTEGER AUTOINCREMENT), **companyname**(TEXT), **jobtitle**(TEXT), **location**(TEXT), **description**(TEXT), **startdate**(TEXT), **enddate**, (TEXT), user_created(TIMESTAMP)       |

## Användning
Tabellen nedan beskriver olika sätt att nå APIet.

| Metod      | Endpoint | Beskrivning  |
| ----------- | ----------- | ----------- |
| GET      | /jobs       |  Hämtar alla inlagda jobb  |
| GET   | /jobs/:ID        |  Hämtar jobb med specifikt angivet ID  |
| POST      | /jobs       |  Lagarar nytt jobb. Kräver att jobb-objekt skickas med  |
| PUT   | /jobs/:ID        | Ändrar jobb med specifikt angivet ID. Kärver att jobb-objekt skickas med  |
| DELETE      | /jobs/:ID       | Raderar ett jobb med specifikt angivet ID  |

Ett jobb-objekt returneras som JSON med nedan struktur:
```json
{
   "id": 1,
   "companyname": "Ett företagsnamn",
   "jobtitle": "Jobbtitel",
   "description": "En beskrivning av vad jobbet innehållit",
   "startdate": "2026-01-01",
   "enddate": "2026-12-31",
   "user_created": "2026-04-15 12:59:28"
}
```

Ett jobb-objekt skickas som JSON med nedan struktur:
```json
{
   "companyname": "Ett företagsnamn",
   "jobtitle": "Jobbtitel",
   "description": "En beskrivning av vad jobbet innehållit",
   "startdate": "2026-01-01",
   "enddate": "2026-12-31",
}
```

## Kontakt
 Vill du komma i kontakt med mig?


**Hanna Lindkvist** \
✉️ [hali2507@student.miun.se](mailto:hali2507@student.miun.se)
