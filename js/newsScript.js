
document.getElementById("countrySubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("countryInput").value;
    if (value === "")
      return;
    console.log(value);

    const url = "https://app.sportdataapi.com/api/v1/soccer/countries?apikey=feca27a0-8f62-11ec-a979-2db5758a3bfb";
    fetch(url)
    .then(function(response){
        return response.json();
    }).then(function(json) {
        let country_id = "";
        let v = value;
        v = v.charAt(0).toUpperCase() + v.slice(1);

        for(let i =0; i < json.data.length; i++){
            if(value.toLowerCase() === json.data[i].name.toLowerCase()){
                country_id = json.data[i].country_id;
            }
        }

        let results = "";
        if(country_id != ""){
            const url2 = "https://app.sportdataapi.com/api/v1/soccer/leagues?apikey=feca27a0-8f62-11ec-a979-2db5758a3bfb&country_id=" + country_id; //48";
            fetch(url2)
                .then(function(response){
                    return response.json();
                }).then(function(json) {
                    let p = Object.keys(json.data);

                    results += "<h2>Soccer Leagues of " + v + "</h2>";
                    results += "<table id='table1' border='1|1' style='width: 50%; text-align: center;' ><tr><th>Team Name</th><th>League Id Number</th></tr>"
                    for (let i=0; i < Object.keys(json.data).length; i++) {
                        results += "<tr>";
                        results += "<td>" + json.data[p[i]].name + " </td>";
                        results += "<td>" + json.data[p[i]].league_id + " </td>";
                        results += "</tr>"; 
                    }
                    results += "</table><br><br><hr>";

                    document.getElementById("soccerLeague").innerHTML = results;
                });
        } else {
            results += "<h2>" + v + " is not a country. Enter a valid country name. </h2>";
            document.getElementById("soccerLeague").innerHTML = results;
        }
    });


});