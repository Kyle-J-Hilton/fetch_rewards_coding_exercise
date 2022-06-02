var selectedRow = null
 
//ADD TRANSACTIONS TO LOG SECTION
//function to run when user hits first submit button
function onFormSubmit() {
    if(validate()) {
        var formData = readFormData();
        transactionDataNodeList();
       
        if (selectedRow == null){
            insertNewRecord(formData);
        }
        else
            updateRecord(formData);
    }
}

//Reads user entered data and stores in formData
function readFormData() {
    var formData = {};
    formData["payer"] = document.getElementById("payer").value;
    formData["pointsTotal"] = document.getElementById("pointsTotal").value;
    formData["timestamp"] = document.getElementById("timestamp").value;
    return formData;
}

//ADDS user entered data to table
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
    cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
                       <a onClick="onDelete(this)">Delete</a>`;
}

//Clears form info
function resetForm() {
    document.getElementById("payer").value = "";
    document.getElementById("pointsTotal").value = "";
    document.getElementById("timestamp").value = "";
    selectedRow = null;
}

//makes editing the data posible
function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("payer").value = selectedRow.cells[0].innerHTML;
    document.getElementById("pointsTotal").value = selectedRow.cells[1].innerHTML;
    document.getElementById("timestamp").value = selectedRow.cells[2].innerHTML;
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


//enters form Name data into array

function transactionDataNodeList(){
    const input1 = document.getElementById("payer").value;
    const input2 = document.getElementById("pointsTotal").value;
    const input3 = document.getElementById("timestamp").value;
    const inputs = {"payer": input1, "points": input2, "time": input3};
    const nodelist = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
    nodelist.push(inputs);
    localStorage.setItem("list", JSON.stringify(nodelist));
    return nodelist;
}


//fills in Array called transactionDetails
function pushTransactionDetails(){
    const nodelist = transactionDataNodeList();
    let transactionDetailsArr = Array.prototype.slice.call(nodelist);
    console.log(transactionDetailsArr);
 return transactionDetailsArr;
} 


//sort the array of user enter data
function sortingARR(){
    transactionDetailsArr = pushTransactionDetails();
    var sortedTransactionDetails = transactionDetailsArr.sort((a, b) => a.time - b.time)
    console.log(sortedTransactionDetails);
        return sortedTransactionDetails;
}

//calculate how to spend points based on rules, oldest to newest, account never below 0
function spendPointsCalc(pointsToSpend, sortedTransactionDetails){
   
    let pointsSpent = [];
    let accountNames = [];
    let pointsValue = [];
console.log(sortedTransactionDetails);
for (let i = 0; i < sortedTransactionDetails.length; i++) {
    let obj = sortedTransactionDetails[i]
    accountNames.push(obj.payer);
    let num = parseInt(obj.points);
    pointsValue.push(num);
    pointsToSpend -= num;

    if(pointsToSpend <= 0){
        pointsValue[i] = Math.abs(pointsToSpend);
        pointsToSpend = 0;
    }
} 
pointsSpent = accountNames.map((e, i) => e + pointsValue[i]);
console.log(pointsSpent);
return pointsSpent;
}


//enter which points were spent into a table
function insertNewRecord2(data1) {
    var formData2 = readFormData2();
    var pointsSpent = spendPointsCalc(formData2, data1);
    var table1 = document.getElementById("spendList").getElementsByTagName('tbody')[0];
   
for(i=0;i<pointsSpent.length;i++){
    var newRow1 = table1.insertRow(table1.length);
    cell1 = newRow1.insertCell(0);
    cell1.innerHTML = pointsSpent[i];
   
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
        }
    }
}

//read the user entered dated for points to spend
function readFormData2() {
    var formData2 = {};
   
    formData2["spendpoints"] = document.getElementById("spendpoints").value;
    
    
    return formData2;
}

function updateRecord2(formData2) {
    selectedRow.cells[0].innerHTML = formData2.spendpoints;
  
}

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







//Check BALANCE SECTION

function finalBalanceCalc(){
    let dannonBalance = 0;
    let unileverBalance = 0;
    let millercoorsBalance = 0;
    transactionDetails = pushTransactionDetails();
   
    for (let i = 0; i < transactionDetails.length; i++) {
        if(transactionDetails[i][0] === "DANNON"){
              dannonBalance += transactionDetails[i][1];
            
            }else if(transactionDetails[i][0] === "UNILEVER"){
                unileverBalance += transactionDetails[i][1];
                
                }else if(transactionDetails[i][0] === "MILLER COORS"){
                     millercoorsBalance += transactionDetails[i][1];
                   
                    }   
    }
    var finalBalance = [dannonBalance, unileverBalance, millercoorsBalance]
    return finalBalance;
}


function accountBalances(){
    finalBalance = finalBalanceCalc();
    transactionDetails = pushTransactionDetails();
    const sortedTransactionDetails = sortingARR();
    var table1 = document.getElementById("checkBalanceList").getElementsByTagName('tbody')[0];
    var newRow1 = table1.insertRow(table1.length);
    
    for(i=0;i<transactionDetails.length;i++){
        var newRow1 = table1.insertRow(table1.length);
    cell1 = newRow1.insertCell(0);
    cell1.innerHTML = transactionDetails[i];
    }
}
function insertNewRecord2(data1) {
    var formData2 = readFormData2();
    var pointsSpent = spendPointsCalc(formData2, data1);
    var table1 = document.getElementById("spendList").getElementsByTagName('tbody')[0];
   

}


function clearLocalMemory(){
    let nodelist = localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
    localStorage.removeItem("list");
    nodelist = 0;
}