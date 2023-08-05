
const render = (projects) =>{
    let cont;
    projects.forEach(  project => {
        if (project.tipo === "front-end"){
            cont = document.getElementById("frontEndID")
        }
        else if(project.tipo === "back-end"){
            cont = document.getElementById("backEndID")
        }
        else{
            cont = document.getElementById("fullStackID")
        }
        
        const contProject = document.createElement("div")
        contProject.classList = "contentProject"
        contProject.innerHTML = 
                                `
                                <img class="bg-img" src=${project.background} alt="${project.id}" id=${`bg-${project.id}`}>
                                <div class="bg" >
                                    <div class="contentProject__resume">
                                        <h3>${project.name}</h3>
                                        <p>${project.descripcion}</p>
                                        <div id=${`tecno${project.id}`}>
                                            <h4>Tecnologías</h4>
                                        </div>
                                        <div id=${`access${project.id}`}> 
                                            <a class="btn" href=${project.repositorio}> Ver Repositorio </a>
                                        </div>
                                    </div>
                                    <div class="contentProject__images">
                                        <button style="transform: rotate(180deg)" id=${`prev${project.id}`}><img src="./img/arrow-right.png "></button>
                                        <img src=${project.img[0]} alt="image project" id=${`img${project.id}`}>
                                        <button id=${`next${project.id}`}><img src="./img/arrow-right.png "></button>
                                    </div>
                                </div>
                                `
        cont.appendChild(contProject)
        //Renderizacion de Tecnologías
        const tecnoCont = document.getElementById(`tecno${project.id}`)
        project.tecnologias.forEach(  tec => {
            const img = document.createElement('img')
            img.style= "margin-right: 0.5rem"
            img.src = tec
            tecnoCont.appendChild(img)

        }  )
        //Colocar acceso a página en caso de que tenga
        if(project.page){
            const a = document.createElement('a')
            a.innerText= "Ver página"
            a.classList="btn"
            a.href= project.page
            const contAccess = document.getElementById(`access${project.id}`)
            contAccess.appendChild(a)
        }
        //Eventos para cambiar imagines
        const next = document.getElementById(`next${project.id}`)
        next.addEventListener('click', ()=>{
          prevAndNextImg(project, "next")  
        })
        const prev = document.getElementById(`prev${project.id}`)
        prev.addEventListener('click', ()=>{
          prevAndNextImg(project, "prev")
        })
    })
}

const prevAndNextImg = (project, way) =>{
    const imgs = project.img
    const elementIMG = document.getElementById(`img${project.id}`)
    const bg = document.getElementById(`bg-${project.id}`)
    const currentImg = `./${elementIMG.src.split("/").slice(3,7).join("/")}`
    let indexImgCurrent = imgs.indexOf(currentImg)
    if (way === "next"){
        indexImgCurrent = indexImgCurrent++ === imgs.length-1 ?   0  : indexImgCurrent++
        elementIMG.src = imgs[indexImgCurrent]
        bg.src = imgs[indexImgCurrent]
    }
    else{
        indexImgCurrent = indexImgCurrent-- <= 0 ?  imgs.length-1   : indexImgCurrent--
        elementIMG.src = imgs[indexImgCurrent]
        bg.src = imgs[indexImgCurrent]
    }
   
} 

//Algoritmo Principal

fetch("./data/projects.json")
    .then(res => res.json())
    .then( data => {
        render(data)
    } )
