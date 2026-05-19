import React, { useState, useRef } from "react";

// ─────────────────────────────────────────────────────────────────
// STYLE EXAMPLES
// Original bars written IN THE SPIRIT of each artist.
// Claude uses these as a style compass — never reproduces them.
// 4 examples × 25 artists = 100 original bars total.
// ─────────────────────────────────────────────────────────────────
const STYLE_EXAMPLES = {
  "kendrick-lamar": [
    "I wear my city like a crown that weighs a thousand generations down",
    "They say be humble but the hunger never let me sit — I rose from concrete wrestling with the infinite",
    "Every mirror shows a different man, every victory a different plan / I am not your savior — I'm the question you never dared to ask",
    "The wound heals slow when nobody names it / The king bleeds too, he just learned how to contain it",
  ],
  "drake": [
    "I know you moved on and I know that's fair / But late nights still catch me thinking 'bout the way you'd fix my hair",
    "Started with a dream and a phone full of numbers / Now the only ones I call are the ones there in the hunger",
    "You said I changed, baby maybe that's true / But the version you're missing wasn't really built for you",
    "Six side raised me, gave me everything and nothing / Now I'm writing from a penthouse 'bout the people I was loving",
  ],
  "eminem": [
    "I dissect the dialect, intellect reflects / Every syllable selected — architecturally correct",
    "They said I'd never make it past the 8 Mile sign / I made it past the finish line and redesigned the paradigm",
    "Double-time the timeline, rewind and find / The rhyme inside the rhyme inside the mind I left behind",
    "I'm the storm they didn't forecast, the last laugh in the forecast / Outlasted every outcast, they ran out fast — I outlast",
  ],
  "jay-z": [
    "I built an empire from the corner, now the corner is a story / Every brick I laid was borrowed from tomorrow's glory",
    "They measure men in money but the ledger never lies / The richest man I know is broke behind the eyes",
    "Marcy made me, Brooklyn shaped the blade / Now I sit at tables where the kings get paid",
    "I don't chase — I position. I don't beg — I listen / Every room I walk in shifts because of the decisions",
  ],
  "j-cole": [
    "I came from nothing and I'll say it every chance I get / Not for the applause — so the ones like me don't forget",
    "Fame is just a mirror that makes everything look big / Till you look too long and can't remember what you did",
    "My daughter's gonna ask me someday who her daddy was / I hope the answer isn't just a number on a chart",
    "They gave me platinum but I'm searching for the gold / The kind that doesn't tarnish when your story's fully told",
  ],
  "tupac": [
    "They built the walls and called it freedom, named the cage after a dream / But every mother on this block knows exactly what I mean",
    "I ain't perfect but I'm present, still fighting every dawn / The revolution wasn't broadcast — it just quietly went on",
    "Dear mama I made it but the making left a mark / Sometimes the brightest lights are born inside the dark",
    "They'll remember what I said long after I am gone / A thug is just a soldier that the system's stepping on",
  ],
  "biggie": [
    "Picture me rolling through the borough in the rain / Every block I passed had somebody else's pain on it",
    "I came up slow but I came up sure / The throne ain't given — you go through the door",
    "Born in the borough where the hustle never sleeps / The price of every dream is paid in sleepless weeks",
    "They asked me how I made it — I said I watched and waited / Studied every angle till the game was fully translated",
  ],
  "travis-scott": [
    "*floating through the city lights* [yeah] the neon hit different at this height [LaFlame]",
    "Astronomical the way I ride the wave / *every night a rager* every morning just a haze [straight up]",
    "[BEAT SWITCH] Touch down in another dimension / *gravity don't apply* when you move with intention",
    "*Astroworld forever* in my veins [yeah] / Can't come down now — I'm addicted to the rain [woo]",
  ],
  "nicki-minaj": [
    "They counted me out — now they counting up my figures / [Roman voice] I'm the monster in the mirror that delivers",
    "Pink on everything, heart cold as the winter / Every bar I spit lands like a heavyweight splinter",
    "[Barbie mode] I don't compete — I redefine the ceiling / Every queen needs a crown — I'm just revealing",
    "Multi-syllabic, acrobatic, automatic — flow so drastic it's dramatic, problematic for the static",
  ],
  "lil-wayne": [
    "I'm so far ahead they think I'm somewhere else / The only competition standing here is myself",
    "Real G's move in silence like a library / My flow's so cold it needs a glossary",
    "Life's a gamble but I always flip the card right / Hard nights turned to bright lights — call it starlight",
    "I said I was the best and then I proved it twice / Now they quoting all my bars like Sunday morning rice",
  ],
  "cardi-b": [
    "I came from the bottom now the bottom's looking up at me / Used to count the quarters, now I'm counting luxuries",
    "Don't come for me unless I send for you — that's facts / I built this from the ground up and I'm never going back",
    "They said a girl like me couldn't own the game / Now every move I make they put it in a frame",
    "Bodied every room I walked in, never asked permission / From the Bronx to everywhere — that was always the mission",
  ],
  "21-savage": [
    "Came from nothing. Still remember.\nMoney on the table now. Everybody's friendlier.",
    "I don't talk much. The numbers speak.\nSlaughter gang forever. That's the only creed I keep.",
    "Lost some real ones on the way up.\nNow I move in silence — that's the only way up.",
    "They said I wouldn't last. I outlasted.\nEvery doubt they ever had — I outclassed it.",
  ],
  "nekfeu": [
    "Je trace mes vers comme des étoiles mortes — la lumière arrive après le silence",
    "Entre deux rimes je cache un univers / La rue m'a appris ce que les livres n'osent pas écrire",
    "S-Crew dans l'âme, cosmos dans la tête / Je cherche l'absolu dans une rime imparfaite",
    "Le flow posé comme une main sur l'épaule / Chaque mot pèse — rien n'est gratuit, tout est symbole",
  ],
  "lomepal": [
    "Je t'écris depuis le vide que t'as laissé / Les mots arrivent tard mais ils arrivent — c'est assez",
    "Paris la nuit ressemble à toi — belle et indifférente / Je marche entre les lumières avec une âme transparente",
    "Tu m'manques comme une chanson qu'on oublie le matin / Mais qui revient le soir quand y'a plus rien",
    "J'ai grandi trop vite ou pas assez — je sais pas / Je cherche encore ma place entre l'amour et le chaos",
  ],
  "big-flo-et-oli": [
    "On a tout misé sur la musique un soir de décembre / Deux frères, une scène — et le reste s'est construit en novembre",
    "La vraie vie c'est pas les stories ni les filtres / C'est ton rire dans la cuisine et les mots sans titre",
    "[Couplet 1] J'ai grandi sans grand-chose mais riche de l'essentiel\n[Couplet 2] Et moi pareil — Toulouse nous a appris ce qui est réel",
    "On dit qu'il faut souffrir pour mériter — peut-être / Mais on a choisi de chanter debout plutôt qu'à genoux",
  ],
  "orelsan": [
    "J'suis pas le héros de l'histoire — plutôt le type derrière / Qui regarde les gens courir et se demande où ils vont",
    "Y'a un gars dans ma rue qui rêvait de changer le monde / Maintenant il partage des posts et ça lui suffit — c'est profond",
    "On nous a dit que le bonheur s'achète en promotion / J'ai tout acheté — j'attends encore la livraison",
    "Caen m'a appris que le silence est aussi une réponse / Et que les grandes villes mangent les petits — sans rancune",
  ],
  "damso": [
    "Je suis l'ange et le démon dans le même souffle / Bruxelles m'a forgé dans le feu — j'en suis sorti double",
    "Tu voulais le paradis — je t'ai donné l'enfer avec une vue / Le beau et le laid coexistent — c'est ma vérité nue",
    "Mon âme est un battlefield où personne ne gagne vraiment / Je prie le matin et je doute le soir — c'est mon traitement",
    "Je t'aime comme une obsession — malsain mais réel / Entre nous deux y'a du sang séché et du ciel",
  ],
  "pnl": [
    "[Ademo] On est partis de rien — les Tarterêts dans le sang\n[N.O.S] *On voulait juste voler* [AutoTune] au-dessus du temps",
    "[N.O.S] *La nuit nous appartient* [AutoTune] — le jour nous tolère\n[Ademo] QLF jusqu'au bout — même quand tout s'efface",
    "[Ademo] J'ai vu des frères tomber sur ce bitume gris\n[N.O.S] *Je garde leurs sourires* [AutoTune] comme une mélodie",
    "[N.O.S] *Loin de la cité* [AutoTune] mais elle reste dans les veines\n[Ademo] On peut pas partir vraiment — elle est gravée dans nos peines",
  ],
  "sch": [
    "Marseille dans les yeux — Méditerranée dans le sang / Chaque bar que je pose est une scène qu'on tourne longtemps",
    "Froid comme la mer en janvier — précis comme un couteau / Je construis mon empire — pierre par pierre, mot par mot",
    "La vida es bella — mais la rue elle ment souvent / Je reste les yeux ouverts quand les autres dorment debout",
    "JVLIVS dans l'âme — cinéma dans la tête / Chaque punchline est un plan — chaque couplet est une épopée muette",
  ],
  "bekar": [
    "Je plie les syllabes — l'agilité c'est ma signature / Hip-hop dans les veines depuis la première écriture",
    "Les vrais reconnaissent les vrais — c'est phonétique / Chaque rime construite — rien d'anecdotique",
    "B-E-K-A-R — cinq lettres qui résument l'art / Flow technique, texte authentique — je suis là depuis le départ",
    "Je joue avec les sons comme un luthier avec ses cordes / Chaque calembour tissé — rien qui se démode",
  ],
  "corneille": [
    "Je suis venu de loin — l'exil m'a appris la force / Et dans chaque mélodie je porte ce que la douleur m'a offert",
    "L'amour est ma patrie quand les frontières ferment / Tu es le pays que je cherchais — ma paix, mon terme",
    "On reconstruit avec les ruines qu'on nous laisse / La beauté naît souvent là où tout se blesse",
    "Chante avec moi — même les âmes brisées ont une voix / La tienne mérite d'être entendue — je te le crois",
  ],
  "aznavour": [
    "Hier encore je croyais tenir le temps entre mes doigts / Aujourd'hui je compte les heures qui me glissent — c'est la loi",
    "L'amour s'en va comme une chanson qu'on fredonne à mi-voix / Il reste l'écho — et l'écho suffit parfois",
    "J'ai vécu mille vies dans une seule — c'est peu et c'est immense / La vieillesse est une récompense pour ceux qui ont aimé sans défense",
    "Paris garde tout en mémoire — les rues, les voix, les âmes / Et moi je garde Paris — dans chaque vers, dans chaque larme",
  ],
  "plk": [
    "Validé sans permission — j'ai construit à l'ancienne / Nuit après nuit à Paris — jusqu'à ce que ça tienne",
    "Les faux sourires je les vois de loin maintenant / J'ai appris à lire les gens — ça prend du temps mais ça vient",
    "Trap propre — pas de bruit inutile / Le silence avant le drop — c'est là que je m'installe",
    "Mon succès a un prix — j'ai payé cash / Les billets comptés au petit matin — pas de clash",
  ],
  "aupinard": [
    "Tu sais, les gens courent tellement vite qu'ils oublient pourquoi / Moi j'ai décidé de marcher — pour voir",
    "Y'a une beauté dans les choses simples qu'on rate à force de chercher le grand / Une tasse de thé chaud — c'est déjà quelque chose, tu comprends ?",
    "On nous dit d'être extraordinaires — mais l'ordinaire bien vécu c'est rare / Juste être là, présent, sans masque — c'est ça le beau côté",
    "Je t'écris pas pour avoir raison — juste pour qu'on réfléchisse ensemble / Parce que seul on pense vite — à deux on pense mieux",
  ],
  "tif": [
    "Je prends pas de place — j'occupe l'espace / Chaque mot que je pose, c'est ma présence qui s'affiche",
    "On m'a dit de me taire — j'ai répondu plus fort / La voix qu'on essaie d'éteindre brûle encore",
    "Femme libre — c'est tout ce que j'ai besoin d'être / Je me définis moi-même — j'ai pas besoin d'un titre",
    "Pas de filtre, pas d'excuses — juste moi / Et si ça dérange — c'est que ça touche juste",
  ],
};

