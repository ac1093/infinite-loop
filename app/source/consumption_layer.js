// Creating map object
var myMap = L.map("map", {
    center: [52.52, 13.40],
    zoom: 4
  });

  // Adding tile layer to the map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(myMap);

  var consumptiondata = "data/alcohol_consumption.json";
  var geodata = "data/countries-hires.json";
  var consumption = []
  var color = ""

d3.json(consumptiondata, function(response){
    console.log("this is response")
    console.log(response);
    response.forEach((banana) => {
      var x = banana.country_name
      
      // color_x = chooseColor(x)
      
      // var cons_color = countrycolor(color_x)
      // console.log(cons_color);

        // Iterate through each key and value
        Object.entries(banana).forEach(([key, value]) => {
          consumption.push(banana);
         });
      });
});
console.log("this is consumption")
console.log(consumption);

    function countrycolor(item){
    // console.log("this is both sexes")
    // console.log(item.both_sexes);
    if (item >= 1){
        return "yellow"
    }
    else if (item >= 2){
        return "red"
    }
    else {
        return "black"
    }
};

// function chooseColor(object) {
//   //console.log(consumption);
//   // console.log(object.both_sexes);
//   Object.entries(consumption).forEach(([key, value]) => {
//     console.log(consumption.country_name);
//   });
//     switch (consumption.country_name) {
//     case "Portugal":
//       console.log("switch case Portugal");
//       return countrycolor(consumption.both_sexes);
//       // return "blue"; 
//     case "Germany":
//       return "red";
//     case "Italy":
//       return "orange";
//     case "France":
//       return "white";
//     case "Belgium":
//       return "purple";
//     case "Iceland":
//       return "purple";
//     default:
//       return "green";
//     }
//   }
  d3.json(geodata, function(response){
    // console.log(response);
    console.log(consumption);
    consumption.forEach((row) => {
    if (row.both_sexes >= 1 && row.both_sexes <=7){
       color = "yellow"
       row["color"] = color;
  }
  else if (row.both_sexes > 7 && row.both_sexes <=13){
      color = "red"
      row["color"] = color;
  }
  else {
    color = "black"
    row["color"] = color;     
  }
});
  
consumption.forEach((row) => { 
console.log(row.color)});
    // var x = chooseColor(consumption);
    consumption.forEach((row) => {
    L.geoJson(response,{
      color: "white",
      fillColor: row.color,
      fillOpacity: 0.5,
      weight: 1.5
    });
        // console.log("this is SOVEREIGNT");
        // console.log(apple.properties.SOVEREIGNT);
        // console.log("this is choose color consumption");
        // console.log(chooseColor(consumption));
    }).addTo(myMap);
});