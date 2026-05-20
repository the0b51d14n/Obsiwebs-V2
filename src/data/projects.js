/* ===================================================================
   PROJETS — Données du portfolio
   -------------------------------------------------------------------
   Pour AJOUTER un projet : copie un objet, change les champs, ajoute-le
   au tableau. Le carrousel se met à jour tout seul.

   Champs :
   - id        : identifiant unique (texte court, sans espace)
   - kind      : nature du projet (affiché en petit au-dessus du titre)
   - title     : nom du projet
   - status    : 'live' (en ligne) | 'wip' (en cours) | 'private' (dépôt seulement)
   - statusLabel : texte affiché dans le badge
   - desc      : description courte (2-3 phrases max)
   - stack     : tableau de technos
   - image     : chemin de la capture (dans /public/assets/) ou null
   - links     : { label, url, type: 'live'|'repo'|'none' }
   =================================================================== */

export const projects = [
  {
    id: 'supinfo-tv',
    kind: 'Projet d\'école et conception individuelle',
    title: 'Supinfo.TV - V2',
    status: 'private',
    statusLabel: 'Dépôt GitHub',
    desc: 'Plateforme de vidéo à la demande. L\'utilisateur arrive sur un film mis en avant, puis d\u00e9couvre des carrousels de sorties r\u00e9centes et de films populaires. Chaque fiche affiche le titre, l\'affiche r\u00e9cup\u00e9r\u00e9e via l\'API TMDB, un prix calcul\u00e9 par un algorithme d\u00e9di\u00e9, et un lien vers la bande-annonce officielle.',
    contribution: 'Schéma de base de donn\u00e9es con\u00e7u sur papier avant la moindre requ\u00eate, comptes clients, int\u00e9gration de l\'API TMDB, algorithme de tarification. Premier vrai contact avec le back-end et la conteneurisation \u2014 PHP et Docker appris en autonomie via les documentations officielles.',
    stack: ['PHP', 'MySQL', 'Docker', 'API TMDB'],
    image: '/assets/Supinfo.TV.png',
    links: [
      { label: 'Voir le code', url: 'https://github.com/the0b51d14n/Supinfo.TV-V2', type: 'repo' },
    ],
  },
  {
    id: 'tresor-des-sens',
    kind: 'Projet client — conception individuelle',
    title: 'Au Trés\'Or des Sens',
    status: 'wip',
    statusLabel: 'Mise en ligne prévue',
    desc: "Premier projet réalisé pour une vraie cliente : le site vitrine d'une entreprise de massages à domicile. Une page unique, navigation fluide, prise de rendez-vous dès le hero, fidèle à l'univers apaisant de l'activité.",
    contribution: "Le défi n'était pas technique mais humain : travailler une direction artistique douce et chaleureuse, à l'opposé de mon style sombre et futuriste. Comprendre la vision d'une cliente et la traduire fidèlement — ma première expérience de la relation client.",
    stack: ['HTML', 'CSS', 'JavaScript'],
    image: '/assets/ATDS.png',
    links: [
      { label: 'Bientôt en ligne', url: '', type: 'none' },
    ],
  },
  {
    id: 'obsiwebs',
    kind: 'Projet personnel',
    title: 'Obsiwebs \u2014 Portfolio',
    status: 'live',
    statusLabel: 'En ligne',
    desc: 'Mon portfolio, et mon terrain d\u2019exp\u00e9rimentation. Site en page unique, sombre et futuriste, articul\u00e9 autour d\u2019une sc\u00e8ne anim\u00e9e en canvas. La version que vous lisez est la V2 \u2014 refonte compl\u00e8te, direction artistique \u00ab obsidienne \u00bb, architecture repens\u00e9e.',
    contribution: 'Cr\u00e9er de z\u00e9ro une animation canvas cr\u00e9dible en partant de peu de connaissances. La le\u00e7on d\u00e9passe la technique : en r\u00e9alisant la V1, je pensais avoir fait le tour de mes comp\u00e9tences \u2014 je me trompais. Savoir reprendre son propre travail d\u2019un \u0153il critique est l\u2019apprentissage le plus utile que j\u2019en tire.',
    stack: ['React', 'Canvas API', 'CSS'],
    image: '/assets/obsiwebsV1.png',
    links: [
      { label: 'Voir le site', url: 'https://obsiwebs-v1.vercel.app/', type: 'repo' },
    ],
  },
];
