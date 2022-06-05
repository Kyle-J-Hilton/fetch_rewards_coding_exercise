var selectedRow = null
 
//ADD TRANSACTIONS TO LOG SECTION
//function to run when user hits first submit button
function onFormSubmit() {
    if(validate()) {
        var formData = readFormData();
        //function to enter the submitted data to a list of HTML elements
        transactionDataNodeList();
        //first make sure results table is clear and then enter data to display
        if (selectedRow == null){
            insertNewRecord(formData);
        }
        else
            updateRecord(formData);
    }}

//Reads user entered data and stores in formData
function readFormData() {
    var formData = {};
    formData["payer"] = document.getElementById("payer").value;
    formData["pointsTotal"] = document.getElementById("pointsTotal").value;
    formData["timestamp"] = document.getElementById("timestamp").value;
    return formData;
}

//AddS user entered data to table, parameter is the form data
function insertNewRecord(data) {
    var table = document.getElementById("payerList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.payer;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.pointsTotal;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.timestamp;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<a onClick="onDelete(this)">Delete</a>`;
}

//Clears form info
function resetForm() {
    document.getElementById("payer").value = "";
    document.getElementById("pointsTotal").value = "";
    document.getElementById("timestamp").value = "";
    selectedRow = null;
}

//replaces data if selected row is not cleared
function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.payer;
    selectedRow.cells[1].innerHTML = formData.pointsTotal;
    selectedRow.cells[2].innerHTML = formData.timestamp;
}

//deletes row if user presses delete button
function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
        document.getElementById("payerList").deleteRow(row.rowIndex);
        resetForm();
    }
}

