const fillDate = ()=>{
    let d = new Date();
    const dateObject = {
        months:{
            1:"January",
            2:"February",
            3:"March",
            4:"April",
            5:"May",
            6:"June",
            7:"July",
            8:"August",
            9:"September",
            10:"October",
            11:"Noverber",
            12:"December"
        },
        days:{
            1:"st",
            2:"nd",
            3:"rd",
        }
    }
    let day = d.getDate();
    let month = d.getMonth() +1;
    let year = d.getFullYear();
    let dayString = 'th';
    if(day <= 9){
        if(dateObject.days[day]) dayString = dateObject.days[day];
        else dayString = 'th';
        
    }
    else{
        let tempDay = day%10;
       if(day > 20){
        dayString = dateObject.days[tempDay]?dateObject.days[tempDay]:'th';
       }

    }
    let dateSpan = document.querySelector('.date');
    dateSpan.textContent = `${day}${dayString} ${dateObject.months[month]}, ${year}`
}

fillDate(); 