// Connect to the registry
var model = new falcor.Model({source: new falcor.HttpDataSource('http://all.packetregistry.com/model.json', {
      withCredentials: false,
      crossDomain: true
    })
});

// Helper functions to log the JSON Graph
var jlog = function(x) {
      console.log(JSON.stringify(x, null, 3));
    },
    jerror = function(x) {
      console.error(JSON.stringify(x, null, 3));
    };

// Example usage of logging functions
model.get(["packages", "bower"]).then(jlog, jerror);



// Get general info about the registry
model.get("registryInfo").then(function(response) {
  document.write("<h2> 1. General info</h2>");
  document.write(response.json.registryInfo.name);
});

// Get count of all packages inside the registry
model.get("packages.length").then(function(response) {
  document.write("<h2> 2. Packages in registry</h2>");
  document.write(response.json.packages.length);
});

// Get multiple search results based on package name
model.get(["packages", "bower"]).then(function(response){
  
  var resultArray = response.json.packages["bower"];
  
  document.write("<h2> 3. Search results</h2>");
  for(package in resultArray){
    document.write(package+"<br>");
  }
  
});