
let inputSlider=document.querySelector("[data-lengthSlider]");
let lengthDisplay=document.querySelector("[data-lengthNumber]");
let passwordDisplay=document.querySelector("[ data-passwordDisplay]")
let copyBtn=document.querySelector("[data-copy ]");
let copyMsg=document.querySelector("[dataMsg ]");
let uppercase=document.querySelector("#uppercase");
let lowercase=document.querySelector("#lowercase");
let number=document.querySelector("#numbers");
let symbol=document.querySelector("#symbol");
let generateBtn=document.querySelector(".generate-password");

let indicator=document.querySelector("[data-indicator]");

let allcheckbox=document.querySelectorAll("input[type=checkbox]");


let icon=document.querySelector('.icon');

let modal=document.querySelector('.modal');


console.log(typeof allcheckbox);




const str='~!#$%^&*()_+|"/';


let password="";
let passwordLength=10;
let checkcount=0;

handleSlider();


setIndicator("#ccc");

// set slide

function handleSlider()
{
  inputSlider.value=passwordLength;
    lengthDisplay.innerHTML=passwordLength;

    const min = inputSlider.min;
    const max = inputSlider.max;

    inputSlider.style.backgroundSize = ( (passwordLength - min)*100/(max - min)) + "% 100%"
    
}


function getInt(min, max)
{

    return  Math.floor(Math.random()*(max-min)+min);
}


function getNumber()
{
    return getInt(0,9);
}

function getLower()
{

    return String.fromCharCode(getInt(97,123));
}

function getUpper()
{
    return String.fromCharCode(getInt(65,91));
}



function getSymbol()
{

    return  str.charAt(getInt(0,str.length));
}



  function setIndicator(color)
  {
        indicator.style.backgroundColor=color;

        indicator.style.boxShadow = `0px 0px 12px 1px ${color}`  ;

  }


function calStrength()
{
let hasUper=false;
let hasLower=false;
let hasNumber=false;
let hasSymbol=false;


if(uppercase.checked) hasUper=true;
if(lowercase.checked) hasLower=true;
if(number.checked) hasNumber=true;
if(symbol.checked) hasSymbol=true;


if (hasUper && hasLower && (hasNumber || hasSymbol) && passwordLength >= 8) {
    setIndicator("#0f0");
  } else if (
    (hasLower || hasUper) &&
    (hasNumber || hasSymbol) &&
    passwordLength >= 6
  ) {
    setIndicator("#ff0");
  } else {
    setIndicator("#f00");
  }

}


  async function copyContent()
  {

    try
    {

      await navigator.clipboard.writeText(passwordDisplay.value);

      copyMsg.innerText='Copied';
  

    }


    catch(e)
    {

      copyMsg.innerText='Failed';
    }


    copyMsg.classList.add('active');

    setTimeout(()=>{

      copyMsg.classList.remove('active')
    },1000)
  

  }



  inputSlider.addEventListener('input', (e)=>{

    passwordLength=e.target.value;

    handleSlider();

  })



  copyBtn.addEventListener('click', ()=>{

      if(passwordDisplay.value)

      {
        copyContent();
      }

  })


  

  function handleCheckbox()
  {
    checkcount=0;

    for(let i=0; i<allcheckbox.length; i++)
    {

      if(allcheckbox[i].checked)
      checkcount++;
      
    }

    if(passwordLength<checkcount)
    {

      passwordLength=checkcount;
      handleSlider();
    }


  }


  allcheckbox.forEach((element) =>{


    element.addEventListener('change', handleCheckbox);
  
});

function shufflePassword(array) {
  //Fisher Yates Method
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));         const temp = array[i];
      array[i] = array[j];
       array[j] = temp;
}
  let str = "";
 array.forEach((el) => (str += el));
  return str; }






  handleCheckbox();

  password=" ";

    //
    console.log("before generate");


    generateBtn.addEventListener('click', ()=>{
    if(checkcount==0){
      passwordDisplay.value=" ";
      modeActive();
    return;
    }

    if(passwordLength<checkcount)
    {
      passwordLength=checkcount;
      handleSlider();
    }



   
    password=" ";

    let favArr=[];
    
    if(uppercase.checked)
    {
      favArr.push(getUpper);
    }
    
    if(lowercase.checked)
    {
      favArr.push(getLower);
    }
    
    if(number.checked)
    {
      favArr.push(getNumber);
    }
    if(uppercase.checked)
    {
      favArr.push(getSymbol);
    }
    
    // compulsory addition

    //console.log(favArr.length);
    
    
      for(let i=0; i<favArr.length; i++)
      {
    
          password+=favArr[i]();
    
      }
    
    
      // rest
    
     
    
      for(let i=0; i<passwordLength-favArr.length; i++)
      {
        let counter=0;

       let random=getInt(0, favArr.length);

       password+=favArr[random]();
        
        }
        

    
      
    
    
      // shuffle
    
      
    
    
    password = shufflePassword(Array.from(password));
    
    
    passwordDisplay.value = password;
    
    calStrength();

 


  });



  // generateBtn.addEventListener('click', ()=>{

    

  //   let check=0;

  //   for(let i=0; i<allcheckbox.length; i++)
  //   {

  //     if(allcheckbox[i].checked)
  //     check++;
      
  //   }


  //   if(check==0)
  //   {

  //     modal.classList.add="mactive";
  //   }

  //   })








  icon.addEventListener('click', ()=>{


    modal.classList.remove('mactive');
    

  });

  document.addEventListener('dblclick', ()=>{


    modal.classList.remove('mactive');
    console.log("remove");

  });


  
console.log(modal);

function modeActive(){
    modal.classList.add('mactive');
    console.log("active");
};











