//Makes sure form was filled in
function validate() {
    isValid = true;
    if (document.getElementById("payer").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}

//Makes user entered data into an object called inputs
//Pushes that object into an array and stores on the browsers memory untill page is refreshed
function transactionDataNodeList(){
    var inputs = {};
    inputs["payer"] = document.getElementById("payer").value;
    inputs["points"] = document.getElementById("pointsTotal").value;
    let time = document.getElementById("timestamp").value;
    let timestamp = Date.parse(time)
    inputs['time'] = timestamp;
    const nodelist = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
    nodelist.push(inputs);
    localStorage.setItem("list", JSON.stringify(nodelist));
    return nodelist;
}

//fills in Array called transactionDetails
function pushTransactionDetails(){
    const nodelist = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
    localStorage.setItem("list", JSON.stringify(nodelist));
    let transactionDetailsArr = Array.prototype.slice.call(nodelist);
 return transactionDetailsArr;
} 


//sort the array of user enter data based on the date entered
function sortingARR(){
    transactionDetailsArr = pushTransactionDetails();
    var sortedTransactionDetails = transactionDetailsArr.sort((a, b) => a.time - b.time);
    console.log(sortedTransactionDetails);
        return sortedTransactionDetails;
}


//Spend Points Section

//calculate each accounts indivdual balance before spending points
function firstBalanceCalc(){
    let balance = [];
    let names = removeCopys();
    let arr = sortingARR();
//creates array of account balances  
for(i=0;i<names.length;i++){
    let currentName = names[i];
    balance[i] = 0;
    for(j=0;j<arr.length;j++){
    let currentObj = arr[j];
    let currentPoints = arr[j].points;
    let currentPointsInt = parseInt(currentPoints);
    if(currentObj.payer === currentName){
        balance[i] +=  currentPointsInt;
    }}}   
console.log(balance);
    return balance;
}


//calculate how to spend points based on rules, oldest to newest, account never below 0
//passed sortingARR() s return as the parameter arr
function spendPointsCalc(pointsToSpend, arr){
    let points = parseInt(String(pointsToSpend));
    let finalPointsSpentArr = [];
    let accountNames = [];
    let pointsValue = [];
for(let i = 0; i < arr.length; i++){
    let obj = arr[i]
    accountNames.push(obj.payer);
    let num = parseInt(obj.points);
    pointsValue.push(num);
    points -= num;
    if(points <= 0){
        pointsValue.pop();
        points += num;
        pointsValue.push(points);
        points = 0;
        break;
    }}
finalPointsSpentArr = accountNames.map(function (x, i){
    return {"payer": x, "pointsSpent": pointsValue[i]}
});
return finalPointsSpentArr;
}

//enter which points were spent into a table
function insertNewRecord2(data1) {
    var formData2 = readFormData2();
    var pointsSpent = spendPointsCalc(formData2, data1);
    for(i=0;i<pointsSpent.length;i++){
        let j = i;
    var table1 = document.getElementById("spendList").getElementsByTagName('tbody')[0];
    let newRow1 = table1.insertRow(j);
    cell1 = newRow1.insertCell(0);
    cell1.innerHTML = pointsSpent[i].payer;
    cell2 = newRow1.insertCell(1);
    cell2.innerHTML = pointsSpent[i].pointsSpent;
}
}

//runs when button is clicked
function onFormSubmit2() {
    formData2 = readFormData2();
    if (validate2()) {
        var sortedTransactionDetails = sortingARR();
        
        if (selectedRow == null){
            insertNewRecord2(sortedTransactionDetails);
        }
        else{
            updateRecord2(formData2);
        resetForm();
        }}}

//read the user entered dated for points to spend
function readFormData2() {
    var formData2 = "";
     0;
    formData2 = document.getElementById("spendpoints").value;
    var formdata2 = parseInt(formData2);
    console.log(formdata2);
    console.log(formData2);
    return formdata2;
}


//
function updateRecord2(formData2) {
    selectedRow.cells[0].innerHTML = formData2.spendpoints;
}


//
function validate2() {
    isValid = true;
    if (document.getElementById("spendpoints").value == "") {
        isValid = false;
        document.getElementById("fullNameValidationError").classList.remove("hide");
    } else {
        isValid = true;
        if (!document.getElementById("fullNameValidationError").classList.contains("hide"))
            document.getElementById("fullNameValidationError").classList.add("hide");
    }
    return isValid;
}


// Check BALANCE SECTION 
//function runs when check balance button is presses
function accountBalances(){
    insertNewRecord3();
}


//Calculate the balance of each account 
function calcFinalBalance(){
    let preBalanceArr = firstBalanceCalc()
    let finalBalanceArr = [];
    let formData2 = readFormData2();
    let sortedArr = sortingARR();
    let arr = spendPointsCalc(formData2, sortedArr);
    let names = removeCopys();
    let pointsRemoved = [];
    for(i=0;i<names.length;i++){
        let currentName = names[i];
        pointsRemoved[i] = 0;
        for(j=0;j<arr.length;j++){
        let currentObj = arr[j];
        let currentPoints = arr[j].pointsSpent;
        let currentPointsInt = parseInt(currentPoints);
        if(currentObj.payer === currentName){
            pointsRemoved[i] +=  currentPointsInt;
        }}}console.log(pointsRemoved);
        for(k = 0; k < pointsRemoved; k++){
            let bal = preBalanceArr[k] - pointsRemoved[k];
            finalBalanceArr.push(bal); 
        }
        console.log(finalBalanceArr);
        return finalBalanceArr;
}


//presents balances in table under check balances button
function insertNewRecord3() {
    let finalbalance = calcFinalBalance();
    for(i=0;i<finalbalance.length;i++){
    var table1 = document.getElementById("checkBalanceList").getElementsByTagName('tbody')[0];
    var newRow = table1.insertRow(table1.length);
    let finalBal = finalbalance[i];
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = finalBal.payer;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = finalBal.points;
    }
}

//clears array from memory when page is refreshed
function clearLocalMemory(){
    let nodelist = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
    localStorage.removeItem("list");
    nodelist = 0;
}

//
function removeCopys(){
    //call sorted transaction details and make an array of just the names
    let arr = sortingARR();
    let names = [];
    for (let i = 0; i < arr.length; i++) {
        let name = arr[i].payer;
        names.push(name);
    }
    //check if the same account name was entered multiple times
    let check = true;
    while (check){
     // empty object
     let map = {};
     let result = false;
     for(let i = 0; i < names.length; i++) {
        // check if object contains entry with this name as key
        // remove duplicate account name
        if(map[names[i]]) {
            check = true;
           names.splice(i, 1);
           i--;
        }else {
            check = false;
         }
        // add entry in object with the element as key
        map[names[i]] = true;
     }
     //check again if there was a match else end the loop
     if(result) {
        console.log('found a match');
        check = true;
     } else {
        console.log(`all payer names different`);
        check = false;
     }
    }
 return names;
}