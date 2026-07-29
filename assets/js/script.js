'use strict';

// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }

// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "todos") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}

// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}

// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[j].classList.remove("active");
      }
    }

    // Remove active state dos links que não foram clicados
    for (let k = 0; k < navigationLinks.length; k++) {
      if (k !== i) {
        navigationLinks[k].classList.remove("active");
      }
    }

  });
}

/* ==========================================
   PROJECT MODAL
========================================== */
const projectsData = {

  "cafe-cloud": {

    title: "Café com Cloud",

    category: "Cloud & Microsoft 365",

    image: "./assets/images/cafecloud.png",

    description:
      "O Café com Cloud é um boletim diário criado para centralizar as principais novidades do ecossistema Microsoft. A solução coleta notícias automaticamente de blogs oficiais, RSS e portais especializados, utiliza Inteligência Artificial para resumir e organizar o conteúdo e publica tudo em um canal do Microsoft Teams por meio de Adaptive Cards. O projeto elimina a necessidade de pesquisa manual e mantém equipes de infraestrutura sempre atualizadas.",

    tech: [
      "N8N",
      "Microsoft Teams",
      "Microsoft Graph API",
      "Azure",
      "Microsoft 365",
      "RSS",
      "Gemini AI"
    ]

  },

  "agente-whatsapp": {

    title: "Agente de Atendimento no WhatsApp",

    category: "Agentes de IA",

    image: "./assets/images/agentewpp.png",

    description:
      "Agente inteligente desenvolvido para automatizar o atendimento via WhatsApp utilizando IA generativa. A solução compreende mensagens em linguagem natural, responde dúvidas, realiza qualificação de clientes, agenda consultas através do Google Calendar e mantém o histórico das conversas utilizando memória persistente no Supabase. Toda a orquestração é realizada pelo N8N, integrando APIs e serviços corporativos em um fluxo totalmente automatizado.",

    tech: [
      "N8N",
      "OpenAI",
      "Google Gemini",
      "Evolution API",
      "WhatsApp",
      "Supabase",
      "Google Calendar",
      "PostgreSQL"
    ]
  },
 "automacao-lansweeper": {

    title: "Inventário Automatizado de Softwares",

    category: "Automação",

    image: "./assets/images/softwareinventory.png",

    description:
      "Desenvolvimento de uma solução de automação para gerenciamento de inventário de softwares utilizando Lansweeper, Power Automate e SharePoint. A solução automatiza a importação e atualização dos relatórios do Lansweeper, garantindo que os dados sejam processados e centralizados no SharePoint sem necessidade de intervenção manual, mantendo o inventário sempre atualizado para consultas e relatórios.",

    tech: [
     "Power Automate",
    "Lansweeper",
        "SharePoint",
        "Microsoft Lists",
        "Excel",
        "Microsoft 365"
    ]

  },

};

const projectModal = document.querySelector("[data-project-modal-container]");
const projectOverlay = document.querySelector("[data-project-overlay]");
const projectCloseBtn = document.querySelector("[data-project-modal-close-btn]");

const modalImage = document.querySelector("[data-project-modal-image]");
const modalTitle = document.querySelector("[data-project-modal-title]");
const modalCategory = document.querySelector("[data-project-modal-category]");
const modalDescription = document.querySelector("[data-project-modal-description]");
const modalTech = document.querySelector("[data-project-modal-tech]");

const projects = document.querySelectorAll("[data-project]");

function abrirProjeto() {
  projectModal.classList.add("active");
}

function fecharProjeto() {
  projectModal.classList.remove("active");
}

projects.forEach(project => {

  project.addEventListener("click", function (e) {

    e.preventDefault();

    const projectId = this.dataset.project;
    const data = projectsData[projectId];

    if (!data) return;

    // Imagem
    modalImage.src = data.image;
    modalImage.alt = data.title;

    // Textos
    modalTitle.textContent = data.title;
    modalCategory.textContent = data.category;
    modalDescription.textContent = data.description;

    // Tecnologias
    modalTech.innerHTML = "";

    data.tech.forEach(tech => {

      const li = document.createElement("li");
      li.textContent = tech;

      modalTech.appendChild(li);

    });

    abrirProjeto();

  });

});

projectCloseBtn.addEventListener("click", fecharProjeto);
projectOverlay.addEventListener("click", fecharProjeto);
