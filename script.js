const defaulturl= "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a";
const searchurl= "https://www.thecocktaildb.com/api/json/v1/1/search.php?s=";

const drinkform= document.querySelector(".drinkform");
const drinkInput= document.querySelector(".drinkInput");
const drinklist= document.querySelector(".drinklist");
const groupcount= document.querySelector(".groupcount");
const grouplist= document.querySelector(".grouplist");
const modal= document.querySelector(".modal");
const modalbody= document.querySelector(".modalbody");
const closebutton= document.querySelector(".closebutton");

let alldrinks=[];
let groupdrinks=[];

drinkform.addEventListener("submit", event=>{
   event.preventDefault();
   const drink= drinkInput.value;

   if(drink){
      getdrinkData(searchurl + drink);
   }else{
      getdrinkData(defaulturl);
   }
});

closebutton.addEventListener("click", ()=>{
   modal.style.display="none";
});

async function getdrinkData(url){
   const response= await fetch(url);
   console.log(response);
   const data= await response.json();

   if(Array.isArray(data.drinks)){
      alldrinks= data.drinks;
      displaydrinkInfo();
   }else{
      displayerror("Drink not found");
   }
}

function displaydrinkInfo(){
   drinklist.textContent="";

   for(let i=0; i<alldrinks.length; i++){
      const drink= alldrinks[i];
      const card= document.createElement("div");
      const image= document.createElement("img");
      const nameDisplay= document.createElement("h3");
      const categoryDisplay= document.createElement("p");
      const instructionDisplay= document.createElement("p");
      const addbutton= document.createElement("button");
      const detailsbutton= document.createElement("button");

      image.src= drink.strDrinkThumb;
      nameDisplay.textContent= drink.strDrink;
      categoryDisplay.textContent= `Category: ${drink.strCategory}`;
      instructionDisplay.textContent= `Instructions: ${drink.strInstructions.slice(0,15)}`;
      addbutton.textContent="Add to Group";
      detailsbutton.textContent="Details";

      card.classList.add("card");

      addbutton.addEventListener("click", ()=>{
         addtogroup(drink.strDrink);
      });
      detailsbutton.addEventListener("click", ()=>{
         displaydetails(drink);
      });

      card.appendChild(image);
      card.appendChild(nameDisplay);
      card.appendChild(categoryDisplay);
      card.appendChild(instructionDisplay);
      card.appendChild(addbutton);
      card.appendChild(detailsbutton);
      drinklist.appendChild(card);
   }
}

function addtogroup(name){
   if(groupdrinks.length>=7){
      alert("You can not add more than 7 drinks");
      return;
   }
   groupdrinks.push(name);
   groupcount.textContent= groupdrinks.length;

   const item= document.createElement("li");
   item.textContent= name;
   grouplist.appendChild(item);
}

function displaydetails(drink){
   modalbody.textContent="";

   const image= document.createElement("img");
   const nameDisplay= document.createElement("h2");
   const categoryDisplay= document.createElement("p");
   const typeDisplay= document.createElement("p");
   const glassDisplay= document.createElement("p");
   const instructionDisplay= document.createElement("p");

   image.src= drink.strDrinkThumb;
   nameDisplay.textContent= drink.strDrink;
   categoryDisplay.textContent= `Category: ${drink.strCategory}`;
   typeDisplay.textContent= `Type: ${drink.strAlcoholic}`;
   glassDisplay.textContent= `Glass: ${drink.strGlass}`;
   instructionDisplay.textContent= `Instructions: ${drink.strInstructions}`;

   modalbody.appendChild(image);
   modalbody.appendChild(nameDisplay);
   modalbody.appendChild(categoryDisplay);
   modalbody.appendChild(typeDisplay);
   modalbody.appendChild(glassDisplay);
   modalbody.appendChild(instructionDisplay);
   modal.style.display="flex";
}

function displayerror(message){
   const errorDisplay= document.createElement("p");
   errorDisplay.textContent= message;
   errorDisplay.classList.add("errorDisplay");
   drinklist.textContent="";
   drinklist.appendChild(errorDisplay);
}

getdrinkData(defaulturl);