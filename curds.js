let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
 
let mood = 'create';
let tmp ; 



console.log(title,price,taxes,ads,discount,total,count,category,submit);
//get total
function gettotal(){
    if(price.value !=''){
        let result = (+price.value + +taxes.value + +ads.value ) - +discount.value ;
        total.innerHTML = result ;
        total.style.background = '#040'
    }else{
        total.innerHTML = '';
        total.style.background = '#3498db'
    }
}
// crate prodct
let datapro;
if(localStorage.product != null ){
    datapro = JSON.parse(localStorage.product)
}else{
     datapro = [];
}


submit.onclick = function(){
    let newpro = {
        title:title.value.toLowerCase(),
        price:price.value,
        taxes:taxes.value,
        ads:ads.value,
        discount:discount.value,
        total:total.innerHTML,
        count:count.value,
        category:category.value.toLowerCase(),
    }

    if(title.value != '' && price.value != '' ){
        if(  mood == 'create'){
            if(newpro.count > 1){
                for(let i = 0 ; i < newpro.count ; i++){
                    datapro.push(newpro);}}
            else{
                datapro.push(newpro); }}
            else{ datapro[tmp] = newpro ;
               mood = 'create' ;
               submit.innerHTML = 'Create';
               count.style.display = 'block';}}
   
    
    localStorage.setItem('product', JSON.stringify(datapro))
    
    cleardata();
    showdata();
}
// clear inputs 

function cleardata(){
  title.value = '';
  price.value = '';
  taxes.value = '';
  ads.value = '';
  discount.value = '';
  total.innerHTML = '';
  count.value = '';
  category.value = '';
}

// read 

function showdata(){
 gettotal()
 let table = '';
 for(let i = 0 ; i < datapro.length;i++ ) {
        table += ` <tr>
        <td>${i+1}</td>
        <td>${datapro[i].title}</td>
        <td>${datapro[i].price}</td>
        <td>${datapro[i].taxes}</td>
        <td>${datapro[i].ads}</td>
        <td>${datapro[i].discount}</td>
        <td>${datapro[i].total}</td>
        <td>${datapro[i].category}</td>
        <td><button id="update" onclick="updatedata(${i})">Update</button></td>
        <td><button onclick="deletdata(${i})" id="delet">Delete</button></td>
    </tr> ` ;
   
   
    
 }

 document.getElementById('tbody').innerHTML = table ;
 let btndelet = document.getElementById('deletall');
 if(datapro.length > 0){
 btndelet.innerHTML = `<button onclick="deleteall()">Delete All(${datapro.length})</button>`;
 }else{
    btndelet.innerHTML = '';
 }
}
showdata()

//delete 

function deletdata(i){
 datapro.splice(i,1);
 localStorage.product = JSON.stringify(datapro);
 showdata()
}
function deleteall(){
    datapro.splice(0);
    localStorage.clear;
    showdata()
}

// update
function updatedata(i){
title.value = datapro[i].title;
price.value = datapro[i].price;
taxes.value=datapro[i].taxes;
ads.value=datapro[i].ads;
discount.value=datapro[i].discount;
total.innerHTML=datapro[i].total;
count.style.display = 'none';
category.value=datapro[i].category;
submit.innerHTML = 'Update';
mood = 'Update';
tmp = i ;
scroll({
    top : 0 ,
    behavior :'smooth'
})
}

//search
let searchmood = 'title';

function getSearchMood(id){
    let Search = document.getElementById('Search');
 if( id == 'searchTitle'){
    searchmood = 'title'
    Search.ariaPlaceholder = 'Search by Title'
 }else{
    searchmood = 'category'
    Search.ariaPlaceholder = 'Search by Category'
 }
 Search.focus()
 Search.value = '';
 showdata()
} 


function searchData(value){
 let table = '';
 for(let i =0 ; i< datapro.length ; i++){
 if(searchmood == 'title'){
   if (datapro[i].title.includes(value.toLowerCase()) ){
    table += ` <tr>
    <td>${i}</td>
    <td>${datapro[i].title}</td>
    <td>${datapro[i].price}</td>
    <td>${datapro[i].taxes}</td>
    <td>${datapro[i].ads}</td>
    <td>${datapro[i].discount}</td>
    <td>${datapro[i].total}</td>
    <td>${datapro[i].category}</td>
    <td><button id="update" onclick="updatedata(${i})">Update</button></td>
    <td><button onclick="deletdata(${i})" id="delet">Delete</button></td>
</tr> ` ;}}
else{
    
        if (datapro[i].category.includes(value.toLowerCase()) ){
         table += ` <tr>
         <td>${i}</td>
         <td>${datapro[i].title}</td>
         <td>${datapro[i].price}</td>
         <td>${datapro[i].taxes}</td>
         <td>${datapro[i].ads}</td>
         <td>${datapro[i].discount}</td>
         <td>${datapro[i].total}</td>
         <td>${datapro[i].category}</td>
         <td><button id="update" onclick="updatedata(${i})">Update</button></td>
         <td><button onclick="deletdata(${i})" id="delet">Delete</button></td>
     </tr> ` ;} }}
 document.getElementById('tbody').innerHTML = table ;
}