// ─────────────────────────────────────────────────────────────────
// ARTIST KNOWLEDGE BASE
// To add a new artist: copy any entry below, fill in the fields,
// add it to ARTISTS_INTERNATIONAL or ARTISTS_FRENCH,
// and add 4 style examples to STYLE_EXAMPLES above.
// ─────────────────────────────────────────────────────────────────
const ARTISTS_INTERNATIONAL = [
  { id:"kendrick-lamar", name:"Kendrick Lamar", flag:"🇺🇸", origin:"Compton, CA, USA", genre:["Conscious Rap","West Coast Hip-Hop"], typicalBpm:87, bpmRange:{min:70,max:100}, flowType:"Variable — rapid triplet flows and slow deliberate delivery", rhymeScheme:"Complex multi-syllabic, internal rhymes, ABAB and AABB", deliveryStyle:"Controlled intensity, voice character shifts, spoken-word passages", coreThemes:["systemic racism","inner conflict and duality","Compton street life","Black identity","spiritual redemption","generational trauma"], signatureWords:["humble","DNA","Compton","crown","blood","loyalty","DAMN","mortal man"], songStructure:"Concept albums 4–7 min, multiple narrative layers", hookStyle:"Minimal, repetitive, single piercing phrase", verseLength:"16–32 bars, dense per line", literaryDevices:["extended metaphor","allegory","persona switches","stream of consciousness","biblical allusion"],
    referenceSongs:[{title:"HUMBLE.",bpm:150,note:"Hard trap, boastful but self-aware"},{title:"Alright",bpm:93,note:"Jazz-influenced, anthem, communal chorus"},{title:"Money Trees",bpm:73,note:"Slow-burn storytelling, two-character narrative"},{title:"m.A.A.d city",bpm:155,note:"Rapid-fire, cinematic Compton imagery"},{title:"Swimming Pools",bpm:79,note:"Peer pressure concept, sparse production"},{title:"DNA.",bpm:138,note:"Double-time, defiant identity declaration"},{title:"King Kunta",bpm:96,note:"Funk-influenced, historical references"},{title:"The Blacker the Berry",bpm:103,note:"Aggressive, internal contradiction"},{title:"Father Time",bpm:88,note:"Generational trauma, jazz textures"},{title:"Rich Spirit",bpm:86,note:"Minimalist, self-discipline"}],
    promptContext:"Write in Kendrick's style: multi-syllabic internal rhymes, alternate boastful bars with deep vulnerability, ground imagery in concrete vivid details. Include one extended metaphor. Vary line lengths deliberately. BPM 70–100 (87 avg). Verse: 16–24 bars. Hook: minimal, repetitive." },

  { id:"drake", name:"Drake", flag:"🇨🇦", origin:"Toronto, Canada", genre:["Hip-Hop","R&B","Pop Rap"], typicalBpm:100, bpmRange:{min:75,max:140}, flowType:"Melodic — seamlessly transitions between singing and rapping", rhymeScheme:"AABB dominant, simple sticky end rhymes", deliveryStyle:"Smooth, emotionally warm, AutoTune on melodic sections", coreThemes:["romantic vulnerability","loyalty and betrayal","Toronto pride","wealth and loneliness","past relationships"], signatureWords:["real one","6ix","Toronto","certified","feelings","hotline","forever","started"], songStructure:"Hook-driven, verse-chorus-verse, 3–4 min", hookStyle:"Melodic, highly repeatable, emotionally resonant", verseLength:"12–16 bars, conversational", literaryDevices:["direct address","narrative confession","name-dropping","contrast past vs now"],
    referenceSongs:[{title:"God's Plan",bpm:77,note:"Minimalist trap, generous narrative"},{title:"Hotline Bling",bpm:100,note:"Melodic accusation, massive pop appeal"},{title:"Started From the Bottom",bpm:138,note:"Hype anthem, rags-to-riches"},{title:"Marvin's Room",bpm:72,note:"Emotional drunk-dialing, sung verses"},{title:"Passionfruit",bpm:116,note:"Dancehall, long-distance love"},{title:"Hold On We're Going Home",bpm:100,note:"80s R&B, romantic"},{title:"Rich Flex",bpm:144,note:"Dark trap, wealth flexing"},{title:"Controlla",bpm:95,note:"Dancehall, sensual"},{title:"Best I Ever Had",bpm:76,note:"Affectionate, smooth"},{title:"Forever",bpm:135,note:"Competitive verse, ambition"}],
    promptContext:"Write in Drake's style: hook is the centerpiece — melodic, singable 4–8 lines. Write with emotional openness. Reference loyalty, success, romantic tension. Conversational phrasing. BPM 75–140 (100 avg). Hook-first format common." },

  { id:"eminem", name:"Eminem", flag:"🇺🇸", origin:"Detroit, MI, USA", genre:["Hip-Hop","Rap Rock","Conscious Rap"], typicalBpm:107, bpmRange:{min:85,max:220}, flowType:"Technical — double-time, triple-time, syllable-perfect", rhymeScheme:"Multisyllabic chains, internal rhymes stacked 4–6 words deep", deliveryStyle:"Urgent, theatrical, character voices, explosive emotional range", coreThemes:["personal trauma","alter ego Slim Shady","Detroit blue-collar identity","addiction and recovery","parenthood","battle rap dominance"], signatureWords:["Slim Shady","Detroit","8 Mile","Hailie","rhyme scheme","rap god","recovery"], songStructure:"Verse-heavy, long tracks 4–6 min", hookStyle:"Often sung by collaborators, sometimes comedic", verseLength:"24–32+ bars, ultra-dense", literaryDevices:["pun stacking","homophone chains","satirical persona","shock imagery","meta-commentary"],
    referenceSongs:[{title:"Rap God",bpm:148,note:"Technical masterpiece, fastest verse"},{title:"Lose Yourself",bpm:171,note:"Motivational anthem, one-shot concept"},{title:"The Way I Am",bpm:88,note:"Angry, raw emotion, heavy guitars"},{title:"Stan",bpm:75,note:"Epistolary narrative, dark fan obsession"},{title:"Without Me",bpm:121,note:"Comedic, arrogant return"},{title:"Not Afraid",bpm:100,note:"Recovery anthem, inspirational"},{title:"Mockingbird",bpm:76,note:"Heartfelt letter to daughter"},{title:"Godzilla",bpm:160,note:"Ultra-fast flow, hyperbolic"},{title:"Kim",bpm:98,note:"Theatrical horror narrative"},{title:"Criminal",bpm:90,note:"Dark humor, Slim Shady persona"}],
    promptContext:"Write in Eminem's style: stack internal rhymes — 3–5 syllable rhyme chains per line. Include a [Double Time] section. Use dark humor or shocking imagery that makes a serious point. Show technical mastery every bar. Include genuine vulnerability beneath the bravado. BPM 85–220 (107 avg)." },

  { id:"jay-z", name:"Jay-Z", flag:"🇺🇸", origin:"Brooklyn, NY, USA", genre:["Hip-Hop","East Coast","Luxury Rap"], typicalBpm:94, bpmRange:{min:80,max:115}, flowType:"Effortless, laid-back swagger — never seems to try hard", rhymeScheme:"ABAB and AABB, end-rhyme focused, clean and accessible", deliveryStyle:"Confident, measured, occasionally explosive", coreThemes:["hustler's ambition","Brooklyn origins","business empire","marital tensions","Black excellence","hip-hop legacy"], signatureWords:["Hov","Brooklyn","Roc Nation","empire","Marcy","billionaire","mogul","blueprint"], songStructure:"Classic verse-hook-verse, 3–5 min", hookStyle:"Memorable, often sung by collaborators", verseLength:"16 bars standard, every bar carries weight", literaryDevices:["extended metaphor","double entendre","historical name-dropping","bravado vs vulnerability"],
    referenceSongs:[{title:"Empire State of Mind",bpm:85,note:"New York anthem, aspirational"},{title:"99 Problems",bpm:98,note:"Rock-influenced, defiant, layered metaphor"},{title:"Izzo (H.O.V.A.)",bpm:100,note:"Triumphant, street-to-success"},{title:"The Story of O.J.",bpm:75,note:"Jazz sample, race and wealth commentary"},{title:"Ni**as in Paris",bpm:118,note:"Luxury trap, minimalist hook"},{title:"Family Feud",bpm:103,note:"Introspective, marital healing"},{title:"Big Pimpin'",bpm:100,note:"Carefree excess, summer anthem"},{title:"Hard Knock Life",bpm:96,note:"Musical sample, rags-to-riches"},{title:"Holy Grail",bpm:130,note:"Fame critique, Michael Jackson ref"},{title:"Dead Presidents II",bpm:90,note:"Early hustler narrative, jazz samples"}],
    promptContext:"Write in Jay-Z's style: effortless confidence, every bar feels inevitable. Use double entendres — business and street meanings in same line. Reference legacy, empire-building. Occasional vulnerability. BPM 80–115 (94 avg). 16-bar verses." },

  { id:"j-cole", name:"J. Cole", flag:"🇺🇸", origin:"Fayetteville, NC, USA", genre:["Conscious Rap","Southern Hip-Hop"], typicalBpm:86, bpmRange:{min:70,max:110}, flowType:"Conversational and poetic, deceptively simple then explosively complex", rhymeScheme:"Multi-syllabic internal rhymes, narrative-driven", deliveryStyle:"Calm and warm, builds to passionate intensity", coreThemes:["poverty and coming up","self-doubt","Black male vulnerability","fame's hollowness","Dreamville loyalty","fatherhood"], signatureWords:["Dreamville","Fayetteville","no features","platinum","Cole World","apparently","love yourz"], songStructure:"No-hook tracks common, long verses, storytelling arcs", hookStyle:"Minimal or absent — verses carry the song", verseLength:"24–32 bars, extended storytelling", literaryDevices:["personal anecdote as universal truth","second-person address","irony","quiet revelation at end of verse"],
    referenceSongs:[{title:"No Role Modelz",bpm:92,note:"Anti-fame, twin themes"},{title:"Love Yourz",bpm:78,note:"Minimalist, gratitude, anti-materialism"},{title:"Apparently",bpm:82,note:"Emotional, self-reflection"},{title:"January 28th",bpm:75,note:"Raw confession, no hook"},{title:"Middle Child",bpm:130,note:"Industry positioning, confident"},{title:"4 Your Eyez Only",bpm:80,note:"Long narrative, letter to a dead friend"},{title:"A Tale of 2 Citiez",bpm:130,note:"Hard trap, city inequality"},{title:"Wet Dreamz",bpm:70,note:"Humorous coming-of-age, vivid detail"},{title:"Kevin's Heart",bpm:94,note:"Marital fidelity struggle"},{title:"ATM",bpm:140,note:"Capitalist critique wrapped in flex"}],
    promptContext:"Write in J. Cole's style: deeply personal, builds slowly to truth. Use storytelling — character, scene, revelation. Avoid hollow flexing. Consider skipping the hook entirely. BPM 70–110 (86 avg). Long verses 24–32 bars." },

  { id:"tupac", name:"Tupac", flag:"🇺🇸", origin:"Harlem, NY / Oakland, CA", genre:["West Coast Hip-Hop","Conscious Rap"], typicalBpm:95, bpmRange:{min:85,max:110}, flowType:"Passionate and direct, spoken-word clarity, emotionally raw", rhymeScheme:"Clean AABB, accessible, narrative-driven", deliveryStyle:"Urgent, revolutionary, heart-on-sleeve", coreThemes:["Black poverty and oppression","mother's sacrifice","thug life","police brutality","loyalty and betrayal","mortality and legacy"], signatureWords:["thug life","dear mama","changes","California","Makaveli","ghetto","revolution","seeds"], songStructure:"Verse-heavy, emotional build, direct address ending", hookStyle:"Simple resonant truth — repeated, sung or spoken", verseLength:"16–24 bars, clear narrative arc", literaryDevices:["direct address to community","political manifesto style","biblical imagery","personal testimony as political statement"],
    referenceSongs:[{title:"Dear Mama",bpm:82,note:"Ode to mother, timeless tribute"},{title:"Changes",bpm:97,note:"Social commentary, reform theme"},{title:"Keep Ya Head Up",bpm:95,note:"Feminist message, uplifting"},{title:"California Love",bpm:104,note:"West Coast anthem, celebratory"},{title:"Me Against the World",bpm:88,note:"Paranoid, introspective, mortality"},{title:"Ambitionz Az a Ridah",bpm:100,note:"Aggressive, defiant"},{title:"All Eyez on Me",bpm:98,note:"Victory lap, confident"},{title:"Life Goes On",bpm:78,note:"Grief for fallen friends"},{title:"Hit Em Up",bpm:98,note:"Diss track, raw fury"},{title:"Unconditional Love",bpm:90,note:"Community love letter"}],
    promptContext:"Write in Tupac's style: speak truth like a revolutionary, feel it like a poet. Address someone directly — the community, a mother, the system. Mix street realism with spiritual uplift. Every verse should have a quote-worthy moment. BPM 85–110 (95 avg)." },

  { id:"biggie", name:"Biggie", flag:"🇺🇸", origin:"Brooklyn, NY, USA", genre:["East Coast Hip-Hop","Gangsta Rap"], typicalBpm:93, bpmRange:{min:85,max:105}, flowType:"Smooth, unhurried, effortlessly rhythmic — laid-back mastery", rhymeScheme:"Multi-syllabic AABB, internal rhymes, cinematic structure", deliveryStyle:"Deep baritone, conversational yet precise, Machiavellian cool", coreThemes:["Brooklyn street life","drug dealing and consequences","fame and paranoia","street respect","luxury and survival"], signatureWords:["Brooklyn","Junior MAFIA","sky's the limit","ready to die","Frank White","Bed-Stuy"], songStructure:"Verse-hook-verse, cinematic narrative arcs", hookStyle:"Smooth and memorable, often sung", verseLength:"16–24 bars, vivid scene-setting", literaryDevices:["cinematic scene-building","character POV","street-code philosophy","Machiavellian maxims"],
    referenceSongs:[{title:"Juicy",bpm:94,note:"Rags to riches, iconic narrative"},{title:"Big Poppa",bpm:86,note:"Smooth, romantic, quintessential cool"},{title:"Hypnotize",bpm:93,note:"Luxurious, confident"},{title:"Ten Crack Commandments",bpm:93,note:"Street code, Machiavellian wisdom"},{title:"Mo Money Mo Problems",bpm:110,note:"Fame paradox, disco sample"},{title:"Sky's the Limit",bpm:87,note:"Inspirational, posthumous"},{title:"Warning",bpm:92,note:"Paranoid storytelling"},{title:"Gimme the Loot",bpm:97,note:"Dual character voices, heist"},{title:"One More Chance",bpm:95,note:"Romantic flex, smooth hook"},{title:"Machine Gun Funk",bpm:96,note:"Aggressive, Brooklyn pride"}],
    promptContext:"Write in Biggie's style: smooth, cinematic, effortlessly cool. Tell a story — setting, characters, stakes. Use deep baritone pace — never rushed. Include street philosophy delivered like undeniable truth. BPM 85–105 (93 avg). Cinematic hook. 16–24 bar narrative verses." },

  { id:"travis-scott", name:"Travis Scott", flag:"🇺🇸", origin:"Houston, TX, USA", genre:["Psychedelic Trap","Cloud Rap"], typicalBpm:145, bpmRange:{min:130,max:160}, flowType:"Melodic mumble-to-clarity, atmospheric, rides the beat", rhymeScheme:"Loose, vibe-driven, prioritizes sound and feeling over rhyme", deliveryStyle:"Heavy AutoTune, pitch bending, stadium energy, ad-libs everywhere", coreThemes:["psychedelic experience","Houston street life","fame and paranoia","Astroworld nostalgia","luxury"], signatureWords:["rager","Astroworld","La Flame","it's lit","cactus jack","Jordan","fein"], songStructure:"Atmospheric intros, multiple beat switches within one track", hookStyle:"Melodic, repeated mantra-like phrases, AutoTune-heavy", verseLength:"8–16 bars, vibe-forward", literaryDevices:["sensory imagery","stream of consciousness","spatial metaphor","ad-lib as instrument"],
    referenceSongs:[{title:"SICKO MODE",bpm:155,note:"3 beat switches, era-defining"},{title:"Goosebumps",bpm:130,note:"Obsessive love, dark psychedelic trap"},{title:"Antidote",bpm:145,note:"Party anthem, loose flow"},{title:"STARGAZING",bpm:150,note:"Beat switch, emotional range"},{title:"Highest in the Room",bpm:140,note:"Dark melodic trap, floating"},{title:"Butterfly Effect",bpm:80,note:"Introspective, relationship theme"},{title:"90210",bpm:70,note:"Emotional ballad, sung sections"},{title:"Fein",bpm:138,note:"Minimalist, hypnotic, obsession"},{title:"OUT WEST",bpm:150,note:"High energy, rapid ad-libs"},{title:"Escape Plan",bpm:140,note:"Paranoia, eerie trap atmosphere"}],
    promptContext:"Write in Travis Scott's style: atmosphere over precision. Mark melodic lines with *asterisks* for AutoTune. Include ad-libs in [brackets]. Create a sonic journey. Include a [BEAT SWITCH] moment. BPM 130–160 (145 avg). Loose rhymes. Vibe first." },

  { id:"nicki-minaj", name:"Nicki Minaj", flag:"🇹🇹", origin:"Trinidad / Queens, NY", genre:["Hip-Hop","Pop Rap","Dancehall"], typicalBpm:115, bpmRange:{min:90,max:155}, flowType:"Rapid switchups — changes accent, character and speed within one verse", rhymeScheme:"Dense multi-syllabic, cartoon and comedic rhymes alongside hard bars", deliveryStyle:"Theatrical, character-based, feminine and fierce", coreThemes:["female rap dominance","Trinidadian heritage","luxury and sexuality","alter egos","industry rivalry"], signatureWords:["Barbie","Queens","Roman","pink","Young Money","anaconda","starships","megatron"], songStructure:"Pop-structured when commercial, rap-heavy on mixtapes", hookStyle:"Catchy and sing-songy, sometimes in character voice", verseLength:"16–24 bars with mid-verse flow switches", literaryDevices:["character persona","parody","sexual double entendre","speed contrast"],
    referenceSongs:[{title:"Super Bass",bpm:130,note:"Pop crossover, infectious hook, Barbie persona"},{title:"Monster",bpm:112,note:"Verse-only dominance"},{title:"Anaconda",bpm:130,note:"Sample flip, body positivity"},{title:"Chun-Li",bpm:140,note:"Hard rap, martial arts metaphor"},{title:"Moment 4 Life",bpm:76,note:"Emotional, gratitude, Drake collab"},{title:"Roman's Revenge",bpm:130,note:"Aggressive alter ego"},{title:"Pills N Potions",bpm:70,note:"Emotional, melodic, relationship pain"},{title:"Barbie Dreams",bpm:87,note:"Comedic, playful jabs"},{title:"FEFE",bpm:141,note:"Dark trap, punchy bars"},{title:"Starships",bpm:128,note:"EDM crossover, euphoric"}],
    promptContext:"Write in Nicki Minaj's style: theatrical, switching flows and characters mid-verse. Include at least one character shift ([Roman voice] or [Barbie mode]). Mix sexual confidence with genuine vulnerability. Every verse should have a speed or complexity peak. BPM 90–155 (115 avg)." },

  { id:"lil-wayne", name:"Lil Wayne", flag:"🇺🇸", origin:"New Orleans, LA, USA", genre:["Hip-Hop","Trap","Rock Rap"], typicalBpm:100, bpmRange:{min:80,max:140}, flowType:"Unpredictable and abstract — pivots mid-bar, follows his own logic", rhymeScheme:"Non-linear rhyme chains, prioritizes punchlines over structure", deliveryStyle:"Nasal rasp, self-assured to the point of eccentricity", coreThemes:["self-proclaimed GOAT status","New Orleans roots","codeine","unique artistry","Cash Money loyalty"], signatureWords:["Weezy F Baby","Young Money","Carter","New Orleans","syrup","real G","martian","no ceilings"], songStructure:"Punchline-driven, no conventional structure required, freestyle aesthetic", hookStyle:"Melodic and odd, sometimes the hook is the weirdest part", verseLength:"16 bars, every line ends with a punchline", literaryDevices:["non-sequitur pivot","absurdist metaphor","punchline stacking","self-mythology"],
    referenceSongs:[{title:"A Milli",bpm:108,note:"Minimalist, rapid boasting, no hook needed"},{title:"Lollipop",bpm:80,note:"AutoTune-heavy, mainstream crossover"},{title:"6 Foot 7 Foot",bpm:140,note:"Abstract wordplay, confident"},{title:"Mrs. Officer",bpm:88,note:"Playful concept, melodic hook"},{title:"Right Above It",bpm:138,note:"Inspirational boast, Drake collab"},{title:"Uproar",bpm:105,note:"Revival track, energetic"},{title:"Hustler Musik",bpm:90,note:"New Orleans dedication, personal"},{title:"John",bpm:100,note:"Self-comparison to legends"},{title:"Go DJ",bpm:96,note:"Party energy, early Cash Money peak"},{title:"Godzilla (feature)",bpm:160,note:"Ultra-fast verse, technical peak"}],
    promptContext:"Write in Lil Wayne's style: unpredictable wordplay where every bar ends with a twist. Use at least 3 abstract or absurdist metaphors. Include a punchline that sounds impossible but works. Embrace non-linear logic — secretly genius. BPM 80–140 (100 avg)." },

  { id:"cardi-b", name:"Cardi B", flag:"🇺🇸", origin:"The Bronx, NY, USA", genre:["Hip-Hop","Trap","Pop Rap"], typicalBpm:118, bpmRange:{min:90,max:150}, flowType:"High-energy, punchy, rhythmically unpredictable", rhymeScheme:"Heavy end rhymes, AABB, simple but impactful", deliveryStyle:"Loud, proud, comedic timing, thick Bronx accent energy", coreThemes:["female empowerment","money and luxury","street origins and rise","clapping back at haters"], signatureWords:["okurrr","Bronx","WAP","money","bag","bodak","real one","blood"], songStructure:"Hook-first or hook-heavy, short punchy verses, 2–3 min", hookStyle:"Catchy, bold, often a catchphrase or power phrase", verseLength:"8–16 bars, every line punches", literaryDevices:["braggadocio","sexual metaphor","comedic exaggeration","direct address to haters"],
    referenceSongs:[{title:"Bodak Yellow",bpm:130,note:"Cold, minimalist, arrival anthem"},{title:"WAP",bpm:95,note:"Provocative, feminist celebration"},{title:"Money",bpm:130,note:"Luxury flex, confident"},{title:"Up",bpm:150,note:"High-energy, rapid delivery"},{title:"Press",bpm:138,note:"Aggressive, media clap-back"},{title:"I Like It",bpm:94,note:"Latin-influenced, playful, summer vibe"},{title:"Be Careful",bpm:80,note:"Emotional warning, vulnerability"},{title:"Get Up 10",bpm:140,note:"Intro manifesto, resilience"},{title:"Ring",bpm:90,note:"Relationship demands, melodic hook"},{title:"Clout",bpm:100,note:"Couple flex, loyalty theme"}],
    promptContext:"Write in Cardi B's style: bold, unapologetic, high energy. Punch every line — no filler. Mix confidence with genuine emotion. Feminine power framing. Hook = catchphrase or power statement. BPM 90–150 (118 avg). Short verses 8–16 bars." },

  { id:"21-savage", name:"21 Savage", flag:"🇬🇧", origin:"London, UK / Atlanta, GA", genre:["Trap","Atlanta Hip-Hop"], typicalBpm:145, bpmRange:{min:130,max:160}, flowType:"Deadpan, minimal — lets the beat breathe, says less to say more", rhymeScheme:"Simple end rhymes, repetition for hypnotic effect", deliveryStyle:"Flat, cold, emotionless — the contrast IS the emotion", coreThemes:["street violence and survival","Atlanta trap culture","loyalty and loss","wealth as distance from danger","emotional unavailability"], signatureWords:["slaughter gang","issa","21","trap","Glock","draco","no cap","savage mode"], songStructure:"Simple and hypnotic, repetition creates trance-like effect", hookStyle:"Short, cold, repeated — 2–4 lines looped", verseLength:"8–16 bars, each bar deliberate and cold", literaryDevices:["understatement","cold matter-of-fact imagery","repetition as weight","silence as emphasis"],
    referenceSongs:[{title:"Rockstar",bpm:160,note:"Dark pop crossover, massive"},{title:"Savage Mode",bpm:140,note:"Sparse, cold, intimidating"},{title:"A Lot",bpm:75,note:"Rare emotional openness, J. Cole feature"},{title:"Bank Account",bpm:130,note:"Minimalist trap, hypnotic"},{title:"No Heart",bpm:150,note:"Chilly production, cold persona peak"},{title:"Runnin",bpm:142,note:"Dark survival narrative"},{title:"X",bpm:148,note:"Future collab, trap anthem"},{title:"Many Men",bpm:138,note:"Paranoia, street survival"},{title:"Numb",bpm:145,note:"Trauma and emotional numbness"},{title:"Rich N**ga Shit",bpm:140,note:"Jay-Z collab, cold luxury"}],
    promptContext:"Write in 21 Savage's style: cold, minimal, deliberate. Say less, mean more. Every bar = flat statement of fact. Describe pain the same way you'd describe weather. Hook: extremely short and cold — 2–4 lines repeated. BPM 130–160 (145 avg)." },
];

