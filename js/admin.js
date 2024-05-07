const firebaseConfig = {
    apiKey: "AIzaSyBreCJDwBdF_HdIb2syX_rLgpkdLKUann0",
    authDomain: "contactform-f9a9b.firebaseapp.com",
    databaseURL: "https://contactform-f9a9b-default-rtdb.firebaseio.com",
    projectId: "contactform-f9a9b",
    storageBucket: "contactform-f9a9b.appspot.com",
    messagingSenderId: "601343494066",
    appId: "1:601343494066:web:0210cadcb1850b4dfdc6ab"
  };
  
  // initialize firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
// Reference to your Firebase database
const ref = database.ref('Users');
var searchString= "";
var onwhatPage = 0;

// Fetch data from Firebase
ref.orderByChild('status').equalTo(0).once('value', gotData1, errData);


function func1(){
    onwhatPage = 0;
    const qoute = document.querySelector('#quote');
    qoute.innerHTML = 'Pending Students';
    ref.orderByChild('status').equalTo(0).once('value', gotData1, errData);
}

function func2(){
    onwhatPage = 1;
    const qoute = document.querySelector('#quote');
    qoute.innerHTML = 'Approved Students';
    ref.orderByChild('status').equalTo(1).once('value', gotData2, errData);
}

function func3(){
    onwhatPage = -1;
    const qoute = document.querySelector('#quote');
    qoute.innerHTML = 'Rejected Students';
    ref.orderByChild('status').equalTo(-1).once('value', gotData2, errData);
}

function logOut(){
    Swal.fire({
        title: "Are you sure?",
        text: "You need to login again...",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:"#0d6efd",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, LogOut!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "LogOut Success!",
            icon: "success",
            showConfirmButton: false,
            timer: 1000,
          }).then(() => {
            firebase.auth().signOut().then(() => {
                window.location.href = "index.html";
                localStorage.removeItem("mail");
              }).catch((error) => {
                    console.error(error)
              });
        });
    }
      });
}


function searchTable(){
    var inputField = document.getElementById("search");
    searchString = inputField.value;
    if(onwhatPage == 0){
        func1();
    }else if(onwhatPage == 1){
        func2();
    }else{
        func3();
    }
}

function gotData1(data) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = `
                            <tr>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Company</th>
                            <th>Graduation Year</th>
                            <th>Applied Date</th>
                            <th>Actions</th>
                            </tr>
                          `; // Clear previous data

    const records = data.val();
    if (records) {
        Object.keys(records).forEach(key => {
            const record = records[key];
            if(searchString != ''){
                const regex = new RegExp(searchString.toLowerCase());
                if(regex.test(`${record.roll_no}`) || regex.test(`${record.name}`.toLocaleLowerCase())){
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${record.roll_no}</td>
                        <td style="text-align: left">${record.name}</td>
                        <td>${record.branch}</td>
                        <td>${record.company_name}</td>
                        <td>${record.g_year}</td>
                        <td>${record.dateTime}</td>
                        <td style="display:flex;gap:10px">
                            <button style="font-size:15px" title="View" class=" btn btn-primary" onclick="viewRecord('${record.link}')">View</i></button>
                            <button style="font-size:15px" title="Accept" class=" btn btn-success" onclick="acceptRecord('${key}')">Accept</i></button>
                            <button style="font-size:15px" title="Reject" class=" btn btn-danger" onclick="rejectRecord('${key}')">Reject</button>
                        </td>
                    `;
                    tableBody.appendChild(row);
                }
            }
            else{
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${record.roll_no}</td>
                    <td style="text-align: left">${record.name}</td>
                    <td>${record.branch}</td>
                    <td>${record.company_name}</td>
                    <td>${record.g_year}</td>
                    <td>${record.dateTime}</td>
                    <td style="display:flex;gap:10px">
                        <button style="font-size:15px" title="View" class=" btn btn-primary" onclick="viewRecord('${record.link}')">View</i></button>
                        <button style="font-size:15px" title="Accept" class=" btn btn-success" onclick="acceptRecord('${key}')">Accept</i></button>
                        <button style="font-size:15px" title="Reject" class=" btn btn-danger" onclick="rejectRecord('${key}')">Reject</button>
                    </td>
                `;
                tableBody.appendChild(row);
            }
            
        });
    }
}


function gotData2(data) {
    const tableBody = document.querySelector('#data-table tbody');
    tableBody.innerHTML = `
                            <tr>
                            <th>Roll No</th>
                            <th>Name</th>
                            <th>Branch</th>
                            <th>Company</th>
                            <th>Graduation Year</th>
                            <th>Applied Date</th>
                            <th>Status</th>
                            </tr>
                          `; // Clear previous data

    const records = data.val();
    const s_dict = {"1": "ACCEPTED", "-1": "REJECTED"}
    const c_dict = {"1": "green", "-1": "red"}
    if (records) {
        Object.keys(records).forEach(key => {
            const record = records[key];
            if(searchString != ''){
                const regex = new RegExp(searchString);
                if(regex.test(`${record.roll_no}`) || regex.test(`${record.name}`.toLocaleLowerCase())){
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${record.roll_no}</td>
                        <td style="text-align: left">${record.name}</td>
                        <td>${record.branch}</td>
                        <td>${record.company_name}</td>
                        <td>${record.g_year}</td>
                        <td>${record.dateTime}</td>
                        <td style="color:${c_dict[record.status]}">${s_dict[record.status]}</td>
                    `;
                    tableBody.appendChild(row);
                    }
                }
            else{
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${record.roll_no}</td>
                    <td style="text-align: left">${record.name}</td>
                    <td>${record.branch}</td>
                    <td>${record.company_name}</td>
                    <td>${record.g_year}</td>
                    <td>${record.dateTime}</td>
                    <td style="color:${c_dict[record.status]}">${s_dict[record.status]}</td>
                `;
                tableBody.appendChild(row);
            }
        });
    }
}
   
function errData(err) {
    console.error(err);
}


function viewRecord(key) {
    window.open(key, '_blank');
    console.log('Editing record with key:', key);
}

function acceptRecord(key) {
    Swal.fire({
        title: "Are you sure?",
        text: "You Want To Accept This Student Verification",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:"#0d6efd",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Accept!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Verification Success!",
            icon: "success",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            ref.child(key).update({ status: 1 })
            .then(() => console.log('Status updated successfully'))
            .catch(error => console.error('Error updating status:', error));
            location.reload();
        });
    }
      });
}
    
function rejectRecord(key) {
    Swal.fire({
        title: "Are you sure?",
        text: "You Want To Reject This Student Verification",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor:"#0d6efd",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Reject!"
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Student Rejected!",
            icon: "error",
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            ref.child(key).update({ status: -1})
            .then(() => console.log('Status updated successfully'))
            .catch(error => console.error('Error updating status:', error));
            location.reload();
        });
    }
      });
}

// Function to check if the user is authenticated
function checkAuthentication() {
    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.href = "index.html"
        }else{
            // console.log("Authentication");
            if(user.email != "admin@jntucek.ac.in"){
              window.location.href = "index.html";
            }
          }
      });
  }
  
// Call the checkAuthentication function when the page loads
window.onload = function() {
    checkAuthentication();
};
  