const studentName = document.getElementById("name");
const studentMail = document.getElementById("email");
const website = document.getElementById("website");
const studentPhoto = document.getElementById("imgLink");
const studentGender = document.getElementById("gender");
const myform = document.getElementById("myform");

var valid = true;

onRefreshReloadLocalStorage();

myform.addEventListener('submit', (e)=>{
    e.preventDefault();
    valid = true;
    validate();
    if(valid == false){
        alert("hover over fields to know errors..!!");
        return false;
    }
    submit();
    myform.reset();
    return true;
})

myform.addEventListener('reset', (e)=>{
    studentName.className = "form-control";
    studentMail.className = "form-control";
    website.className = "form-control";
    studentPhoto.className = "form-control";
    document.getElementById("genderOption").style.outline = "none";
    document.getElementById("spanGender").style.visibility = "hidden";
    document.getElementById("spanName").style.visibility = "hidden";
    document.getElementById("spanEmail").style.visibility = "hidden";
    document.getElementById("spanWebsite").style.visibility = "hidden";
})

function submit(){
    let name = studentName.value;
    let email = studentMail.value;
    let domain = website.value;
    let img = studentPhoto.value;
    let gender = getGender();
    var listArray = [];
    getCheckboxInput(listArray);
    if(img == null || img == ""){
        img = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAMAAACahl6sAAAAM1BMVEXr6+urq6u9vb3o6Oi2trbl5eWxsbHBwcHc3NyysrLExMTPz8/h4eG6urrIyMjMzMzW1tYN9M62AAAEzElEQVR4nO2dCbaqMBBEDWESwrD/1X7A5xcQhSQF1fHkrsA6nR7TxNstEolEIpFIJBKJRCKRSCRYdDaiNft3OGL0TZu+LZo0Taqu7ksTpBZT9GWRqgdNUlTtICULT0id54l6595Uox72rztMtiXiRd50ZRC2Mc1XHRNp0Rn279xDH9AxUQi3S3dQx2iXmv1jv5Dlx4UMAa1n/94PZKa20TFQCQxium6szPEgLdm/e0XWpfu/eotc1vHqHYzxRJASXbjLGBATvbLa8VhJs4kuPQ7WSC4kzxtPHUNCkZHlK18dSrVsDSOlvw6lJBwuv5D1h4DDpe8IIQJisIHoUCndJD1GCN8kxjMbPrnTTQISoth1sF0v9YWCLATlI/Rc0sKEkNP79zGWDQ1XCMrXFflswXxdkVMJKLFPJEwhkNr3j5yZE5FCqE4CFcJM7lAhzCkEVAgzbCGjFjW3I/OIqohCQJ0uXwiyROEKgQxRJAjBlfHkQh7XWCnVMYUgEwl1LI+Mv9z5AzBscYXgel3FveO12BHYgdqPIL2d2iEORQrMSajR9wZMieyhKSolpmQd3pe6T5KSapL6DsyIxEG27T7QDjybIKt4xSzkj67+HYR3tpANomLWv1ghxCIFe7SIRQqw9lXUzgqwUfOCWf5C8wjzYhc6aaReWeH6KnL5q4Em4d6044qUnNuz4yZ05FUnnLuzt1FgOZG9/4uKW2QXwc2DyNMgXADmL/+C5kHsaRDqZpd+sm6gpoRvEIy78xd/Rzy9ZIgWuQSDDLS5z3173absZPgfk3koEWKNP9wrFXpKX+Le9JLXS9e4ZxP6fv8K51mdhM955rhOhtgXPG+4Ogm7n3rDtVWUFXxH3DosGbXJAre4xb6U3sJpMiQtZo24eIk4V5+wr4KlfHC8wt5LZBrEoXIUU76vsM3uwgrfF7ZOIq48eWIrRFgF/8JWiFRf/x0hts4uVohtkSJhvLiJbR4RG7Vs212pecS+akxk1louQ+BWXmOVdU7NbiLtePWuQ9NUlBLtsSfUCFKy887kDnLSie+CPPUzsRmZ9+Ub/0p3xPPttodNBEThI++X7kO/tDI1aqumqYnTU9MidwEHLZRIrHvwRvlAntRXe4up8TIm0u7KI1aCv1NY0vTXmCXrsBvYG6TV6WbRJdbBP9L0Z3q+8zuyLuTFSWbRdXGNMV4k+ICsyw75wMNh8hbaDpuWouJBg8otZX16lNoBkVtMd1LisyTxemq+rC4MUnukrt5SCrHFi7yyT/lnVIQIUrt4rK/Me5bkyeEeTPdyZUwcrF5K4TJG7vtWyaCf5J3H3riiJGZwO4qvSpBfsZ3NtwEl8nGm8/m8IgV+MOB0PhVgoen49Ey7/58LXM7m4Tr8l0eC2PzgGvl42WVsmCREg2xecAdpkC2TsLtZR942pZDfc1/KOpdA34m9kvWtXVjFyYz1vzIE0IN8YDmRgD7cey3LL4ICDb4jyzW84OrFF0snCdbX1SoAB5oOJ+ZOgnttkcA8k0Cfzrma+UpOwNF3GbYCjr4/JGQ+Fgo4jSyFhDSXe2MuJOR8uBASyOB6m7mQU1dkzuYnhYRcai2EBDnTevKTQkIufqMQcRS/KCSYq9wtohBpRCHSqH5RSMjToD8h/wDz2VizBRL3XQAAAABJRU5ErkJggg==';
    }

    let record = {
        'name' : name,
        'gender': gender,
        'email': email,
        'website': domain,
        'skills': listArray,
        'image': img
    }
    if(localStorage.getItem("EnrolledStudents") == null){
        var enrolledRecords = [];
    }
    else{
        enrolledRecords = JSON.parse(localStorage.getItem("EnrolledStudents"));
    }
    enrolledRecords.push(record);
    displayRecord(record);
    localStorage.setItem("EnrolledStudents", JSON.stringify(enrolledRecords));   
    console.log("Record of : " + name + " inserted.");
}