const ARTISTS_FRENCH = [
  { id:"nekfeu", name:"Nekfeu", flag:"🇫🇷", origin:"Paris, France", genre:["Rap Conscient","Hip-Hop Français"], typicalBpm:93, bpmRange:{min:80,max:110}, flowType:"Posé, maîtrisé, chaque syllabe à sa place", rhymeScheme:"Rimes riches, schémas ABAB et internes complexes, enjambements poétiques", deliveryStyle:"Voix calme et articulée, intensité croissante, diction parfaite", coreThemes:["introspection et identité","références culturelles (cinéma, BD, littérature)","Paris et la rue","amour et perte","rap comme art"], signatureWords:["Étoile","cyborg","S-Crew","cosmos","nébuleuse","conscience","univers","Montmartre"], songStructure:"Albums conceptuels, textes sans padding", hookStyle:"Court, poétique, souvent chanté en demi-voix", verseLength:"16–24 bars, densité maximale", literaryDevices:["métaphore étendue","référence culturelle","oxymore","personnification","allitération"],
    referenceSongs:[{title:"Étoile Manquante",bpm:88,note:"Introspection cosmique, flow posé"},{title:"Cyborg",bpm:95,note:"Alienation moderne, imagery SF"},{title:"Comme si t'avais tout dit",bpm:85,note:"Rupture amoureuse, mélancolie"},{title:"Kaleidoscope",bpm:90,note:"Complexité identitaire"},{title:"Antigone",bpm:82,note:"Référence classique, densité maximale"},{title:"Hyacinthe",bpm:78,note:"Deuil et mémoire, sobre"},{title:"Pour les filles comme toi",bpm:92,note:"Portrait féminin, bienveillant"},{title:"Je suis passé par là",bpm:88,note:"Gratitude, retrospective"},{title:"Sales gosses",bpm:87,note:"Jeunesse parisienne, nostalgie"},{title:"Nuit Blanche",bpm:80,note:"Errance nocturne, introspection"}],
    promptContext:"Écris dans le style de Nekfeu : poétique, dense, chaque mot compte. Utilise deux références culturelles (cinéma, littérature, science). Flow posé et naturel. Inclure une métaphore cosmique. BPM 80–110 (93 moy). Rimes riches internes. Hook court et évocateur." },

  { id:"lomepal", name:"Lomepal", flag:"🇫🇷", origin:"Paris, France", genre:["Rap Émotionnel","Rap Mélodique"], typicalBpm:88, bpmRange:{min:75,max:115}, flowType:"Fluide, entre rap et chant, émotions portées par la mélodie", rhymeScheme:"Rimes plates et croisées, flexibilité au service de l'émotion", deliveryStyle:"Voix vulnérable et sincère, passages chantés naturels", coreThemes:["amour romantique et douloureux","solitude et connexion","Paris la nuit","anxiété et santé mentale","beauté du quotidien"], signatureWords:["Tee","amour","seul","nuit","lumière","cœur","vide","toujours","novembre"], songStructure:"Couplet-refrain-couplet, refrains mémorables et mélodiques", hookStyle:"Mélodique, émotionnel, le moment le plus chanté", verseLength:"12–20 bars, balance storytelling et lyrisme", literaryDevices:["image sensorielle","confession directe","contraste lumière/ombre","question rhétorique"],
    referenceSongs:[{title:"Tee shirt",bpm:92,note:"Rupture romantique, prod' minimaliste"},{title:"Amina",bpm:85,note:"Portrait féminin, douceur"},{title:"Décevant",bpm:78,note:"Autodestruction douce, mélancolique"},{title:"Jeannine",bpm:95,note:"Personnage féminin fort, récit de vie"},{title:"Chocolat",bpm:100,note:"Joueur, séduction, groovy"},{title:"Rihanna",bpm:110,note:"Hype, références pop"},{title:"Tout oublier",bpm:90,note:"Fugue romantique, refrain infectieux"},{title:"Trop beau",bpm:82,note:"Anxiété de l'amour, fragilité"},{title:"Yeux disent",bpm:80,note:"Sensualité retenue, imagerie fine"},{title:"Octobre",bpm:78,note:"Automne parisien, mélancolie"}],
    promptContext:"Écris dans le style de Lomepal : émotionnel, sincère, entre rap et chanson. Le refrain doit être mélodique et mémorable. Mélange rap fluide avec passages chantés. Parle d'amour, de perte ou de solitude avec honnêteté brute. BPM 75–115 (88 moy)." },

  { id:"big-flo-et-oli", name:"Big Flo & Oli", flag:"🇫🇷", origin:"Toulouse, France", genre:["Rap Français","Rap Conscient","Pop Rap"], typicalBpm:105, bpmRange:{min:85,max:130}, flowType:"Dynamique, alterné entre les deux frères, complémentaire", rhymeScheme:"Accessibles mais riches, punchlines familiales, structure claire", deliveryStyle:"Énergie toulousaine, humour bienveillant, profondeur sous la légèreté", coreThemes:["fraternité et famille","parcours du combattant musical","authenticité","critique de la superficialité","Toulouse et le Sud"], signatureWords:["Toulouse","les frères","platine","validé","à l'ancienne","daron","daronne"], songStructure:"Alternance couplets frère 1 / frère 2, refrains collectifs", hookStyle:"Fédérateur, sing-along, accessible à tous", verseLength:"12–16 bars par frère", literaryDevices:["autodérision","humour narratif","contraste espoir/réalité","adresse directe au public"],
    referenceSongs:[{title:"Dommage",bpm:103,note:"Carpe diem, regrets, refrain fédérateur"},{title:"La Vraie Vie",bpm:100,note:"Critique réseaux sociaux, authenticité"},{title:"Bla Bla Bla",bpm:95,note:"Satire rap clinquant, autodérision"},{title:"Papa",bpm:85,note:"Hommage paternel, universel"},{title:"Roi",bpm:108,note:"Ambition musicale, confiance"},{title:"Tic Tac",bpm:100,note:"Urgence temporelle, maturité"},{title:"Ma Mère",bpm:88,note:"Tendresse maternelle, sincérité"},{title:"Dieu existe peut-être",bpm:95,note:"Questionnement existentiel, humour"},{title:"Hello",bpm:102,note:"Introspection, pause dans la course"},{title:"Normal",bpm:105,note:"Pression sociale, quête de normalité"}],
    promptContext:"Écris dans le style de Big Flo & Oli : accessible, profond sous la légèreté. Structure pour deux voix alternées ([Couplet 1] / [Couplet 2]). Mélange humour bienveillant et message sincère. Le refrain doit être fédérateur. BPM 85–130 (105 moy)." },

  { id:"orelsan", name:"Orelsan", flag:"🇫🇷", origin:"Caen, Normandie, France", genre:["Rap Narratif","Rap Littéraire"], typicalBpm:95, bpmRange:{min:80,max:115}, flowType:"Décalé, cinématographique, le flow suit le récit plus que le beat", rhymeScheme:"Construites autour du sens, rimes internes sophistiquées", deliveryStyle:"Voix normande reconnaissable, ton parfois monotone porteur de sens", coreThemes:["critique sociale acide","loser magnifique","Caen et la province","célébrité et normalité","génération désenchantée"], signatureWords:["Gringe","Casseurs Flowters","Caen","putain","vieux","c'est la vie","normal","galère"], songStructure:"Albums narratifs, textes longs et scénarisés, révélation finale", hookStyle:"Cinglant et mémorable — la thèse du morceau en une ligne", verseLength:"20–32 bars, récits complets avec personnages", literaryDevices:["ironie socratique","caricature","narration à personnages","chute narrative","absurde"],
    referenceSongs:[{title:"La Terre est ronde",bpm:90,note:"Hymne générationnel, contemplation"},{title:"Basique",bpm:95,note:"Satire consumériste, liste absurde"},{title:"Défaite de famille",bpm:85,note:"Parentalité, transmission"},{title:"Tout va bien",bpm:100,note:"Pessimisme poli, façade sociale, ironie"},{title:"San Francisco",bpm:88,note:"Décalage rêve américain, humour"},{title:"Notes pour trop tard",bpm:82,note:"Jeunesse gaspillée, lettre à soi"},{title:"Suicide Social",bpm:92,note:"Rupture avec les normes"},{title:"Perdu",bpm:86,note:"Errance existentielle, sincérité"},{title:"L'odeur de l'essence",bpm:95,note:"Productivité créative, addiction au travail"},{title:"Épilogue",bpm:78,note:"Récapitulatif de vie, maturité"}],
    promptContext:"Écris dans le style d'Orelsan : cinématographique, avec une révélation finale. Raconte une histoire avec des personnages reconnaissables. Ironie et critique sociale sans jamais prêcher. Le flow peut être décalé par rapport au beat. BPM 80–115 (95 moy)." },

  { id:"damso", name:"Damso", flag:"🇧🇪", origin:"Kinshasa, Congo / Bruxelles, Belgique", genre:["Rap Belge","Trap Sombre","Rap Introspectif"], typicalBpm:87, bpmRange:{min:70,max:105}, flowType:"Hypnotique, flux de conscience, syllabe lourde et appuyée", rhymeScheme:"Rimes internes et finales entremêlées, flux continu", deliveryStyle:"Voix grave et modulée, autotune discret, intensité hypnotique", coreThemes:["dualité et contradictions internes","amour toxique et obsession","Congo et Bruxelles","religion et culpabilité","ego et destruction"], signatureWords:["Qalf","lithopédion","W.A.S.H.","Bruxelles","Congo","bébé","enfer","ange","démon","sang"], songStructure:"Albums conceptuels, titres courts (<3min)", hookStyle:"Court, sombre, parfois parlé, parfois murmuré", verseLength:"12–20 bars, densité sémantique élevée", literaryDevices:["flux de conscience","dualité ange/démon","imagerie biblique subvertie","belgicisme"],
    referenceSongs:[{title:"Gracieux",bpm:83,note:"Intro Qalf, flux introspectif, sombre"},{title:"TRVPVLGVNG",bpm:92,note:"Agressif, Brussels trap"},{title:"Malade",bpm:78,note:"Amour obsessionnel, prod' froide"},{title:"Bruxelles vie",bpm:88,note:"Bruxelles la nuit, rue et ambition"},{title:"Tétris",bpm:90,note:"Relations empilées, métaphore ludique"},{title:"Ipséité",bpm:80,note:"Identité profonde, philosophie"},{title:"Wuluwulu",bpm:95,note:"Énergie brute, influence africaine"},{title:"Loup Y es-tu",bpm:76,note:"Prédateur et proie, danger"},{title:"Rome",bpm:84,note:"Grandeur et décadence, ambition"},{title:"VCF",bpm:88,note:"Confiance absolue, flow hypnotique"}],
    promptContext:"Écris dans le style de Damso : sombre, hypnotique, flux de conscience. La frontière entre le bien et le mal doit être floue. Utilise l'imagerie biblique de manière subversive. Le texte doit sembler comme une confession à voix haute. BPM 70–105 (87 moy). Hook court et sombre." },

  { id:"pnl", name:"PNL", flag:"🇫🇷", origin:"Les Tarterêts, Corbeil-Essonnes", genre:["Cloud Rap Français","Trap Atmosphérique"], typicalBpm:78, bpmRange:{min:65,max:95}, flowType:"Planant, mélancolique, Ademo et N.O.S aux voix complémentaires", rhymeScheme:"Libres et poétiques, priorité à l'atmosphère sur la technique", deliveryStyle:"AutoTune omniprésent, voix fondues dans le beat, effet de flottement", coreThemes:["cité et enfermement","évasion et rêve","famille et fraternité","mélancolie de banlieue","solitude"], signatureWords:["QLF","les Tarterêts","Corbeil","binks","teros","au DD","caillera","zone","frère","mère"], songStructure:"Albums visuels, titres longs et atmosphériques", hookStyle:"Mélancolique, planant, souvent autotune", verseLength:"12–20 bars par membre", literaryDevices:["imagerie de l'évasion","métaphore du vol/des astres","contraste cité/liberté","nostalgie"],
    referenceSongs:[{title:"Au DD",bpm:72,note:"Hymne de la cité planant, clip iconique"},{title:"Naha",bpm:68,note:"Slow, mélancolique, atmosphérique"},{title:"Onizuka",bpm:70,note:"Référence manga, évasion, liberté"},{title:"Le monde ou rien",bpm:82,note:"Ambition totale, prod' lourde"},{title:"Dans la légende",bpm:78,note:"Grandeur calme, legacy"},{title:"Mia",bpm:80,note:"Succès mondial, dualité"},{title:"Que la Mif",bpm:75,note:"Famille avant tout, loyauté"},{title:"Autre monde",bpm:65,note:"Lenteur maximale, trip mélancolique"},{title:"Pleurera",bpm:70,note:"Chagrin et acceptation"},{title:"Blanka",bpm:88,note:"Référence SF, énergie contenue"}],
    promptContext:"Écris dans le style de PNL : mélancolique, atmosphérique, planant. Structure pour deux voix : [Ademo] (grave, agressif) et [N.O.S] (aigu, mélancolique). Indique [AutoTune] sur passages chantés. Chaque couplet crée un sentiment d'évasion vers quelque chose d'inaccessible. BPM 65–95 (78 moy)." },

  { id:"sch", name:"SCH", flag:"🇫🇷", origin:"Marseille, France", genre:["Trap Marseillaise","Rap Cinématographique"], typicalBpm:98, bpmRange:{min:80,max:120}, flowType:"Froid, précis, cinématographique — chaque bar est une scène", rhymeScheme:"Internes et finales, riches, précision chirurgicale", deliveryStyle:"Voix grave et posée, détachement émotionnel, intensité contenue", coreThemes:["Marseille et la Méditerranée","culture mafiosa","argent et pouvoir","loyauté et trahison","références méditerranéennes"], signatureWords:["Marseille","JVLIVS","mafia","la vie est belle","vato","capo","mer"], songStructure:"Albums concepts (JVLIVS), titres cinématographiques", hookStyle:"Court, froid, mémorable — une sentence", verseLength:"16–24 bars, chaque ligne = un plan de film", literaryDevices:["cinématographie verbale","références mafieuses","stoïcisme de façade","méditerranée comme symbole"],
    referenceSongs:[{title:"Rooftop",bpm:95,note:"Marseille vue d'en haut, cold trap"},{title:"Dolce Vita",bpm:90,note:"Méd' et luxe, belles choses"},{title:"Mama Küfa",bpm:100,note:"Hommage maternel, Méditerranée"},{title:"Paolo",bpm:105,note:"Personnage, référence italienne"},{title:"Commando",bpm:110,note:"Agressif, martial, collectif"},{title:"Triste monde",bpm:85,note:"Mélancolie froide, stoïcisme"},{title:"Autopsie",bpm:98,note:"Introspection chirurgicale"},{title:"Ozone",bpm:95,note:"Liberté éphémère, évasion"},{title:"La ligne d'or",bpm:100,note:"Parcours vers le succès"},{title:"Rimbaud",bpm:88,note:"Référence littéraire, flow poétique"}],
    promptContext:"Écris dans le style de SCH : froid, cinématographique, chaque bar est un plan de caméra. Ancre dans la Méditerranée et Marseille. Références au cinéma mafieux. Rien de superflu. BPM 80–120 (98 moy). Hook court et tranchant." },

  { id:"bekar", name:"Bekar", flag:"🇫🇷", origin:"France", genre:["Rap Français Old School","Rap Technique"], typicalBpm:100, bpmRange:{min:90,max:120}, flowType:"Technique, précis, jeux de mots construits, flow old school revendiqué", rhymeScheme:"Multi-syllabes imbriquées, jeux phonétiques, rime pour la rime", deliveryStyle:"Articulé, respect des codes hip-hop classiques, authenticité revendiquée", coreThemes:["authenticité dans le rap","culture hip-hop originelle","amour de la langue française","respect des aînés","rejet du rap commercial"], signatureWords:["authentique","flow","rimes","microphone","b-boy","hip-hop","vrai","rue","parole"], songStructure:"Classique couplet-refrain-couplet", hookStyle:"Accrocheur mais pas commercial", verseLength:"16–24 bars denses en jeux de mots", literaryDevices:["calembour","jeu de sons","référence hip-hop","double sens linguistique"],
    referenceSongs:[{title:"La plume et le micro",bpm:100,note:"Ode à l'écriture rap, authenticité"},{title:"Vrai rap",bpm:105,note:"Positionnement, old school pride"},{title:"Dans ma rue",bpm:95,note:"Quotidien urbain, storytelling"},{title:"Phonétique",bpm:102,note:"Technique pure, showcase de flow"},{title:"Hommage aux anciens",bpm:90,note:"Respect des pionniers"},{title:"Freestyle",bpm:108,note:"Technique brute, improvisation"},{title:"Lettres et syllabes",bpm:100,note:"Amour de la langue"},{title:"La scène",bpm:110,note:"Live performance, énergie"},{title:"Pas de compromis",bpm:98,note:"Intégrité artistique"},{title:"Bécar",bpm:98,note:"Titre éponyme, jeux de mots"}],
    promptContext:"Écris dans le style de Bekar : technique, jeux de mots, respect du hip-hop classique. Chaque bar doit avoir un jeu phonétique ou un double sens. Flow précis et articulé. BPM 90–120 (100 moy)." },

  { id:"corneille", name:"Corneille", flag:"🇷🇼", origin:"Kigali, Rwanda / Bruxelles", genre:["R&B Francophone","Soul","Pop Africaine"], typicalBpm:82, bpmRange:{min:70,max:100}, flowType:"Mélodique, chanté plus que rappé, soul et douceur", rhymeScheme:"Au service de la mélodie, naturelles et chantées", deliveryStyle:"Voix soul chaude et veloutée, émotion maîtrisée, classe", coreThemes:["survie et résilience","amour romantique et durable","identité africaine et diaspora","famille et reconstruction","espoir et guérison"], signatureWords:["seul au monde","rêves","amour","guérir","Reine","Rwanda","force","lumière","paix"], songStructure:"R&B classique, ballades, refrains chantés, ponts émotionnels", hookStyle:"Vocal et mélodique — la voix comme instrument principal", verseLength:"Couplets chantés, 8–16 lignes", literaryDevices:["métaphore de la lumière","guérison narrative","amour comme salvation","résilience universelle"],
    referenceSongs:[{title:"Seul au monde",bpm:76,note:"Témoignage, force, espoir"},{title:"Parce qu'on vient de loin",bpm:80,note:"Résilience diaspora, fierté"},{title:"Reine",bpm:84,note:"Ode à la femme, romantique, soul"},{title:"Tout le bonheur du monde",bpm:78,note:"Douceur, espoir, bienveillance"},{title:"Cry",bpm:75,note:"Catharsis, douleur libératrice"},{title:"La puissance",bpm:85,note:"Force intérieure, positivité"},{title:"Million Times",bpm:88,note:"Amour total, répétition comme mantra"},{title:"Comme un fils",bpm:72,note:"Émotionnel, famille, reconstruction"},{title:"Le combat",bpm:82,note:"Persévérance, victoire douce"},{title:"Toujours là",bpm:80,note:"Fidélité, amour indéfectible"}],
    promptContext:"Écris dans le style de Corneille : R&B soul francophone, mélodique et émotionnel. La voix est l'instrument principal. Évoque la résilience, l'espoir ou l'amour avec profondeur. Les textes doivent pouvoir être chantés. BPM 70–100 (82 moy)." },

  { id:"aznavour", name:"Aznavour", flag:"🇫🇷", origin:"Paris, France (origines arméniennes)", genre:["Chanson Française","Pop Française","Variété"], typicalBpm:75, bpmRange:{min:60,max:100}, flowType:"Chanson narrative, mélodie comme colonne vertébrale", rhymeScheme:"Classiques et riches, au service de la mélodie, jamais forcées", deliveryStyle:"Voix éraillée et unique, diction parfaite, émotion contenue puis libérée", coreThemes:["amour et sa fin","vieillesse et jeunesse perdue","la vie qui passe","nostalgie","humanisme universel"], signatureWords:["hier encore","la bohème","émilie","mourir d'aimer","comme ils disent","sa jeunesse","demain"], songStructure:"Chanson à couplets, pont, refrain — structure poétique française classique", hookStyle:"Refrain de chanson — mémorable, universel, émotionnel", verseLength:"Couplets de 4–8 lignes, construits comme des poèmes", literaryDevices:["métaphore temporelle","portrait humain","récit à la première personne","universalisation du particulier"],
    referenceSongs:[{title:"La Bohème",bpm:72,note:"Nostalgie de jeunesse, Montmartre, intemporel"},{title:"Hier Encore",bpm:68,note:"Temps qui passe, regret doux, universel"},{title:"Emmenez-moi",bpm:100,note:"Désir d'évasion, romantisme, swing"},{title:"Comme ils disent",bpm:78,note:"Courage, vérité, humanité"},{title:"Mourir d'aimer",bpm:70,note:"Amour impossible, drame"},{title:"She",bpm:80,note:"Portrait de femme, admiration, mystère"},{title:"Tu t'laisses aller",bpm:95,note:"Rupture douce-amère, humour tendre"},{title:"Non je n'ai rien oublié",bpm:74,note:"Amour perdu, fidélité mémorielle"},{title:"Ave Maria",bpm:65,note:"Spirituel, gratitude, sobre beauté"},{title:"Viens pleurer",bpm:72,note:"Tendresse, soutien, amour bienveillant"}],
    promptContext:"Écris dans le style d'Aznavour : chanson française classique, mélodie et poésie. Les mots doivent pouvoir être chantés — structure strophique avec refrain fort. Évoque l'amour, le temps qui passe, la nostalgie avec élégance intemporelle. BPM 60–100 (75 moy)." },

  { id:"plk", name:"PLK", flag:"🇫🇷", origin:"Paris / Île-de-France, France", genre:["Trap Française","Rap Nuit"], typicalBpm:138, bpmRange:{min:120,max:155}, flowType:"Cadencé et percutant, flow trap efficace, chaque syllabe claque", rhymeScheme:"Simples et directes, fin de bar = punch", deliveryStyle:"Voix nocturne, assurance calme, trap propre sans fioritures", coreThemes:["succès mérité et argent","nuit parisienne","trahisons et méfiance","street credibility","montée et reconnaissance"], signatureWords:["Validé","les frères","nuit","billet","sac","ma zone","confiance","sûr"], songStructure:"Trap directe, refrains courts et efficaces", hookStyle:"Court, accrocheur, une phrase qui reste en tête", verseLength:"12–16 bars, chaque bar = une punchline", literaryDevices:["punchline directe","contraste avant/après succès","loyauté comme code moral"],
    referenceSongs:[{title:"Validé",bpm:140,note:"Hymne du succès légitimé"},{title:"La nuit je mens",bpm:135,note:"Dualité, ambiguïté nocturne"},{title:"Safari",bpm:138,note:"Prédateur et proie, ambition"},{title:"Sur mes gardes",bpm:132,note:"Méfiance, protection, vigilance"},{title:"Rappeur",bpm:140,note:"Meta-rap, identité"},{title:"Banger",bpm:145,note:"Énergie pure, prod' lourde"},{title:"Caméléon",bpm:138,note:"Adaptation, survie, intelligence"},{title:"Madame",bpm:128,note:"Amour trap, romantique moderne"},{title:"En mode",bpm:140,note:"Quotidien parisien, trap efficace"},{title:"Freestyle LFB",bpm:142,note:"Technique et rage, flow rapide"}],
    promptContext:"Écris dans le style de PLK : trap française directe, nuit parisienne, efficacité maximale. Chaque bar doit avoir une punchline ou une affirmation forte. Hook court (2–4 lignes) et immédiatement accrocheur. BPM 120–155 (138 moy)." },

  { id:"aupinard", name:"Aupinard", flag:"🇫🇷", origin:"France", genre:["Slam","Rap Poétique","Hip-Hop Humaniste"], typicalBpm:88, bpmRange:{min:75,max:105}, flowType:"Conversationnel et naturel, comme parler à un ami", rhymeScheme:"Rimes intérieures discrètes, naturelles, jamais forcées", deliveryStyle:"Chaleureux et bienveillant, humour doux, voix de confiance", coreThemes:["humanisme et bienveillance","petit bonheur du quotidien","critique douce de la société","solidarité et empathie","liberté de penser"], signatureWords:["tu vois","les gens","ensemble","douce","paix","rire","penser","libre","vrai","simplement"], songStructure:"Slam souvent sans hook formel, longue vague continue", hookStyle:"Chantonné doucement, ou répétition d'une phrase clé", verseLength:"Longs passages continus, comme un discours poétique", literaryDevices:["apostrophe au lecteur","anaphore douce","humour bienveillant","image du quotidien élevée au poétique"],
    referenceSongs:[{title:"Les boulots de merde",bpm:85,note:"Critique douce du travail aliénant"},{title:"Tu sais",bpm:82,note:"Adresse directe, bienveillance, slam pur"},{title:"Le temps",bpm:80,note:"Contemplation temporelle, poésie douce"},{title:"Ensemble",bpm:88,note:"Solidarité, collectif, espoir"},{title:"Doucement",bpm:78,note:"Lenteur revendiquée, anti-urgence"},{title:"Pense-y",bpm:90,note:"Invitation à la réflexion"},{title:"Les petits riens",bpm:85,note:"Célébration du banal"},{title:"Libre",bpm:88,note:"Liberté comme valeur suprême"},{title:"Riez",bpm:92,note:"Humour comme résistance"},{title:"Vieux sage",bpm:80,note:"Sagesse populaire, transmission"}],
    promptContext:"Écris dans le style d'Aupinard : chaleureux, bienveillant, slam accessible. Parle directement au lecteur (tu, vous). Utilise des images du quotidien élevées à la poésie. L'humour bienveillant est bienvenu. BPM 75–105 (88 moy). Flow conversationnel." },

  { id:"tif", name:"TIF", flag:"🇫🇷", origin:"France", genre:["Rap Féminin Français","Rap Engagé"], typicalBpm:110, bpmRange:{min:90,max:135}, flowType:"Percutant et affirmé, dit ce que les autres taisent", rhymeScheme:"Directes et percutantes, au service du message", deliveryStyle:"Assurée, sans filtre, voix qui ne s'excuse pas d'exister", coreThemes:["empowerment féminin","rap comme espace de liberté","relations et indépendance","sincérité absolue"], signatureWords:["libre","femme","moi","sans filtre","réelle","force","jamais","ma vie","assez","debout"], songStructure:"Directe et efficace, textes sans détour", hookStyle:"Fort et affirmé — une déclaration, pas une question", verseLength:"12–20 bars, chaque ligne porte son message", literaryDevices:["affirmation directe","retournement de stéréotype","première personne forte","ironie envers les jugements"],
    referenceSongs:[{title:"Libre",bpm:108,note:"Manifeste de liberté féminine"},{title:"Sans filtre",bpm:112,note:"Authenticité totale, rien à cacher"},{title:"Moi c'est moi",bpm:105,note:"Identité forte, refus de se définir"},{title:"Debout",bpm:115,note:"Résilience, force, après la tempête"},{title:"Pas d'excuses",bpm:110,note:"Aucun regret, confiance assumée"},{title:"Ce que je veux",bpm:108,note:"Désir féminin assumé, sans honte"},{title:"Réelle",bpm:102,note:"Authenticité vs performance sociale"},{title:"Ensemble on est fortes",bpm:110,note:"Sororité, collectif féminin"},{title:"Quand même",bpm:118,note:"Malgré tout, persévérance"},{title:"Ma voix",bpm:105,note:"Prise de parole, légitimité"}],
    promptContext:"Écris dans le style de TIF : rap féminin affirmé, sans filtre, puissant. Chaque ligne doit avoir la confiance de quelqu'un qui n'a rien à prouver. Aborde la liberté féminine, l'indépendance, le regard des autres. Pas de victimisation. BPM 90–135 (110 moy). Hook = déclaration forte." },
];

