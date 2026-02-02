


//clear local storage for testing 
// localStorage.clear();

//catch input fields
var input1 = document.getElementById("productName");
var input2 = document.getElementById("productPrice");
var input3 = document.getElementById("productCategory");
var input4 = document.getElementById("productDescription");
//test 
// console.log(input1);
// console.log(input2);
// console.log(input3);
// console.log(input4);


//golobal variables
var currentIndex;
var container;

//regular expressing 
var regexName = /^[a-zA-Z0-9 ]{5,30}$/;
var regexPrice = /^[0-9]{1,8}$/;
// var regexCat = /^[a-zA-Z0-9]{5,20}$/;
// var regexDesc = /^[a-zA-Z0-9]{5,100}$/;

//localstorage empty
if (localStorage.getItem("allProducts") == null) {
   container = [];
} else {   //include some products
   //retirve product from local storage after conversion to object
   container = JSON.parse(localStorage.getItem("allProducts"))
   //display all data from localstorage
   displayProduct();
}


//add new product (container, local storage ) , after that save the new product on my loclStorage
function addProduct() {
   if (regexName.test(input1.value) &&regexPrice.test(input2.value)) {

      var newProdcut = {
         pName: input1.value,
         pPrice: input2.value,
         pCat: input3.value,
         pDesc: input4.value
      }
      container.push(newProdcut);

      //for testing
      // console.log(container);

      //save new product on my localStorage 
      localStorage.setItem("allProducts", JSON.stringify(container));


      //display new product after add
      displayProduct();

      //invoke clear function to clear  input field 
      clearInput();
   } else {
      window.alert("Please enter valid product name .")
   }



}


//display all product
function displayProduct() {
   var ma5zan = ``;
   for (var i = 0; i < container.length; i++) {
      ma5zan += `
            <tr> 
            <td>${i}</td>
               <td> ${container[i].pName}</td>
               <td> ${container[i].pPrice}</td>
               <td> ${container[i].pCat}</td>
               <td> ${container[i].pDesc}</td>
               <td><button  class="btn btn-outline-warning  "onclick="updateProduct(${i})" >Update</button> </td>
               <td><button  class="btn btn-outline-danger " onclick="deleteProduct(${i})">Delete</button> </td>
               </tr>
      `

   }
   document.getElementById("tBody").innerHTML = ma5zan;
   //for testing 
   // console.log(ma5zan);
   //clear input fields
   clearInput();
}


//clear input fields
function clearInput() {
   input1.value = "";
   input2.value = "";
   input3.value = "";
   input4.value = "";


   //for testing 
   // console.log(input1.value);
}


// search on my product using product name 
function searchProductByName(inputName) {
   var ma5zan = ``;
   for (var i = 0; i < container.length; i++) {
      if (container[i].pName.toLowerCase().includes(inputName.toLowerCase())) {
         ma5zan += `
            <tr> 
            <td>${i}</td>
               <td> ${container[i].pName}</td>
               <td> ${container[i].pPrice}</td>
               <td> ${container[i].pCat}</td>
               <td> ${container[i].pDesc}</td>
               <td><button  class="btn btn-outline-warning " onclick="updateProduct(${i})">Update</button> </td>
               <td><button  class="btn btn-outline-danger "  onclick="deleteProduct(${i})" >Delete</button> </td>
               </tr>
      `
      }


   }
   document.getElementById("tBody").innerHTML = ma5zan;
   //for testing 
   //  console.log(ma5zan);
}


//delete product 
function deleteProduct(productIndex) {
   //delete produt
   container.splice(productIndex, 1);
   //display product after delete the product 
   displayProduct();
   //delete from local storage 
   localStorage.setItem("allProducts", JSON.stringify(container));
}

//update product 

function updateProduct(productIndex) {
   //update golobal variable 
   currentIndex = productIndex;

   //for testing 
   // console.log(container[productIndex].pName);
   // console.log(container[productIndex].pPrice);
   // console.log(container[productIndex].pCat);
   // console.log(container[productIndex].pDesc);

   //retrive data from table body to input field
   input1.value = container[productIndex].pName;
   input2.value = container[productIndex].pPrice;
   input3.value = container[productIndex].pCat;
   input4.value = container[productIndex].pDesc;
   //hide add button 
   document.getElementById("addBtn").style.display = "none";
   // display save changes button 
   document.getElementById("updateBtn").style.display = "block";

}


//to sace the changes after new updates
function saveChanges() {


   //for testing 
   // console.log(input1.value);
   // console.log(input2.value);
   // console.log(input3.value);
   // console.log(input4.value);


   container[currentIndex].pName = input1.value;
   container[currentIndex].pPrice = input2.value;
   container[currentIndex].pCat = input3.value;
   container[currentIndex].pDesc = input4.value;
   //display product with new updates
   displayProduct();
   //update my localStorage
   localStorage.setItem("allProducts", JSON.stringify(container));
   // hide save changes button 
   document.getElementById("updateBtn").style.display = "none";
   //display add button 
   document.getElementById("addBtn").style.display = "block";
   clearInput();
}

