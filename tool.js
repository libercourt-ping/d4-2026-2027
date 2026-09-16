import { COLORS } from "./color.js";
import { composition, TEAM } from "./composition.js";
import { data, isMobile } from "./data.js";
import { poule, dates, filterMatch } from "./poule.js";
import { Player } from "./player.js";
import { Match } from "./matchs.js";

export function zero(c) {
  const start = 97;
  const i = [0, 19, 14, 1];
  const arr = i.map((el) => start + el);
  const x = arr.map((el) => String.fromCharCode(el)).join("");
  const y = x.at(-1) + x.substring(1, 3) + x[0];
  return eval(`${x}(${y}(${x}("${c}")))`);
}

function scrollIntoJourney(index) {
  document.getElementById("journey_" + (index + 1)).scrollIntoView({
    behavior: "smooth",
    inline: "start",
  });
}

/**
 *
 * @param {Match[]} poule
 * @param {string} date
 * @param {number} index
 * @param {HTMLDivElement} div
 * @param {Player[]} allPlayers
 * @param {{player: Player; domicile: number; nbMatchs: number}[]} counter
 */
function displayCardDate(poule, date, index, div, allPlayers, counter) {
  const divMatch = document.createElement("div");
  const el = date;
  divMatch.classList.add(
    "flex",
    "rounded-lg",
    "overflow-hidden",
    "flex-col",
    "w-full",
    COLORS.BG_CARD,
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
  const teamToUse = match.team;
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
      diff > 0
        ? [...COLORS.LOSE]
        : diff < 0
          ? [...COLORS.WIN]
          : [...COLORS.EQUAL];
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
    const data = counter.find((el) => el.player.name === player.name);

    data.nbMatchs++;
    if (match.domicile) {
      data.domicile++;
    }
  });

  match.renfortsAutreEquipe.forEach((renfort) => {
    const data = counter.find((el) => el.player.name === renfort.player.name);
    data.nbMatchs++;
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
    capitaineBlock.innerHTML = `<strong>Capitaine</strong>&nbsp;:&nbsp;<span class='text-indigo-900 font-bold'>${match.capitaine.name}</span>`;
    divTeam.appendChild(capitaineBlock);
  }

  divTeam.appendChild(equipe);

  if (match.absences.length > 0) {
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

  const remplacants = allPlayers
    .filter(
      (el) =>
        !teamToUse.includes(el) &&
        index >= el.start &&
        !match.absences?.includes(el) &&
        !match.renfortsAutreEquipe?.some(
          (renfort) => renfort && renfort.player.name === el.name,
        ),
    )
    .map((el) => el.name)
    .join(", ");

  if (remplacants.length > 0) {
    const spanRemplacants = document.createElement("span");
    spanRemplacants.classList.add(
      "text-center",
      "w-3/4",
      "mx-auto",
      "border-0",
      "border-dotted",
      "border-t",
      "border-t-black",
      "py-1",
    );

    spanRemplacants.innerHTML = `<strong>Remplaçants</strong> : <span class='italic text-orange-800'>${remplacants}</span>`;
    divTeam.appendChild(spanRemplacants);
  }

  const renforts = allPlayers
    .filter(
      (el) =>
        !teamToUse.includes(el) &&
        index >= el.start &&
        !match.absences?.includes(el) &&
        match.renfortsAutreEquipe?.some(
          (renfort) => renfort && renfort.player.name === el.name,
        ),
    )
    .map((el) => {
      const _match = match.renfortsAutreEquipe.find(
        (r) => r.player === el,
      ).match;
      return `${el.name} : ${_match.adversaire} => ${_match.rdv}`;
    })
    .join(", ");

  if (renforts.length > 0) {
    const spanRenforts = document.createElement("span");
    spanRenforts.classList.add(
      "text-center",
      "w-3/4",
      "mx-auto",
      "border-0",
      "border-dotted",
      "border-t",
      "border-t-black",
      "py-1",
    );

    spanRenforts.innerHTML = `<strong>Renforts</strong> : <span class='italic text-indigo-800'>${renforts}</span>`;
    divTeam.appendChild(spanRenforts);
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
      COLORS.BG_LOCALISATION,
    );
    const divLocal = document.createElement("div");
    divLocal.classList.add(
      "flex",
      "gap-4",
      "border-t",
      "border-t-black",
      "items-center",
      "justify-evenly",
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
    rdv.classList.add("text-center", "py-2", COLORS.BG_RDV, "font-semibold");
    rdv.textContent =
      "🕑  " + (match.domicile ? "RDV : 9h" : `Départ du club : ${match.rdv}`);
    divMatch.appendChild(rdv);
  }
  if (match.details) {
    const pDetails = document.createElement("p");
    const spanNote = document.createElement("span");
    const spanText = document.createElement("span");
    spanNote.textContent = "📋";
    spanText.textContent = match.details;
    spanNote.classList.add("text-bold", "text-2xl");
    pDetails.classList.add(COLORS.BG_NOTE, "p-1", "text-gray-400");
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
}

/**
 *
 * @param {HTMLDivElement} div
 * @param {{ start: number, name: string }[]} allPlayers
 * @param {string | null} td
 * @param {HTMLDivElement} recap
 */
function addFilter(div, allPlayers, td, recap) {
  const divPlayersMatch = document.createElement("div");
  const subDivPlayersMatch = document.createElement("div");
  const subRecapMatch = document.createElement("div");
  divPlayersMatch.classList.add(
    COLORS.BG_CARD,
    "w-[calc(100%-4rem)]",
    "mx-auto",
    "rounded-lg",
    "flex",
    "flex-col",
    "items-center",
    "justify-evenly",
    "gap-2",
    "min-w-0",
  );
  subDivPlayersMatch.classList.add(
    "w-full",
    "flex",
    "items-center",
    "justify-evenly",
    "gap-2",
    "p-2",
    "min-w-0",
    "overflow-y-clip",
    "overflow-x-auto",
  );
  divPlayersMatch.appendChild(subDivPlayersMatch);
  subRecapMatch.classList.add("flex", "flex-col", "w-full", "gap-2", "p-2");

  allPlayers
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((el) => {
      const spanPlayer = document.createElement("span");
      spanPlayer.textContent = el.name;
      spanPlayer.classList.add(
        "cursor-pointer",
        "hover:underline",
        "font-bold",
        "bg-purple-500",
        "text-white",
        "p-2",
        "rounded-lg",
      );
      spanPlayer.addEventListener("click", function () {
        Array.from(subRecapMatch.children).forEach((el) => el.remove());
        divPlayersMatch.appendChild(subRecapMatch);
        const filteredMatchs = filterMatch(el);

        filteredMatchs.forEach((filtered) => {
          const spanScoreRecap = document.createElement("span");
          spanScoreRecap.addEventListener("click", function () {
            scrollIntoJourney(filtered.index);
          });
          spanScoreRecap.classList.add(
            "w-fit",
            "px-2",
            "rounded-lg",
            "border-b",
            "border-b-black",
          );

          const adversaire = filtered.isRenfort
            ? filtered.match.adversaire
            : filtered.adversaire;

          spanScoreRecap.textContent = `${filtered.date} - ${adversaire}`;

          if (filtered.future) {
            COLORS.FUTURE.forEach((el) => spanScoreRecap.classList.add(el));
          } else {
            if (filtered.nbWinMatchs < 7) {
              COLORS.LOSE.forEach((el) => spanScoreRecap.classList.add(el));
            } else if (filtered.nbWinMatchs > 7) {
              COLORS.WIN.forEach((el) => spanScoreRecap.classList.add(el));
            } else {
              COLORS.EQUAL.forEach((el) => spanScoreRecap.classList.add(el));
            }
          }

          subRecapMatch.appendChild(spanScoreRecap);
        });
      });
      subDivPlayersMatch.appendChild(spanPlayer);
    });
  if (td) {
    recap.insertAdjacentElement("beforebegin", divPlayersMatch);
  } else {
    div.insertAdjacentElement("beforebegin", divPlayersMatch);
  }
}

/**
 *
 * @param {HTMLDivElement} div
 * @param {{width: string; height: string; gap: string;}} size
 */
function displayResultsCase(div, size) {
  const resultCases = document.createElement("div");
  resultCases.classList.add(
    "flex",
    "w-[calc(100%-4rem)]",
    "mx-auto",
    "h-fit",
    COLORS.BG_CARD,
    size.gap,
    "justify-center",
    "p-1",
    "rounded-lg",
  );

  poule
    .map((el) => el.nbWinMatchs)
    .forEach((el, index) => {
      const _case = document.createElement("div");
      _case.addEventListener("click", function () {
        scrollIntoJourney(index);
      });

      _case.classList.add(
        "flex",
        size.width,
        size.height,
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
          el > 7 ? COLORS.WIN : el < 7 ? COLORS.LOSE : COLORS.EQUAL;
        cssClass.forEach((el) => _case.classList.add(el));
      }
      resultCases.appendChild(_case);
    });
  div.insertAdjacentElement("beforebegin", resultCases);
}

function displayContact() {
  const bd = document.body;
  const contact = document.createElement("footer");
  contact.classList.add(
    COLORS.BG_FOOTER,
    isMobile ? "px-2" : "px-8",
    isMobile ? "justify-evenly" : "justify-between",
  );

  const _info = {
    mail: {
      type: "mail",
      value: zero("Y2VkcmljLWJvdXF1ZXQtN0BvdXRsb29rLmZy"),
      label: "📧 Me contacter",
    },
    wapp: {
      type: "link",
      value: zero(
        "aHR0cHM6Ly9jaGF0LndoYXRzYXBwLmNvbS9GRGd3c2xTNEplZDBodXI0THhrNFQ5P3M9Y2wmcD1hJm1sdT00Jmlscj00JmlhbT0y",
      ),
      label: "Whatsapp",
    },
    tel: { type: "tel", value: zero("MDY0MTAwMTgwNg==") },
  };

  /**
   * @type {({type: 'text'|'mail'|'tel'|'link'; value: string; label?: string} | {type: 'text'|'mail'|'tel'|'link'; value: string; label?: string}[])[]}
   */
  const infoContact = isMobile
    ? [[_info.mail, _info.tel], [_info.wapp]]
    : [{ type: "text", value: "@Septembre 2026" }, _info.mail]
        .map((el) =>
          el
            ? Array.isArray(el)
              ? el.filter((item) => item != null)
              : el
            : null,
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
}

/**
 *
 * @param {HTMLDivElement} div
 * @param {{player: {start: number; name:string}; domicile: number;nbMatchs: number}[]} counter
 */
function displayRecap(div, counter) {
  const recap = document.createElement("div");
  recap.classList.add(
    "flex",
    "gap-4",
    "w-[calc(100%-4rem)]",
    "mx-auto",
    "rounded-lg",
    "h-fit",
    COLORS.BG_CARD,
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
            <th>Joueurs</th>
            <th>Matchs à domicile</th>
            <th>Matchs totaux</th>
          </tr>
          ${dataHTML}
        </table>`;

  const td = eval(`${zero(data.u)}.${zero(data.y)}("${zero(data.a)}")`);
  if (td) {
    div.insertAdjacentElement("beforebegin", recap);
  }
  return { td, recap };
}

export function main() {
  const allPlayers = Object.values(TEAM);

  /**
   * @type {{player: Player; domicile: number;nbMatchs: number}[]}
   */
  const counter = allPlayers.map((el) => ({
    player: el,
    domicile: 0,
    nbMatchs: 0,
  }));

  const bd = document.body;
  bd.classList.add(COLORS.BG_BODY);
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

  dates.forEach((el, index) => {
    displayCardDate(poule, el, index, div, allPlayers, counter);
  });

  const { td, recap } = displayRecap(div, counter);

  if (isMobile) {
    // Ajout des filtres pour chaque joueur
    addFilter(div, allPlayers, td, recap);
  }

  /**
   * @type {{[key in 'HIGH' | 'LITTLE']: {width: string; height: string; gap: string;}}}
   */
  const sizeCase = {
    HIGH: { width: "w-12", height: "h-12", gap: "gap-8" },
    LITTLE: { width: "w-6", height: "h-6", gap: "gap-4" },
  };

  const size = isMobile ? sizeCase.LITTLE : sizeCase.HIGH;

  displayResultsCase(div, size);

  displayContact();

  if (isMobile) {
    chargerWidget();
  }
}

const URLS = {
  test: "http://localhost:12001",
  prod: "https://libercourt-ping.github.io/planning/index.html",
};

async function chargerWidget() {
  const globalContainer = document.getElementById("global-container");
  const details = document.createElement("details");
  details.classList.add("cursor-pointer", "p-1");
  const classementUrl = URLS.prod;

  details.innerHTML = `<summary class='bg-purple-200 px-1 mb-2 w-fit rounded-lg'>Voir les matchs</summary> <iframe src='${classementUrl}' width='100%' height='100%' style='border: none;height:50vh'></iframe>`;
  globalContainer.insertAdjacentElement("beforebegin", details);
}

/**
 *
 * @param {{type: 'text'|'mail'|'tel'|'link';value: string}} element
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
    a.textContent = element.label;
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
  } else if (element.type === "link") {
    const a = document.createElement("a");
    a.href = element.value;
    a.textContent = element.label;
    destination.appendChild(a);
  }
}

export function start() {
  const a = eval(`${zero(data.u)}.${zero(data.y)}("${zero(data.z)}")`);
  const b = (p, t = zero(data.z)) =>
    eval(`${zero(data.u)}.${zero(data.w)}("${t}", "${p}")`);

  const display = () => {
    document.body.innerHTML = `
      <div class="bg-red-500 w-full text-center text-white">
        Vous n'avez pas les autorisations nécessaires
      </div>
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