// Attach style examples to each artist at runtime
[...ARTISTS_INTERNATIONAL, ...ARTISTS_FRENCH].forEach((a) => {
  a.styleExamples = STYLE_EXAMPLES[a.id] || [];
});

// ─────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────
const LANGUAGES = [
  "English", "French", "Spanish", "Portuguese", "Arabic",
  "German", "Italian", "Japanese", "Korean", "Swahili",
  "Dutch", "Russian", "Hindi", "Mandarin", "Turkish",
];

const VIBES = [
  "🔥 Aggressive", "💭 Introspective", "🎉 Hype",
  "❤️ Emotional", "😤 Boastful", "🌙 Chill",
];

// ─────────────────────────────────────────────────────────────────
// PROMPT BUILDER
// ─────────────────────────────────────────────────────────────────
function buildPrompt({ artist, topic, guidance, language, vibe }) {
  const vibeLabel = vibe.replace(/^\S+\s/, "");
  const songRefs = artist.referenceSongs
    .map((s) => `  • "${s.title}" (${s.bpm} BPM) — ${s.note}`)
    .join("\n");
  const styleEx = artist.styleExamples
    .map((ex, i) => `  [${i + 1}] ${ex}`)
    .join("\n\n");
  return `You are a world-class lyricist and ghostwriter with deep knowledge of ${artist.name}'s artistry.

RHYME FIRST (non-negotiable, do this before writing anything):
Before writing a single bar, choose your rhyme pairs for the entire song:
- Verse 1: 4 rhyme pairs (AABB — bar 1 rhymes with bar 2, bar 3 rhymes with bar 4)
- Verse 2: 4 rhyme pairs (ABAB — bar 1 rhymes with bar 3, bar 2 rhymes with bar 4)
- Hook: 2 rhyme pairs
- Choose end words that are BOTH sonically strong AND carry real imagery
- Write these rhyme pairs internally first, then build every bar around them

The rest of the song — the threading, the imagery, the human emotion — 
stays exactly as it is. Rhyme is the skeleton. Everything else is the flesh.
Never sacrifice an image for a weak rhyme word.
Find words that do both jobs simultaneously.

══════════════════════════════════════════════
ARTIST DNA: ${artist.name.toUpperCase()} ${artist.flag}
══════════════════════════════════════════════
Origin: ${artist.origin} | Genre: ${artist.genre.join(", ")}
BPM: ${artist.typicalBpm} avg (range ${artist.bpmRange.min}–${artist.bpmRange.max})
Flow: ${artist.flowType}
Rhyme scheme: ${artist.rhymeScheme}
Delivery: ${artist.deliveryStyle}
Core themes: ${artist.coreThemes.join(" · ")}
Signature vocabulary: ${artist.signatureWords.join(", ")}
Song structure: ${artist.songStructure}
Hook style: ${artist.hookStyle}
Verse length: ${artist.verseLength}
Literary devices: ${artist.literaryDevices.join(", ")}

NARRATIVE THREADING (critical rule):
Lines must talk to each other and build meaning together.
Use this 3-bar micro-story structure throughout the verse:
- Bar 1: Plant an image, object, or feeling (specific and concrete)
- Bar 2: Develop or transform that same image
- Bar 3: Pay it off with a surprising or emotional conclusion
Examples of what TO DO:
"On inventait des constellations dans l'odeur du café brulé,
Ce soir-là, t'as nommé une étoile avec mon prénom,
Maintenant cette étoile, je peux plus la regarder sans pleurer."
Examples of what NOT TO DO:
Writing consecutive lines that introduce completely new and unrelated images with no connection to the previous line.
Apply this threading rule across the entire song:
- Within each verse (micro threads of 2-3 bars)
- Between verse and hook (the hook should pay off what the verse planted)
- Between verse 1 and verse 2 (verse 2 should echo or contrast verse 1's images)
This rule applies to ALL languages and ALL artists.

SONIC ARCHITECTURE (critical rule):
Do not write lines then search for rhymes afterward.
Instead, follow this professional songwriter process:

Step 1 — Choose a rhyme family first.
Pick 3-4 words that share a sound AND carry strong imagery.
Choose words native to the language being written in.
The rhyme family must feel natural when spoken aloud in that language.

Step 2 — Build the image AROUND those sounds.
The end word must be chosen because it is both
visually powerful AND creates a sonic echo.
Never choose a rhyme word that weakens the image.
Never choose an image word that breaks the sonic pattern.

Step 3 — Consistent rhyme pattern throughout.
Minimum AABB per verse — every 2 bars must share an end rhyme.
Vary between verses: Verse 1 AABB, Verse 2 ABAB, Verse 3 internal rhymes.
The listener's ear must be able to predict and feel the rhyme landing.

EXAMPLES OF SONIC ARCHITECTURE DONE RIGHT:

[French — AABB rhyme scheme, rhyme family: cuir/venir + mémoire/espoir]
"T'as laissé ton parfum sur mon blouson en cuir,
Une odeur désertique que je n'arrive pas à fuir,
Je garde ce blouson comme on garde une mémoire,
Un musée personnel, mon seul territoire d'espoir."
→ cuir/fuir rhyme ✅ — mémoire/espoir rhyme ✅
→ One object (perfume/jacket) threads all 4 bars.
→ The rhyme words (fuir, espoir) carry their own emotional weight.

[French — ABAB rhyme scheme, rhyme family: carnet/jazz + froid/toi]
"J'ai retrouvé ton numéro dans un vieux carnet,
L'encre a pâli mais pas le souvenir du froid,
Un 06 qui sonne faux comme une fausse note de jazz,
Le silence qui reste — c'est tout ce qu'il reste de toi."
→ carnet/jazz ✅ (assonance) — froid/toi ✅
→ Starts concrete (phone number), ends emotional (silence of you).

[French — AABB, rhyme family: étoiles/voiles + souvient/revient]
"On a cru qu'on était éternels, brillants comme des étoiles,
Deux navigateurs perdus qui couraient sous les mêmes voiles,
Sauf que les étoiles meurent, et personne ne s'en souvient,
Sauf les poètes en exil qui attendent que tout revient."
→ étoiles/voiles rhyme ✅ — souvient/revient rhyme ✅
→ Universal image subverted, ends with unexpected specific group.

[English — AABB, rhyme family: coast/ghost + most/host]
"You left without a trace, like a city on a forgotten coast,
I became the kind of man who hates the mornings most,
My memories of us feel like playing host,
To a party that keeps running for a long-departed ghost."
→ coast/most ✅ (near rhyme) — host/ghost ✅
→ One metaphor (abandoned party) threads all 4 bars.

WHAT THESE EXAMPLES HAVE IN COMMON:
- End words RHYME — the listener hears the pattern clearly
- Each bar builds on the previous one — no disconnected images
- The rhyme word is chosen FIRST, then the image is built around it
- The final bar lands somewhere unexpected but earned
- No line could be removed without breaking the meaning

WHAT NOT TO DO:
- Writing lines where end words share NO sonic connection
- Choosing a rhyme word that weakens the image
- Forcing a rhyme with a filler word that adds no meaning
- Ending with a generic philosophical conclusion
- Using clichés as shortcuts when the rhyme is hard to find

The tension between sound and meaning IS the art.
A perfect bar sounds inevitable — like no other word could end that line.
Exploit the full phonetic richness of ${language}.
This rule applies to ALL languages equally.

Reference songs (BPM & structure):
${songRefs}

Specific writing directives:
${artist.promptContext}
Write so each bar flows naturally when spoken aloud at ${artist.typicalBpm} BPM. Prioritize musicality and natural speech rhythm over syllable counting. Each bar should feel comfortable to rap — not too rushed, not too slow.
FORBIDDEN CLICHÉS: never use generic closing lines like 'œuvre d'art éternelle', 'survivre', 'boussole', 'tempête de la vie', 'à travers les épreuves'. End with something unexpected and specific.

══════════════════════════════════════════════
STYLE INSPIRATION — SPIRIT NOT SOURCE
These original bars are written IN THE SPIRIT of ${artist.name}.
Study the cadence, imagery, word choices, and emotional temperature.
Write with this exact energy. Never reproduce these lines.
══════════════════════════════════════════════
${styleEx}

══════════════════════════════════════════════
YOUR TASK
══════════════════════════════════════════════
Write original lyrics in ${language} about: "${topic}"
Energy / Vibe: ${vibeLabel}
${guidance.trim() ? `\nAdditional Context/Guidance from the artist:\n"${guidance}"\n` : ""}

RULES:
1. 2–3 verses + hook/chorus — strictly follow ${artist.name}'s structure and verse length
2. The style examples above are your compass — match that exact cadence, vocabulary, and imagery
3. Every bar must feel comfortable at ${artist.typicalBpm} BPM when spoken aloud.
4. Use the listed literary devices — zero generic rap clichés.
5. Keep the lyric fully in ${language}: do not code-switch or insert words from another language.
6. Infuse every line with vivid, evocative, sexy imagery, deep texture, and a sense of history; avoid mechanical or robotic phrasing.
7. Use a clear end-of-verse rhyme pattern where appropriate, such as AABB, ABAB, ABBA, AABCCB, ABCABC, or ABABCDCD — but never let the rhyme shape sacrifice lyrical depth.
8. Hook rules: minimum 2 lines, maximum 4 lines. Must be immediately memorable and singable. Emotional peak of the song.
9. Keep style natural and idiomatic in ${language}
10. Format clearly: use section headers exactly like [Verse 1], [Hook], [Verse 2], etc. Do NOT add line numbers or numeric prefixes to individual lines or to section headers (for example, avoid "1.", "Line 1", or numbering each lyric line). Each section header must be its own standalone title on a single line.
11. Final bar must land hard — a revelation, punchline, or gut-punch.
12. The style examples are inspiration ONLY — write entirely original bars

OUTPUT: Lyrics ONLY. No preamble. No commentary. No explanations.`;
}

