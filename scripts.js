// The user must be able to search for parks in one or more states.
// The user must be able to set the max number of results, with a default of 10.
// The search must trigger a call to NPS's API.
// The parks in the given state must be displayed on the page. Include at least:
// Full name
// Description
// Website URL

// The user must be able to make multiple searches and see only the results for the current search.

const apiKey = 'hex4oK626YhLuHKEtRlmIj2a9Hr9kYd9NGzIZTVs';  
const searchURL = 'https://developer.nps.gov/api/v1/parks';

function getParksByState(state, limit) {
  const url = `${searchURL}?api_key=${apiKey}&stateCode=${state}&limit=${limit}`;

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function displayResults(responseJson) {
    $('#results-list').empty();
    responseJson.data.forEach(response => {
        $('#results-list').append(
            `<div class='response-li'>
            <li><h2>${response.fullName}</h2></li>
            <li><h2><a href="${response.url}" target="_blank">${response.name} website</a></h2>
            </li>
            <li><h2>${response.description}
            </div>
            `)
            $('#results').removeClass('hidden');
    })
}

function watchForm() {
    $('form').submit(event => {
      event.preventDefault();
      const state = $('#js-search-state').val();
      const limit = $('#js-max-results').val();
      getParksByState(state, limit);
    });
  }
  
  $(watchForm);