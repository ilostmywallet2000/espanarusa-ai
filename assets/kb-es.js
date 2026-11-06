/* Base de conocimiento de Sol en español (modo demo + apoyo al modo en directo).
   Orientación general a 2025–2026; el asistente siempre recomienda confirmar los detalles con un especialista. */
window.ER_KB = [
{ id:"nie", title:"NIE: número de extranjero", keys:["nie","número de identidad","numero de identidad","número de extranjero","identificación"],
  a:`El **NIE** (Número de Identidad de Extranjero) es tu número personal en España. Sin él no puedes comprar vivienda, abrir una cuenta completa ni firmar contratos.

#### Cómo obtenerlo
1. **Pide cita previa** en la Policía / Oficina de Extranjería, o solicítalo en el consulado de España en tu país.
2. **Rellena el formulario EX-15** y paga la tasa **modelo 790, código 012** (unos 12 €).
3. **Lleva**: pasaporte y copia, foto y el documento que justifica la solicitud (contrato de arras, oferta de trabajo, estudios, etc.).

**Plazos:** en España suele entregarse el mismo día o en 1–3 semanas. Lo difícil es conseguir cita.

Si lo necesitas, los gestores de «España en ruso» se encargan de la cita y te acompañan.`,
  svc:["nie"], link:["Hispanopedia: documentos","pedia.html#docs"] },
{ id:"padron", title:"Empadronamiento", keys:["padron","padrón","empadron","empadronamiento","registro municipal"],
  a:`El **empadronamiento** es la inscripción en el registro del **ayuntamiento** donde vives. Se necesita para el colegio, la sanidad, muchos permisos de residencia y trámites fiscales.

#### Qué necesitas
- pasaporte (y NIE/TIE si lo tienes);
- contrato de alquiler o escritura; si vives con conocidos, su autorización y copia de su documento;
- cita en el ayuntamiento (en muchas ciudades, online).

Recibirás un **volante** o **certificado de empadronamiento**. Para trámites suele valer unos 3 meses, así que pídelo cerca de la fecha de presentación.`,
  svc:["docs"], link:["Hispanopedia: documentos","pedia.html#docs"] },
{ id:"nolucrativa", title:"Residencia no lucrativa", keys:["no lucrativa","sin trabajar","jubilad","pensionista","rentas","residencia pasiva"],
  a:`La **residencia no lucrativa** es para quien vive de sus propios medios, sin trabajar en España.

#### Requisitos clave
- **Medios económicos:** al menos el **400% del IPREM** para el titular (orientativo: unos **2 400 € al mes**, ~28 800 € al año) y **+100% del IPREM** (~600 €/mes) por cada familiar. El IPREM se actualiza: consulta las cifras vigentes.
- **Seguro médico privado** de una compañía española, **sin copagos**.
- **Certificado de antecedentes penales** apostillado y traducido, y certificado médico.
- Se presenta normalmente **en el consulado** del país de residencia.

Con este permiso no se puede trabajar en España; el teletrabajo para empresas extranjeras es un punto discutible: mejor valorar el visado de nómada digital.`,
  svc:["vnzh","insurance"], link:["Inmigración a España","pedia.html#immigration"] },
{ id:"nomad", title:"Visado de nómada digital", keys:["nómada","nomada","nomad","teletrabajo","remoto","freelance","autónomo extranjero","informático"],
  a:`El **visado de nómada digital** (Ley de Startups) es para quien trabaja en remoto para empresas o clientes **fuera de España**.

#### Condiciones principales
- Ingresos de unos **200% del SMI** (orientativo: ~2 700–2 800 € al mes), **+75% del SMI** por el primer familiar y **+25%** por cada uno más.
- **Titulación universitaria** relacionada o **3 años de experiencia**.
- La empresa o los clientes existen **desde hace al menos un año** y el trabajo es realmente remoto; los clientes en España, como máximo el **20%** de los ingresos (para autónomos).
- Antecedentes penales limpios y seguro médico.

**Ventaja:** se puede pedir el régimen fiscal especial (**Ley Beckham**): 24% sobre ingresos de hasta 600 000 €.

Se solicita en el consulado o estando legalmente en España. ¿Quieres que un abogado revise tu caso?`,
  svc:["vnzh","tax"], link:["Inmigración a España","pedia.html#immigration"] },
{ id:"golden", title:"Golden visa", keys:["golden","visa de oro","inversión","inversion","residencia por compra"],
  a:`La **«golden visa» por inversión inmobiliaria en España está suprimida**: no se admiten nuevas solicitudes desde el **3 de abril de 2025**.

#### Alternativas
- **Residencia no lucrativa**, si tienes ingresos pasivos;
- **visado de nómada digital**, para el teletrabajo;
- **residencia de emprendedor / profesional altamente cualificado**;
- **estudios**, con posterior modificación.

Los extranjeros pueden seguir comprando vivienda, pero la compra ya no da la residencia por sí misma.`,
  svc:["vnzh","realtor"], link:["Inmigración a España","pedia.html#immigration"] },
{ id:"mortgage", title:"Hipoteca en España", keys:["hipoteca","préstamo","prestamo","euribor","financiación","financiacion"],
  a:`La **hipoteca en España** está disponible para residentes y no residentes.

#### Referencias
- A **no residentes** los bancos suelen financiar el **60–70%** del valor; a **residentes**, hasta el **80%**.
- Tipo **fijo, variable (Euríbor + diferencial) o mixto**. Plazo de hasta 25–30 años.
- Necesitarás: NIE, justificantes de ingresos, declaraciones de la renta, extractos e historial crediticio.

#### No olvides los gastos adicionales
En segunda mano, el **ITP** (según la comunidad, aproximadamente **6–10%**; en Cataluña, 10%); en obra nueva, **IVA 10%** + AJD. Además, notaría, registro y tasación. Calcula un **10–14%** sobre el precio.

Puedes calcular la cuota en la sección [Inmobiliaria](realestate.html#calc).`,
  svc:["mortgage","realtor"], link:["Calculadora de hipoteca","realestate.html#calc"] },
{ id:"buy", title:"Comprar vivienda", keys:["comprar piso","comprar casa","compra","vivienda","inmueble","piso"],
  a:`**Comprar vivienda en España**, paso a paso:

1. **NIE** y cuenta en un banco español.
2. **Búsqueda y verificación**: **nota simple** del Registro (deudas, cargas, obras ilegales).
3. **Contrato de arras**, normalmente del 10%.
4. **Escritura ante notario** e inscripción en el Registro.
5. **Impuestos:** ITP 6–10% (segunda mano) o IVA 10% + AJD (obra nueva) y, después, el IBI anual.

Te recomiendo que un abogado lo revise **antes** de pagar las arras. Puedo buscarte un especialista entre los colaboradores del portal.`,
  svc:["realtor","legal"], link:["Inmobiliaria","realestate.html"] },
{ id:"rent", title:"Alquiler de vivienda", keys:["alquil","arrend","inquilin","alquiler"],
  a:`**Alquilar vivienda en España**, lo esencial:

- Contrato de larga duración según la **LAU**: el inquilino puede prorrogar hasta **5 años** (7 si el propietario es una empresa).
- **Fianza** de 1 mes, más garantías adicionales de hasta 2 meses.
- Desde 2023, los **honorarios de la agencia** los paga el propietario por ley.
- En **zonas tensionadas** (por ejemplo, **Barcelona**) hay topes de precio.
- Suelen pedir: NIE/pasaporte, contrato de trabajo o extractos y, a veces, aval bancario.

Consejo: no transfieras dinero antes de ver el piso y comprobar al propietario con la **nota simple**.`,
  svc:["realtor"], link:["Anuncios de alquiler","ads.html"] },
{ id:"tax", title:"Residencia fiscal", keys:["impuesto","residente fiscal","residencia fiscal","183","irpf","720","declaración","declaracion","hacienda"],
  a:`Eres **residente fiscal en España** si pasas en el país **más de 183 días** al año **o** aquí está el centro de tus intereses (negocio, familia).

#### Qué implica
- Declaración del **IRPF** por la renta mundial (en primavera–verano, por el año anterior).
- **Modelo 720**: declaración informativa de bienes en el extranjero de más de **50 000 €** por categoría.
- Impuesto sobre el Patrimonio en algunas comunidades si el patrimonio es elevado.

Los no residentes con vivienda pagan el **IRNR** (modelo 210). Cada caso fiscal es distinto: mejor consultarlo con un asesor.`,
  svc:["tax"], link:["Hispanopedia: impuestos","pedia.html#tax"] },
{ id:"autonomo", title:"Autónomo en España", keys:["autonomo","autónomo","negocio","empresa","sociedad","sl ","emprender"],
  a:`Ser **autónomo** es la forma más sencilla de trabajar por cuenta propia en España.

#### Cómo darse de alta
1. En **Hacienda**: modelo **036/037** y epígrafe de actividad (IAE).
2. En la Seguridad Social: régimen **RETA**.
3. Después, declaraciones trimestrales de **IVA** e **IRPF**.

Desde 2023 las **cuotas** dependen de los ingresos reales; para quien empieza existe la **tarifa plana** (unos 80 €/mes el primer año; consulta las condiciones vigentes).

Necesitas un permiso que te autorice a trabajar. Para negocios más grandes suele convenir una **SL**. Una gestoría cuesta normalmente 50–150 € al mes.`,
  svc:["business","tax"], link:["Tienda de servicios: empresa","services.html"] },
{ id:"school", title:"Colegios y guarderías", keys:["colegio","escuela","guarder","hijo","niño","nino","estudi","universidad","educación","educacion"],
  a:`En España hay tres tipos de **colegios**:

- **Públicos**: gratuitos, en español (en Cataluña, principalmente en catalán).
- **Concertados**: financiados en parte por el Estado, económicos.
- **Privados e internacionales**: programas británico, americano o francés, desde ~600 hasta más de 1 500 € al mes.

#### Cómo matricularse en uno público
- Necesitas el **padrón**: el colegio depende de la zona.
- La **preinscripción** principal es en primavera; durante el curso, según plazas libres.

¿Quieres que te proponga opciones según tu ciudad y la edad de tu hijo?`,
  svc:["school","university"], link:["Hispanopedia: educación","pedia.html#edu"] },
{ id:"health", title:"Sanidad y seguros", keys:["médico","medico","sanidad","seguro","hospital","tarjeta sanitaria","salud","clínica","clinica"],
  a:`**La sanidad en España:**

- **Pública**: gratuita si trabajas o cotizas, o por otras vías. Hay que pedir la **tarjeta sanitaria** en tu centro de salud (CAP); necesitarás el padrón.
- **Seguro privado** (Sanitas, Adeslas, DKV, Asisa, etc.): desde ~50–100 € al mes por adulto. Para la residencia suele exigirse un seguro **sin copagos**.

En una emergencia, llama al **112**: atienden a todos, también a turistas.

En el catálogo del portal hay **médicos que hablan ruso**; te puedo orientar.`,
  svc:["insurance","doctor"], link:["Hispanopedia: sanidad","pedia.html#health"] },
{ id:"driving", title:"Carné de conducir", keys:["carné","carnet","conducir","coche","dgt","canje","permiso de conducir"],
  a:`**El carné de conducir en España:**

- Los turistas pueden conducir con su permiso extranjero, pero **tras 6 meses de residencia** se necesita el español.
- El **canje** solo es posible con países que tienen convenio con España. Con **Rusia** no lo hay: hay que sacarse el carné de nuevo (teórico y práctico en autoescuela).
- Para algunos países (por ejemplo, Ucrania) sí está previsto: consulta las condiciones vigentes en la **DGT**.

Hay autoescuelas en ruso; te paso contactos.`,
  svc:["auto"], link:["Tienda de servicios: conductores","services.html"] },
{ id:"bank", title:"Cuenta bancaria", keys:["banco","cuenta","tarjeta","transferencia"],
  a:`**Cuenta en un banco español:**

- A **no residentes** se les abre con pasaporte y NIE (a veces, pasaporte y certificado de no residencia).
- A **residentes**, con la TIE.
- Para **ciudadanos rusos** rigen las sanciones de la UE (por ejemplo, la prohibición de aceptar depósitos superiores a **100 000 €** de ciudadanos rusos sin residencia en la UE), y los bancos revisan a fondo el origen de los fondos.

Consejo: prepara de antemano la justificación del origen del dinero; agilizará la apertura.`,
  svc:["docs","legal"], link:["Hispanopedia: finanzas","pedia.html#tax"] },
{ id:"citizenship", title:"Nacionalidad española", keys:["nacionalidad","ciudadanía","ciudadania","pasaporte español","dele","ccse"],
  a:`La **nacionalidad española** se obtiene, por regla general, tras **10 años** de residencia legal y continuada (2 años para ciudadanos de Iberoamérica y algunos otros países, 5 para refugiados y 1 en caso de matrimonio con español/a).

#### Exámenes
- **DELE A2**: lengua española (si no es tu lengua materna);
- **CCSE**: conocimientos constitucionales y socioculturales.

En general, España **no admite la doble nacionalidad** con la mayoría de países: al naturalizarse se exige renunciar a la anterior (en la práctica hay matices).`,
  svc:["citizenship","legal"], link:["Inmigración a España","pedia.html#immigration"] },
{ id:"weekend", title:"Agenda y ocio", keys:["fin de semana","qué hacer","que hacer","agenda","concierto","exposición","festival","ocio","fiesta","excursión","excursion","niños"],
  a:`En España siempre hay planes para el fin de semana. Ahora en la **Agenda**:

- **Fira de Santa Llúcia** junto a la catedral de Barcelona, de finales de noviembre al 23 de diciembre;
- **conciertos en el Palau de la Música** y veladas de órgano;
- **rutas gastronómicas** por mercados: Boqueria, Sant Antoni, Mercado de San Miguel;
- **excursiones en ruso**: Barrio Gótico, Montserrat, Girona.

Dime la ciudad y lo que te gusta, y te preparo el plan del fin de semana.`,
  svc:["tour"], link:["Abrir la agenda","afisha.html"] }
];

