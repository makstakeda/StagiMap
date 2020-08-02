# Stagimap

Stagimap is a simple and friendly configurator for Yandex.Maps. Goal of this library is to give to any developer simple ways of customizing and deploying maps on buisness websites without learning required API-methods. Just with few lines of code you can build your own functional map with clusters, navigation, hide/show functions and more.

**NOTE:** Stagimap is based on version 2.1.XX of Yandex.Maps API and depends on its lifecycle. The library is not created for flexible tune-in and supports limited features of [Yandex.Maps API](https://tech.yandex.com/maps/jsapi/).

Documentation and demo in Russian: [makstakeda.ru/stagimap](http://makstakeda.ru/stagimap) 

**Main features:**

* Map's customizing and importing with few lines of code
* Quick adding and working with map's points
* Points' clusterting with one parameter only
* Control the map data from outside with HTML-elements
* Quick methods of groups' creation and its managing
* Quick route builder and adding of transfer's points
* Quick adding of styles
* Configuration of control elements

## Getting started

### Library demo

This project includes simple React-based app which can be run with the following command

```
npm start
```

You can use it as a demo or for further development on top of this project.

### Build from the source and importing into your project

To generate production version of Stagimap library, run the following command

```
npm run bundle
```

It will create minified version of library located in `dist` folder. You can import it into your project and get started with it.

### Configuring and Initializing

Instance of `StagiMap` class should be created with parameters to define behaviour and state of the rendered map.

```
import '../stagimap.min';

const map = new StagiMap({
  ...smOptions,
});
```

You should allocate `div#stagimap` on HTML-template which will be used as container for the map.

Instance of `StagiMap` class to initialize the map should be created with parameters to define behaviour and state of rendered map. Coordinates on the parameters are presented in the `coordinateds = [LATITUDE, LONGITUDE]` format.

#### Authorization

Some features are limited and requires usage of API key. You need to have Yandex account for being able to [create API key](https://developer.tech.yandex.ru/services/). The needed key is `JavaScript API and Geocoder HTTP API`.

Parameter          | Format     | Description
------------------ | ---------- | ------------- 
`smOptions.locale` | `RFC-3066` | sets preferred localization

#### Localization

You must choose the map's localization in RFC-3066 format (Get Information about supported localizations on [tech.yandex.com/maps/doc/intro/concepts/localization-docpage](https://tech.yandex.com/maps/doc/intro/concepts/localization-docpage/). If there is no selected localization, `en` will be used as default.

Parameter          | Format   | Description
------------------ | -------- | ------------- 
`smOptions.apiKey` | `string` | sets API key which will be used for access to Yandex.Maps API

#### Main parameters

Main parameters include geographical coordinates of the map's center, working area, minimum, maximum and initial zoom.

Parameter                | Format                         | Description
------------------------ | ------------------------------ | ------------- 
`smOptions.center`       | `coordinateds`                 | sets geospatial coordinates of the map's center
`smOptions.restrictArea` | `[coordinateds, coordinateds]` | sets the map's area with restricted borders through coordinates of left-top border point and right-bottom border point (optional)
`smOptions.initialZoom`  | `integer`                      | sets initial zoom in range of `1 ... 16`
`smOptions.maxZoom`      | `integer`                      | sets maximum zoom in range of `1 ... 16`
`smOptions.minZoom`      | `integer`                      | sets minimum zoom in range of `1 ... 16`

#### Zoom buttons

Ability to set and customize zoom buttons.

Parameter                           | Format                          | Description
----------------------------------- | ------------------------------- | ------------- 
`smOptions.zoomButtons.inButton`    | `url`                           | sets image for "Zoom In" buttom's template
`smOptions.zoomButtons.inText`      | `string`                        | sets popup text for hover "Zoom In" button
`smOptions.zoomButtons.inStyle`     | `string`                        | sets styles for "Zoom In" buttons's template, for example, `width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;`
`smOptions.zoomButtons.inPosition`  | `{top: integer, left: integer}` | sets position on map for "Zoom In" button
`smOptions.zoomButtons.outButton`   | `url`                           | sets image for "Zoom Out" buttom's template
`smOptions.zoomButtons.outText`     | `string`                        | sets popup text for hover "Zoom out" button
`smOptions.zoomButtons.outStyle`    | `string`                        | set styles for "Zoom Out" buttons's template, for example, `width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;`
`smOptions.zoomButtons.outPosition` | `{top: integer, left: integer}` | sets position on map for "Zoom Out" button

#### Geolocation button

Ability to set and customize geolocation buttons.

Parameter                           | Format                          | Description
----------------------------------- | ------------------------------- | ------------- 
`smOptions.geolocation.geoButton`   | `url`                           | sets image for "Geolocation" buttom's template
`smOptions.geolocation.geoText`     | `string`                        | sets popup text for hover "Geolocation" button
`smOptions.geolocation.geoStyle`    | `string`                        | sets styles for "Geolocation" buttons's template, for example, `width: 30px; height: 30px; border-radius: 0px 0px 20px 20px;`
`smOptions.geolocation.geoPosition` | `{top: integer, left: integer}` | sets position on map for "Geolocation" button
`smOptions.geolocation.icon`        | `url`                           | sets "Geolocation" point's template
`smOptions.geolocation.sizePoint`   | `[integer, integer]`            | sets "Geolocation" point's size as `[WIDTH, HEIGHT]`
`smOptions.geolocation.offsetPoint` | `[integer, integer]`            | sets "Geolocation" point's offset as `[L-OFFSET, T-OFFSET]`

#### Clustering

Parameter           | Format    | Description
------------------- | --------- | ------------- 
`smOptions.cluster` | `boolean` | unite points on the map into the clusters depending on the zoom

#### Map points

Points can be added on the map within `smOptions.data` property based on described schema.

Parameter                       | Format               | Description
------------------------------- | -------------------- | ------------- 
`smOptions.data[i].coordinates` | `coordinateds`       | sets the coordinates of the point's center as `[LATITUDE, LONGITUDE]`
`smOptions.data[i].html`        | `string`             | sets text or HTML-string for the point's baloon content
`smOptions.data[i].title`       | `string`             | sets text or HTML for the point's baloon title
`smOptions.data[i].icon`        | `url`                | sets the point's icon template
`smOptions.data[i].sizePoint`   | `[integer, integer]` | sets the point's size as `[WIDTH, HEIGHT]`
`smOptions.data[i].offsetPoint` | `[integer, integer]` | sets the point's offset as `[L-OFFSET, T-OFFSET]`
`smOptions.data[i].group`       | `integer`            | sets the group for the point if it is needed

#### Routes

Router is providing ability to build multiroutes from A to B.

**NOTE:** In current revision of API it requires API-key to be passed.

Parameter                     | Format           | Description
----------------------------- | ---------------- | ------------- 
`smOptions.router.startPoint` | `coordinateds`   | sets the coordinates of the route start point as `[LATITUDE, LONGITUDE]`
`smOptions.router.endPoint`   | `coordinateds`   | sets the coordinates of the route end point as `[LATITUDE, LONGITUDE]`
`smOptions.router.maxWays`    | `integer`        | sets the maximum possible ways from between the start and end point.
`smOptions.router.refPoints`  | `[coordinateds]` | sets the transit points between the the start and end point as `[[LATITUDE, LONGITUDE]]`

#### Traffic

Ability to show current traffic situation for places in Russia, Belarus, Kazakhstan and Turkey.

Parameter           | Format    | Description
------------------- | --------- | -------------
`smOptions.traffic` | `boolean` | turns on layout with current road traffic

### Integration on HTML template

Attribute  | Format             | Description
---------- | ------------------ | -------------
`sm-point` | `index`            | moves to the point on the map selected by index in `smOptions.data`
`sm-move`  | `integer, integer` | moves to the passed coordinates (latitude and longitude), for example, `sm-move="0, 0"`
`sm-show`  | `integer`          | toggles the group's visibility bu passing the group's identifier related to the points with specified group `smOptions.data[i].group`. If no value is passed, it shows all points on click.

