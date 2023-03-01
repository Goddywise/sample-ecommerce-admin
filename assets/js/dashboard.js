// window.onload = ()=>{
//     //alert('hello')
    
//     // let user = localStorage.getItem('usr');
//     // if(!user) location.href = '/';
//     // localStorage.clear();
// }

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
 let menu;
 if(typeof menuLink === 'string'){
    menu = document.querySelector(`.${menuLink}`);
 }
 else menu = menuLink;
 menu.classList.add('active-link');
}
showMenu('overview-link', '.overview');

const validateInputs=(vals,msgs) =>{
    let len = vals.length;
    let i;
    let status = false;
    let msg = '';
    for(i = 0;i<len;i++){
       const val = vals[i];
       msg = msgs[i];
       if(val == '' || val == null || typeof val == 'undefined' || val == 0){
          break;
       }
    }
    if(!status) {
      alert(msg);
    }
    return status;
}

const handleAddProduct = async (e)=>{
  e.preventDefault();
  let name = document.getElementById('name').value;
  let price = document.getElementById('price').value;
  let description = document.getElementById('description').value;
  let discount = document.getElementById('discount').value;
  let image = document.getElementById('image').files[0];
  let total = document.getElementById('total').value;
  console.log(total)
  // let check = validateInputs(
  //   [name,price,description,total],
  //   [
  //     'Please Enter Product Name',
  //     'Please Enter Produce Price',
  //     'Please Enter Product Description',
  //     'Please Enter the Total Products'
  //   ])
  // if(!check) return false;
  discount = discount?discount:0;
  const formData = new FormData();
  formData.append('name',name);
  formData.append('price',price);
  formData.append('description',description);
  formData.append('image',image);
  formData.append('total',total);
  formData.append('discount',discount);
  let res = await fetch(`/products/add-new-product`,{
      method:"POST",
      body:formData
  })
  const data = await res.json();
  console.log(data)



}