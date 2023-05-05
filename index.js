const tbody = document.getElementById("tbody");
const SortAToZ = document.getElementById("sortaz");
const SortZToA = document.getElementById("sortza");
const SortMarks = document.getElementById("marks");
const PassStudent = document.getElementById("passing");
const SortClass = document.getElementById("classsort");
const Gender = document.getElementById("gender");

const SearchInput = document.getElementById("input");
const SearchBtn = document.getElementById("search");

const maintable = document.getElementById("maindata");

function getdata(){

    // fetch The Data

    fetch("MOCK_DATA.json")
    .then(res => res.json())
    .then((data) => {
       
        // This Function Use For Showing Json Data In The Table...
        showdata(data);
   
        // This Function Use to Sort data in A To Z 
        SortAToZ.addEventListener("click",() =>{
            data.sort((a, b) => a.first_name.localeCompare(b.first_name));
            maintable.innerHTML = null;
            showdata(data);
        });

        // This Function Use to Sort data in Z To A
        SortZToA.addEventListener("click",() =>{
            data.sort((a, b) => b.first_name.localeCompare(a.first_name));
            maintable.innerHTML = null;
            showdata(data);
        });

        // This Function Use to Sort data To his Marks
        SortMarks.addEventListener("click",() =>{
            data.sort(function(a, b){return a.marks-b.marks});
            maintable.innerHTML = null;
            showdata(data);
        });


       // This Function Use To Sort data who are Passing...    
       PassStudent.addEventListener("click",() =>{ 
       const newarray = data.filter((curr) =>{
            return curr.passing === true;
       })
        maintable.innerHTML = null;
        showdata(newarray);
       });



       // This Function Use for Sort data by using His Class
       SortClass.addEventListener("click",() => {
        data.sort(function(a, b){return a.class-b.class});
        maintable.innerHTML = null;
        showdata(data);
       });
      


      // This Function use For Showing diffrent table one is female another is male...
      
      Gender.addEventListener("click",() => {

           const females = data.filter((currElem) =>{
               return currElem.gender === "Female";
           })

           const males = data.filter((currE) =>{
               return currE.gender === "Male";
           })

           maintable.innerHTML = null;
           showdata(females);
           showdata(males);
      })
     


    //   Search Botton Function
    SearchBtn.addEventListener("click",() => {
        const val = SearchInput.value;
        const myarray = data.filter((curr) => {
              return ( (val.toLowerCase() == curr.first_name.toLowerCase()) || (val.toLowerCase() == curr.last_name.toLowerCase()) || (val == curr.email));
        })
        maintable.innerHTML = null;
        showdata(myarray);
        SearchInput.value = "";
        
    })


    
    })
   
}


getdata();


const showdata = (Adata) => {

    const table = document.createElement("table");
    const tbody = document.createElement("tbody");
    const thead = document.createElement("thead");
    const th1 = document.createElement("th");
    const th2 = document.createElement("th");
    const th3 = document.createElement("th");
    const th4 = document.createElement("th");
    const th5 = document.createElement("th");
    const th6 = document.createElement("th");
    const th7 = document.createElement("th");

    th1.innerHTML = "ID";
    th2.innerHTML = "Name";
    th3.innerHTML = "Gender";
    th4.innerHTML = "Class";
    th5.innerHTML = "Marks";
    th6.innerHTML = "Passing";
    th7.innerHTML = "Email";

    thead.appendChild(th1);
    thead.appendChild(th2);
    thead.appendChild(th3);
    thead.appendChild(th4);
    thead.appendChild(th5);
    thead.appendChild(th6);
    thead.appendChild(th7);
    table.appendChild(thead);

    Adata.map((elem) =>{
        const tr = document.createElement("tr");
 
         const td1 = document.createElement("td");
         const td2 = document.createElement("td");
         td2.className = "img_head";
         const td3 = document.createElement("td");
         const td4 = document.createElement("td");
         const td5 = document.createElement("td");
         const td6 = document.createElement("td");
         const td7 = document.createElement("td");
         const h3 = document.createElement("h3");
         const img = document.createElement("img");
         td1.innerHTML = elem.id;
         h3.innerHTML = elem.first_name + " " + elem.last_name;
         td3.innerHTML = elem.gender;
         td4.innerHTML = elem.class;
         td5.innerHTML = elem.marks;
         if(elem.passing === true){
             td6.innerHTML = "Passing";
         }else{
            td6.innerHTML = "Failed";
         }
         td7.innerHTML = elem.email;
         img.src = elem.img_src;
 
         td2.appendChild(img);
         td2.appendChild(h3);
 
         tr.appendChild(td1);
         tr.appendChild(td2);
         tr.appendChild(td3);
         tr.appendChild(td4);
         tr.appendChild(td5);
         tr.appendChild(td6);
         tr.appendChild(td7);
         tbody.appendChild(tr);
     })

     table.appendChild(tbody);
     maintable.appendChild(table);

}