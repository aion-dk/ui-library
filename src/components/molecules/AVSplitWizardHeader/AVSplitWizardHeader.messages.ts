import type { DefineLocaleMessage } from "@/types";

const translations: DefineLocaleMessage = {
  ar: {
    ballot: {
      adding: "{n} الخطوة 1: إضافة اختيار ورقة الاقتراع",
      editing: "{n} الخطوة 1: تعديل اختيار بطاقة الاقتراع",
      can_assign_ballots: "يمكنك تعيين اختياراتك حتى {n} أوراق اقتراع.",
      can_assign_description:
        "بنفس الاختيارات أو يمكنك أن تقرر توزيعها. الخطوة 1: اختر الخيارات التي تريدها. الخطوة 2: حدد عدد بطاقات الاقتراع التي يجب تسجيلها وتكرارها حتى تنتهي من استخدام جميع بطاقات الاقتراع. الخطوة 3: تحقق من اختياراتك وقم بالتصويت {n} يمكنك اختيار إرسال الكل",
    },
    assign: {
      header: "{n} الخطوة 2: تخصيص عدد من أوراق الاقتراع لاختيار الاقتراع",
      header_edit_mode: "{n} الخطوة 2: تعديل عدد البطاقات المخصصة لاختيار الاقتراع",
    },
    overview: {
      header: "الخطوة 3: نظرة عامة على اختيارات الاقتراع",
    },
  },
  ca: {
    ballot: {
      adding: "Pas 1: tria la teva selecció per a la votació {n}",
      editing: "Pas 1: edita la teva elecció per a la votació {n}",
      can_assign_ballots: "Pots seleccionar fins a {n} opcions.",
      can_assign_description:
        "Pots assignar totes les teves {n} votacions a la mateixa selecció o distribuir-les. Pas 1: Tria les opcions dessitjades. Pas 2: Tria el número de paperetes on s'aplicarà la mateixa selecció i repeteix fins que hagis utilitzat totes les teves votacions. Pas 3: Revisa les teves seleccions i emet el teu vot.",
    },
    assign: {
      header: "Pas 2: assigna un nom de votacions a la selecció de la papereta {n}",
      header_edit_mode:
        "Paso 2: Modifica el nom de votacions assignades a la selecció de la papereta {n}",
    },
    overview: {
      header: "Paso 3: Revisa les teves seleccions",
    },
  },
  da: {
    ballot: {
      adding: "Trin 1: Angiv dit valg for valgkombination {n}",
      editing: "Trin 1: Rediger dit valg for valgkombination {n}",
      can_assign_ballots: "Du kan tildele op til {n} stemmesedler.",
      can_assign_description:
        "Du kan vælge at indsende alle {n} stemmesedler med de samme valg, eller du kan vælge at fordele dem. Trin 1: Vælg de valgmuligheder, du ønsker. Trin 2: Beslut dig for hvor mange stemmesedler denne kombination af valgmuligheder skal registreres på. Gentag indtil du har tildelt alle dine stemmesedler. Trin 3: Kontroller dine valg og afgiv din stemme.",
    },
    assign: {
      header: "Trin 2: Tildel antal stemmesedler til valgkombination {n}",
      header_edit_mode:
        "Trin 2: Rediger antal af stemmesedler tildelt til valgmulighedskombination {n}",
    },
    overview: {
      header: "Trin 3: Oversigt over valgkombinationer",
    },
  },
  de: {
    ballot: {
      adding: "Schritt 1: Hinzufügen der Stimmzettelauswahl {n}",
      editing: "Schritt 1: Bearbeiten der Stimmzettelauswahl {n}",
      can_assign_ballots: "Sie können Ihre Wahl bis zu {n} stimmzettel zuordnen.",
      can_assign_description:
        "Sie können wählen, ob Sie alle {n} Stimmzettel mit den gleichen Wahlmöglichkeiten abgeben oder ob Sie sie verteilen möchten. Schritt 1: Wählen Sie die gewünschten Optionen. Schritt 2: Entscheiden Sie, wie viele Stimmzettel für diese Option erfasst werden sollen und wiederholen Sie den Vorgang, bis Sie alle Stimmzettel verwendet haben. Schritt 3: Überprüfen Sie Ihre Wahl und geben Sie Ihre Stimme ab",
    },
    assign: {
      header: "Schritt 2: Zuweisung der Anzahl der Stimmzettel zur Wahl {n}",
      header_edit_mode:
        "Schritt 2: Bearbeiten Sie die zugewiesene Anzahl an Stimmzetteln für die Stimmzettelauswahl {n}",
    },
    overview: {
      header: "Schritt 3: Übersicht über die Auswahl der Stimmzettel",
    },
  },
  en: {
    ballot: {
      adding: "Step 1: Make your choice for ballot selection {n}",
      editing: "Step 1: Edit your choice for ballot selection {n}",
      can_assign_ballots: "You can assign your choices up to {n} ballots.",
      can_assign_description:
        "You can choose to submit all {n} ballots with the same choices or you can decide to distribute them. Step 1: Choose the options you want. Step 2: Decide on how many ballots should this option be recorded and repeat until you have used all of ballots. Step 3: Check your choices and cast the vote.",
    },
    assign: {
      header: "Step 2: Assign number of ballots to ballot selection {n}",
      header_edit_mode: "Step 2: Edit assigned number of ballots to ballot selection {n}",
    },
    overview: {
      header: "Step 3: Overview of ballot selections",
    },
  },
  es: {
    ballot: {
      adding: "Paso 1: Agregando selección de boleta Nº {n}",
      editing: "Paso 1: Editando selección de boleta Nº {n}",
      can_assign_ballots: "Puedes asignar hasta {n} boletas divididas entre tus opciones.",
      can_assign_description:
        "Puedes elegir aplicar todas tus {n} boletas a una sola selección o distribuirlas. Paso 1: Elige las opciones que desees. Step 2: Elige cuántas boletas deseas aplicarle a esa selección y repite hasta que hayas utilizado todas tus boletas. Paso 3: Revisa tus selecciones y emite tu voto.",
    },
    assign: {
      header: "Paso 2: Elige la cantidad de boletas que deseas asignar a la selección Nº {n}",
      header_edit_mode: "Paso 2: Modifica la cantidad de boletas asignadas a la selección Nº {n}",
    },
    overview: {
      header: "Paso 3: Revisión de selecciones de boletas",
    },
  },
  fi: {
    ballot: {
      adding: "Vaihe 1: Äänestyslipun valinnan lisääminen {n}",
      editing: "Vaihe 1: Äänestyslipun valinnan muokkaaminen {n}",
      can_assign_ballots: "Voit valita enintään {n} äänestyslippua.",
      can_assign_description:
        "Voit valita, lähetätkö kaikki {n} äänestysliput, joissa on samat vaihtoehdot, tai voit päättää jakaa ne. Vaihe 1: Valitse haluamasi vaihtoehdot. Vaihe 2: Päätä, kuinka monta äänestyslippua tämä vaihtoehto kirjataan, ja toista, kunnes olet käyttänyt kaikki äänestysliput. Vaihe 3: Tarkista vaihtoehdot ja äänestä.",
    },
    assign: {
      header: "Vaihe 2: Määritä äänestyslippujen lukumäärä äänestyslippujen valintaan {n}",
      header_edit_mode:
        "Vaihe 2: Muokkaa äänestyslippujen valinnalle määritettyä äänestyslippujen määrää {n}",
    },
    overview: {
      header: "Vaihe 3: Yleiskatsaus äänestyslippujen valintaan",
    },
  },
  fr: {
    ballot: {
      adding: "Étape 1: Ajout de la sélection des bulletins de vote {n}",
      editing: "Étape 1: Modification de la sélection des bulletins {n}",
      can_assign_ballots: "Vous pouvez attribuer vos choix jusqu'à {n} bulletins de vote.",
      can_assign_description:
        "Vous pouvez choisir de soumettre tous les {n} bulletins de vote avec les mêmes choix ou vous pouvez décider de les distribuer. Étape 1: Choisissez les options que vous souhaitez. Étape 2 : Décidez du nombre de bulletins à enregistrer pour cette option et répétez l'opération jusqu'à ce que vous ayez utilisé tous les bulletins. Étape 3 : Vérifiez vos choix et procédez au vote.",
    },
    assign: {
      header: "Étape 2: Attribuer le nombre de bulletins à la sélection de bulletins {n}",
      header_edit_mode:
        "Étape 2: Modifier le nombre de bulletins de vote attribués à la sélection de bulletins {n}",
    },
    overview: {
      header: "Étape 3: Aperçu des sélections de bulletins de vote",
    },
  },
  is: {
    ballot: {
      adding: "Skref 1: Bætir við kjörseðli {n}",
      editing: "Skref 1: Breyting á kjörseðli {n}",
      can_assign_ballots: "Þú getur úthlutað valkostum þínum allt að {n} atkvæðaseðlum.",
      can_assign_description:
        "Þú getur valið að senda inn alla {n} atkvæðaseðla með sama vali eða þú getur ákveðið að dreifa þeim. Skref 1: Veldu valkostina sem þú vilt. Skref 2: Ákveddu hversu marga atkvæðaseðla ætti að skrá þennan valmöguleika og endurtaktu þar til þú hefur notað alla atkvæðaseðla. Skref 3: Athugaðu val þitt og greiddu atkvæði.",
    },
    assign: {
      header: "Skref 2: Úthlutaðu fjölda atkvæða til valseðla {n}",
      header_edit_mode: "Skref 2: Breyttu úthlutaðum fjölda atkvæða í kjörseðlaval {n}",
    },
    overview: {
      header: "Skref 3: Yfirlit yfir val á kjörseðlum",
    },
  },
  nl: {
    ballot: {
      adding: "Stap 1: Stembiljetselectie toevoegen {n}",
      editing: "Stap 1: stembiljetselectie bewerken {n}",
      can_assign_ballots: "U kunt uw keuzes toewijzen aan maximaal {n} stembiljetten.",
      can_assign_description:
        "U kunt ervoor kiezen om alle {n} stembiljetten met dezelfde keuzes in te dienen of u kunt besluiten ze te verdelen. Stap 1: Kies de gewenste opties. Stap 2: Bepaal hoeveel stembiljetten deze optie moet worden geregistreerd en herhaal dit totdat u alle stembiljetten hebt gebruikt. Stap 3: Controleer uw keuzes en breng de stem uit.",
    },
    assign: {
      header: "Stap 2: Wijs aantal stembiljetten toe aan stembiljetselectie {n}",
      header_edit_mode:
        "Stap 2: Wijzig het toegewezen aantal stembiljetten in de stembiljetselectie {n}",
    },
    overview: {
      header: "Stap 3: Overzicht stembiljetselecties",
    },
  },
  pl: {
    ballot: {
      adding: "Krok 1: Dokonaj wyboru dla wyboru karty do głosowania {n}",
      editing: "Krok 1: Edytuj swój wybór dla wyboru karty do głosowania {n}",
      can_assign_ballots: "Możesz przypisać swoje wybory do {n} kart.",
      can_assign_description:
        "Możesz zdecydować się złożyć wszystkie {n} karty z tymi samymi wyborami lub rozdzielić je. Krok 1: Wybierz opcje, które chcesz. Krok 2: Zdecyduj, ile kart powinno zostać zarejestrowanych dla tej opcji i powtórz, aż wykorzystasz wszystkie karty. Krok 3: Sprawdź swoje wybory i oddaj głos.",
    },
    assign: {
      header: "Krok 2: Przypisz liczbę kart do wyboru karty do głosowania {n}",
      header_edit_mode: "Krok 2: Edytuj przypisaną liczbę kart do wyboru karty do głosowania {n}",
    },
    overview: {
      header: "Krok 3: Przegląd wyboru karty do głosowania",
    },
  },
  pt: {
    ballot: {
      adding: "Passo 1: Faça a sua escolha para a seleção de voto {n}",
      editing: "Passo 1: Editar a sua escolha para seleção do boletim de voto {n}",
      can_assign_ballots: "Pode atribuir as suas escolhas até {n} boletins de voto.",
      can_assign_ballots_pos: "",
      can_assign_description:
        "Pode optar por apresentar todos os {n} boletins com as mesmas escolhas ou pode decidir distribuí-los. Passo 1: Escolha as opções que pretende. Passo 2: Decida quantos boletins de voto devem ser registados para esta opção e repita a operação até ter utilizado todos os boletins. Passo 3: Verifique as suas escolhas e vote.",
    },
    assign: {
      header: "Passo 2: Atribuir número de boletins à seleção de boletins {n}",
      header_edit_mode: "Passo 2: Editar o número de boletins atribuído à seleção de votos {n}",
    },
    overview: {
      header: "Passo 3: Visão geral das selecções de votos",
    },
  },
  ro: {
    ballot: {
      adding: "Pasul 1: Alegeți opțiunea pentru selecția buletinului {n}",
      editing: "Pasul 1: Editați opțiunea pentru selecția buletinului {n}",
      can_assign_ballots: "Puteți asigna alegerile dvs. până la {n} buletine.",
      can_assign_description:
        "Puteți alege să trimiteți toate {n} buletinele cu aceleași alegeri sau puteți decide să le distribuiți. Pasul 1: Alegeți opțiunile dorite. Pasul 2: Decideți câte buletine ar trebui să fie înregistrate pentru această opțiune și repetați până când ați folosit toate buletinele. Pasul 3: Verificați alegerile dvs. și votați.",
    },
    assign: {
      header: "Pasul 2: Atribuiți numărul de buletine pentru selecția buletinului {n}",
      header_edit_mode: "Pasul 2: Editați numărul de buletine atribuite selecției buletinului {n}",
    },
    overview: {
      header: "Pasul 3: Prezentare generală a selecțiilor buletinului",
    },
  },
  ru: {
    ballot: {
      adding: "Шаг 1: Добавление выбора бюллетеня {n}",
      editing: "Шаг 1: Редактирование выбора бюллетеня {n}",
      can_assign_ballots: "Вы можете назначить свой выбор до {n} бюллетеней.",
      can_assign_description:
        "Вы можете выбрать подачу всех {n} бюллетеней с одинаковыми вариантами выбора или распределить их. Шаг 1: Выберите нужные вам варианты. Шаг 2: Решите, в скольких бюллетенях должен быть записан этот вариант, и повторяйте, пока не используете все бюллетени. Шаг 3: Проверьте свой выбор и проголосуйте.",
    },
    assign: {
      header: "Шаг 2: Назначить количество бюллетеней для выбора {n}",
      header_edit_mode:
        "Шаг 2: Изменить назначенное количество бюллетеней для выбора бюллетеней {n}",
    },
    overview: {
      header: "Шаг 3: Обзор выбранных бюллетеней",
    },
  },
  sv: {
    ballot: {
      adding: "Steg 1: Lägg till val av röstsedel {n}",
      editing: "Steg 1: Redigera val av röstsedel {n}",
      can_assign_ballots: "Du kan tilldela dina val upp till {n} röstsedlar.",
      can_assign_description:
        "Du kan välja att skicka in alla {n} röstsedlar med samma val eller att dela upp dem. Steg 1: Välj de alternativ du vill ha. Steg 2: Bestäm hur många röstsedlar som ska registreras för detta alternativ och upprepa tills du har använt alla röstsedlar. Steg 3: Kontrollera dina val och rösta.",
    },
    assign: {
      header: "Steg 2: Tilldela antalet valsedlar till val av valsedlar {n}",
      header_edit_mode: "Steg 2: Redigera tilldelat antal röstsedlar för val av röstsedlar {n}",
    },
    overview: {
      header: "Steg 3: Översikt över valen av röstsedlar",
    },
  },
};

export default translations;
