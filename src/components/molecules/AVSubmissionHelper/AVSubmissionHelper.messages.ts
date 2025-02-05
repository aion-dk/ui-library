import type { DefineLocaleMessage } from "@/types";

const translations: DefineLocaleMessage = {
  ar: {
    select_exactly: "حدد خيارات {min_marks}.",
    select_multiple: "حدد من بين {min_marks} و {max_marks} خياري.",
    select_multiple_with_exclusives:
      "حدد من بين {min_marks} و {max_marks} خياري. أو حدد خيارًا واحدًا (1) حصريًا.",
    select_single: "حدد خيارًا واحدًا (1).",
    selected: "المحدد: <b>{selected}</b>",
    your_vote_weight: "قدره ترجيح صوتك {weight}",
    exceeded_list_limit:
      "لقد تجاوز اختيارك الحد الأقصى لعدد الخيارات التي يمكن أن تكون في قائمة {list_name}. يرجى تحديد الحد الأقصى لعدد {max_list_marks} من الخيارات في هذه القائمة",
    errors: {
      too_many: "تم تحديد عدد كبير جدًا من الخيارات",
      blank: "فارغ حصري ولا يمكن دمجه مع خيارات أخرى.",
      write_in_required: 'أنت مطالب بتحديد طرف على الأقل عند تحديد "كتابة".',
      write_in_too_long: "الكتابة في القيمة طويلة جدًا. حاول تقليل طوله.",
      exclusive: "لا يمكن الجمع بين الخيارات الحصرية وخيارات أخرى.",
      cross_party_voting: "اختيارك تضمن أكثر من قائمة. الرجاء الاختيار فقط ضمن قائمة واحدة",
    },
  },
  ca: {
    select_exactly: "Seleccionar {min_marks} opcions.",
    select_multiple: "Selecciona entre {min_marks} i {max_marks} opcions.",
    select_multiple_with_exclusives:
      "Selecciona entre {min_marks} i {max_marks} opcions. O selecciona una (1) opció exclusiva.",
    select_single: "Selecciona 1 (una) opció.",
    selected: "Seleccionades: <b>{selected}</b>",
    your_vote_weight: "El seu vot té un pes de {weight}",
    errors: {
      too_many: "S'han seleccionat massa opcions.",
      blank: "El vot en blanc és exclusiu i no es pot combinar amb altres opcions.",
      write_in_required: "S'ha d'especificar almenys una opció quan se selecciona «Opció lliure».",
      write_in_too_long: "El text és massa llarg. Intenta reduir-ne la longitud.",
      exclusive: "Les opcions exclusives no es poden combinar amb altres opcions.",
      cross_party_voting:
        "La teva selecció inclou més d'una lllista. Seleccionau només opcions dins d'una única lllista.",
      below_list_limit:
        "La teva selecció està per sota de la quantitat mínima d'opcions que s'han poden triar a la lllista \"{list_name}\". Selecciona un mínim de ({min_list_marks}) opcions d'aquaquesta lllista.",
      exceeded_list_limit:
        "La teva selecció ha superat la quantitat màxima d'opcions que es poden triar a la lllista {list_name}. Selecciona un màxim de ({max_list_marks}) opcions d'aquaquesta lllista.",
    },
  },
  da: {
    select_exactly: "Sæt {min_marks} kryds(er).",
    select_multiple: "Sæt kryds ved {min_marks} til {max_marks} valgmuligheder",
    select_multiple_with_exclusives:
      "Sæt kryds ved {min_marks} til {max_marks} valgmuligheder. Eller vælg en (1) eksklusiv valgmulighed.",
    select_single: "Sæt ét (1) kryds.",
    selected: "Krydser: <b>{selected}</b>",
    your_vote_weight: "Du har en stemmevægt på {weight}",
    errors: {
      too_many: "Du har sat for mange krydser.",
      blank: "Blank stemme kan ikke kombineres med andre valgmuligheder.",
      write_in_required: "Du skal udfylde skrivestemmen når den er valgt.",
      write_in_too_long: "Skrivestemme er for lang. Prøv at reducere længden på teksten.",
      exclusive: "Ekslusive valgmuligheder kan ikke kombineres med andre.",
      exceeded_list_limit:
        "Dit valg overskred det maksimale antal muligheder, der kan være på listen {list_name}. Vælg maks. {max_list_marks} muligheder på denne liste",
      cross_party_voting:
        "Dine valg omfattede mere end én liste. Vælg venligst kun inden for en enkelt liste.",
    },
  },
  de: {
    select_exactly: "Sie können {min_marks} Stimme(n) vergeben.",
    select_multiple: "Sie können {min_marks} bis {max_marks} Stimmen vergeben.",
    select_multiple_with_exclusives:
      "Sie können {min_marks} bis {max_marks} Stimmen vergeben. Oder wählen Sie eine (1) exklusive Option.",
    select_single: "Vergeben Sie eine Stimme.",
    selected: "Gewählt: <b>{selected}</b>",
    your_vote_weight: "Ihre Stimme hat ein Gewicht von {weight}",
    errors: {
      too_many: "Zu viele Optionen gewählt.",
      blank: "Blank ist exklusiv und kann nicht mit anderen Optionen kombiniert werden.",
      write_in_required:
        "Sie müssen mindestens eine Partei angeben, wenn 'Write in' ausgewählt ist.",
      write_in_too_long:
        "Der Einschreibewert ist zu lang. Versuchen Sie, seine Länge zu reduzieren.",
      exclusive: "Ungültige Kombination von Optionen.",
      exceeded_list_limit:
        "Ihre Auswahl hat die maximale Anzahl an Optionen überschritten, die in der Liste {list_name} enthalten sein können. Bitte wählen Sie für diese Liste maximal {max_list_marks} Optionen aus",
      cross_party_voting:
        "Ihre Auswahl umfasste mehr als eine Liste. Bitte wählen Sie nur innerhalb einer einzigen Liste aus.",
    },
  },
  en: {
    select_exactly: "Select {min_marks} options.",
    select_multiple: "Select between {min_marks} and {max_marks} options.",
    select_multiple_with_exclusives:
      "Select between {min_marks} and {max_marks} options. Or select one (1) exclusive option.",
    select_single: "Select one (1) option.",
    selected: "Selected: <b>{selected}</b>",
    your_vote_weight: "Your vote has a weight of {weight}",
    errors: {
      too_many: "Too many options selected.",
      blank: "Blank is exclusive and cannot be combined with other options.",
      write_in_required:
        "You are required to specify at least a party when 'Write in' is selected.",
      write_in_too_long: "The write in value is too long. Try to reduce its length.",
      exceeded_list_limit:
        "Your selection exceeded the maximum amount of options that can be on {list_name} list. Please select max {max_list_marks} options per this list",
      exclusive: "Exclusive options cannot be combined with other options.",
      cross_party_voting:
        "Your selection included more than one list. Please select only within a single list.",
    },
  },
  es: {
    select_exactly: "Seleccionar {min_marks} opciones.",
    select_multiple: "Seleccione entre {min_marks} y {max_marks} opciones.",
    select_multiple_with_exclusives:
      "Seleccione entre {min_marks} y {max_marks} opciones. O seleccione una (1) opción exclusiva.",
    select_single: "Seleccione 1 (una) opción.",
    selected: "Seleccionadas: <b>{selected}</b>",
    your_vote_weight: "Su voto tiene un peso de {weight}",
    errors: {
      too_many: "Demasiadas opciones seleccionadas.",
      exceeded_list_limit:
        "Su selección superó la cantidad máxima de opciones que pueden estar en la lista {list_name}. Seleccione un máximo de {max_list_marks} opciones según esta lista",
      blank: "El voto en blanco es exclusivo y no se puede combinar con otras opciones.",
      write_in_required:
        "Es necesario especificar al menos un partido cuando se selecciona «Añadir opción».",
      write_in_too_long: "El valor insertado es demasiado largo. Intente reducir su longitud.",
      exclusive: "Las opciones exclusivas no pueden ser combinadas con otras opciones.",
      cross_party_voting:
        "Su selección incluye más de un partido político. Porfavor seleccione dentro de un mismo partido.",
    },
  },
  fi: {
    select_exactly: "Valitse {min_marks} vaihtoehtoa.",
    select_multiple: "Valitse {min_marks} ja {max_marks} vaihtoehdon väliltä.",
    select_multiple_with_exclusives:
      "Valitse {min_marks} ja {max_marks} vaihtoehdon väliltä. Tai valitse yksi (1) eksklusiivinen vaihtoehto.",
    select_single: "Valitse yksi (1) vaihtoehto.",
    selected: "Valittu: <b>{selected}</b>",
    your_vote_weight: "Äänesi painoarvo on {weight}",
    errors: {
      exceeded_list_limit:
        "Valintasi ylitti luettelossa {list_name} olevien vaihtoehtojen enimmäismäärän. Valitse enintään {max_list_marks} vaihtoehtoa tälle luettelolle",
      too_many: "Liian monta valittua vaihtoehtoa.",
      blank: "Tyhjä on eksklusiivinen, eikä sitä voi yhdistää muihin vaihtoehtoihin.",
      write_in_required: "Sinun on määritettävä vähintään osapuoli, kun Kirjoita on valittuna.",
      write_in_too_long: "Kirjoitusarvo on liian pitkä. Yritä lyhentää sen pituutta.",
      exclusive: "Virheellinen vaihtoehtojen yhdistelmä.",
      cross_party_voting:
        "Valintasi sisälsi useamman kuin yhden luettelon. Valitse vain yhdestä luettelosta.",
    },
  },
  fr: {
    select_exactly: "Sélectionnez les options de {min_marks}.",
    select_multiple: "Sélectionnez entre les options {min_marks} et {max_marks}.",
    select_multiple_with_exclusives:
      "Sélectionnez entre les options {min_marks} et {max_marks}. Ou sélectionnez une (1) option exclusive.",
    select_single: "Sélectionnez une (1) option.",
    selected: "Sélection: <b>{selected}</b>",
    your_vote_weight: "Votre vote a un poids de {weight}",
    errors: {
      exceeded_list_limit:
        "Votre sélection a dépassé le nombre maximum d'options pouvant figurer sur la liste {list_name}. Veuillez sélectionner un maximum de {max_list_marks} options dans cette liste.",
      too_many: "Trop d'options sélectionnées.",
      blank: "Un blanc est exclusif et ne peut être combiné avec d'autres options.",
      write_in_required:
        "Vous devez spécifier au moins un parti lorsque «Écriture» est sélectionné.",
      write_in_too_long: "La valeur d'écriture est trop longue. Essayez de réduire sa longueur.",
      exclusive: "Les options exclusives ne peuvent être combinées avec d'autres options.",
      cross_party_voting:
        "Votre sélection comprenait plusieurs listes. Veuillez sélectionner uniquement dans une seule liste.",
    },
  },
  is: {
    select_exactly: "Veldu {min_marks} valkosti.",
    select_multiple: "Veldu á milli {min_marks} og {max_marks} valkosta.",
    select_multiple_with_exclusives:
      "Veldu á milli {min_marks} og {max_marks} valkosta. Eða veldu einn (1) einkarétt.",
    select_single: "Veldu einn (1) valmöguleika.",
    selected: "Valið: <b>{selected}</b>",
    your_vote_weight: "Vægi atkvæðis þíns er {weight}",
    errors: {
      exceeded_list_limit:
        "Val þitt fór yfir hámarksfjölda valkosta sem geta verið á listanum {list_name}. Vinsamlegast veldu hámark {max_list_marks} valkosti á þessum lista",
      too_many: "Of margir valkostir valdir.",
      blank: "Blank er einkarétt og ekki hægt að sameina það með öðrum valkostum.",
      write_in_required:
        "Þú þarft að tilgreina að minnsta kosti aðila þegar 'Skrifa inn' er valið.",
      write_in_too_long: "Innritunin er of löng. Reyndu að minnka lengdina.",
      exclusive: "Ekki er hægt að sameina einkavalkosti við aðra valkosti.",
      cross_party_voting:
        "Val þitt innihélt fleiri en einn lista. Vinsamlegast veldu aðeins innan eins lista.",
    },
  },
  nl: {
    select_exactly: "Selecteer {min_marks} opties.",
    select_multiple: "Selecteer tussen {min_marks} en {max_marks} opties.",
    select_multiple_with_exclusives:
      "Selecteer tussen {min_marks} en {max_marks} opties. Of selecteer één (1) exclusieve optie.",
    select_single: "Selecteer één (1) optie.",
    selected: "Geselecteerd: <b>{selected}</b>",
    your_vote_weight: "Uw stem heeft een gewicht van {weight}",
    errors: {
      exceeded_list_limit:
        "Je selectie heeft het maximale aantal opties overschreden dat op de lijst {list_name} kan staan. Selecteer maximaal {max_list_marks} opties per deze lijst",
      too_many: "Teveel opties geselecteerd.",
      blank: "Blanco is exclusief en kan niet worden gecombineerd met andere opties.",
      write_in_required: "U moet ten minste één partij opgeven wanneer 'Write-in' is geselecteerd.",
      write_in_too_long: "De ‘write-in’ waarde is te lang. Probeer deze korter te maken.",
      exclusive: "Ongeldige combinatie van opties.",
      cross_party_voting:
        "Uw selectie omvatte meer dan één lijst. Selecteer alleen binnen één lijst.",
    },
  },
  pl: {
    select_exactly: "Wybierz {min_marks} opcje.",
    select_multiple: "Wybierz między {min_marks} a {max_marks} opcjami.",
    select_multiple_with_exclusives:
      "Wybierz między {min_marks} a {max_marks} opcjami. Lub wybierz jedną (1) wyłączną opcję.",
    select_single: "Wybierz jedną (1) opcję.",
    selected: "Wybrane: <b>{selected}</b>",
    your_vote_weight: "Twój głos ma wagę {weight}",
    errors: {
      exceeded_list_limit:
        "Twój wybór przekroczył maksymalną liczbę opcji, które mogą znajdować się na liście {list_name}. Wybierz maksymalnie {max_list_marks} opcji z tej listy",
      too_many: "Zbyt wiele wybranych opcji.",
      blank: "Puste jest wyłączne i nie może być połączone z innymi opcjami.",
      write_in_required:
        "Musisz określić co najmniej partię, gdy jest wybrana opcja 'Napisz własną'.",
      write_in_too_long: "Wartość wprowadzenia jest za długa. Spróbuj skrócić jej długość.",
      exclusive: "Opcje wyłączne nie mogą być połączone z innymi opcjami.",
      cross_party_voting:
        "Twój wybór obejmował więcej niż jedną listę. Wybierz tylko z jednej listy.",
    },
  },
  pt: {
    select_exactly: "Selecionar {min_marks} opções.",
    select_multiple: "Selecionar entre {min_marks} e {max_marks} opções.",
    select_multiple_with_exclusives:
      "Seleccione entre {min_marks} e {max_marks}. Ou seleccione uma (1) opção exclusiva.",
    select_single: "Seleccione uma (1) opção.",
    selected: "Selecionada: <b>{selected}</b>",
    your_vote_weight: "O seu voto tem um peso de {weight}",
    errors: {
      too_many: "Demasiadas opções seleccionadas.",
      blank: "O voto em branco é exclusivo e não pode ser combinado com outras opções.",
      write_in_required:
        'É necessário especificar pelo menos um grupo quando a opção "Escrever em" está selecionada.',
      write_in_too_long: "O valor introduzido é demasiado longo. Tente reduzir o seu comprimento.",
      exclusive: "As opções exclusivas não podem ser combinadas com outras opções.",
      cross_party_voting:
        "A sua seleção incluiu mais do que uma lista. Por favor, seleccione apenas dentro de uma única lista.",
      exceeded_list_limit:
        "A sua seleção excedeu o número máximo de opções que podem constar da lista {list_name}. Por favor, seleccione um máximo de ({max_list_marks}) opções desta lista.",
    },
  },
  ro: {
    select_exactly: "Selectați {min_marks} opțiuni.",
    select_multiple: "Selectați între {min_marks} și {max_marks} opțiuni.",
    select_multiple_with_exclusives:
      "Selectați între {min_marks} și {max_marks} opțiuni. Sau selectați o (1) opțiune exclusivă.",
    select_single: "Selectați una (1) opțiune.",
    selected: "Selectat: <b>{selected}</b>",
    your_vote_weight: "Votul dvs. are o greutate de {weight}",
    errors: {
      exceeded_list_limit:
        "Selecția dvs. a depășit numărul maxim de opțiuni care pot fi în lista {list_name}. Selectați maximum {max_list_marks} opțiuni din această listă",
      too_many: "Prea multe opțiuni selectate.",
      blank: "Golul este exclusiv și nu poate fi combinat cu alte opțiuni.",
      write_in_required:
        "Trebuie să specificați cel puțin un partid când este selectată opțiunea „Scrieți în”.",
      write_in_too_long:
        "Valoarea introdusă pentru scriere este prea lungă. Încercați să o scurtați.",
      exclusive: "Opțiunile exclusiv nu pot fi combinate cu alte opțiuni.",
      cross_party_voting:
        "Selecția dvs. a inclus mai mult de o listă. Vă rugăm să selectați doar dintr-o singură listă.",
    },
  },
  ru: {
    select_exactly: "Выберите варианты {min_marks}.",
    select_multiple: "Выберите между вариантами {min_marks} и {max_marks}.",
    select_multiple_with_exclusives:
      "Выберите между вариантами {min_marks} и {max_marks}. Или выберите один (1) эксклюзивный вариант.",
    select_single: "Выберите один (1) вариант.",
    selected: "Выбрано: <b>{selected}</b>",
    your_vote_weight: "Ваш голос имеет вес {weight}",
    errors: {
      exceeded_list_limit:
        "Ваш выбор превысил максимальное количество вариантов, которые могут быть в списке {list_name}. Выберите максимальное количество параметров: {max_list_marks} в этом списке.",
      too_many: "Выбрано слишком много вариантов.",
      blank:
        "Воздержавшийся голос является эксклюзивным и не может объединяться с другими вариантами.",
      write_in_required: "Вы должны указать хотя бы одну партию, когда выбрано «Записать в».",
      write_in_too_long: "Записанное значение слишком длинное. Попытайтесь сократить его.",
      exclusive: "Неверная комбинация опций.",
      cross_party_voting:
        "Ваш выбор включал более одного списка. Пожалуйста, выбирайте только в пределах одного списка.",
    },
  },
  sv: {
    select_exactly: "Välj {min_marks} alternativ.",
    select_multiple: "Välj mellan {min_marks} och {max_marks} alternativ.",
    select_multiple_with_exclusives:
      "Välj mellan {min_marks} och {max_marks} alternativ. Eller välj ett (1) exklusivt alternativ.",
    select_single: "Välj ett (1) alternativ.",
    selected: "Valda: <b>{selected}</b>",
    your_vote_weight: "Din röst har en vikt på {weight}",
    errors: {
      exceeded_list_limit:
        "Ditt val överskred det maximala antalet alternativ som kan finnas på listan {list_name}. Välj max {max_list_marks} alternativ per den här listan",
      too_many: "För många alternativ är valda.",
      blank: "Blank är exklusiv och kan inte kombineras med andra alternativ.",
      write_in_required: "Du måste ange minst ett parti när ”write-in-kandidat” är vald.",
      write_in_too_long: "Write-in-värdet är för långt. Försök korta ner det.",
      exclusive: "Ogiltig kombination av alternativ.",
      cross_party_voting: "Ditt urval inkluderade mer än en lista. Välj endast inom en enda lista.",
    },
  },
};

export default translations;
