// Include the Axios library for HTTP requests
import axios from "axios";

// NYT API Key (Replace with your own API Key)
var APIKey = "9b3adf57854f4a19b7b5782cdd6e427a";

// Helper Functions
const helpers = {

  // This will run our query.
  runQuery: function(term, start, end) {

    // Adjust to get search terms in proper format
    var formattedTerm = term.trim();
    var formattedStart = start.trim() + "0101";
    var formattedEnd = end.trim() + "1231";


    console.log("Query Run");
    // Run a query using Axios. Then return the results as an object with an array.
    // See the Axios documentation for details on how we structured this with the params.
    return axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json", {
      params: {
        "api-key": APIKey,
        "q": formattedTerm,
        "begin_date": formattedStart,
        "end_date": formattedEnd
      }
    })
    .then(function(results) {
      console.log("Axios Results", results.data.response);
      return results.data.response;
    });
  },
  // This will return any saved articles from our database
  getSaved: function() {
    return axios.get("/api/recipe")
      .then(function(results) {
        console.log("axios results", results);
        return results;
      });
  },
  // This will save new articles to our database
 postSaved: function(title, body) {
    var newRecipe = { title: title, body: body };
    console.log('postSaved', title)
    return axios.post("/api/saved", newRecipe);
  },
  populateduser: function() {
    return axios.get("/populateduser");
  },
  // This will remove saved articles from our database
  deleteSaved: function(id) {
    return axios.delete("/delete-recipe/" + id)
  }
};


// We export the helpers function
export default helpers;