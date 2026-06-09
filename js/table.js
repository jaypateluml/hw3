// Jay Patel
// COMP 4610 GUI I - HW3

// assignment range
var MIN_ALLOWED = -50;
var MAX_ALLOWED = 50;

document.getElementById("tableForm").addEventListener("submit", function (event) {
    event.preventDefault(); // no page reload
    generateTable();
});


function generateTable() {
    var errorBox = document.getElementById("errorBox");
    var tableArea = document.getElementById("tableArea");

    // clear previous output
    errorBox.innerHTML = "";
    tableArea.innerHTML = "";

    // values as stringf for form
    var minColText = document.getElementById("minCol").value;
    var maxColText = document.getElementById("maxCol").value;
    var minRowText = document.getElementById("minRow").value;
    var maxRowText = document.getElementById("maxRow").value;

    // check each field
    var problems = [];
    addProblem(problems, checkNumber(minColText, "Minimum Column Value"));
    addProblem(problems, checkNumber(maxColText, "Maximum Column Value"));
    addProblem(problems, checkNumber(minRowText, "Minimum Row Value"));
    addProblem(problems, checkNumber(maxRowText, "Maximum Row Value"));

    var minCol = parseInt(minColText, 10);
    var maxCol = parseInt(maxColText, 10);
    var minRow = parseInt(minRowText, 10);
    var maxRow = parseInt(maxRowText, 10);

    // min cant be bigger than max
    if (problems.length === 0) {
        if (minCol > maxCol) {
            problems.push("Minimum Column Value cannot be bigger than Maximum Column Value.");
        }
        if (minRow > maxRow) {
            problems.push("Minimum Row Value cannot be bigger than Maximum Row Value.");
        }
    }

    if (problems.length > 0) {
        errorBox.innerHTML = "Please fix these:<br>" + problems.join("<br>");
        return;
    }

    tableArea.innerHTML = buildTableHTML(minCol, maxCol, minRow, maxRow);
}


// add error if there is one
function addProblem(list, message) {
    if (message !== "") {
        list.push(message);
    }
}


// checks one field
function checkNumber(text, fieldName) {
    text = text.trim();

    if (text === "") {
        return fieldName + " is empty. Please type a number.";
    }

    if (isNaN(Number(text))) {
        return fieldName + " (\"" + text + "\") is not a number.";
    }

    if (text.indexOf(".") !== -1) {
        return fieldName + " must be a whole number (no decimals).";
    }

    var value = Number(text);

    // keeps it in range
    if (value < MIN_ALLOWED || value > MAX_ALLOWED) {
        return fieldName + " must be between " + MIN_ALLOWED + " and " + MAX_ALLOWED + ".";
    }

    return "";
}


// build the table in html
function buildTableHTML(minCol, maxCol, minRow, maxRow) {
    var html = "<table>";

    // top row colmun numbers
    html += "<thead><tr><th></th>";
    for (var c = minCol; c <= maxCol; c++) {
        html += "<th>" + c + "</th>";
    }
    html += "</tr></thead>";

    // rows and the answerss
    html += "<tbody>";
    for (var r = minRow; r <= maxRow; r++) {
        html += "<tr><th>" + r + "</th>";
        for (var c2 = minCol; c2 <= maxCol; c2++) {
            html += "<td>" + (r * c2) + "</td>";
        }
        html += "</tr>";
    }
    html += "</tbody></table>";
    return html;
}
