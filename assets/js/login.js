let eyeBtn = document.querySelector(`form > div:nth-child(2) > span`);
let eyeOpen = document.querySelector(`form > div:nth-child(2) > span > i:nth-child(1)`);
let eyeClose = document.querySelector(`form > div:nth-child(2) > span > i:nth-child(2)`);
let passwordInput = document.querySelector('form > div:nth-child(2) > input');

let isEyeOpen = false;

eyeBtn.onclick = ()=>{
    // alert('hello')
    if(isEyeOpen){
        isEyeOpen = false;
        eyeOpen.style.display = 'none';
        eyeClose.style.display = 'inline-block';
        passwordInput.type = 'password';
    }
    else{
        isEyeOpen = true;
        eyeOpen.style.display = 'inline-block';
        eyeClose.style.display = 'none';
        passwordInput.type = 'text';
    }
}

const handleSubmit = async(e)=>{
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    e.preventDefault();
    let res = await fetch(`/login/submit`,{
        method:"POST",
        headers:{
            "Content-Type":"Application/json"
        },
        body:JSON.stringify({username,password})
    });
    let data = await res.json();
    console.log(data);

}