function buildCompletionPrompt({ artist, topic, guidance, language, vibe, startingLyrics }) {
  const vibeLabel = vibe.replace(/^\S+\s/, "");
  const songRefs = artist.referenceSongs
    .map((s) => `  • "${s.title}" (${s.bpm} BPM) — ${s.note}`)
    .join("\n");
  const styleEx = artist.styleExamples
    .map((ex, i) => `  [${i + 1}] ${ex}`)
    .join("\n\n");
  const topicLabel = topic.trim() ? `about: "${topic}"` : "based on the tone of the provided lyrics";

  return `You are a world-class lyricist and ghostwriter with deep knowledge of ${artist.name}'s artistry.

══════════════════════════════════════════════
ARTIST DNA: ${artist.name.toUpperCase()} ${artist.flag}
══════════════════════════════════════════════
Origin: ${artist.origin} | Genre: ${artist.genre.join(", ")}
BPM: ${artist.typicalBpm} avg (range ${artist.bpmRange.min}–${artist.bpmRange.max})
Flow: ${artist.flowType}
Rhyme scheme: ${artist.rhymeScheme}
Delivery: ${artist.deliveryStyle}
Core themes: ${artist.coreThemes.join(" · ")}
Signature vocabulary: ${artist.signatureWords.join(", ")}
Song structure: ${artist.songStructure}
Hook style: ${artist.hookStyle}
Verse length: ${artist.verseLength}
Literary devices: ${artist.literaryDevices.join(", ")}

Reference songs (BPM & structure):
${songRefs}

Specific writing directives:
${artist.promptContext}
Write so each bar flows naturally when spoken aloud at ${artist.typicalBpm} BPM. Prioritize musicality and natural speech rhythm over syllable counting. Each bar should feel comfortable to rap — not too rushed, not too slow.
FORBIDDEN CLICHÉS: never use generic closing lines like 'œuvre d'art éternelle', 'survivre', 'boussole', 'tempête de la vie', 'à travers les épreuves'. End with something unexpected and specific.

══════════════════════════════════════════════
STYLE INSPIRATION — SPIRIT NOT SOURCE
These original bars are written IN THE SPIRIT of ${artist.name}.
Study the cadence, imagery, word choices, and emotional temperature.
Write with this exact energy. Never reproduce these lines.
══════════════════════════════════════════════
${styleEx}

══════════════════════════════════════════════
YOUR TASK
══════════════════════════════════════════════
Continue the lyrics below in the style of ${artist.name}.
${guidance.trim() ? `\nAdditional Context/Guidance from the artist:\n"${guidance}"\n` : ""}
${topicLabel}
Energy / Vibe: ${vibeLabel}

RULES:
1. Continue from the provided text without repeating it.
2. Match the artist's structure and emotional tone.
3. Keep the continuation fully in ${language}; do not code-switch or insert words from another language.
4. Write so each bar flows naturally when spoken aloud at ${artist.typicalBpm} BPM. Prioritize musicality and natural speech rhythm over syllable counting. Each bar should feel comfortable to rap — not too rushed, not too slow.
5. Use end-of-verse rhyme patterns where appropriate, such as AABB, ABAB, ABBA, AAAA, AABCCB, ABCABC, or ABABCDCD — but keep lyrical depth and narrative texture first.
6. Hook rules: minimum 2 lines, maximum 4 lines. Must be immediately memorable and singable. Emotional peak of the song.
7. Format clearly: use section headers exactly like [Verse 1], [Hook], [Verse 2], etc. Do NOT add line numbers or numeric prefixes to individual lines or to section headers. Each section header must be its own standalone title on a single line.
8. Infuse the continuation with vivid, sexy, and lyrical imagery; avoid stiffness and mechanical phrasing.
8. Keep the completion natural and lyrical, with clear sections like [Verse 1], [Hook], etc.
9. Output lyrics ONLY. No preamble. No commentary. No explanations.

UNFINISHED LYRICS:
${startingLyrics.trim()}

CONTINUE:
`;
}

