
// Set up our main event handler.  This listener is applied to all "Test" buttons
// so that we can dispatch to the correct function for that problem. Requires that 
// buttons have class "problem-input" and id "p1-button", "p2-button", etc.
$('button.problem-input').click(mainInputHandler);
// clear background for all input elements upon typing
$('input').keydown(function(){
    $(this).removeClass('bg-success text-white');
    $(this).removeClass('bg-danger text-white');
});

// clear button (hard code this one since we only have 1 problem)
$('#p1-button-clear').click(function(){
    console.log("clearing input");
    $('#p1').val('');
});

// Returns problem number or null if invalid id
function validateButtonID(id)
{
    const regex = /p[1-9][0-9]*-button/;
    if(!regex.test(id))
    {
        return null;
    }
    // ID matches correct format, so extract problem number, i.e. 'p1'
    return id.split(new RegExp('-'))[0];
}


// Function called for all problem "Test" buttons
function mainInputHandler()
{
    const idAttr = this.id;

    // validate the id attribute
    const problemID = validateButtonID(idAttr);
    if(!problemID)
    {
        return;
    }
    //console.log(`Test button clicked: dispatching call for #${problemID}`);
    // Get string from the input element (having id="p1", etc.)
    const inputElement = $(`#${problemID}`);
    const inputValue = inputElement.val().replace(/\\n/g,"\n");     // allow it to work for newlines as the only escape character

    // First see if it's a URL.  If so then we need to go fetch the definitions in it
    // and run those as a batch, otherwise we're just validating one input
    // Checking to see if it starts with http:// or https://  and ends with .json is good enough for us here
    if(/^http[s]?:\/\/.*\.json$/.test(inputValue))
    {
        fetchAndRunBatchTests(inputValue,problemID);
        return;
    }

    // Dispatch the call if the function exists
    if(window[problemID])
    {
        // call the problem function.  In this version we want to take the output and 
        // put it into the element with name p#-output.  Let the problem function do that.
        const retVal = window[problemID](inputValue);
   /*     if(retVal)
        {
            inputElement.addClass('bg-success text-white'); 
        }
        else
        {
            inputElement.addClass('bg-danger text-white');
        }
    */
    }
    else
    {
        console.log(`No function found with the name ${problemID}`);
    }
}

function fetchAndRunBatchTests(url,problemID)
{
    console.log(`Requesting a batch test for data from ${url} for problem ${problemID}`);
    fetch(url)
        .then((response) => {
            if(!response.ok){
                $('#errorModal p.alert').empty().append(`Could not fetch testing json file. <br>Recieved ${response.status} ${response.statusText}`);
                $('#errorModal').modal({'data-keyboard':true});
                throw new Error(`Did not receive a 200 OK when trying to fetch the resource: received ${response.status} ${response.statusText}`)
            };
            return response.json();
        })
        .then((testJson) => {
            // json contains an array of objects; each object is one test or function call
            // run the function and place the actual result in the object
            testJson.map(obj => {
                obj['actual'] = window[problemID](obj['input']);
                obj['match'] = obj['expected'] === obj['actual'];
                return obj;
            });
            showResultsInModal(testJson,problemID)
            //console.log(testJson);
        })
        .catch((error) => {
            console.error('Error in fetching test json data: ', error);
        });    
}

function showResultsInModal(results,problemID)
{
    // create a table to hold results, then put it in the modal and display it
    let tbody = $('#batchTestResultsModalTable>tbody');
    tbody.empty();
    results.forEach((res) => {
        const bgcolor = res.match ? "table-success" : "table-danger";
        tbody.append(`<tr class="${bgcolor}">
                        <td>${res.input}</td>
                        <td>${res.expected}</td>
                        <td>${res.actual}</td>
                    </tr>`);
    });
    $('#batchTestResultsModal .modal-title').empty().append(`Batch Test Results for Problem ${problemID}`);
    $('#batchTestResultsModal').modal({'data-keyboard':true});
}

