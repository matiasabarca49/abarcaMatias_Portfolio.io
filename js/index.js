const renderProjects = (projects) =>{
    let cont;
    projects.forEach(  project => {
        if (project.type === "Web Front-end"){
            cont = document.getElementById("frontEndID")
        }
        else if(project.type === "Web Back-end"){
            cont = document.getElementById("backEndID")
        }
        else{
            cont = document.getElementById("fullStackID")
        }
        const contProject = document.createElement("div")
        contProject.classList = "project-card"
        contProject.innerHTML = 
                                `
                                <div class="project-card__image-container">
                                    <img src=${project.img[0]}  alt="E-Commerce Platform" class="project-card__image" id=${`img-${project.id}`}>
                                    <div class="image-overlay"></div>
                                </div>
                                <div class="status-badge ${project.status === "completado" ? "status-badge--completed" : "status-badge--progress" }">${project.status}</div>
                                <div class="project-card__content">
                                    <div class="project-card__header">
                                        <div class="project-card__icon"><img class="project-card__icon__img" src=${project.icon}></img></div>
                                        <div>
                                            <h3 class="project-card__title">${project.name}</h3>
                                            <p class="project-card__type">Aplicación ${project.type}</p>
                                        </div>
                                    </div>
                                    <p class="project-card__description"> ${project.description}
                                    </p>
                                    <div class="project-tech">
                                        <div class="project-tech__label">Tecnologías:</div>
                                        <div class="project-tech__tags" id=${`tech-${project.id}`}>
                                        </div>
                                    </div>
                                    <div class="project-links" id=${`access-links${project.id}`}></div>
                                </div>
                                `
        cont.appendChild(contProject)

        //Agregar tecnologías

        const contTech = document.getElementById(`tech-${project.id}`)
        
        project.tecnologies.forEach( tech => {
            const span = document.createElement("span")
            span.className = "project-tech__tag"
            span.textContent = tech
            contTech.appendChild(span)
        }

    )   
        //Colocar acceso a página en caso de que tenga
        if(project.page){
            const a = document.createElement('a')
            a.innerText= "Ver Demo"
            a.classList="project-link project-link--primary"
            a.href= project.page
            a.target = "_blank"
            const contAccess = document.getElementById(`access-links${project.id}`)
            contAccess.appendChild(a)
        }

        //Colocar acceso a repository en caso de que tenga
        if(project.repository){
            const a = document.createElement('a')
            a.innerText= "Código"
            a.classList="project-link project-link--secondary"
            a.href= project.repository
            a.target = "_blank"
            const contAccess = document.getElementById(`access-links${project.id}`)
            contAccess.appendChild(a)
        }

        const imgCont = document.getElementById(`img-${project.id}`)
        let started = false
        imgCont.addEventListener("load", ()=> {
            if(!started){
                started = true
                let i = 0
                setInterval(()=> {
                   imgCont.src = project.img[i]
                   i = (i + 1) % project.img.length
                
                }, Math.random() * (12000 - 8000) + 8000, i)
            }
        })

    })
}
 
//Algoritmo Principal

fetch("./data/projects.json")
    .then(res => res.json())
    .then( data => {
        renderProjects(data)
    } )
