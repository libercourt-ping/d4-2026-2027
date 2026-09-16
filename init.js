function l() {
  const k = "bGliZXJjb3VydC1jcDU=";
  const z = "YWNjb3VudA==";
  const a = localStorage.getItem(atob(z));

  const display = () => {
    document.body.innerHTML = `
    <div class="bg-red-500 w-full text-center text-white">Vous n'avez pas les autorisations nécessaires</div>
    `;
  };
  if (a) {
    if (a !== atob(k)) {
      display();
      return;
    }
    main();
    return;
  }

  const fwd = prompt("login : ");
  if (fwd === atob(k)) {
    localStorage.setItem(atob(z), fwd);
    main();
    return;
  } else {
    display();
    return;
  }
}

l();

function main() {
  const isMobile = screen.orientation.type !== "landscape-primary";

  const dates = [
    "20 septembre",
    "04 octobre",
    "18 octobre",
    "08 novembre",
    "22 novembre",
    "06 décembre",
    "13 décembre",
  ].map((el, index) => (isMobile ? el : `Dimanche ${el}`));

  /**
   * @type {{club:string;domicile: boolean; rdv?:string}[]}
   */
  const poule = [
    { club: "BILLY-MONTIGNY 5", domicile: false, rdv: "8h30" },
    { club: "ST LAUREN/BLANG 15", domicile: true },
    { club: "LEFOREST TT 7", domicile: true },
    { club: "DAINVILLE ASTT 9", domicile: false },
    { club: "FOUQUIERES/LENS 7", domicile: true },
    { club: "BILLY BERCLAU 6", domicile: false },
    { club: "LOISON / LENS 3", domicile: true },
  ];

  const TEAM = Object.freeze({
    CEDRIC: "Cédric",
    THEO: "Théo",
    ERIC: "Eric",
    MANO: "Mano",
    LUDO: "Ludo",
  });

  const matchTeam = [
    [TEAM.CEDRIC, TEAM.LUDO, TEAM.MANO, TEAM.THEO],
    [TEAM.CEDRIC, TEAM.ERIC, TEAM.MANO, TEAM.THEO],
    [TEAM.CEDRIC, TEAM.LUDO, TEAM.ERIC, TEAM.THEO],
    [TEAM.ERIC, TEAM.LUDO, TEAM.MANO, TEAM.THEO],
    [TEAM.CEDRIC, TEAM.THEO, TEAM.MANO, TEAM.LUDO],
    [TEAM.ERIC, TEAM.CEDRIC, TEAM.MANO, TEAM.LUDO],
    [TEAM.LUDO, TEAM.ERIC, TEAM.MANO, TEAM.THEO],
  ];

  /**
   * @type {{name: string; domicile: number;nbMatchs: number}[]}
   */
  const counter = Object.values(TEAM).map((el) => ({
    name: el,
    domicile: 0,
    nbMatchs: 0,
  }));

  const bd = document.body;
  bd.classList.add("bg-gray-300");
  const globalContainer = document.getElementById("global-container");

  const div = document.createElement("div");
  const cols = isMobile ? "grid-cols-1" : "grid-cols-4";

  div.classList.add(
    "grid",
    cols,
    "gap-4",
    "w-[calc(100%-4rem)]",
    "mx-auto",
    "h-fit",
  );
  globalContainer.appendChild(div);
  bd.appendChild(globalContainer);
  dates.forEach((el, index) => {
    const divMatch = document.createElement("div");
    divMatch.classList.add(
      "flex",
      "rounded-lg",
      "flex-col",
      "w-full",
      "bg-gray-200",
      "h-fit",
    );
    const divJournee = document.createElement("div");
    divJournee.classList.add("container");
    divMatch.appendChild(divJournee);
    div.appendChild(divMatch);

    const journee = document.createElement("span");
    journee.classList.add(
      "text-center",
      "border-b",
      "border-b-black",
      "w-3/4",
      "mx-auto",
      "py-1",
    );
    journee.style.borderStyle = "dotted";
    journee.textContent = "Journée " + (index + 1);
    divJournee.appendChild(journee);

    const adversaire = poule[index];
    const teamToUse = matchTeam.at(index);
    const title = document.createElement("div");
    title.classList.add(
      "flex",
      "w-full",
      "justify-evenly",
      "items-center",
      "py-1",
    );
    const spanDate = document.createElement("span");
    spanDate.textContent = el;
    title.appendChild(spanDate);
    const spanAdversaire = document.createElement("span");
    spanAdversaire.textContent = adversaire.club;
    const classPlace = adversaire.domicile
      ? "text-green-500"
      : "text-orange-400";
    spanAdversaire.classList.add("italic", classPlace);
    title.appendChild(spanAdversaire);
    divJournee.appendChild(title);

    const spanEquipeTitle = document.createElement("strong");
    spanEquipeTitle.classList.add("text-center");
    spanEquipeTitle.textContent = "Equipe";

    const divTeam = document.createElement("div");
    divTeam.classList.add("container");
    if (!(adversaire.domicile || adversaire.rdv)) {
      divTeam.style.border = "none";
    }
    divTeam.appendChild(spanEquipeTitle);
    divMatch.appendChild(divTeam);
    const equipe = document.createElement("div");
    equipe.classList.add("grid", "grid-cols-2", "w-full", "py-1");

    teamToUse.forEach((player) => {
      const spanPlayer = document.createElement("span");
      spanPlayer.classList.add("text-center");
      spanPlayer.textContent = player;
      equipe.appendChild(spanPlayer);
      const data = counter.find((el) => el.name === player);

      data.nbMatchs++;
      if (adversaire.domicile) {
        data.domicile++;
      }
    });
    const spanRemplacants = document.createElement("span");
    spanRemplacants.classList.add(
      "text-center",
      "w-3/4",
      "mx-auto",
      "border-t",
      "border-t-black",
      "py-1",
    );
    spanRemplacants.style.borderStyle = "dotted";
    const remplacants = Object.values(TEAM)
      .filter((el) => !teamToUse.includes(el))
      .join(", ");
    spanRemplacants.innerHTML = `<strong>Remplaçants</strong> : ${remplacants}`;

    divTeam.appendChild(equipe);
    divTeam.appendChild(spanRemplacants);
    if (adversaire.domicile || adversaire.rdv) {
      const rdv = document.createElement("span");
      rdv.classList.add("text-center", "py-2");
      rdv.textContent =
        "🕑 RDV : " + (adversaire.domicile ? "9h" : adversaire.rdv);
      divMatch.appendChild(rdv);
    }
  });

  const recap = document.createElement("div");
  recap.classList.add(
    "flex",
    "gap-4",
    "w-[calc(100%-4rem)]",
    "mx-auto",
    "rounded-lg",
    "h-fit",
    "bg-gray-200",
  );

  const dataHTML = counter
    .map(
      (el) => `
        <tr>
          <td class="text-center"> ${el.name} </td>
          <td class="text-center"> ${el.domicile} </td>
          <td class="text-center"> ${el.nbMatchs} </td>
        </tr>`,
    )
    .join("");
  recap.innerHTML = `
        <table class="w-full">
          <tr>
            <th>Joueur</th>
            <th>Matchs à domicile</th>
            <th>Matchs totaux</th>
          </tr>
          ${dataHTML}
        </table>`;

  div.insertAdjacentElement("beforebegin", recap);
  const contact = document.createElement("footer");
  contact.classList.add(
    "bg-gray-400",
    isMobile ? "px-2" : "px-8",
    isMobile ? "justify-evenly" : "justify-between",
  );
  /**
   * @type {({type: 'text'|'mail'|'tel';value: string} | {type: 'text'|'mail'|'tel';value: string}[])[]}
   */
  const infoContact = [
    !isMobile ? { type: "text", value: "@Septembre 2026" } : null,
    [
      { type: "mail", value: "cedric-bouquet-7@outlook.fr" },
      isMobile ? { type: "tel", value: "0641001806" } : null,
    ],
  ]
    .map((el) =>
      el ? (Array.isArray(el) ? el.filter((item) => item != null) : el) : null,
    )
    .filter((el) => el != null);

  infoContact.forEach((el) => {
    if (Array.isArray(el)) {
      const divBlock = document.createElement("div");
      divBlock.classList.add("flex", "flex-col", "gap-2");
      if (isMobile) {
        divBlock.classList.add("w-full", "items-center");
      }

      el.forEach((item) => {
        displayInfo(item, divBlock);
      });
      contact.appendChild(divBlock);
    } else {
      displayInfo(el, contact);
    }
  });

  bd.appendChild(contact);

  /**
   *
   * @param {{type: 'text'|'mail'|'tel';value: string}} element
   * @param {HTMLElement} destination
   */
  function displayInfo(element, destination) {
    if (element.type === "text") {
      const span = document.createElement("span");
      span.textContent = element.value;
      destination.appendChild(span);
    } else if (element.type === "mail") {
      const a = document.createElement("a");
      a.href = "mailto:" + element.value;
      a.textContent = "📧 Me contacter";
      destination.appendChild(a);
    } else if (element.type === "tel") {
      const divTel = document.createElement("div");
      divTel.classList.add("flex", "gap-2", "items-center");
      const aSms = document.createElement("a");
      aSms.href = "sms:" + element.value;
      aSms.textContent = "📱 SMS";
      const aCall = document.createElement("a");
      aCall.href = "tel:" + element.value;
      aCall.textContent = "- 📱 CALL";
      divTel.appendChild(aSms);
      divTel.appendChild(aCall);
      destination.appendChild(divTel);
    }
  }
}
