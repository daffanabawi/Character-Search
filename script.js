const creatureListUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";
const detailCreatureUrl = "https://rpg-creature-api.freecodecamp.rocks/api/creature/";
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id")
const creatureWeight = document.querySelector("#weight span");
const creatureHeight = document.querySelector("#height span");
const basePosture = document.getElementById("base-posture");
const creatureTypes = document.getElementById("types");
const creatureTypesP = document.querySelectorAll("#types p")
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
let dataCreature = [];
const fetchData = async () =>{
  try{
    const response = await fetch(creatureListUrl);
    const data = await response.json();
    dataCreature = data;
    
  } catch (err){
    console.log(err)
  }
}
fetchData()

const searchCreature =() =>{
  const userInput = searchInput.value.trim().toLowerCase();

  const found = dataCreature.find(item=>{
    const foundById = String(item.id) === userInput;
const foundByName = item.name.toLowerCase() === userInput;
return foundById || foundByName;
  })

  if(!found){
    alert("Creature not found")
    console.log("not found")
    
  }else{
    
    // const detailData = `${detailCreatureUrl}${userInput}`
    // console.log(detailData)
    // const {height} = detailData
    return userInput;
    
  }
}

const test =()=>{
  const detailData = `${detailCreatureUrl}${searchCreature()}`
    // console.log(detailData)
    const fetchData = async() =>{
      try{
        const response = await fetch(detailData);
        const data = await response.json()
        const detailDataCreature = data;
        showDetailsCreature(detailDataCreature)
      }catch (err){
        console.log(err)
      }
    }
    fetchData()
  // console.log(searchCreature())
}
    const showDetailsCreature =(param)=>{
      const {
        id,
        name,
        weight,
        height,
        types,
        stats,
        } = param;
        let baseStatArr =[]
        const typesNameMap = types.map(item =>{
          const {name:typesName} = item
          return typesName
        })
        stats.map(item =>{
          const {
            base_stat
          } = item
          baseStatArr.push(base_stat)
        })

      basePosture.style.display = "block"
      creatureId.textContent =`#${id}`;
      creatureName.textContent = name;
      creatureWeight.textContent = weight;
      creatureHeight.textContent = height;
      console.log(typesNameMap)
      creatureTypes.innerHTML = typesNameMap.map(type => `<p>${type}</p>`)
    .join("")
    console.log(baseStatArr)
    hp.textContent = baseStatArr[0]
          attack.textContent = baseStatArr[1]
          defense.textContent = baseStatArr[2]
          specialAttack.textContent = baseStatArr[3]
          specialDefense.textContent = baseStatArr[4]
          speed.textContent = baseStatArr[5]
    } 

searchBtn.addEventListener("click",test)