function onRefreshReloadLocalStorage(){
    var students = JSON.parse(localStorage.getItem("EnrolledStudents"));
    if(students == null){
        return;
    }

    for(var i = 0; i < students.length; i++){
        displayRecord(students[i]);
    }
    
}

function displayRecord(record){
    let data = `
                <tr>
                    <td>
                        ${record.name}
                        <p> ${record.gender} 
                            <br>
                            ${record.email}
                            <br>
                            <a href="${record.website}" target="_blank">${record.website}</a>
                            <br>
                            ${record.skills.join(" , ")}
                        </p>
                    </td>
                    <td>
                        <img src="${record.image}" alt="studentPhoto">
                    </td>
                </tr>`;
            document.getElementById("enrolledTbody").innerHTML += data;
}

function getGender(){
    var rbtnMale = document.getElementById("male");
    var rbtnFemale = document.getElementById("female");
    if(rbtnMale.checked){
        return rbtnMale.value;
    }
    return rbtnFemale.value;
}

function getCheckboxInput(listArray){
    var checkboxes = document.querySelectorAll(".form-check-input.checkbox");
    for(var checkbox of checkboxes){
        if(checkbox.checked == true){
            listArray.push(checkbox.value);
        }
    }
}

function validate(){
    valid = true;
    validName();
    validEmail();
    validUrl();
    validGender();
}

function validGender(){
    var rbtnMale = document.getElementById("male");
    var rbtnFemale = document.getElementById("female");
    if(!rbtnMale.checked && !rbtnFemale.checked){
        document.getElementById("spanGender").style.top = "46%";
        document.getElementById("genderOption").style.outline = "1px solid red";
        document.getElementById("spanGender").style.visibility = 'visible';
        valid = false;
    }
    else{
        document.getElementById("genderOption").style.outline = "none";
        document.getElementById("spanGender").style.visibility = "hidden";
    }
}

function validName(){  
    var inputName = studentName.value;
    var nameRegX = new RegExp("^[A-Za-z. ]{3,20}$");
    if(nameRegX.test(inputName)){
        studentName.className = "form-control success";
        document.getElementById("spanName").style.visibility = "hidden";
        return;
    }
    valid = false;
    studentName.className = "form-control error";
    document.getElementById("spanName").style.top = "-6%";
    if(inputName == ""){
        document.getElementById("spanName").innerText = "Required .....!!";
        document.getElementById("spanName").style.visibility = "visible";
        return;
    }
    if(inputName.length < 3){
        document.getElementById("spanName").innerText = "Name should be of 3 - 20 characters";
        document.getElementById("spanName").style.visibility = "visible";
    }
}

function validEmail(){
    var inputEmail = studentMail.value; 
    var mailRegx = new RegExp("^[A-Za-z0-9._]{2,}[@][A-Za-z]{3,}[.][A-Za-z.]{2,}$");
    if(mailRegx.test(inputEmail)){
        studentMail.className = "form-control success";
        document.getElementById("spanEmail").style.visibility = "hidden";
        return;
    }
    valid = false;
    studentMail.className = "form-control error";
    document.getElementById("spanEmail").style.top = "5%";
    if(inputEmail == ""){
        document.getElementById("spanEmail").innerText = "Required .....!!";
        document.getElementById("spanEmail").style.visibility = "visible";
        return;
    }
    document.getElementById("spanEmail").innerText = "Invalid Email .....!!";
    document.getElementById("spanEmail").style.visibility = "visible";
    
}

function validUrl(){
    var inputUrl = website.value;
    var urlRegx = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;
    if(urlRegx.test(inputUrl)){
        website.className = "form-control success";
        document.getElementById("spanWebsite").style.visibility = "hidden";
        return;
    }
    valid = false;
    website.className = "form-control error";
    document.getElementById("spanWebsite").style.top = "20%";
    if(inputUrl == ""){
        document.getElementById("spanWebsite").innerText = "Required .....!!";
        document.getElementById("spanWebsite").style.visibility = "visible";
        return;
    }
    document.getElementById("spanWebsite").innerText = "Invalid Website .....!!";
    document.getElementById("spanWebsite").style.visibility = "visible";
}