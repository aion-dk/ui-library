import type { DefineLocaleMessage } from "@/types";

const translations: DefineLocaleMessage = {
  ar: {
    select_exactly: "حدد خيارات {min_marks}.",
    select_multiple: "حدد من بين {min_marks} و {max_marks} خياري.",
    select_multiple_with_exclusives:
      "حدد من بين {min_marks} و {max_marks} خياري. أو حدد خيارًا واحدًا (1) حصريًا.",
    select_single: "حدد خيارًا واحدًا (1).",
    selected: "المحدد: {selected}",
    exceeded_list_limit:
      "لقد تجاوز اختيارك الحد الأقصى لعدد الخيارات التي يمكن أن تكون في قائمة {list_name}. يرجى تحديد الحد الأقصى لعدد {max_list_marks} من الخيارات في هذه القائمة",
    go_to_bottom: "انتقل إلى الأسفل",
    remaining_credits: "الاعتمادات الصوتية المتبقية:",
    error_modal_title: "خطأ",
    error_modal_dismiss: "رفض",
    errors: {
      too_many: "تم تحديد عدد كبير جدًا من الخيارات",
      blank: "فارغ حصري ولا يمكن دمجه مع خيارات أخرى.",
      write_in_required: 'أنت مطالب بتحديد طرف على الأقل عند تحديد "كتابة".',
      write_in_too_long: "الكتابة في القيمة طويلة جدًا. حاول تقليل طوله.",
      write_in_not_supported: "'{',.()?!@€£¥'} يُسمح فقط بالأحرف والأرقام والرموز الخاصة التالية:",
      write_in_empty: "لا يمكن أن تكون القيمة المدخلة فارغة.",
      exclusive: "لا يمكن الجمع بين الخيارات الحصرية وخيارات أخرى.",
      cross_party_voting: "اختيارك تضمن أكثر من قائمة. الرجاء الاختيار فقط ضمن قائمة واحدة",
      too_many_credits:
        "اختيارك للأصوات يتجاوز عدد الاعتمادات الصوتية المتاحة للتوزيع. يرجى تعديل اختيارك.",
      undervote_below_min: "يجب عليك تحديد خيار {min_marks} على الأقل للمتابعة.",
      overvote: "لقد حددت عددًا كبيرًا جدًا من الخيارات.",
    },
    warnings: {
      undervote_between:
        "لقد حددت خيارات أقل من الحد الأقصى المسموح به. يمكنك المتابعة أو تحديد المزيد.",
      blank_vote:
        "لم تقم بتحديد أي خيار في هذا التصويت. إذا واصلت، سيتم تقديم هذا التصويت بدون تحديد.",
      overvote: "لقد حددت خيارات أكثر من الحد الأقصى المسموح به.",
    },
    review_errors: {
      overvote: "لقد حددت عددًا كبيرًا جدًا من الخيارات.",
      undervote_below_min: "يجب عليك تحديد خيار {min_marks} على الأقل للمتابعة.",
    },
    review_warnings: {
      undervote_between:
        "لقد حددت خيارات أقل من الحد الأقصى المسموح به. يمكنك المتابعة أو تحديد المزيد.",
      blank_vote:
        "لم تقم بتحديد أي خيار في هذا التصويت. إذا واصلت، سيتم تقديم هذا التصويت بدون تحديد.",
      overvote: "لقد حددت خيارات أكثر من الحد الأقصى المسموح به.",
    },
    alert: {
      proceed_anyway: "المتابعة على أي حال",
      go_back: "الرجوع",
      confirmation_title: "تأكيد",
    },
  },
  ca: {
    select_exactly: "Seleccionar {min_marks} opcions.",
    select_multiple: "Selecciona entre {min_marks} i {max_marks} opcions.",
    select_multiple_with_exclusives:
      "Selecciona entre {min_marks} i {max_marks} opcions. O selecciona una (1) opció exclusiva.",
    select_single: "Selecciona 1 (una) opció.",
    selected: "Seleccionades: {selected}",
    go_to_bottom: "Anar al fons",
    remaining_credits: "Crèdits de veu restants:",
    error_modal_title: "Error",
    error_modal_dismiss: "Descartar",
    errors: {
      too_many: "S'han seleccionat massa opcions.",
      blank: "El vot en blanc és exclusiu i no es pot combinar amb altres opcions.",
      write_in_required: "S'ha d'especificar almenys una opció quan se selecciona «Opció lliure».",
      write_in_too_long: "El text és massa llarg. Intenta reduir-ne la longitud.",
      write_in_not_supported:
        "Només es permeten lletres, números i els caràcters especials següents: '{',.()?!@€£¥'}",
      write_in_empty: "El valor d'escriptura no pot estar buit.",
      exclusive: "Les opcions exclusives no es poden combinar amb altres opcions.",
      cross_party_voting:
        "La teva selecció inclou més d'una lllista. Seleccionau només opcions dins d'una única lllista.",
      below_list_limit:
        "La teva selecció està per sota de la quantitat mínima d'opcions que s'han poden triar a la lllista \"{list_name}\". Selecciona un mínim de ({min_list_marks}) opcions d'aquaquesta lllista.",
      exceeded_list_limit:
        "La teva selecció ha superat la quantitat màxima d'opcions que es poden triar a la lllista {list_name}. Selecciona un màxim de ({max_list_marks}) opcions d'aquaquesta lllista.",
      too_many_credits:
        "La teva selecció de vots supera la quantitat de crèdits de veu disponibles per distribuir. Si us plau, ajusta la teva selecció.",
      undervote_below_min: "Heu de seleccionar almenys {min_marks} opció(ns) per continuar.",
      overvote: "Heu seleccionat massa opcions.",
    },
    warnings: {
      undervote_between:
        "Heu seleccionat menys opcions de les permeses com a màxim. Podeu continuar o seleccionar-ne més.",
      blank_vote:
        "No heu seleccionat cap opció en aquesta contesa. Si continueu, aquesta contesa s'enviarà sense cap selecció.",
      overvote: "Heu seleccionat més opcions de les permeses com a màxim.",
    },
    review_errors: {
      overvote: "Heu seleccionat massa opcions.",
      undervote_below_min: "Heu de seleccionar almenys {min_marks} opció(ns) per continuar.",
    },
    review_warnings: {
      undervote_between:
        "Heu seleccionat menys opcions de les permeses com a màxim. Podeu continuar o seleccionar-ne més.",
      blank_vote:
        "No heu seleccionat cap opció en aquesta contesa. Si continueu, aquesta contesa s'enviarà sense cap selecció.",
      overvote: "Heu seleccionat més opcions de les permeses com a màxim.",
    },
    alert: {
      proceed_anyway: "Continuar igualment",
      go_back: "Tornar enrere",
      confirmation_title: "Confirmar",
    },
  },
  cy: {
    select_exactly: "Dewiswch {min_marks} opsiynau.",
    select_multiple: "Dewiswch rhwng {min_marks} a {max_marks} o opsiynau.",
    select_multiple_with_exclusives:
      "Dewiswch rhwng {min_marks} a {max_marks}. Neu dewiswch un (1) opsiwn unigol.",
    select_single: "Dewiswch un (1) opsiwn.",
    selected: "Dewiswyd: {selected}",
    go_to_bottom: "Ewch i'r gwaelod",
    remaining_credits: "Credydau llais sy'n weddill:",
    error_modal_title: "Gwall",
    error_modal_dismiss: "Diystyru",
    errors: {
      too_many: "Gormod o opsiynau wedi'u dewis.",
      blank: "Mae gwag yn ddewis unigol ac ni ellir ei gyfuno ag opsiynau eraill.",
      write_in_required: "Mae'n ofynnol i chi nodi plaid o leiaf wrth ddewis 'Ysgrifennu'.",
      write_in_too_long: "Mae'r hyn a ysgrifennwyd yn rhy hir. Ceisiwch ei wneud yn fyrrach.",
      write_in_not_supported:
        "Dim ond llythrennau, rhifau, a'r cymeriadau arbennig canlynol sy'n cael eu caniatáu: '{',.()?!@€£¥'}",
      write_in_empty: "Ni all y gwerth ysgrifennu i mewn fod yn wag.",
      exclusive: "Ni ellir cyfuno opsiynau unigol ag opsiynau eraill.",
      cross_party_voting:
        "Roedd eich dewis yn cynnwys mwy nag un rhestr. Dewiswch o fewn un rhestr yn unig.",
      below_list_limit:
        "Mae eich dewisiad yn is na'r lleiafswm o opsiynau y gellir eu dewis yn y rhestr \"{list_name}\". Dewiswch leiafswm o ({ min_list_marks}) opsiynau o'r rhestr hon.",
      exceeded_list_limit:
        "Mae eich dewis yn fwy na'r uchafswm o opsiynau a all fod ar y rhestr {list_name}. Dewiswch uchafswm o ({max_list_marks}) o opsiynau o'r rhestr hon.",
      too_many_credits:
        "Mae eich dewis o bleidleisiau yn fwy na'r nifer o gredydau llais sydd ar gael i'w dosbarthu. Addasu eich dewisiad os gwelwch yn dda.",
      undervote_below_min: "Rhaid i chi ddewis o leiaf {min_marks} opsiwn(i) i barhau.",
      overvote: "Rydych wedi dewis gormod o opsiynau.",
    },
    warnings: {
      undervote_between:
        "Rydych wedi dewis llai na'r uchafswm o opsiynau a ganiateir. Gallwch barhau neu ddewis rhagor.",
      blank_vote:
        "Nid ydych wedi dewis unrhyw opsiwn yn y gystadleuaeth hon. Os byddwch yn parhau, cyflwynir y gystadleuaeth hon heb ddewis.",
      overvote: "Rydych wedi dewis mwy na'r uchafswm o opsiynau a ganiateir.",
    },
    review_errors: {
      overvote: "Rydych wedi dewis gormod o opsiynau.",
      undervote_below_min: "Rhaid i chi ddewis o leiaf {min_marks} opsiwn(i) i barhau.",
    },
    review_warnings: {
      undervote_between:
        "Rydych wedi dewis llai na'r uchafswm o opsiynau a ganiateir. Gallwch barhau neu ddewis rhagor.",
      blank_vote:
        "Nid ydych wedi dewis unrhyw opsiwn yn y gystadleuaeth hon. Os byddwch yn parhau, cyflwynir y gystadleuaeth hon heb ddewis.",
      overvote: "Rydych wedi dewis mwy na'r uchafswm o opsiynau a ganiateir.",
    },
    alert: {
      proceed_anyway: "Parhau beth bynnag",
      go_back: "Mynd yn ôl",
      confirmation_title: "Cadarnhau",
    },
  },
  da: {
    select_exactly: "Sæt {min_marks} kryds(er).",
    select_multiple: "Sæt kryds ved {min_marks} til {max_marks} valgmuligheder",
    select_multiple_with_exclusives:
      "Sæt kryds ved {min_marks} til {max_marks} valgmuligheder. Eller vælg en (1) eksklusiv valgmulighed.",
    select_single: "Sæt ét (1) kryds.",
    selected: "Krydser: {selected}",
    go_to_bottom: "Gå til bunden",
    remaining_credits: "Resterende stemmekreditter:",
    error_modal_title: "Fejl",
    error_modal_dismiss: "Afvis",
    errors: {
      too_many: "Du har sat for mange krydser.",
      blank: "Blank stemme kan ikke kombineres med andre valgmuligheder.",
      write_in_required: "Du skal udfylde skrivestemmen når den er valgt.",
      write_in_too_long: "Skrivestemme er for lang. Prøv at reducere længden på teksten.",
      write_in_not_supported:
        "Kun bogstaver, tal og følgende specialtegn er tilladt: '{',.()?!@€£¥'}",
      write_in_empty: "Indskrivningsværdien må ikke være tom.",
      exclusive: "Ekslusive valgmuligheder kan ikke kombineres med andre.",
      exceeded_list_limit:
        "Dit valg overskred det maksimale antal muligheder, der kan være på listen {list_name}. Vælg maks. {max_list_marks} muligheder på denne liste",
      cross_party_voting:
        "Dine valg omfattede mere end én liste. Vælg venligst kun inden for en enkelt liste.",
      too_many_credits:
        "Dit valg af stemmer overstiger antallet af tilgængelige stemmekreditter til fordeling. Juster venligst dit valg.",
      undervote_below_min: "Du skal vælge mindst {min_marks} valgmulighed(er) for at fortsætte.",
      overvote: "Du har valgt for mange valgmuligheder.",
    },
    warnings: {
      undervote_between:
        "Du har valgt færre end det maksimale tilladte antal valgmuligheder. Du kan fortsætte eller vælge flere.",
      blank_vote:
        "Du har ikke valgt nogen valgmulighed i denne afstemning. Hvis du fortsætter, vil denne afstemning blive indsendt uden et valg.",
      overvote: "Du har valgt flere end det maksimale tilladte antal valgmuligheder.",
    },
    review_errors: {
      overvote: "Du har valgt for mange valgmuligheder.",
      undervote_below_min: "Du skal vælge mindst {min_marks} valgmulighed(er) for at fortsætte.",
    },
    review_warnings: {
      undervote_between:
        "Du har valgt færre end det maksimale tilladte antal valgmuligheder. Du kan fortsætte eller vælge flere.",
      blank_vote:
        "Du har ikke valgt nogen valgmulighed i denne afstemning. Hvis du fortsætter, vil denne afstemning blive indsendt uden et valg.",
      overvote: "Du har valgt flere end det maksimale tilladte antal valgmuligheder.",
    },
    alert: {
      proceed_anyway: "Fortsæt alligevel",
      go_back: "Gå tilbage",
      confirmation_title: "Bekræft",
    },
  },
  de: {
    select_exactly: "Sie können {min_marks} Stimme(n) vergeben.",
    select_multiple: "Sie können {min_marks} bis {max_marks} Stimmen vergeben.",
    select_multiple_with_exclusives:
      "Sie können {min_marks} bis {max_marks} Stimmen vergeben. Oder wählen Sie eine (1) exklusive Option.",
    select_single: "Vergeben Sie eine Stimme.",
    selected: "Gewählt: {selected}",
    go_to_bottom: "Nach unten gehen",
    remaining_credits: "Verbleibende Stimmguthaben:",
    error_modal_title: "Fehler",
    error_modal_dismiss: "Schließen",
    errors: {
      too_many: "Zu viele Optionen gewählt.",
      blank: "Blank ist exklusiv und kann nicht mit anderen Optionen kombiniert werden.",
      write_in_required:
        "Sie müssen mindestens eine Partei angeben, wenn 'Write in' ausgewählt ist.",
      write_in_too_long:
        "Der Einschreibewert ist zu lang. Versuchen Sie, seine Länge zu reduzieren.",
      write_in_not_supported:
        "Zulässig sind nur Buchstaben, Zahlen und die folgenden Sonderzeichen: '{',.()?!@€£¥'}",
      write_in_empty: "Der Eingabewert darf nicht leer sein.",
      exclusive: "Ungültige Kombination von Optionen.",
      exceeded_list_limit:
        "Ihre Auswahl hat die maximale Anzahl an Optionen überschritten, die in der Liste {list_name} enthalten sein können. Bitte wählen Sie für diese Liste maximal {max_list_marks} Optionen aus",
      cross_party_voting:
        "Ihre Auswahl umfasste mehr als eine Liste. Bitte wählen Sie nur innerhalb einer einzigen Liste aus.",
      too_many_credits:
        "Ihre Stimmauswahl überschreitet die Anzahl der verfügbaren Stimmguthaben zur Verteilung. Bitte passen Sie Ihre Auswahl an.",
      undervote_below_min:
        "Sie müssen mindestens {min_marks} Option(en) auswählen, um fortzufahren.",
      overvote: "Sie haben zu viele Optionen ausgewählt.",
    },
    warnings: {
      undervote_between:
        "Sie haben weniger als die maximal zulässigen Optionen ausgewählt. Sie können fortfahren oder weitere auswählen.",
      blank_vote:
        "Sie haben keine Option in diesem Wettbewerb ausgewählt. Wenn Sie fortfahren, wird dieser Wettbewerb ohne Auswahl eingereicht.",
      overvote: "Sie haben mehr als die maximal zulässigen Optionen ausgewählt.",
    },
    review_errors: {
      overvote: "Sie haben zu viele Optionen ausgewählt.",
      undervote_below_min:
        "Sie müssen mindestens {min_marks} Option(en) auswählen, um fortzufahren.",
    },
    review_warnings: {
      undervote_between:
        "Sie haben weniger als die maximal zulässigen Optionen ausgewählt. Sie können fortfahren oder weitere auswählen.",
      blank_vote:
        "Sie haben keine Option in diesem Wettbewerb ausgewählt. Wenn Sie fortfahren, wird dieser Wettbewerb ohne Auswahl eingereicht.",
      overvote: "Sie haben mehr als die maximal zulässigen Optionen ausgewählt.",
    },
    alert: {
      proceed_anyway: "Trotzdem fortfahren",
      go_back: "Zurück",
      confirmation_title: "Bestätigen",
    },
  },
  en: {
    select_exactly: "Select {min_marks} options.",
    select_multiple: "Select between {min_marks} and {max_marks} options.",
    select_multiple_with_exclusives:
      "Select between {min_marks} and {max_marks} options. Or select one (1) exclusive option.",
    select_single: "Select one (1) option.",
    selected: "Selected: {selected}",
    go_to_bottom: "Go to the bottom",
    remaining_credits: "Remaining voice credits:",
    error_modal_title: "Error",
    error_modal_dismiss: "Dismiss",
    errors: {
      too_many: "Too many options selected.",
      blank: "Blank is exclusive and cannot be combined with other options.",
      write_in_required:
        "You are required to specify at least a party when 'Write in' is selected.",
      write_in_too_long: "The write in value is too long. Try to reduce its length.",
      write_in_not_supported:
        "Only letters, numbers, and the following special characters are allowed: '{',.()?!@€£¥'}",
      write_in_empty: "The write-in value cannot be empty.",
      exceeded_list_limit:
        "Your selection exceeded the maximum amount of options that can be on {list_name} list. Please select max {max_list_marks} options per this list",
      exclusive: "Exclusive options cannot be combined with other options.",
      cross_party_voting:
        "Your selection included more than one list. Please select only within a single list.",
      too_many_credits:
        "Your selection of votes exceeds the amount of voice credits available to distribute. Please adjust your selection.",
      undervote_below_min: "You must select at least {min_marks} option(s) to continue.",
      overvote: "You have selected too many options.",
    },
    warnings: {
      undervote_between:
        "Ballot: You have selected fewer than the maximum allowed options. You can continue or select more.",
      blank_vote:
        "You have not selected any option in this contest. If you continue, this contest will be submitted without a selection.",
      overvote: "You have selected more than the maximum allowed options.",
    },
    review_errors: {
      overvote: "You have selected too many options.",
      undervote_below_min: "You must select at least {min_marks} option(s) to continue.",
    },
    review_warnings: {
      undervote_between:
        "Summary: You have selected fewer than the maximum allowed options. You can continue or select more.",
      blank_vote:
        "You have not selected any option in this contest. If you continue, this contest will be submitted without a selection.",
      overvote: "You have selected more than the maximum allowed options.",
    },
    alert: {
      proceed_anyway: "Proceed anyway",
      go_back: "Go back",
      confirmation_title: "Confirm",
    },
  },
  es: {
    select_exactly: "Seleccionar {min_marks} opciones.",
    select_multiple: "Seleccione entre {min_marks} y {max_marks} opciones.",
    select_multiple_with_exclusives:
      "Seleccione entre {min_marks} y {max_marks} opciones. O seleccione una (1) opción exclusiva.",
    select_single: "Seleccione 1 (una) opción.",
    selected: "Seleccionadas: {selected}",
    go_to_bottom: "Ir al final de la boleta",
    remaining_credits: "Créditos de voz restantes:",
    error_modal_title: "Error",
    error_modal_dismiss: "Descartar",
    errors: {
      too_many: "Demasiadas opciones seleccionadas.",
      exceeded_list_limit:
        "Su selección superó la cantidad máxima de opciones que pueden estar en la lista {list_name}. Seleccione un máximo de {max_list_marks} opciones según esta lista",
      blank: "El voto en blanco es exclusivo y no se puede combinar con otras opciones.",
      write_in_required:
        "Es necesario especificar al menos un partido cuando se selecciona «Añadir opción».",
      write_in_too_long: "El valor insertado es demasiado largo. Intente reducir su longitud.",
      write_in_not_supported:
        "Sólo se permiten letras, números y los siguientes caracteres especiales: '{',.()?!@€£¥'}",
      write_in_empty: "El valor insertado no puede estar vacío.",
      exclusive: "Las opciones exclusivas no pueden ser combinadas con otras opciones.",
      cross_party_voting:
        "Su selección incluye más de un partido político. Porfavor seleccione dentro de un mismo partido.",
      too_many_credits:
        "Su selección de votos supera la cantidad de créditos de voz disponibles para distribuir. Por favor, ajuste su selección.",
      undervote_below_min: "Debe seleccionar al menos {min_marks} opción(es) para continuar.",
      overvote: "Ha seleccionado demasiadas opciones.",
    },
    warnings: {
      undervote_between:
        "Ha seleccionado menos opciones de las permitidas como máximo. Puede continuar o seleccionar más.",
      blank_vote:
        "No ha seleccionado ninguna opción en este concurso. Si continúa, este concurso se enviará sin ninguna selección.",
      overvote: "Ha seleccionado más opciones de las permitidas como máximo.",
    },
    review_errors: {
      overvote: "Ha seleccionado demasiadas opciones.",
      undervote_below_min: "Debe seleccionar al menos {min_marks} opción(es) para continuar.",
    },
    review_warnings: {
      undervote_between:
        "Ha seleccionado menos opciones de las permitidas como máximo. Puede continuar o seleccionar más.",
      blank_vote:
        "No ha seleccionado ninguna opción en este concurso. Si continúa, este concurso se enviará sin ninguna selección.",
      overvote: "Ha seleccionado más opciones de las permitidas como máximo.",
    },
    alert: {
      proceed_anyway: "Continuar de todos modos",
      go_back: "Volver",
      confirmation_title: "Confirmar",
    },
  },
  fi: {
    select_exactly: "Valitse {min_marks} vaihtoehtoa.",
    select_multiple: "Valitse {min_marks} ja {max_marks} vaihtoehdon väliltä.",
    select_multiple_with_exclusives:
      "Valitse {min_marks} ja {max_marks} vaihtoehdon väliltä. Tai valitse yksi (1) eksklusiivinen vaihtoehto.",
    select_single: "Valitse yksi (1) vaihtoehto.",
    selected: "Valittu: {selected}",
    go_to_bottom: "Siirry pohjaan",
    remaining_credits: "Jäljellä olevat äänipisteet:",
    error_modal_title: "Virhe",
    error_modal_dismiss: "Hylkää",
    errors: {
      exceeded_list_limit:
        "Valintasi ylitti luettelossa {list_name} olevien vaihtoehtojen enimmäismäärän. Valitse enintään {max_list_marks} vaihtoehtoa tälle luettelolle",
      too_many: "Liian monta valittua vaihtoehtoa.",
      blank: "Tyhjä on eksklusiivinen, eikä sitä voi yhdistää muihin vaihtoehtoihin.",
      write_in_required: "Sinun on määritettävä vähintään osapuoli, kun Kirjoita on valittuna.",
      write_in_too_long: "Kirjoitusarvo on liian pitkä. Yritä lyhentää sen pituutta.",
      write_in_not_supported:
        "Vain kirjaimet, numerot ja seuraavat erikoismerkit ovat sallittuja: '{',.()?!@€£¥'}",
      write_in_empty: "Kirjoitusarvo ei voi olla tyhjä.",
      exclusive: "Virheellinen vaihtoehtojen yhdistelmä.",
      cross_party_voting:
        "Valintasi sisälsi useamman kuin yhden luettelon. Valitse vain yhdestä luettelosta.",
      too_many_credits:
        "Äänivalintasi ylittää jakamiseen käytettävissä olevien äänikrediittien määrän. Muuta valintaasi.",
      undervote_below_min: "Sinun on valittava vähintään {min_marks} vaihtoehtoa jatkaaksesi.",
      overvote: "Olet valinnut liian monta vaihtoehtoa.",
    },
    warnings: {
      undervote_between:
        "Olet valinnut vähemmän kuin enimmäismäärän sallittuja vaihtoehtoja. Voit jatkaa tai valita lisää.",
      blank_vote:
        "Et ole valinnut yhtään vaihtoehtoa tässä kilpailussa. Jos jatkat, tämä kilpailu lähetetään ilman valintaa.",
      overvote: "Olet valinnut enemmän kuin enimmäismäärän sallittuja vaihtoehtoja.",
    },
    review_errors: {
      overvote: "Olet valinnut liian monta vaihtoehtoa.",
      undervote_below_min: "Sinun on valittava vähintään {min_marks} vaihtoehtoa jatkaaksesi.",
    },
    review_warnings: {
      undervote_between:
        "Olet valinnut vähemmän kuin enimmäismäärän sallittuja vaihtoehtoja. Voit jatkaa tai valita lisää.",
      blank_vote:
        "Et ole valinnut yhtään vaihtoehtoa tässä kilpailussa. Jos jatkat, tämä kilpailu lähetetään ilman valintaa.",
      overvote: "Olet valinnut enemmän kuin enimmäismäärän sallittuja vaihtoehtoja.",
    },
    alert: {
      proceed_anyway: "Jatka silti",
      go_back: "Palaa takaisin",
      confirmation_title: "Vahvista",
    },
  },
  fr: {
    select_exactly: "Sélectionnez les options de {min_marks}.",
    select_multiple: "Sélectionnez entre les options {min_marks} et {max_marks}.",
    select_multiple_with_exclusives:
      "Sélectionnez entre les options {min_marks} et {max_marks}. Ou sélectionnez une (1) option exclusive.",
    select_single: "Sélectionnez une (1) option.",
    selected: "Sélection: {selected}",
    go_to_bottom: "Aller au bas de la page",
    remaining_credits: "Crédits de voix restants :",
    error_modal_title: "Erreur",
    error_modal_dismiss: "Fermer",
    errors: {
      exceeded_list_limit:
        "Votre sélection a dépassé le nombre maximum d'options pouvant figurer sur la liste {list_name}. Veuillez sélectionner un maximum de {max_list_marks} options dans cette liste.",
      too_many: "Trop d'options sélectionnées.",
      blank: "Un blanc est exclusif et ne peut être combiné avec d'autres options.",
      write_in_required:
        "Vous devez spécifier au moins un parti lorsque «Écriture» est sélectionné.",
      write_in_too_long: "La valeur d'écriture est trop longue. Essayez de réduire sa longueur.",
      write_in_not_supported:
        "Seules les lettres, les chiffres et les caractères spéciaux suivants sont autorisés : '{',.()?!@€£¥'}",
      write_in_empty: "La valeur à saisir ne peut pas être vide.",
      exclusive: "Les options exclusives ne peuvent être combinées avec d'autres options.",
      cross_party_voting:
        "Votre sélection comprenait plusieurs listes. Veuillez sélectionner uniquement dans une seule liste.",
      too_many_credits:
        "Votre sélection de votes dépasse la quantité de crédits de voix disponibles à distribuer. Veuillez ajuster votre sélection.",
      undervote_below_min: "Vous devez sélectionner au moins {min_marks} option(s) pour continuer.",
      overvote: "Vous avez sélectionné trop d'options.",
    },
    warnings: {
      undervote_between:
        "Vous avez sélectionné moins d'options que le maximum autorisé. Vous pouvez continuer ou en sélectionner davantage.",
      blank_vote:
        "Vous n'avez sélectionné aucune option dans ce concours. Si vous continuez, ce concours sera soumis sans sélection.",
      overvote: "Vous avez sélectionné plus d'options que le maximum autorisé.",
    },
    review_errors: {
      overvote: "Vous avez sélectionné trop d'options.",
      undervote_below_min: "Vous devez sélectionner au moins {min_marks} option(s) pour continuer.",
    },
    review_warnings: {
      undervote_between:
        "Vous avez sélectionné moins d'options que le maximum autorisé. Vous pouvez continuer ou en sélectionner davantage.",
      blank_vote:
        "Vous n'avez sélectionné aucune option dans ce concours. Si vous continuez, ce concours sera soumis sans sélection.",
      overvote: "Vous avez sélectionné plus d'options que le maximum autorisé.",
    },
    alert: {
      proceed_anyway: "Continuer quand même",
      go_back: "Revenir en arrière",
      confirmation_title: "Confirmer",
    },
  },
  is: {
    select_exactly: "Veldu {min_marks} valkosti.",
    select_multiple: "Veldu á milli {min_marks} og {max_marks} valkosta.",
    select_multiple_with_exclusives:
      "Veldu á milli {min_marks} og {max_marks} valkosta. Eða veldu einn (1) einkarétt.",
    select_single: "Veldu einn (1) valmöguleika.",
    selected: "Valið: {selected}",
    go_to_bottom: "Fara til botns",
    remaining_credits: "Eftirstandandi raddkreditar:",
    error_modal_title: "Villa",
    error_modal_dismiss: "Vísa frá",
    errors: {
      exceeded_list_limit:
        "Val þitt fór yfir hámarksfjölda valkosta sem geta verið á listanum {list_name}. Vinsamlegast veldu hámark {max_list_marks} valkosti á þessum lista",
      too_many: "Of margir valkostir valdir.",
      blank: "Blank er einkarétt og ekki hægt að sameina það með öðrum valkostum.",
      write_in_required:
        "Þú þarft að tilgreina að minnsta kosti aðila þegar 'Skrifa inn' er valið.",
      write_in_too_long: "Innritunin er of löng. Reyndu að minnka lengdina.",
      write_in_not_supported:
        "Aðeins eru leyfðir bókstafir, tölustafir og eftirfarandi sérstafir: '{',.()?!@€£¥'}",
      write_in_empty: "Innritunargildið má ekki vera tómt.",
      exclusive: "Ekki er hægt að sameina einkavalkosti við aðra valkosti.",
      cross_party_voting:
        "Val þitt innihélt fleiri en einn lista. Vinsamlegast veldu aðeins innan eins lista.",
      too_many_credits:
        "Val þitt á atkvæðum fer yfir fjölda tiltækra raddkredita til úthlutunnar. Vinsamlegast breyttu vali þínu.",
      undervote_below_min:
        "Þú verður að velja að minnsta kosti {min_marks} valkost(i) til að halda áfram.",
      overvote: "Þú hefur valið of marga valkosti.",
    },
    warnings: {
      undervote_between:
        "Þú hefur valið færri valkosti en hámarksfjöldi leyfir. Þú getur haldið áfram eða valið fleiri.",
      blank_vote:
        "Þú hefur ekki valið neinn valkost í þessu keppni. Ef þú heldur áfram verður þessi keppni send inn án vals.",
      overvote: "Þú hefur valið fleiri valkosti en hámarksfjöldi leyfir.",
    },
    review_errors: {
      overvote: "Þú hefur valið of marga valkosti.",
      undervote_below_min:
        "Þú verður að velja að minnsta kosti {min_marks} valkost(i) til að halda áfram.",
    },
    review_warnings: {
      undervote_between:
        "Þú hefur valið færri valkosti en hámarksfjöldi leyfir. Þú getur haldið áfram eða valið fleiri.",
      blank_vote:
        "Þú hefur ekki valið neinn valkost í þessu keppni. Ef þú heldur áfram verður þessi keppni send inn án vals.",
      overvote: "Þú hefur valið fleiri valkosti en hámarksfjöldi leyfir.",
    },
    alert: {
      proceed_anyway: "Halda áfram samt",
      go_back: "Fara til baka",
      confirmation_title: "Staðfesta",
    },
  },
  it: {
    select_exactly: "Seleziona {min_marks} opzioni.",
    select_multiple: "Seleziona tra {min_marks} e {max_marks} opzioni.",
    select_multiple_with_exclusives:
      "Seleziona tra {min_marks} e {max_marks}. Oppure seleziona una (1) opzione esclusiva.",
    select_single: "Seleziona una (1) opzione.",
    selected: "Selezionato: {selected}",
    go_to_bottom: "Vai in fondo",
    remaining_credits: "Crediti voce rimanenti:",
    error_modal_title: "Errore",
    error_modal_dismiss: "Chiudi",
    errors: {
      too_many: "Troppe opzioni selezionate.",
      blank: "Il voto vuoto è esclusivo e non è cumulabile con altre opzioni.",
      write_in_required: 'È necessario specificare almeno un partito quando si seleziona "Scrivi".',
      write_in_too_long: "Il valore scritto è troppo lungo. Cerca di ridurne la lunghezza.",
      write_in_not_supported:
        "Sono consentiti solo lettere, numeri e i seguenti caratteri speciali: '{',.()?!@€£¥'}",
      write_in_empty: "Il valore di scrittura non può essere vuoto.",
      cross_party_voting:
        "La tua selezione include più di una lista. Si prega di selezionare solo all'interno di una singola lista.",
      exceeded_list_limit:
        'La tua selezione ha superato il numero massimo di opzioni che possono essere effettuate per la lista "{list_name}". Si prega di selezionare un massimo di ({max_list_marks}) opzioni da questa lista.',
      exclusive: "Le opzioni esclusive non possono essere combinate con altre opzioni.",
      below_list_limit:
        'La tua selezione è inferiore al numero minimo di opzioni che devono essere effettuate per la lista "{list_name}". Si prega di selezionare un minimo di ({min_list_marks}) opzioni da questa lista.',
      too_many_credits:
        "La tua selezione di voti supera la quantità di crediti voce disponibili da distribuire. Si prega di modificare la selezione.",
      undervote_below_min: "Devi selezionare almeno {min_marks} opzione(i) per continuare.",
      overvote: "Hai selezionato troppe opzioni.",
    },
    warnings: {
      undervote_between:
        "Hai selezionato meno opzioni del massimo consentito. Puoi continuare o selezionarne altre.",
      blank_vote:
        "Non hai selezionato alcuna opzione in questa competizione. Se continui, questa competizione sarà inviata senza una selezione.",
      overvote: "Hai selezionato più opzioni del massimo consentito.",
    },
    review_errors: {
      overvote: "Hai selezionato troppe opzioni.",
      undervote_below_min: "Devi selezionare almeno {min_marks} opzione(i) per continuare.",
    },
    review_warnings: {
      undervote_between:
        "Hai selezionato meno opzioni del massimo consentito. Puoi continuare o selezionarne altre.",
      blank_vote:
        "Non hai selezionato alcuna opzione in questa competizione. Se continui, questa competizione sarà inviata senza una selezione.",
      overvote: "Hai selezionato più opzioni del massimo consentito.",
    },
    alert: {
      proceed_anyway: "Procedi comunque",
      go_back: "Torna indietro",
      confirmation_title: "Conferma",
    },
  },
  ja: {
    select_exactly: "Select {min_marks} options.",
    select_multiple: "Select between {min_marks} and {max_marks} options.",
    select_multiple_with_exclusives:
      "Select between {min_marks} and {max_marks} options. Or select one (1) exclusive option.",
    select_single: "Select one (1) option.",
    selected: "Selected: {selected}",
    go_to_bottom: "Go to the bottom",
    remaining_credits: "残りの投票クレジット：",
    error_modal_title: "エラー",
    error_modal_dismiss: "閉じる",
    errors: {
      too_many: "Too many options selected.",
      blank: "Blank is exclusive and cannot be combined with other options.",
      write_in_required:
        "You are required to specify at least a party when 'Write in' is selected.",
      write_in_too_long: "The write in value is too long. Try to reduce its length.",
      write_in_not_supported:
        "Only letters, numbers, and the following special characters are allowed: '{',.()?!@€£¥'}",
      write_in_empty: "The write-in value cannot be empty.",
      exceeded_list_limit:
        "Your selection exceeded the maximum amount of options that can be on {list_name} list. Please select max {max_list_marks} options per this list",
      exclusive: "Exclusive options cannot be combined with other options.",
      cross_party_voting:
        "Your selection included more than one list. Please select only within a single list.",
      too_many_credits:
        "投票の選択が配布可能な音声クレジット数を超えています。選択を調整してください。",
      undervote_below_min:
        "続行するには、少なくとも{min_marks}つのオプションを選択する必要があります。",
      overvote: "選択したオプションが多すぎます。",
    },
    warnings: {
      undervote_between:
        "許可された最大オプション数より少なく選択されています。そのまま続けるか、さらに選択できます。",
      blank_vote:
        "このコンテストでオプションが選択されていません。続行すると、このコンテストは選択なしで提出されます。",
      overvote: "許可された最大オプション数を超えて選択されています。",
    },
    review_errors: {
      overvote: "選択したオプションが多すぎます。",
      undervote_below_min:
        "続行するには、少なくとも{min_marks}つのオプションを選択する必要があります。",
    },
    review_warnings: {
      undervote_between:
        "許可された最大オプション数より少なく選択されています。そのまま続けるか、さらに選択できます。",
      blank_vote:
        "このコンテストでオプションが選択されていません。続行すると、このコンテストは選択なしで提出されます。",
      overvote: "許可された最大オプション数を超えて選択されています。",
    },
    alert: {
      proceed_anyway: "とにかく続行",
      go_back: "戻る",
      confirmation_title: "確認",
    },
  },
  ko: {
    select_exactly: "Select {min_marks} options.",
    select_multiple: "Select between {min_marks} and {max_marks} options.",
    select_multiple_with_exclusives:
      "Select between {min_marks} and {max_marks} options. Or select one (1) exclusive option.",
    select_single: "Select one (1) option.",
    selected: "Selected: {selected}",
    go_to_bottom: "Go to the bottom",
    remaining_credits: "남은 투표 크레딧:",
    error_modal_title: "오류",
    error_modal_dismiss: "닫기",
    errors: {
      too_many: "Too many options selected.",
      blank: "Blank is exclusive and cannot be combined with other options.",
      write_in_required:
        "You are required to specify at least a party when 'Write in' is selected.",
      write_in_too_long: "The write in value is too long. Try to reduce its length.",
      write_in_not_supported:
        "Only letters, numbers, and the following special characters are allowed: '{',.()?!@€£¥'}",
      write_in_empty: "The write-in value cannot be empty.",
      exceeded_list_limit:
        "Your selection exceeded the maximum amount of options that can be on {list_name} list. Please select max {max_list_marks} options per this list",
      exclusive: "Exclusive options cannot be combined with other options.",
      cross_party_voting:
        "Your selection included more than one list. Please select only within a single list.",
      too_many_credits:
        "투표 선택이 배분 가능한 음성 크레딧 수를 초과합니다. 선택을 조정해 주세요.",
      undervote_below_min: "계속하려면 최소 {min_marks}개의 옵션을 선택해야 합니다.",
      overvote: "너무 많은 옵션을 선택했습니다.",
    },
    warnings: {
      undervote_between:
        "허용된 최대 옵션 수보다 적게 선택했습니다. 계속하거나 더 선택할 수 있습니다.",
      blank_vote:
        "이 경쟁에서 옵션을 선택하지 않았습니다. 계속하면 이 경쟁은 선택 없이 제출됩니다.",
      overvote: "허용된 최대 옵션 수를 초과하여 선택했습니다.",
    },
    review_errors: {
      overvote: "너무 많은 옵션을 선택했습니다.",
      undervote_below_min: "계속하려면 최소 {min_marks}개의 옵션을 선택해야 합니다.",
    },
    review_warnings: {
      undervote_between:
        "허용된 최대 옵션 수보다 적게 선택했습니다. 계속하거나 더 선택할 수 있습니다.",
      blank_vote:
        "이 경쟁에서 옵션을 선택하지 않았습니다. 계속하면 이 경쟁은 선택 없이 제출됩니다.",
      overvote: "허용된 최대 옵션 수를 초과하여 선택했습니다.",
    },
    alert: {
      proceed_anyway: "그래도 계속",
      go_back: "돌아가기",
      confirmation_title: "확인",
    },
  },
  nl: {
    select_exactly: "Selecteer {min_marks} opties.",
    select_multiple: "Selecteer tussen {min_marks} en {max_marks} opties.",
    select_multiple_with_exclusives:
      "Selecteer tussen {min_marks} en {max_marks} opties. Of selecteer één (1) exclusieve optie.",
    select_single: "Selecteer één (1) optie.",
    selected: "Geselecteerd: {selected}",
    go_to_bottom: "Naar beneden",
    remaining_credits: "Resterende stemkredieten:",
    error_modal_title: "Fout",
    error_modal_dismiss: "Sluiten",
    errors: {
      exceeded_list_limit:
        "Je selectie heeft het maximale aantal opties overschreden dat op de lijst {list_name} kan staan. Selecteer maximaal {max_list_marks} opties per deze lijst",
      too_many: "Teveel opties geselecteerd.",
      blank: "Blanco is exclusief en kan niet worden gecombineerd met andere opties.",
      write_in_required: "U moet ten minste één partij opgeven wanneer 'Write-in' is geselecteerd.",
      write_in_too_long: "De 'write-in' waarde is te lang. Probeer deze korter te maken.",
      write_in_not_supported:
        "Alleen letters, cijfers en de volgende speciale tekens zijn toegestaan: '{',.()?!@€£¥'}",
      write_in_empty: "De ingevoerde waarde mag niet leeg zijn.",
      exclusive: "Ongeldige combinatie van opties.",
      cross_party_voting:
        "Uw selectie omvatte meer dan één lijst. Selecteer alleen binnen één lijst.",
      too_many_credits:
        "Uw stemkeuze overschrijdt het aantal beschikbare stemkredieten om te verdelen. Pas uw selectie aan.",
      undervote_below_min: "U moet minstens {min_marks} optie(s) selecteren om door te gaan.",
      overvote: "U heeft te veel opties geselecteerd.",
    },
    warnings: {
      undervote_between:
        "U heeft minder opties geselecteerd dan het maximaal toegestane aantal. U kunt doorgaan of meer opties selecteren.",
      blank_vote:
        "U heeft geen optie geselecteerd in dit concours. Als u doorgaat, wordt dit concours zonder selectie ingediend.",
      overvote: "U heeft meer opties geselecteerd dan het maximaal toegestane aantal.",
    },
    review_errors: {
      overvote: "U heeft te veel opties geselecteerd.",
      undervote_below_min: "U moet minstens {min_marks} optie(s) selecteren om door te gaan.",
    },
    review_warnings: {
      undervote_between:
        "U heeft minder opties geselecteerd dan het maximaal toegestane aantal. U kunt doorgaan of meer opties selecteren.",
      blank_vote:
        "U heeft geen optie geselecteerd in dit concours. Als u doorgaat, wordt dit concours zonder selectie ingediend.",
      overvote: "U heeft meer opties geselecteerd dan het maximaal toegestane aantal.",
    },
    alert: {
      proceed_anyway: "Toch doorgaan",
      go_back: "Ga terug",
      confirmation_title: "Bevestigen",
    },
  },
  pl: {
    select_exactly: "Wybierz {min_marks} opcje.",
    select_multiple: "Wybierz między {min_marks} a {max_marks} opcjami.",
    select_multiple_with_exclusives:
      "Wybierz między {min_marks} a {max_marks} opcjami. Lub wybierz jedną (1) wyłączną opcję.",
    select_single: "Wybierz jedną (1) opcję.",
    selected: "Wybrane: {selected}",
    go_to_bottom: "Przejdź na dół",
    remaining_credits: "Pozostałe kredyty głosowe:",
    error_modal_title: "Błąd",
    error_modal_dismiss: "Zamknij",
    errors: {
      exceeded_list_limit:
        "Twój wybór przekroczył maksymalną liczbę opcji, które mogą znajdować się na liście {list_name}. Wybierz maksymalnie {max_list_marks} opcji z tej listy",
      too_many: "Zbyt wiele wybranych opcji.",
      blank: "Puste jest wyłączne i nie może być połączone z innymi opcjami.",
      write_in_required:
        "Musisz określić co najmniej partię, gdy jest wybrana opcja 'Napisz własną'.",
      write_in_too_long: "Wartość wprowadzenia jest za długa. Spróbuj skrócić jej długość.",
      write_in_not_supported:
        "Dozwolone są wyłącznie litery, cyfry i następujące znaki specjalne: '{',.()?!@€£¥'}",
      write_in_empty: "Wartość do wpisania nie może być pusta.",
      exclusive: "Opcje wyłączne nie mogą być połączone z innymi opcjami.",
      cross_party_voting:
        "Twój wybór obejmował więcej niż jedną listę. Wybierz tylko z jednej listy.",
      too_many_credits:
        "Twój wybór głosów przekracza dostępną liczbę kredytów głosowych do rozdysponowania. Dostosuj swój wybór.",
      undervote_below_min: "Musisz wybrać co najmniej {min_marks} opcję(i), aby kontynuować.",
      overvote: "Wybrano zbyt wiele opcji.",
    },
    warnings: {
      undervote_between:
        "Wybrano mniej opcji niż maksymalna dozwolona liczba. Możesz kontynuować lub wybrać więcej.",
      blank_vote:
        "Nie wybrano żadnej opcji w tym konkursie. Jeśli kontynuujesz, ten konkurs zostanie przesłany bez wyboru.",
      overvote: "Wybrano więcej opcji niż maksymalna dozwolona liczba.",
    },
    review_errors: {
      overvote: "Wybrano zbyt wiele opcji.",
      undervote_below_min: "Musisz wybrać co najmniej {min_marks} opcję(i), aby kontynuować.",
    },
    review_warnings: {
      undervote_between:
        "Wybrano mniej opcji niż maksymalna dozwolona liczba. Możesz kontynuować lub wybrać więcej.",
      blank_vote:
        "Nie wybrano żadnej opcji w tym konkursie. Jeśli kontynuujesz, ten konkurs zostanie przesłany bez wyboru.",
      overvote: "Wybrano więcej opcji niż maksymalna dozwolona liczba.",
    },
    alert: {
      proceed_anyway: "Kontynuuj mimo to",
      go_back: "Wróć",
      confirmation_title: "Potwierdź",
    },
  },
  pt: {
    select_exactly: "Selecionar {min_marks} opções.",
    select_multiple: "Selecionar entre {min_marks} e {max_marks} opções.",
    select_multiple_with_exclusives:
      "Seleccione entre {min_marks} e {max_marks}. Ou seleccione uma (1) opção exclusiva.",
    select_single: "Seleccione uma (1) opção.",
    selected: "Selecionada: {selected}",
    go_to_bottom: "Ir para o fundo",
    remaining_credits: "Créditos de voz restantes:",
    error_modal_title: "Erro",
    error_modal_dismiss: "Fechar",
    errors: {
      too_many: "Demasiadas opções seleccionadas.",
      blank: "O voto em branco é exclusivo e não pode ser combinado com outras opções.",
      write_in_required:
        'É necessário especificar pelo menos um grupo quando a opção "Escrever em" está selecionada.',
      write_in_too_long: "O valor introduzido é demasiado longo. Tente reduzir o seu comprimento.",
      write_in_not_supported:
        "Apenas são permitidos letras, números e os seguintes caracteres especiais: '{',.()?!@€£¥'}",
      write_in_empty: "O valor que pode ser introduzido não pode estar vazio.",
      exclusive: "As opções exclusivas não podem ser combinadas com outras opções.",
      cross_party_voting:
        "A sua seleção incluiu mais do que uma lista. Por favor, seleccione apenas dentro de uma única lista.",
      exceeded_list_limit:
        "A sua seleção excedeu o número máximo de opções que podem constar da lista {list_name}. Por favor, seleccione um máximo de ({max_list_marks}) opções desta lista.",
      too_many_credits:
        "A sua seleção de votos excede a quantidade de créditos de voz disponíveis para distribuir. Por favor, ajuste a sua seleção.",
      undervote_below_min: "Deve selecionar pelo menos {min_marks} opção(ões) para continuar.",
      overvote: "Selecionou demasiadas opções.",
    },
    warnings: {
      undervote_between:
        "Selecionou menos opções do que o máximo permitido. Pode continuar ou selecionar mais.",
      blank_vote:
        "Não selecionou nenhuma opção neste concurso. Se continuar, este concurso será submetido sem qualquer seleção.",
      overvote: "Selecionou mais opções do que o máximo permitido.",
    },
    review_errors: {
      overvote: "Selecionou demasiadas opções.",
      undervote_below_min: "Deve selecionar pelo menos {min_marks} opção(ões) para continuar.",
    },
    review_warnings: {
      undervote_between:
        "Selecionou menos opções do que o máximo permitido. Pode continuar ou selecionar mais.",
      blank_vote:
        "Não selecionou nenhuma opção neste concurso. Se continuar, este concurso será submetido sem qualquer seleção.",
      overvote: "Selecionou mais opções do que o máximo permitido.",
    },
    alert: {
      proceed_anyway: "Continuar mesmo assim",
      go_back: "Voltar atrás",
      confirmation_title: "Confirmar",
    },
  },
  ro: {
    select_exactly: "Selectați {min_marks} opțiuni.",
    select_multiple: "Selectați între {min_marks} și {max_marks} opțiuni.",
    select_multiple_with_exclusives:
      "Selectați între {min_marks} și {max_marks} opțiuni. Sau selectați o (1) opțiune exclusivă.",
    select_single: "Selectați una (1) opțiune.",
    selected: "Selectat: {selected}",
    go_to_bottom: "Mergeți la partea de jos",
    remaining_credits: "Credite vocale rămase:",
    error_modal_title: "Eroare",
    error_modal_dismiss: "Închide",
    errors: {
      exceeded_list_limit:
        "Selecția dvs. a depășit numărul maxim de opțiuni care pot fi în lista {list_name}. Selectați maximum {max_list_marks} opțiuni din această listă",
      too_many: "Prea multe opțiuni selectate.",
      blank: "Golul este exclusiv și nu poate fi combinat cu alte opțiuni.",
      write_in_required:
        "Trebuie să specificați cel puțin un partid când este selectată opțiunea „Scrieți în”.",
      write_in_too_long:
        "Valoarea introdusă pentru scriere este prea lungă. Încercați să o scurtați.",
      write_in_not_supported:
        "Sunt permise doar literele, cifrele și următoarele caractere speciale: '{',.()?!@€£¥'}",
      write_in_empty: "Valoarea de scriere nu poate fi goală.",
      exclusive: "Opțiunile exclusiv nu pot fi combinate cu alte opțiuni.",
      cross_party_voting:
        "Selecția dvs. a inclus mai mult de o listă. Vă rugăm să selectați doar dintr-o singură listă.",
      too_many_credits:
        "Selecția dvs. de voturi depășește numărul de credite vocale disponibile pentru distribuire. Vă rugăm să ajustați selecția.",
      undervote_below_min:
        "Trebuie să selectați cel puțin {min_marks} opțiune(i) pentru a continua.",
      overvote: "Ați selectat prea multe opțiuni.",
    },
    warnings: {
      undervote_between:
        "Ați selectat mai puține opțiuni decât numărul maxim permis. Puteți continua sau selecta mai multe.",
      blank_vote:
        "Nu ați selectat nicio opțiune în acest concurs. Dacă continuați, acest concurs va fi trimis fără o selecție.",
      overvote: "Ați selectat mai multe opțiuni decât numărul maxim permis.",
    },
    review_errors: {
      overvote: "Ați selectat prea multe opțiuni.",
      undervote_below_min:
        "Trebuie să selectați cel puțin {min_marks} opțiune(i) pentru a continua.",
    },
    review_warnings: {
      undervote_between:
        "Ați selectat mai puține opțiuni decât numărul maxim permis. Puteți continua sau selecta mai multe.",
      blank_vote:
        "Nu ați selectat nicio opțiune în acest concurs. Dacă continuați, acest concurs va fi trimis fără o selecție.",
      overvote: "Ați selectat mai multe opțiuni decât numărul maxim permis.",
    },
    alert: {
      proceed_anyway: "Continuați oricum",
      go_back: "Înapoi",
      confirmation_title: "Confirmați",
    },
  },
  ru: {
    select_exactly: "Выберите варианты {min_marks}.",
    select_multiple: "Выберите между вариантами {min_marks} и {max_marks}.",
    select_multiple_with_exclusives:
      "Выберите между вариантами {min_marks} и {max_marks}. Или выберите один (1) эксклюзивный вариант.",
    select_single: "Выберите один (1) вариант.",
    selected: "Выбрано: {selected}",
    go_to_bottom: "Перейдите в нижнюю часть",
    remaining_credits: "Оставшиеся голосовые кредиты:",
    error_modal_title: "Ошибка",
    error_modal_dismiss: "Закрыть",
    errors: {
      exceeded_list_limit:
        "Ваш выбор превысил максимальное количество вариантов, которые могут быть в списке {list_name}. Выберите максимальное количество параметров: {max_list_marks} в этом списке.",
      too_many: "Выбрано слишком много вариантов.",
      blank:
        "Воздержавшийся голос является эксклюзивным и не может объединяться с другими вариантами.",
      write_in_required: "Вы должны указать хотя бы одну партию, когда выбрано «Записать в».",
      write_in_too_long: "Записанное значение слишком длинное. Попытайтесь сократить его.",
      write_in_not_supported:
        "Разрешается использовать только буквы, цифры и следующие специальные символы: '{',.()?!@€£¥'}",
      write_in_empty: "Значение для записи не может быть пустым.",
      exclusive: "Неверная комбинация опций.",
      cross_party_voting:
        "Ваш выбор включал более одного списка. Пожалуйста, выбирайте только в пределах одного списка.",
      too_many_credits:
        "Ваш выбор голосов превышает количество доступных голосовых кредитов для распределения. Пожалуйста, скорректируйте свой выбор.",
      undervote_below_min:
        "Вы должны выбрать как минимум {min_marks} вариант(ов), чтобы продолжить.",
      overvote: "Вы выбрали слишком много вариантов.",
    },
    warnings: {
      undervote_between:
        "Вы выбрали меньше максимально допустимого количества вариантов. Вы можете продолжить или выбрать больше.",
      blank_vote:
        "Вы не выбрали ни одного варианта в этом конкурсе. Если вы продолжите, этот конкурс будет отправлен без выбора.",
      overvote: "Вы выбрали больше максимально допустимого количества вариантов.",
    },
    review_errors: {
      overvote: "Вы выбрали слишком много вариантов.",
      undervote_below_min:
        "Вы должны выбрать как минимум {min_marks} вариант(ов), чтобы продолжить.",
    },
    review_warnings: {
      undervote_between:
        "Вы выбрали меньше максимально допустимого количества вариантов. Вы можете продолжить или выбрать больше.",
      blank_vote:
        "Вы не выбрали ни одного варианта в этом конкурсе. Если вы продолжите, этот конкурс будет отправлен без выбора.",
      overvote: "Вы выбрали больше максимально допустимого количества вариантов.",
    },
    alert: {
      proceed_anyway: "Продолжить в любом случае",
      go_back: "Вернуться",
      confirmation_title: "Подтвердить",
    },
  },
  sv: {
    select_exactly: "Välj {min_marks} alternativ.",
    select_multiple: "Välj mellan {min_marks} och {max_marks} alternativ.",
    select_multiple_with_exclusives:
      "Välj mellan {min_marks} och {max_marks} alternativ. Eller välj ett (1) exklusivt alternativ.",
    select_single: "Välj ett (1) alternativ.",
    selected: "Valda: {selected}",
    go_to_bottom: "Gå till botten",
    remaining_credits: "Återstående röstpoäng:",
    error_modal_title: "Fel",
    error_modal_dismiss: "Stäng",
    errors: {
      exceeded_list_limit:
        "Ditt val överskred det maximala antalet alternativ som kan finnas på listan {list_name}. Välj max {max_list_marks} alternativ per den här listan",
      too_many: "För många alternativ är valda.",
      blank: "Blank är exklusiv och kan inte kombineras med andra alternativ.",
      write_in_required: "Du måste ange minst ett parti när 'write-in-kandidat' är vald.",
      write_in_too_long: "Write-in-värdet är för långt. Försök korta ner det.",
      write_in_not_supported:
        "Endast bokstäver, siffror och följande specialtecken är tillåtna: '{',.()?!@€£¥'}",
      write_in_empty: "Inskrivningsvärdet kan inte vara tomt.",
      exclusive: "Ogiltig kombination av alternativ.",
      cross_party_voting: "Ditt urval inkluderade mer än en lista. Välj endast inom en enda lista.",
      too_many_credits:
        "Ditt röstval överstiger antalet tillgängliga röstpoäng att fördela. Justera ditt val.",
      undervote_below_min: "Du måste välja minst {min_marks} alternativ för att fortsätta.",
      overvote: "Du har valt för många alternativ.",
    },
    warnings: {
      undervote_between:
        "Du har valt färre alternativ än det maximalt tillåtna antalet. Du kan fortsätta eller välja fler.",
      blank_vote:
        "Du har inte valt något alternativ i denna tävling. Om du fortsätter kommer denna tävling att skickas in utan ett val.",
      overvote: "Du har valt fler alternativ än det maximalt tillåtna antalet.",
    },
    review_errors: {
      overvote: "Du har valt för många alternativ.",
      undervote_below_min: "Du måste välja minst {min_marks} alternativ för att fortsätta.",
    },
    review_warnings: {
      undervote_between:
        "Du har valt färre alternativ än det maximalt tillåtna antalet. Du kan fortsätta eller välja fler.",
      blank_vote:
        "Du har inte valt något alternativ i denna tävling. Om du fortsätter kommer denna tävling att skickas in utan ett val.",
      overvote: "Du har valt fler alternativ än det maximalt tillåtna antalet.",
    },
    alert: {
      proceed_anyway: "Fortsätt ändå",
      go_back: "Gå tillbaka",
      confirmation_title: "Bekräfta",
    },
  },
  zh: {
    select_exactly: "Select {min_marks} options.",
    select_multiple: "Select between {min_marks} and {max_marks} options.",
    select_multiple_with_exclusives:
      "Select between {min_marks} and {max_marks} options. Or select one (1) exclusive option.",
    select_single: "Select one (1) option.",
    selected: "Selected: {selected}",
    go_to_bottom: "Go to the bottom",
    remaining_credits: "剩余投票积分：",
    error_modal_title: "错误",
    error_modal_dismiss: "关闭",
    errors: {
      too_many: "Too many options selected.",
      blank: "Blank is exclusive and cannot be combined with other options.",
      write_in_required:
        "You are required to specify at least a party when 'Write in' is selected.",
      write_in_too_long: "The write in value is too long. Try to reduce its length.",
      write_in_not_supported:
        "Only letters, numbers, and the following special characters are allowed: '{',.()?!@€£¥'}",
      write_in_empty: "The write-in value cannot be empty.",
      exceeded_list_limit:
        "Your selection exceeded the maximum amount of options that can be on {list_name} list. Please select max {max_list_marks} options per this list",
      exclusive: "Exclusive options cannot be combined with other options.",
      cross_party_voting:
        "Your selection included more than one list. Please select only within a single list.",
      too_many_credits: "您的投票选择超过了可分配的语音积分数量。请调整您的选择。",
      undervote_below_min: "您必须至少选择{min_marks}个选项才能继续。",
      overvote: "您选择了过多的选项。",
    },
    warnings: {
      undervote_between: "您选择的选项少于最大允许数量。您可以继续或选择更多。",
      blank_vote: "您未在此竞赛中选择任何选项。如果继续，此竞赛将在未作选择的情况下提交。",
      overvote: "您选择的选项超过了最大允许数量。",
    },
    review_errors: {
      overvote: "您选择了过多的选项。",
      undervote_below_min: "您必须至少选择{min_marks}个选项才能继续。",
    },
    review_warnings: {
      undervote_between: "您选择的选项少于最大允许数量。您可以继续或选择更多。",
      blank_vote: "您未在此竞赛中选择任何选项。如果继续，此竞赛将在未作选择的情况下提交。",
      overvote: "您选择的选项超过了最大允许数量。",
    },
    alert: {
      proceed_anyway: "仍然继续",
      go_back: "返回",
      confirmation_title: "确认",
    },
  },
};

export default translations;
