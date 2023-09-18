window.onload = ()=>{
    // alert('hello')
    
    let user = localStorage.getItem('usr');
    if(!user) location.href = '/';
     localStorage.clear();
}

const showMenu =(menuLink,content)=>{
  let allContent = document.querySelectorAll('.content')
    allContent.forEach(eachContent=>{
      eachContent.style.display="none";
  }); 
  document.querySelector(`${content}`).style.display="flex";

  let allMenu = document.querySelectorAll('.menu');
  allMenu.forEach(eachMenu=>{
      eachMenu.classList.remove('active-link');
  })
  //   console.log(menuLink);
    // console.log(content);
  //what the below if statement means-- if type of string which is
  //pointing to where the function is called, i.e --- 'overview-link',
  // is a string data type--
  let menu;
  if(typeof menuLink === 'string'){
      menu = document.querySelector(`.${menuLink}`);
  }
  else menu = menuLink;
  menu.classList.add('active-link');

  try{
    let subLinks = document.querySelectorAll(`${content} > div:first-child > span`);
    subLinks.forEach(link =>{
      link.classList.remove('high-light-sub');
      console.log(link)
    })
    document.querySelector(`${content} > div:first-child > span:first-child`).classList.add('high-light-sub');
    let subContent = document.querySelectorAll(`${content} > div:nth-child(2) > div`)
    subContent.forEach(sb =>{
      sb.style.display = "none";
    })
    document.querySelector(`${content} > div:nth-child(2) > div:first-child`).style.display = "block";
  }
  catch(err){

  }
}
showMenu('overview-link', '.overview');


const showSubMenu = (submenu,content) =>{
  //console.log(content);
  let allDiv = document.querySelectorAll(`${content} > div:nth-child(2) > div`);
  allDiv.forEach(d=>{
    d.style.display = 'none';
  });
  document.querySelector(`${submenu}-div`).style.display = 'block';

  let allLink = document.querySelectorAll(`${content} > div:nth-child(1) > span`);
  allLink.forEach(l => {
    l.classList.remove('high-light-sub');
  })
  document.querySelector(`${submenu}`).classList.add('high-light-sub');
}

const validateInputs=(vals,msgs) =>{
    let len = vals.length;
    let i;
    let status = false;
    let msg = '';
    for(i = 0;i<len;i++){
       const val = vals[i];
       //console.log(val)
       msg = msgs[i];
       if(val == '' || val == null || typeof val == 'undefined' || val == 0){
          break;
       }
       if(i == len-1){
        status = true;
       }
    }
    if(!status) {
      alert(msg);
    }
    return status;  
}

const clearForm = () =>{
  const allInp = document.querySelectorAll('input');
  allInp.forEach(inp => {
    inp.value = '';
  });
  const allText = document.querySelectorAll('textarea');
  allText.forEach(text =>{
    text.value = '';
  })
}

const handleAddProduct = async (e)=>{
  e.preventDefault();
  let name = document.getElementById('name').value;
  let price = document.getElementById('price').value;
  let description = document.getElementById('description').value;
  let discount = document.getElementById('discount').value;
  let image = document.getElementById('image').files[0];
  let total = document.getElementById('total').value;
  //console.log(total)
  //The below function called which is validateInputs,first parameter [name,price,description,total], represent vals while second parameter messages represent msgs at the top function-----note both parameter are in array---
  let check = validateInputs(
    [name,price,description,total],
 [
      'Please Enter Product Name',
      'Please Enter Produce Price',
      'Please Enter Product Description',
      'Please Enter the Total Products'
    ]
    )
  if(!check) return false;
  discount = discount?discount:0;

  const formData = new FormData();
  formData.append('name',name);
  formData.append('price',price);
  formData.append('description',description);
  formData.append('image',image);
  formData.append('total',total);
  formData.append('discount',discount);

  let res = await fetch(`/products/add-new-product-2`,{
      method:"POST",
      body:formData
  })
  const result= await res.json();
  if(result?.data?.id){
    alert(result.data.message);
    clearForm();
  }
  else{
    alert("Opps!, product was not added, try again");
  }



} 

const getAllProducts = () =>{
  let res = fetch(`/products/get-all-products`,{
     method:"GET",
     headers:{
      "Content-type":"application/json"
     }
  })
  .then(res => res.json())
  .then(data => {
    //console.log(data.dta);
    arrangeProduct(data.dta);
  })
  .catch(err => console.log(err))
}
getAllProducts();

const arrangeProduct = (data) =>{
  let content = `
  <table>
    <tr>
      <th>Picture</th>
      <th>Name</th>
      <th>price</th>
      <th>Total left</th>
      <th>Total Sold</th>
      <th>Rating</th>
    </tr>
`
  if(data.length > 0){
   
    data.forEach(tableData =>{
      content+= `
        <tr>
          <td><img style="object-fit:contain;" width="50px" height="50px" src="/assets/images/${tableData.image}" /></td>
          <td>${tableData.name}</td>
          <td>${tableData.price}</td>
          <td>${tableData.total_left}</td>
          <td>${tableData.total_sold}</td>
          <td>${tableData.rating}</td>
        </tr>
      `
    })
  }
  content+= `</table>`;
  let container = document.querySelector('.products > div:nth-child(2) > div:nth-child(2)');
  container.innerHTML = content;
}