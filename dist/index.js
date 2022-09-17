//let's play..
//[1]..main variables
let startbtn=document.querySelector(".start span.btn");
let startscreen=document.querySelector(".start");
let block=document.querySelector(".blocks ");
let tries=0;document.querySelector(".info .tries span").innerHTML=tries;
let user=document.querySelector(".info .name span");
let cards=Array.from(block.children);

//shuffel the indexes
let order=[...Array(cards.length).keys()];


startbtn.onclick=()=>{
  startscreen.style.display="none";
  startbtn.remove();
  user.innerHTML=window.prompt("Enter your name","")
  shuffel(order);

  Start();
}




function shuffel(arr){
  let current=order.length-1,
  temp,
  random;

  
  while(current>=0){
    random=Math.floor(Math.random()*current);
    console.log(random);
    
    temp=arr[current];
    arr[current]=arr[random];
    arr[random]=temp;
    current--;
  }

  return arr;
}

//start game

function Start(){

  cards.forEach((card,index)=>{

    //change flex order
    card.style.order=order[index];

      //show for half a second
      setTimeout(()=>{
        card.classList.add("flipped");
      },100)
      
      setTimeout(()=>{
        card.classList.remove("flipped");
      },1500)
    

    //add flipped class to card..
    card.onclick=()=>{
      
      flip(card);
    }
  })

}
console.log(cards);

//flip card
function flip(card){
  card.classList.add("flipped");
  //select flipped cards 
  let selected= cards.filter( (card)=> {return card.classList.contains('flipped')});
  
  if(selected.length===2){
    stopclick();
    check(selected[0],selected[1]);
  }
}

//stop clicking
function stopclick(){
  block.classList.add("stop");
}

//checl if the cards are the same
function check(one,two){
  if(one.dataset.photo===two.dataset.photo){
    setTimeout(()=>{
      //remove flippde class
      one.classList.remove("flipped");
      two.classList.remove("flipped");

      //save the cards on flip mode
      one.style.transform=`rotateY(180deg)`;
      two.style.transform=`rotateY(180deg)`;

      //return validation of clicking
      block.classList.remove("stop");

      //show start screed with "good"
      rate("You'r Good!!   ");

        //remove start screen
      setTimeout(()=>{
        startscreen.innerHTML="";
        startscreen.style.display="none";
      },1000)

    },1000)


  }else{
    setTimeout(()=>{
          //increase number of tries
    document.querySelector(".info .tries span").innerHTML++;

    //remove flipped class
    one.classList.remove("flipped");
    two.classList.remove("flipped");

    
      //return validation of clicking
      block.classList.remove("stop");

      //show start screen with "bad"
      rate("Bad..!!   ");

      // remove start screen
      setTimeout(()=>{
        startscreen.innerHTML="";
        startscreen.style.display="none";
      },1000)

    },1000)
  }


} 


function rate(message){

  let span=document.createElement("span");
  span.className="say";
  span.innerHTML=`${message} ${user.innerHTML}`;
  startscreen.appendChild(span);
  startscreen.style.display="block";
}