function getArtistMeta(a) {
  return `${a.typicalBpm} BPM · ${a.genre[0]} · ${a.origin}`;
}

// MAIN COMPONENT
// ─────────────────────────────────────────────────────────────────
export default function App() {
  const [topic, setTopic] = useState("");
  const [tab, setTab] = useState("INT");
  const [artist, setArtist] = useState(ARTISTS_INTERNATIONAL[0]);
  const [language, setLanguage] = useState("English");
  const [vibe, setVibe] = useState(VIBES[0]);
  const [temperature, setTemperature] = useState(0.85);
  const [darkMode, setDarkMode] = useState(true);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem("rapforge_history") || "[]"));
  const [showHistory, setShowHistory] = useState(false);
  const [favorites, setFavorites] = useState(() => JSON.parse(localStorage.getItem("rapforge_favorites") || "[]"));
  const [mode, setMode] = useState("quick");
  const [startingLyrics, setStartingLyrics] = useState("");
  const [guidance, setGuidance] = useState("");
  const [feedback, setFeedback] = useState("");
  const [revising, setRevising] = useState(false);
  const [lyrics, setLyrics] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("WRITING BARS...");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [editingLine, setEditingLine] = useState(null);
  const [editSuggestions, setEditSuggestions] = useState([]);
  const [editLoading, setEditLoading] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const lyricsRef = useRef(null);
  const canGenerate = mode === "complete" ? startingLyrics.trim() : topic.trim();

  const C = "#ff3c00";
  const list = tab === "FR" ? ARTISTS_FRENCH : ARTISTS_INTERNATIONAL;

  const switchTab = (t) => {
    setTab(t);
    setArtist(t === "FR" ? ARTISTS_FRENCH[0] : ARTISTS_INTERNATIONAL[0]);
    setProfileOpen(false);
  };

  const pickArtist = (a) => {
    setArtist(a);
    setProfileOpen(false);
  };

  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const saveToHistory = (text) => {
    const entry = { id: Date.now(), artist: artist.name, topic, language, vibe, lyrics: text, date: new Date().toLocaleDateString() };
    const updated = [entry, ...history].slice(0, 10);
    setHistory(updated);
    localStorage.setItem("rapforge_history", JSON.stringify(updated));
  };
  const reviseLyrics = async () => {
    if (!feedback.trim() || !lyrics) return;
    setRevising(true);
    setError("");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1400,
          temperature: temperature,
          messages: [{
            role: "user",
            content: `You are a professional ghostwriter writing in the style of ${artist.name}.\n\nHere are the current lyrics you generated:\n\n${lyrics}\n\nThe artist has provided the following feedback to tweak and modify the text:\n"${feedback}"\n\nRewrite the lyrics to incorporate this exact feedback. Keep the parts that work, but change what is requested. Ensure it still flows perfectly at ${artist.typicalBpm} BPM. Output ONLY the new lyrics.`
          }],
        }),
      });
      const data = await res.json();
      const text = data.content[0].text;
      if (!text) throw new Error("Empty response");

      setLyrics(text);
      saveToHistory(text);
      setFeedback("");
    } catch (err) {
      setError("Revision failed — check your connection and try again.");
    }
    setRevising(false);
  };
  const toggleFavorite = (line) => {
    const exists = favorites.includes(line);
    const updated = exists ? favorites.filter(f => f !== line) : [...favorites, line];
    setFavorites(updated);
    localStorage.setItem("rapforge_favorites", JSON.stringify(updated));
  };
  const generate = async () => {
  if (!canGenerate) return;
  setLoading(true);
  setLyrics("");
  setError("");
  setProfileOpen(false);
  try {
    if (mode === "quick") {
      // QUICK MODE — single call
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1400,
          temperature: temperature,
          messages: [{ role: "user", content: buildPrompt({ artist, topic, guidance, language, vibe }) }],
        }),
      });
      const data = await res.json();
      const text = data.content[0].text;
      if (!text) throw new Error("Empty response");
      setLyrics(text);
      saveToHistory(text);
    } else if (mode === "complete") {
      // COMPLETE MODE — continue user lyrics
      setLoadingMsg("🔧 CONTINUING LYRICS..."); await sleep(50);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1400,
          temperature: temperature,
          messages: [{ role: "user", content: buildCompletionPrompt({ artist, topic, guidance, language, vibe, startingLyrics }) }],
        }),
      });
      const data = await res.json();
      const text = data.content[0].text;
      if (!text) throw new Error("Empty response");
      setLyrics(text);
      saveToHistory(text);
    } else {
      // ADVANCED MODE — two calls
      setLoadingMsg("🎯 BUILDING CONCEPT..."); await sleep(50);// Step 1: Generate concept outline
      const step1 = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 600,
          temperature: 0.7,
          messages: [{ role: "user", content: `You are a professional rap songwriter preparing to write a song.
Topic: "${topic}"
Artist style: ${artist.name}
Origin: ${artist.origin}
Language: ${language}
Vibe: ${vibe}
${guidance.trim() ? `\nAdditional Context/Guidance from the artist:\n"${guidance}"\n` : ""}
Before writing any lyrics, create your internal songwriting plan.
Output ONLY this plan, nothing else:

RHYME MAP:
- Verse 1 end words (AABB): [pair 1: word_A / word_B], [pair 2: word_C / word_D], [pair 3: word_E / word_F], [pair 4: word_G / word_H]
- Verse 2 end words (ABAB): [pair 1: word_A / word_C], [pair 2: word_B / word_D], [pair 3: word_E / word_G], [pair 4: word_F / word_H]
- Hook end words: [pair 1: word_A / word_B], [pair 2: word_C / word_D]
- Outro end words: [pair 1: word_A / word_B]
Every end word must carry strong imagery AND rhyme with its pair.
Choose words in ${language}.

THREAD MAP:
- Central object 1: [specific sensory object] — appears in Verse 1 bar X, transforms in Verse 2 bar X, pays off in Outro
- Central object 2: [specific sensory object] — planted in Verse 1, echoed in Hook
- Central object 3: [specific sensory object] — exclusive to Verse 2, referenced in Outro

EMOTIONAL ARC:
- Verse 1: [one sentence — what the narrator feels at the start]
- Hook: [one sentence — the emotional peak]
- Verse 2: [one sentence — how emotion shifts or deepens]
- Outro: [one sentence — the final unexpected truth]

This plan is your contract. Every bar must follow it exactly.` }],
        }),
      });
      const outline = await step1.json();
      const outlineText = outline.content[0].text;

      setLoadingMsg("✍️ WRITING BARS..."); await sleep(50);// Step 2: Write lyrics based on outline
      const step2 = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1400,
          temperature: temperature,
          messages: [{ role: "user", content: buildPrompt({ artist, topic, guidance, language, vibe }) + `\n\nFOLLOW THIS SONGWRITING PLAN EXACTLY — it is your contract:\n${outlineText}\n\nEvery bar must use the rhyme pairs from the RHYME MAP.\nEvery thread object must appear exactly where the THREAD MAP specifies.\nThe emotional arc must be felt in every section.\nIf a bar breaks the plan — rewrite the bar, never the plan.` }],
        }),
      });
      const data = await step2.json();
      const text = data.content[0].text;
      if (!text) throw new Error("Empty response");
      // Step 3: Self-critique and rewrite
      setLoadingMsg("🔥 PERFECTING BARS..."); await sleep(50);
      const step3 = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          max_tokens: 1600,
          temperature: temperature,
          messages: [{ role: "user", content: `These are AI-generated lyrics in the style of ${artist.name}:

${text}

You are a professional rap editor. Identify the 3 weakest bars (generic, cliché, or off-rhythm) and rewrite ONLY those bars to be more powerful, original and authentic to ${artist.name}'s style. Output the COMPLETE lyrics with the improvements integrated. No commentary, no explanations, just the final lyrics.` }],
        }),
      });
      const finalData = await step3.json();
      const finalText = finalData.content[0].text;
      setLyrics(finalText || text);
      saveToHistory(finalText || text);
    }
    setTimeout(() => lyricsRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  } catch {
    setError("Generation failed — check your connection and try again.");
  }
  setLoading(false);
};
  const rewriteLine = async (lineIndex, lineText) => {
    setEditingLine(lineIndex);
    setEditSuggestions([]);
    setEditLoading(true);
    const count = mode === "advanced" ? 3 : 1;
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 200,
        temperature: temperature,
        messages: [{ role: "user", content: `You are writing in the style of ${artist.name}. Rewrite this lyric line ${count} different way${count > 1 ? "s" : ""}, each more powerful and original. Line: "${lineText}"

Output ONLY the rewritten line${count > 1 ? "s, one per line, numbered 1. 2. 3." : ""} No explanation.` }],
      }),
    });
    const data = await res.json();
    const text = data.content[0].text;
    const suggestions = mode === "advanced"
      ? text.split("\n").filter(l => l.trim()).slice(0, 3)
      : [text.trim()];
    setEditSuggestions(suggestions);
    setEditLoading(false);
  };

  const applyEdit = (lineIndex, newLine) => {
    const lines = lyrics.split("\n");
    lines[lineIndex] = newLine.replace(/^\d+\.\s*/, "");
    setLyrics(lines.join("\n"));
    setEditingLine(null);
    setEditSuggestions([]);
  };
  const copy = () => {
    navigator.clipboard.writeText(lyrics);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const splitLyricsIntoSentenceEntries = (text) => {
    const entries = [];
    let sentenceCount = 0;
    text.split("\n").forEach((rawLine, originalLineIndex) => {
      const trimmed = rawLine.trim();
      const isLabel = /^\[.+\]$/.test(trimmed);
      if (isLabel || trimmed === "") {
        entries.push({ text: rawLine, isLabel, originalLineIndex, number: null, rawLine });
        return;
      }

      const segments = rawLine.match(/[^.!?]+[.!?]+["']?(\s+|$)|[^.!?]+$/g) || [rawLine];
      segments.forEach((segment) => {
        const sentence = segment.replace(/\s+$/g, "");
        if (!sentence) return;
        sentenceCount += 1;
        entries.push({ text: sentence, isLabel: false, originalLineIndex, number: sentenceCount, rawLine });
      });
    });

    let normalizedCount = 0;
    return entries.map((entry) => {
      if (entry.number == null) return entry;
      normalizedCount += 1;
      return { ...entry, number: normalizedCount };
    });
  };

  const lbl = {
    fontSize: 10, letterSpacing: 4, color: C,
    display: "block", marginBottom: 10, textTransform: "uppercase",
  };

  const rootBg = darkMode ? "#080808" : "#f3efe8";
  const surface = darkMode ? "#0a0a0a" : "#f7efe6";
  const panel = darkMode ? "#0d0d0d" : "#fff8f0";
  const border = darkMode ? "#1a1a1a" : "#d3bfae";
  const textColor = darkMode ? "#fff" : "#111";
  const softText = darkMode ? "#555" : "#5e5446";
  const captionText = darkMode ? "#3a3a3a" : "#6a5f52";
  const inputBg = darkMode ? "#0d0d0d" : "#f5ede3";
  const panelText = darkMode ? "#ddd" : "#2b2520";
  const hoverBg = darkMode ? "#111" : "#e7dacd";

  const highlightBg = darkMode ? C : "#1a0800";
  const highlightText = darkMode ? "#000" : C;
  const secondaryBg = darkMode ? "#0d0d0d" : panel;

  const pill = (on) => ({
    padding: "7px 13px", fontSize: 10, letterSpacing: 1,
    fontFamily: "inherit", cursor: "pointer", textTransform: "uppercase",
    border: on ? `1px solid ${C}` : `1px solid ${border}`,
    background: on ? highlightBg : secondaryBg,
    color: on ? highlightText : softText,
    fontWeight: on ? 700 : 400,
    transition: "all 0.15s",
  });

  return (
    <div className="app-shell" style={{ minHeight: "100vh", background: rootBg, color: textColor, fontFamily: "'Courier New', monospace" }}>
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${C} 30%,${C} 70%,transparent)`, zIndex: 10 }} />

      <div className="app-container" style={{ maxWidth: 740, margin: "0 auto", padding: "52px 20px 100px", position: "relative" }}>

        {/* HEADER */}
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <div className="header-buttons" style={{ position: "absolute", top: 20, right: 20 }}>
            <button onClick={() => setDarkMode(!darkMode)} style={{ background: "none", border: `1px solid ${border}`, color: softText, padding: "6px 12px", fontSize: 10, letterSpacing: 2, fontFamily: "inherit", cursor: "pointer", textTransform: "uppercase" }}>
              {darkMode ? "☀️ LIGHT" : "🌙 DARK"}</button>
            <button onClick={() => setShowHistory(!showHistory)} style={{ background: "none", border: `1px solid ${border}`, color: softText, padding: "6px 12px", fontSize: 10, letterSpacing: 2, fontFamily: "inherit", cursor: "pointer", textTransform: "uppercase", marginLeft: 8 }}>
              📋 HISTORY ({history.length})
            </button>
          </div>
          <div style={{ fontSize: 10, letterSpacing: 8, color: C, marginBottom: 10 }}>AI-POWERED · ARTIST DNA · STYLE EXAMPLES</div>
          <div style={{ fontSize: "clamp(3rem,9vw,5.5rem)", fontWeight: 900, lineHeight: 0.85, letterSpacing: -3, textTransform: "uppercase" }}>
            <div style={{ color: textColor }}>RAP</div>
            <div style={{ color: C }}>FORGE</div>
          </div>
          <div style={{ color: captionText, fontSize: 11, letterSpacing: 3, marginTop: 14 }}>
            25 ARTISTS · 250+ SONGS · 100 STYLE EXAMPLES · ANY LANGUAGE
          </div>
        </div>

        {/* 01 — TOPIC */}
        <div style={{ marginBottom: 28 }}>
          <label style={lbl}>01 — Topic</label>
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && generate()}
            placeholder="travel and never come back, heartbreak, rising from nothing..."
            style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, color: textColor, padding: "14px 16px", fontSize: 14, fontFamily: "inherit", outline: "none", letterSpacing: 1 }}
            onFocus={(e) => (e.target.style.borderColor = C)}
            onBlur={(e) => (e.target.style.borderColor = border)}
          />
        </div>

        <div style={{ marginBottom: 28 }}>
          <label style={lbl}>01b — Deeper Context / Guidance (Optional)</label>
          <textarea
            value={guidance}
            onChange={(e) => setGuidance(e.target.value)}
            placeholder="Explain the deeper meaning, specific metaphors to use, or the story behind the song..."
            style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, color: textColor, padding: "14px 16px", fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 80, resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = C)}
            onBlur={(e) => (e.target.style.borderColor = border)}
          />
        </div>

        {/* 02 — ARTIST */}
        <div style={{ marginBottom: 28 }}>
          <label style={lbl}>02 — Artist Style</label>

          {/* Tabs */}
          <div style={{ display: "flex", borderBottom: `1px solid ${border}`, marginBottom: 14 }}>
            {[["INT", "🌍 International"], ["FR", "🇫🇷 Français"]].map(([k, l]) => (
              <button key={k} onClick={() => switchTab(k)} style={{ padding: "10px 20px", fontSize: 10, letterSpacing: 3, fontFamily: "inherit", cursor: "pointer", border: "none", borderBottom: tab === k ? `2px solid ${C}` : "2px solid transparent", background: "transparent", color: tab === k ? C : softText, fontWeight: tab === k ? 700 : 400, textTransform: "uppercase", marginBottom: -1 }}>
                {l}
              </button>
            ))}
          </div>

          {/* Artist pills */}
          <div className="artist-pills" style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 10 }}>
            {list.map((a) => (
              <button key={a.id} onClick={() => pickArtist(a)} style={pill(artist.id === a.id)}>
                {a.flag} {a.name}
              </button>
            ))}
          </div>

          {/* Meta + profile toggle */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 8 }}>
            <div style={{ fontSize: 10, color: captionText, letterSpacing: 2 }}>◈ {getArtistMeta(artist)}</div>
            <button onClick={() => setProfileOpen(!profileOpen)} style={{ background: "none", border: `1px solid ${border}`, color: softText, padding: "4px 10px", fontSize: 9, letterSpacing: 2, fontFamily: "inherit", cursor: "pointer", textTransform: "uppercase" }}>
              {profileOpen ? "HIDE ▴" : "PROFILE ▾"}
            </button>
          </div>

          {/* Profile panel */}
          {profileOpen && (
            <div style={{ background: surface, border: `1px solid ${border}`, borderLeft: `2px solid ${C}`, padding: 20, marginTop: 10 }}>
              <div style={{ fontSize: 10, color: C, letterSpacing: 3, marginBottom: 14, textTransform: "uppercase" }}>
                {artist.flag} {artist.name} — Knowledge Base
              </div>
              <div style={{ fontSize: 11, color: softText, lineHeight: 1.8, display: "grid", gap: 10 }}>
                <div><span style={{ color: captionText }}>THEMES · </span>{artist.coreThemes.slice(0, 4).join("  ·  ")}</div>
                <div><span style={{ color: captionText }}>FLOW · </span>{artist.flowType}</div>
                <div><span style={{ color: captionText }}>LITERARY DEVICES · </span>{artist.literaryDevices.join("  ·  ")}</div>
                <div>
                  <div style={{ color: captionText, marginBottom: 6 }}>REFERENCE SONGS ({artist.referenceSongs.length})</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                    {artist.referenceSongs.map((s) => (
                      <span key={s.title} title={s.note} style={{ fontSize: 9, padding: "3px 8px", border: `1px solid ${border}`, color: softText, letterSpacing: 1 }}>
                        {s.title} · {s.bpm}bpm
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <div style={{ color: captionText, marginBottom: 6 }}>STYLE EXAMPLES ({artist.styleExamples.length})</div>
                  {artist.styleExamples.map((ex, i) => (
                    <div key={i} style={{ fontSize: 10, color: softText, borderLeft: `1px solid ${C}`, paddingLeft: 10, marginBottom: 8, lineHeight: 1.7, fontStyle: "italic", whiteSpace: "pre-line" }}>
                      {ex}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 03 — VIBE */}
        <div style={{ marginBottom: 28 }}>
          <label style={lbl}>03 — Vibe</label>
          <div className="vibe-pills" style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {VIBES.map((v) => (
              <button key={v} onClick={() => setVibe(v)} style={{ padding: "8px 14px", fontSize: 11, fontFamily: "inherit", cursor: "pointer", border: vibe === v ? `1px solid ${C}` : `1px solid ${border}`, background: vibe === v ? "#1a0800" : panel, color: vibe === v ? C : softText, transition: "all 0.15s" }}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* 04 — LANGUAGE */}
        <div style={{ marginBottom: 28 }}>
          <label style={lbl}>04 — Language</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)} style={{ background: inputBg, border: `1px solid ${border}`, color: textColor, padding: "12px 16px", fontSize: 12, fontFamily: "inherit", outline: "none", width: "100%", cursor: "pointer", letterSpacing: 1 }}>
            {LANGUAGES.map((l) => <option key={l} value={l}>{l}</option>)}
          </select>
        </div>
        {/* 04 — MODE */}
        <div style={{ marginBottom: 28 }}>
          <label style={lbl}>04 — Generation Mode</label>
          <div style={{ fontSize: 10, color: C, letterSpacing: 2, marginBottom: 8 }}>NEW — Complete My Lyrics: write a first bar or paste unfinished lyrics and let the AI continue.</div>
          <div className="mode-row" style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button onClick={() => setMode("quick")} style={{ flex: 1, minWidth: 120, padding: "14px", fontSize: 11, letterSpacing: 3, fontFamily: "inherit", cursor: "pointer", border: mode === "quick" ? `1px solid ${C}` : `1px solid ${border}`, background: mode === "quick" ? highlightBg : panel, color: mode === "quick" ? highlightText : softText, textTransform: "uppercase", fontWeight: mode === "quick" ? 700 : 400 }}>⚡ Quick</button>
            <button onClick={() => setMode("advanced")} style={{ flex: 1, minWidth: 120, padding: "14px", fontSize: 11, letterSpacing: 3, fontFamily: "inherit", cursor: "pointer", border: mode === "advanced" ? `1px solid ${C}` : `1px solid ${border}`, background: mode === "advanced" ? highlightBg : panel, color: mode === "advanced" ? highlightText : softText, textTransform: "uppercase", fontWeight: mode === "advanced" ? 700 : 400 }}>🎯 Advanced</button>
            <button onClick={() => setMode("complete")} style={{ flex: 1, minWidth: 120, padding: "14px", fontSize: 11, letterSpacing: 3, fontFamily: "inherit", cursor: "pointer", border: mode === "complete" ? `1px solid ${C}` : `1px solid ${border}`, background: mode === "complete" ? highlightBg : panel, color: mode === "complete" ? highlightText : softText, textTransform: "uppercase", fontWeight: mode === "complete" ? 700 : 400 }}>✍️ Complete</button>
          </div>
          {mode === "advanced" && <div style={{ fontSize: 10, color: softText, letterSpacing: 1, marginTop: 8 }}>Two-step generation — concept outline first, then lyrics. Slower but more coherent.</div>}
          {mode === "complete" && <div style={{ fontSize: 10, color: softText, letterSpacing: 1, marginTop: 8 }}>Write a first bar or paste unfinished lyrics — AI will continue the verse from there.</div>}
        </div>

        {mode === "complete" && (
          <div style={{ marginBottom: 28 }}>
            <label style={lbl}>05 — Start / Unfinished Lyrics</label>
            <textarea
              rows={6}
              value={startingLyrics}
              onChange={(e) => setStartingLyrics(e.target.value)}
              placeholder="Write your first bar here, or paste unfinished lyrics for the AI to continue..."
              style={{ width: "100%", minHeight: 140, background: inputBg, border: `1px solid ${border}`, color: textColor, padding: "16px", fontSize: 13, fontFamily: "inherit", outline: "none", resize: "vertical", letterSpacing: 0.3 }}
            />
          </div>
        )}


        {/* 04 — TEMPERATURE */}
<div style={{ marginBottom: 28 }}>
  <label style={lbl}>04 — Creativity</label>
  <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
    <span style={{ fontSize: 10, color: softText, letterSpacing: 2 }}>SAFE</span>
    <input
      type="range"
      min="0.1"
      max="2.0"
      step="0.05"
      value={temperature}
      onChange={(e) => setTemperature(parseFloat(e.target.value))}
      style={{ flex: 1, accentColor: "#ff3c00" }}
    />
    <span style={{ fontSize: 10, color: softText, letterSpacing: 2 }}>WILD</span>
    <span style={{ fontSize: 12, color: "#ff3c00", minWidth: 30 }}>{temperature}</span>
  </div>
</div>

        {/* GENERATE BUTTON */}
        <button
          onClick={generate}
          disabled={loading || !canGenerate}
          style={{ padding: 18, fontSize: 12, letterSpacing: 4, fontFamily: "inherit", fontWeight: 700, textTransform: "uppercase", width: "100%", cursor: loading || !canGenerate ? "not-allowed" : "pointer", background: loading || !canGenerate ? (darkMode ? "#111" : "#ddd") : C, color: loading || !canGenerate ? (darkMode ? "#333" : "#666") : "#000", border: "none", transition: "all 0.2s" }}
        >
          {loading
            ? <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}><span style={{ display: "inline-block", animation: "spin 1s linear infinite" }}>◌</span>{loadingMsg}</span>
            : "🎤  GENERATE LYRICS"}
        </button>

        {error && <div style={{ marginTop: 16, color: C, fontSize: 12, textAlign: "center" }}>{error}</div>}

        {showHistory && history.length > 0 && (
          <div style={{ marginTop: 48, background: surface, border: `1px solid ${border}`, padding: 24 }}>
            <div style={{ fontSize: 10, letterSpacing: 4, color: C, marginBottom: 16 }}>📋 HISTORY — LAST {history.length} GENERATIONS</div>
            {history.map((h) => (
              <div key={h.id} onClick={() => { setLyrics(h.lyrics); setShowHistory(false); }} style={{ padding: "12px 16px", borderBottom: `1px solid ${border}`, cursor: "pointer", marginBottom: 4 }} onMouseEnter={e => e.currentTarget.style.background = hoverBg} onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ fontSize: 11, color: C }}>{h.artist} — {h.topic}</div>
                <div style={{ fontSize: 9, color: softText, letterSpacing: 2, marginTop: 4 }}>{h.language} · {h.vibe} · {h.date}</div>
              </div>
            ))}
          </div>
        )}
        {/* LYRICS OUTPUT */}
        {lyrics && (
          <div ref={lyricsRef} style={{ marginTop: 48 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
              <div style={{ fontSize: 9, letterSpacing: 3, color: C }}>
                ✦ {artist.name.toUpperCase()} · {language.toUpperCase()} · {vibe.replace(/^\S+\s/, "").toUpperCase()} · {artist.typicalBpm} BPM
              </div>
              <button onClick={copy} style={{ background: "none", border: `1px solid ${border}`, color: copied ? C : softText, padding: "5px 12px", fontSize: 9, letterSpacing: 2, fontFamily: "inherit", cursor: "pointer", textTransform: "uppercase" }}>
                {copied ? "✓ COPIED" : "COPY"}
              </button>
            </div>
            <div style={{ background: surface, border: `1px solid ${border}`, borderLeft: `3px solid ${C}`, padding: 32 }}>
              <pre style={{ margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: 2, fontSize: 13, color: panelText, fontFamily: "'Courier New', monospace" }}>
                {splitLyricsIntoSentenceEntries(lyrics).map((entry, i) => {
                  const isLabel = entry.isLabel;
                  const line = entry.text;
                  const isEditing = editingLine === entry.originalLineIndex;
                  return (
<span key={`${entry.originalLineIndex}-${i}`} style={{ display: "flex", alignItems: "flex-start", gap: 12, color: isLabel ? C : "#ddd", fontWeight: isLabel ? 700 : 400, marginTop: isLabel ? 20 : 0, letterSpacing: isLabel ? 3 : 0.3, fontSize: isLabel ? 10 : 13 }}>
  {!isLabel && line && <span style={{ minWidth: 24, color: "#333", fontSize: 10, paddingTop: 2, userSelect: "none", textAlign: "right" }}>{entry.number}</span>}
  {isLabel && <span style={{ minWidth: 24 }}></span>}                      {!isLabel && !isEditing && line && (
                        <span
                          onClick={() => rewriteLine(entry.originalLineIndex, entry.rawLine)}
                          title="Click to rewrite this line"
                          style={{ cursor: "pointer", borderBottom: "1px dashed #333", transition: "all 0.15s" }}
                          onMouseEnter={e => e.target.style.borderBottomColor = C}
                          onMouseLeave={e => e.target.style.borderBottomColor = "#333"}
                        >
{line}
                          <span onClick={(e) => { e.stopPropagation(); toggleFavorite(entry.rawLine); }} style={{ marginLeft: 8, cursor: "pointer", fontSize: 12, opacity: favorites.includes(entry.rawLine) ? 1 : 0.2 }} title="Favorite">
                            {favorites.includes(entry.rawLine) ? "❤️" : "🤍"}
                          </span>
                        </span>                      )}
                      {!isLabel && isEditing && (
                        <span>
                          {editLoading && <span style={{ color: C, fontSize: 10 }}>✦ REWRITING...</span>}
                          {!editLoading && editSuggestions.map((s, j) => (
                            <span key={j} style={{ display: "block", cursor: "pointer", color: softText, borderLeft: `2px solid ${C}`, paddingLeft: 10, marginBottom: 6 }}
                              onClick={() => applyEdit(entry.originalLineIndex, s)}
                              onMouseEnter={e => e.currentTarget.style.color = darkMode ? "#fff" : "#111"}
                              onMouseLeave={e => e.currentTarget.style.color = softText}
                            >
                              {s}
                            </span>
                          ))}
                          <span onClick={() => { setEditingLine(null); setEditSuggestions([]); }} style={{ fontSize: 9, color: softText, cursor: "pointer", letterSpacing: 2 }}>✕ CANCEL</span>
                        </span>
                      )}
                      {(isLabel || !line) && (line || " ")}
                    </span>
                  );
                })}
              </pre>
              <div style={{ marginTop: 24, borderTop: `1px solid ${border}`, paddingTop: 24 }}>
                <label style={lbl}>Modify & Refine (Feedback)</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  placeholder="e.g., Make the second verse more aggressive, change the hook to talk about a midnight drive..."
                  style={{ width: "100%", background: inputBg, border: `1px solid ${border}`, color: textColor, padding: "14px 16px", fontSize: 13, fontFamily: "inherit", outline: "none", minHeight: 80, resize: "vertical", marginBottom: 12 }}
                  onFocus={(e) => (e.target.style.borderColor = C)}
                  onBlur={(e) => (e.target.style.borderColor = border)}
                />
                <button
                  onClick={reviseLyrics}
                  disabled={revising || !feedback.trim()}
                  style={{ padding: "12px 24px", fontSize: 11, letterSpacing: 2, fontFamily: "inherit", fontWeight: 700, textTransform: "uppercase", cursor: revising || !feedback.trim() ? "not-allowed" : "pointer", background: revising || !feedback.trim() ? secondaryBg : C, color: revising || !feedback.trim() ? softText : "#000", border: `1px solid ${revising || !feedback.trim() ? border : C}`, transition: "all 0.2s" }}
                >
                  {revising ? "◌ REVISING..." : "✨ APPLY FEEDBACK"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
