
# makromusic Web Task API Document

## API

#### Main Route

```http
https://makromusic-web-task-api.onrender.com/
https://junior-web-task-api-production.up.railway.app/
```

#### Create Campaign

```http
  GET /create-campaign

  // return data

  id: 4:int,
  track_id: NULL,  
  genres: NULL,
  region: NULL,
  package: NULL,
  start_date: NULL,

```

#### Update Campaign

```http
  POST /update-campaign

  // post data

  id: 4:int,
  campaign_data: {
    track_id: 'spotify_uri':string,
    genres: ["Hip Hop", "Rap"]:array,
    region: 'US':string,
    package: '1':string,
    start_date: '1':string,
  }:object
```

#### Get Campaign

```http
  GET /get-campaign?id={campaign_id}

  // return data

  id: 4:int,
  campaign_data: {
    track_id: 'spotify_uri':string,
    genres: ["Hip Hop", "Rap"]:array,
    region: 'US':string,
    package: '1':string,
    start_date: '1':string,
  }:object
```

#### Search on Spotify

```http
  GET /search-on-spotify?q={search_query}

  //return data

  tracks: {
    items: [
      {
        id: '0WtDGnWL2KrMCk0mI1Gpwz':id
        uri: 'spotify:track:0WtDGnWL2KrMCk0mI1Gpwz':string,
        name: "Redbone":string
      }
    ]:array,
  }:object
```

#### Get on Spotify

```http
  GET /get-on-spotify?id={spotify_id}

  //return data

  track: {
    id: '0WtDGnWL2KrMCk0mI1Gpwz':id
    uri: 'spotify:track:0WtDGnWL2KrMCk0mI1Gpwz':string,
    name: "Redbone",:string
  }:object
```


#### Get Packages

```http
  GET /get-packages

  //return data

  [
    {
      id: '1':string,
      name: 'Listelere Oyna':string,
      click: 5000:int,
      price: 1000:int,
      description: 'İtici bir güçle kampanyana başlangıç ver':string,
      currency: 'TRY':string
    }
  ]:array
```

#### Track Genres

```http
  GET /track-genres

  //return data

  ['pop', 'rock', 'jazz']:array
```