/* Catálogo de servicios */
window.ER_SERVICES = [
 {id:"nie", cat:"Documentos", title:"NIE llave en mano", d:"Cita, formularios y acompañamiento"},
 {id:"docs", cat:"Documentos", title:"Trámite y legalización de documentos", d:"Apostilla, traducciones, padrón, certificados"},
 {id:"vnzh", cat:"Inmigración", title:"Residencia: elección de vía y solicitud", d:"No lucrativa, nómada digital, emprendedor"},
 {id:"citizenship", cat:"Nacionalidad", title:"Nacionalidad española", d:"Preparación del expediente, DELE A2 y CCSE"},
 {id:"insurance", cat:"Sanidad", title:"Seguro médico para la residencia", d:"Pólizas sin copago, válidas para el consulado"},
 {id:"doctor", cat:"Sanidad", title:"Médico que habla ruso", d:"Cita con especialista, interpretación en consulta"},
 {id:"school", cat:"Educación", title:"Elección de colegio y guardería", d:"Públicos, privados e internacionales"},
 {id:"university", cat:"Educación", title:"Acceso a universidades españolas", d:"Homologación, visado de estudios"},
 {id:"realtor", cat:"Inmobiliaria", title:"Búsqueda y verificación de inmuebles", d:"Búsqueda, nota simple, negociación, compraventa"},
 {id:"mortgage", cat:"Inmobiliaria", title:"Hipoteca para no residentes", d:"Análisis, cálculo y documentos para el banco"},
 {id:"legal", cat:"Jurídicos", title:"Consulta con abogado", d:"Abogados que hablan ruso, online y presencial"},
 {id:"tax", cat:"Empresa", title:"Asesoría fiscal", d:"Residencia fiscal, IRPF, modelo 720, Ley Beckham"},
 {id:"business", cat:"Empresa", title:"Alta de autónomo o SL", d:"Alta, gestoría, primeras declaraciones"},
 {id:"auto", cat:"Conductores", title:"Carné y coche", d:"Autoescuela en ruso, matriculación"},
 {id:"tour", cat:"Turismo", title:"Excursiones en ruso", d:"Barcelona, Madrid, Montserrat, Girona"},
 {id:"translate", cat:"Traducciones", title:"Traducción jurada", d:"Traductor jurado, urgente y con envío"}
];
