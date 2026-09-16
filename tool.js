import { composition, TEAM } from "./composition.js";
import { data, dates, isMobile } from "./data.js";
import { poule } from "./poule.js";

export function zero(c) {
  const start = 97;
  const i = [0, 19, 14, 1];
  const arr = i.map((el) => start + el);
  const x = arr.map((el) => String.fromCharCode(el)).join("");
  const y = x.at(-1) + x.substring(1, 3) + x[0];
  return eval(`${x}(${y}(${x}("${c}")))`);
}

export function main() {
  const matchTeam = composition;

  /**
   * @type {{player: {start: number; name:string}; domicile: number;nbMatchs: number}[]}
   */
  const counter = Object.values(TEAM).map((el) => ({
    player: el,
    domicile: 0,
    nbMatchs: 0,
  }));

  const bd = document.body;
  bd.classList.add("bg-gray-300");
  const globalContainer = document.getElementById("global-container");

  const div = document.createElement("div");
  const cols = isMobile ? "grid-cols-1" : "grid-cols-4";
  document.body.classList.add(isMobile ? "mobile" : "desktop");

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
  const colors = {
    WIN: ["bg-green-300", "text-black"],
    LOSE: ["bg-red-300", "text-black"],
    EQUAL: ["bg-yellow-300", "text-black"],
  };

  dates.forEach((el, index) => {
    const divMatch = document.createElement("div");
    divMatch.classList.add(
      "flex",
      "rounded-lg",
      "overflow-hidden",
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
    journee.id = "journey_" + (index + 1);
    divJournee.appendChild(journee);

    const match = poule[index];
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
    spanAdversaire.textContent = match.adversaire;
    const classPlace = match.domicile ? "text-green-500" : "text-orange-400";
    spanAdversaire.classList.add("italic", "font-bold", classPlace);
    title.appendChild(spanAdversaire);
    divJournee.appendChild(title);

    if (match.nbWinMatchs) {
      const scoreAdverse = 14 - match.nbWinMatchs;
      const diff = scoreAdverse - match.nbWinMatchs;
      const spanScore = document.createElement("span");

      spanScore.textContent = `Score : ${match.nbWinMatchs} - ${scoreAdverse}`;
      const classScore =
        diff > 0 ? colors.LOSE : diff < 0 ? colors.WIN : colors.EQUAL;
      classScore.push("font-bold", "text-center", "border-b", "border-black");
      classScore.forEach((el) => spanScore.classList.add(el));
      divMatch.appendChild(spanScore);
    }

    const spanEquipeTitle = document.createElement("strong");
    spanEquipeTitle.classList.add("text-center");
    spanEquipeTitle.textContent = "Equipe";

    const divTeam = document.createElement("div");
    divTeam.classList.add("container");
    if (!(match.domicile || match.rdv)) {
      divTeam.style.border = "none";
    }
    divTeam.appendChild(spanEquipeTitle);
    divMatch.appendChild(divTeam);
    const equipe = document.createElement("div");
    equipe.classList.add("grid", "grid-cols-2", "w-full", "py-1");

    teamToUse.forEach((player, index) => {
      const spanPlayer = document.createElement("span");
      const clazz = index < 2 ? "text-indigo-600" : "text-red-400";

      spanPlayer.classList.add("text-center", clazz, "font-semibold");
      spanPlayer.textContent = player.name;
      equipe.appendChild(spanPlayer);
      const data = counter.find((el) => el.player === player);

      data.nbMatchs++;
      if (match.domicile) {
        data.domicile++;
      }
    });

    if (match.capitaine) {
      const capitaineBlock = document.createElement("span");
      capitaineBlock.classList.add(
        "text-center",
        "w-3/4",
        "mx-auto",
        "border-y",
        "border-y-black",
        "py-1",
      );
      capitaineBlock.style.borderStyle = "dotted";
      capitaineBlock.innerHTML = `<strong>Capitaine</strong>&nbsp;:&nbsp;<span class='text-indigo-900 font-bold'>${match.capitaine}</span>`;
      divTeam.appendChild(capitaineBlock);
    }

    divTeam.appendChild(equipe);

    if (match.absences) {
      const absencesBlock = document.createElement("span");
      absencesBlock.classList.add(
        "text-center",
        "w-3/4",
        "mx-auto",
        "border-t",
        "border-t-black",
        "py-1",
      );
      absencesBlock.style.borderStyle = "dotted";
      absencesBlock.innerHTML = `<strong>Absences</strong>&nbsp;:&nbsp;<span class='text-red-900 font-bold italic'>${match.absences.map((el) => el.name).join(", ")}</span>`;
      divTeam.appendChild(absencesBlock);
    }

    const remplacants = Object.values(TEAM)
      .filter(
        (el) =>
          !teamToUse.includes(el) &&
          index >= el.start &&
          !match.absences?.includes(el),
      )
      .map((el) => el.name)
      .join(", ");
    if (remplacants.length > 0) {
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
      spanRemplacants.innerHTML = `<strong>Remplaçants</strong> : ${remplacants}`;
      divTeam.appendChild(spanRemplacants);
    }

    const local = match.localisation;
    if (local) {
      const divLocalTotal = document.createElement("div");
      divLocalTotal.classList.add(
        "flex",
        "flex-col",
        "w-full",
        "gap-2",
        "border-b",
        "border-b-black",
        "items-center",
        "bg-orange-100",
      );
      const divLocal = document.createElement("div");
      divLocal.classList.add(
        "flex",
        "gap-4",
        "border-t",
        "border-t-black",
        "items-center",
        "justify-evenly",
        "bg-orange-100",
        "w-3/4",
      );
      divLocal.style.borderStyle = "dotted";
      if (local.estimatedTime) {
        const spanTime = document.createElement("span");
        spanTime.textContent = `Temps estimé : ~ ${local.estimatedTime} minutes`;
        spanTime.classList.add("text-green-600", "font-bold");
        divLocalTotal.appendChild(spanTime);
      }
      const arr = [
        { tool: "Google Maps", link: local.maps },
        { tool: "Waze", link: local.waze },
      ].filter((el) => el.link != null);
      arr.forEach((link) => {
        const aLocal = document.createElement("a");
        aLocal.href = link.link;
        aLocal.textContent = link.tool;
        aLocal.classList.add("underline", "italic");
        aLocal.target = "_blank";
        divLocal.appendChild(aLocal);
      });
      divLocalTotal.appendChild(divLocal);
      divMatch.appendChild(divLocalTotal);
    }
    if (match.domicile || match.rdv) {
      const rdv = document.createElement("span");
      rdv.classList.add("text-center", "py-2", "bg-blue-100", "font-semibold");
      rdv.textContent =
        "🕑  " +
        (match.domicile ? "RDV : 9h" : `Départ du club : ${match.rdv}`);
      divMatch.appendChild(rdv);
    }
    if (match.details) {
      const pDetails = document.createElement("p");
      const spanNote = document.createElement("span");
      const spanText = document.createElement("span");
      spanNote.textContent = "📋";
      spanText.textContent = match.details;
      spanNote.classList.add("text-bold", "text-2xl");
      pDetails.classList.add("bg-amber-100", "p-1", "text-gray-400");
      spanText.classList.add(
        "italic",
        "text-xs",
        "font-[Candy]!",
        "whitespace-pre-line!",
      );

      pDetails.appendChild(spanNote);
      pDetails.appendChild(spanText);
      divMatch.appendChild(pDetails);
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
          <td class="text-center"> ${el.player.name} </td>
          <td class="text-center"> ${el.domicile} </td>
          <td class="text-center"> ${el.nbMatchs} / ${7 - el.player.start} </td>
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

  const td = eval(`${zero(data.u)}.${zero(data.y)}("${zero(data.a)}")`);
  if (td) {
    div.insertAdjacentElement("beforebegin", recap);
  }

  if (isMobile) {
    const resultCases = document.createElement("div");
    resultCases.classList.add(
      "flex",
      "w-[calc(100%-4rem)]",
      "mx-auto",
      "h-fit",
      "bg-gray-200",
      "gap-4",
      "justify-center",
      "p-1",
      "rounded-lg",
    );
    poule
      .map((el) => el.nbWinMatchs)
      .forEach((el, index) => {
        const _case = document.createElement("div");
        _case.addEventListener("click", function () {
          document.getElementById("journey_" + (index + 1)).scrollIntoView({
            behavior: "smooth",
            inline: "start",
          });
        });
        _case.classList.add(
          "flex",
          "w-6",
          "h-6",
          "border",
          "border-solid",
          "items-center",
          "justify-center",
          "rounded-sm",
          "cursor-pointer",
          "font-semibold",
        );
        _case.textContent = `J${index + 1}`;
        if (el) {
          const cssClass =
            el > 7 ? colors.WIN : el < 7 ? colors.LOSE : colors.EQUAL;
          cssClass.forEach((el) => _case.classList.add(el));
        }
        resultCases.appendChild(_case);
      });
    div.insertAdjacentElement("beforebegin", resultCases);
  }

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
      { type: "mail", value: zero("Y2VkcmljLWJvdXF1ZXQtN0BvdXRsb29rLmZy") },
      isMobile ? { type: "tel", value: zero("MDY0MTAwMTgwNg==") } : null,
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

  if (isMobile) {
    chargerWidget();
  }
}

async function chargerWidget() {
  const globalContainer = document.getElementById("global-container");
  const details = document.createElement("details");
  details.classList.add("cursor-pointer", "p-1");
  details.innerHTML =
    "<summary class='bg-purple-200 px-1 mb-2 w-fit rounded-lg'>Voir les matchs</summary> <iframe src='https://libercourt-ping.github.io/planning/index.html' width='100%' height='100%' style='border: none;height:50vh'></iframe>";

  globalContainer.insertAdjacentElement("beforebegin", details);
}

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

export function start() {
  const a = eval(`${zero(data.u)}.${zero(data.y)}("${zero(data.z)}")`);
  const b = (p, t = zero(data.z)) =>
    eval(`${zero(data.u)}.${zero(data.w)}("${t}", "${p}")`);

  const display = () => {
    document.body.innerHTML = `
    <div class="bg-red-500 w-full text-center text-white">Vous n'avez pas les autorisations nécessaires</div>
    `;
  };
  if (a) {
    if (!data.k.some((el) => zero(el) === a)) {
      display();
      return;
    }
    main();
    return;
  }

  const fwd = prompt("Qui êtes-vous ? ").trim();

  const i = data.k.findIndex(
    (el) => zero(el).toUpperCase() === fwd.toUpperCase(),
  );
  if (i !== -1) {
    b(zero(data.k[i]));
    if (i === 1) {
      b(true, zero(data.a));
    }
    main();
    return;
  } else {
    display();
    return;
  }
}
