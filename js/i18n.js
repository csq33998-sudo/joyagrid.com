(function () {
  const LANG_KEY = "joya_grid_language";
  const supported = {
    en: "English",
    de: "Deutsch",
    fr: "Français",
    es: "Español",
    it: "Italiano",
    nl: "Nederlands",
    pt: "Português"
  };

  const categoryLabels = {
    en: {
      All: "All",
      Accessories: "Accessories",
      Bags: "Bags",
      Hoodies: "Hoodies",
      Outerwear: "Outerwear",
      Pants: "Pants",
      Skirts: "Skirts",
      Sneakers: "Sneakers",
      "T-Shirts": "T-Shirts"
    },
    es: {
      All: "Todo",
      Accessories: "Accesorios",
      Bags: "Bolsos",
      Hoodies: "Hoodies",
      Outerwear: "Chaquetas",
      Pants: "Pantalones",
      Skirts: "Faldas",
      Sneakers: "Sneakers",
      "T-Shirts": "Camisetas"
    },
    fr: {
      All: "Tout",
      Accessories: "Accessoires",
      Bags: "Sacs",
      Hoodies: "Hoodies",
      Outerwear: "Vestes",
      Pants: "Pantalons",
      Skirts: "Jupes",
      Sneakers: "Sneakers",
      "T-Shirts": "T-shirts"
    },
    de: {
      All: "Alle",
      Accessories: "Accessoires",
      Bags: "Taschen",
      Hoodies: "Hoodies",
      Outerwear: "Jacken",
      Pants: "Hosen",
      Skirts: "Roecke",
      Sneakers: "Sneaker",
      "T-Shirts": "T-Shirts"
    },
    it: {
      All: "Tutto",
      Accessories: "Accessori",
      Bags: "Borse",
      Hoodies: "Felpe",
      Outerwear: "Giacche",
      Pants: "Pantaloni",
      Skirts: "Gonne",
      Sneakers: "Sneaker",
      "T-Shirts": "T-shirt"
    },
    nl: {
      All: "Alles",
      Accessories: "Accessoires",
      Bags: "Tassen",
      Hoodies: "Hoodies",
      Outerwear: "Jassen",
      Pants: "Broeken",
      Skirts: "Rokken",
      Sneakers: "Sneakers",
      "T-Shirts": "T-shirts"
    },
    pt: {
      All: "Tudo",
      Accessories: "Acessórios",
      Bags: "Bolsas",
      Hoodies: "Hoodies",
      Outerwear: "Jaquetas",
      Pants: "Calças",
      Skirts: "Saias",
      Sneakers: "Tênis",
      "T-Shirts": "Camisetas"
    }
  };

  const articles = [
    {
      slug: "curated-finds-board",
      meta: { en: "Guide - 6 min read", es: "Guia - 6 min", fr: "Guide - 6 min", de: "Guide - 6 Min." },
      title: {
        en: "How to use a curated finds board without spreadsheet chaos",
        es: "Como usar un tablero curado sin el caos de las hojas de calculo",
        fr: "Utiliser un tableau de trouvailles sans le chaos des feuilles",
        de: "Ein kuratiertes Finds-Board ohne Tabellenchaos nutzen"
      },
      summary: {
        en: "Build a repeatable workflow for browsing categories, saving keywords, and moving from inspiration to a focused Maison Looks search.",
        es: "Crea un flujo repetible para explorar categorias, guardar palabras clave y pasar de inspiracion a una busqueda enfocada.",
        fr: "Creez une methode simple pour parcourir les categories, garder les bons mots-cles et lancer une recherche precise.",
        de: "Baue einen klaren Ablauf auf: Kategorien ansehen, Suchbegriffe sichern und gezielt bei Maison Looks suchen."
      },
      body: {
        en: {
          eyebrow: "Guide",
          lede: "Spreadsheets are useful because they collect many links in one place. They also become noisy fast: repeated items, dead links, vague product names, and rows that are hard to scan on mobile. A curated board should keep the discovery value while removing the friction.",
          sections: [
            ["Start with a category, not a brand name", "Begin with broad wardrobe intent: shoes, hoodies, jackets, bags, pants, or accessories. Category browsing keeps the first pass visual and helps you notice silhouettes you might not have searched for directly."],
            ["Turn inspiration into search terms", "Do not copy every title exactly. Extract the parts that matter: material, shape, color, use case, and season. A cropped hoodie can become searches like cropped hoodie, washed hoodie, or neutral hoodie set."],
            ["Use the board as a filter layer", "A good finds board is not the checkout page. Treat it as a shortlist layer, compare several options, then review details carefully before committing to an order."],
            ["Keep a small personal shortlist", "Instead of hoarding dozens of tabs, keep five to ten serious candidates. Note the keyword, estimated price, category, color, and why you saved it."]
          ],
          ctaTitle: "Try a focused search",
          ctaText: "Start broad, then refine by material, color, or silhouette.",
          ctaLabel: "Search shoes",
          ctaQuery: "shoes"
        },
        es: {
          eyebrow: "Guia",
          lede: "Las hojas de calculo juntan muchos enlaces, pero pronto se vuelven ruidosas: articulos repetidos, enlaces muertos, nombres vagos y filas dificiles de leer en movil. Un tablero curado mantiene el valor de descubrimiento y reduce la friccion.",
          sections: [
            ["Empieza por categoria, no por marca", "Busca primero por intencion de armario: zapatos, hoodies, chaquetas, bolsos, pantalones o accesorios. Asi ves siluetas antes de encerrarte en un nombre concreto."],
            ["Convierte inspiracion en palabras clave", "No copies cada titulo. Extrae material, forma, color, uso y temporada. Un cropped hoodie puede convertirse en cropped hoodie, washed hoodie o neutral hoodie set."],
            ["Usa el tablero como filtro", "El tablero no es la pagina de pago. Usalo para crear una lista corta, comparar opciones y revisar detalles antes de decidir."],
            ["Mantén una lista corta", "En lugar de abrir decenas de pestanas, guarda cinco a diez candidatos serios con palabra clave, precio estimado, categoria y motivo."]
          ],
          ctaTitle: "Prueba una busqueda enfocada",
          ctaText: "Empieza amplio y afina por material, color o silueta.",
          ctaLabel: "Buscar shoes",
          ctaQuery: "shoes"
        },
        fr: {
          eyebrow: "Guide",
          lede: "Les feuilles de calcul regroupent beaucoup de liens, mais deviennent vite confuses: doublons, liens morts, noms vagues et lignes peu lisibles sur mobile. Un tableau curatif garde la valeur de decouverte avec moins de friction.",
          sections: [
            ["Commencer par une categorie", "Partez d'une intention simple: chaussures, hoodies, vestes, sacs, pantalons ou accessoires. La categorie aide a voir les silhouettes avant de choisir un terme precis."],
            ["Transformer l'inspiration en mots-cles", "Ne copiez pas chaque titre. Gardez la matiere, la forme, la couleur, l'usage et la saison. Un hoodie cropped peut devenir cropped hoodie ou washed hoodie."],
            ["Utiliser le tableau comme filtre", "Un bon tableau n'est pas la caisse. Servez-vous-en pour selectionner, comparer, puis verifier les details avant de commander."],
            ["Garder une courte liste", "Au lieu de multiplier les onglets, gardez cinq a dix candidats serieux avec mot-cle, prix estime, categorie et raison du choix."]
          ],
          ctaTitle: "Essayer une recherche ciblee",
          ctaText: "Commencez large, puis affinez par matiere, couleur ou silhouette.",
          ctaLabel: "Rechercher shoes",
          ctaQuery: "shoes"
        },
        de: {
          eyebrow: "Guide",
          lede: "Tabellen sammeln viele Links, werden aber schnell unubersichtlich: doppelte Teile, tote Links, vage Namen und schwer lesbare Zeilen auf dem Handy. Ein kuratiertes Board behalt den Discovery-Wert und nimmt Reibung heraus.",
          sections: [
            ["Mit einer Kategorie starten", "Starte mit breiter Garderobenabsicht: Schuhe, Hoodies, Jacken, Taschen, Hosen oder Accessoires. Kategorien helfen, Silhouetten zu erkennen, bevor du zu eng suchst."],
            ["Inspiration in Suchbegriffe wandeln", "Kopiere nicht jeden Titel. Nutze Material, Form, Farbe, Zweck und Saison. Ein cropped hoodie wird zu cropped hoodie, washed hoodie oder neutral hoodie set."],
            ["Das Board als Filter nutzen", "Ein Finds-Board ist keine Checkout-Seite. Nutze es als Shortlist, vergleiche Optionen und prufe Details vor einer Entscheidung."],
            ["Eine kleine Shortlist behalten", "Statt dutzende Tabs zu sammeln, behalte funf bis zehn ernsthafte Kandidaten mit Keyword, Preis, Kategorie und Grund."]
          ],
          ctaTitle: "Gezielt suchen",
          ctaText: "Breit starten, dann nach Material, Farbe oder Silhouette verfeinern.",
          ctaLabel: "Shoes suchen",
          ctaQuery: "shoes"
        }
      }
    },
    {
      slug: "qc-photo-checklist",
      meta: { en: "Checklist - 5 min read", es: "Checklist - 5 min", fr: "Checklist - 5 min", de: "Checkliste - 5 Min." },
      title: {
        en: "QC photo checks for streetwear and sneakers",
        es: "Checklist de fotos QC para streetwear y sneakers",
        fr: "Checklist QC pour streetwear et sneakers",
        de: "QC-Foto-Check fur Streetwear und Sneaker"
      },
      summary: {
        en: "Review the details that matter before shipping: silhouette, fabric, stitching, tags, color, sizing notes, and packaging.",
        es: "Revisa silueta, tela, costuras, etiquetas, color, talla y empaque antes del envio.",
        fr: "Verifiez silhouette, tissu, coutures, etiquettes, couleur, taille et emballage avant l'envoi.",
        de: "Prufe Silhouette, Stoff, Nahte, Tags, Farbe, Groesse und Verpackung vor dem Versand."
      },
      body: {
        en: {
          eyebrow: "Checklist",
          lede: "QC photos are not only for finding obvious flaws. They help you confirm that the item matches your expectations before you spend money on international shipping.",
          sections: [
            ["Shape and proportions", "For sneakers, compare toe shape, side profile, heel height, and sole curve. For clothing, check whether the cut is cropped, oversized, boxy, straight, wide-leg, or tapered."],
            ["Stitching and construction", "Look for uneven seams, loose threads, warped panels, and obvious alignment issues. On bags and jackets, check handles, zippers, pockets, and hardware placement."],
            ["Fabric and texture", "Photos can reveal whether a hoodie looks structured or flimsy, whether denim has the wash you expected, and whether leather-like materials look too glossy."],
            ["Color and sizing", "Warehouse lighting can shift colors, so focus on large mismatches. If measurements are available, compare them against something you already own."]
          ],
          ctaTitle: "Search with QC in mind",
          ctaText: "Open a focused category and compare multiple options before saving one.",
          ctaLabel: "Search sneakers",
          ctaQuery: "sneakers"
        }
      }
    },
    {
      slug: "category-search-guide",
      meta: { en: "Category guide - 7 min read", es: "Categorias - 7 min", fr: "Categories - 7 min", de: "Kategorien - 7 Min." },
      title: {
        en: "What to search for by category",
        es: "Que buscar segun la categoria",
        fr: "Que rechercher selon la categorie",
        de: "Wonach du je Kategorie suchen solltest"
      },
      summary: {
        en: "Keyword ideas for shoes, hoodies, tees, pants, bags, accessories, jackets, and seasonal street-style outfits.",
        es: "Ideas de palabras clave para shoes, hoodies, camisetas, pantalones, bolsos, accesorios y chaquetas.",
        fr: "Idees de mots-cles pour chaussures, hoodies, tees, pantalons, sacs, accessoires et vestes.",
        de: "Keyword-Ideen fur Schuhe, Hoodies, Shirts, Hosen, Taschen, Accessoires und Jacken."
      },
      body: {
        en: {
          eyebrow: "Category guide",
          lede: "Good search terms are specific enough to narrow results, but not so specific that you only see one seller or one version. Use the category as your anchor, then add shape, material, color, or season.",
          sections: [
            ["Shoes", "Try low sneaker, chunky sneaker, running shoe, retro sneaker, skate shoe, or black sneaker. If results are too broad, add a color or silhouette."],
            ["Hoodies and sweaters", "Useful terms include cropped hoodie, zip hoodie, washed hoodie, heavyweight hoodie, knit sweater, and oversized sweater."],
            ["T-shirts and jerseys", "Search graphic tee, heavyweight tee, boxy tee, football jersey, mesh jersey, or washed t shirt."],
            ["Jackets, pants, bags, and accessories", "Try bomber jacket, windbreaker, cargo pants, wide leg pants, tote bag, crossbody, sunglasses, cap, belt, or scarf."]
          ],
          ctaTitle: "Start with a category search",
          ctaText: "Open Maison Looks and refine from there.",
          ctaLabel: "Search hoodies",
          ctaQuery: "hoodie"
        }
      }
    },
    {
      slug: "agent-shopping-workflow",
      meta: { en: "Workflow - 6 min read", es: "Flujo - 6 min", fr: "Methode - 6 min", de: "Ablauf - 6 Min." },
      title: {
        en: "From inspiration to checkout: a cautious agent workflow",
        es: "De la inspiracion al checkout: un flujo prudente",
        fr: "De l'inspiration au checkout: une methode prudente",
        de: "Von Inspiration bis Checkout: ein vorsichtiger Ablauf"
      },
      summary: {
        en: "A practical, non-hype process for checking product pages, estimating shipping, reviewing QC photos, and keeping expectations realistic.",
        es: "Un proceso practico para revisar paginas, estimar envio, comprobar QC y mantener expectativas realistas.",
        fr: "Une methode pratique pour verifier les pages, estimer l'envoi, lire les QC et rester realiste.",
        de: "Ein praktischer Ablauf fur Produktseiten, Versandkosten, QC-Fotos und realistische Erwartungen."
      },
      body: {
        en: {
          eyebrow: "Workflow",
          lede: "A discovery site can help you find ideas, but the buying decision still needs a careful process. Use this workflow to slow down, compare options, and avoid obvious mistakes.",
          sections: [
            ["Search broadly, then narrow", "Begin with a category search, then add practical details such as color, material, silhouette, or use case."],
            ["Read product details before price", "A low price is not useful if sizing, material, or version information is unclear."],
            ["Estimate full cost", "Item price is only one part of the total. Weight, dimensions, packaging, fees, and shipping line affect what you pay."],
            ["Review QC photos before shipping", "Compare the actual item with your expectations before international shipping."]
          ],
          ctaTitle: "Search carefully",
          ctaText: "Use Maison Looks as the search destination, then verify details before taking the next step.",
          ctaLabel: "Search jackets",
          ctaQuery: "jacket"
        }
      }
    },
    {
      slug: "measurement-sizing-guide",
      meta: { en: "Sizing - 6 min read", es: "Tallas - 6 min", fr: "Tailles - 6 min", de: "Groessen - 6 Min." },
      title: {
        en: "How to read measurements before ordering streetwear",
        es: "Como leer medidas antes de pedir streetwear",
        fr: "Lire les mesures avant de commander du streetwear",
        de: "Masse lesen, bevor du Streetwear bestellst"
      },
      summary: {
        en: "Compare product measurements with clothes you already own so oversized, cropped, wide-leg, and fitted pieces land closer to your expectations.",
        es: "Compara medidas con prendas que ya tienes para acertar mejor con fits oversized, cropped o wide-leg.",
        fr: "Comparez les mesures avec vos vetements pour mieux juger les coupes oversized, cropped ou wide-leg.",
        de: "Vergleiche Masse mit Kleidung, die dir passt, damit oversized, cropped und wide-leg besser sitzen."
      },
      body: {
        en: {
          eyebrow: "Sizing",
          lede: "Streetwear sizing can be confusing because the intended fit changes by item. Measurements give you a better way to judge fit than the label alone.",
          sections: [
            ["Measure a piece you already like", "Lay a hoodie, tee, pants, or jacket flat and record shoulder, chest, sleeve, length, waist, rise, thigh, leg opening, and inseam."],
            ["Compare fit intention", "A cropped hoodie should be shorter. A boxy tee may be wider with a shorter body. Wide-leg pants need enough opening to fall cleanly."],
            ["Leave room for fabric behavior", "Heavy cotton, denim, nylon, knitwear, and fleece all sit differently on the body."],
            ["Check shoe sizing notes", "For shoes, check EU size, insole length, and any notes about narrow or roomy fit."]
          ],
          ctaTitle: "Search by fit",
          ctaText: "Try fit-based keywords when silhouette matters more than the exact title.",
          ctaLabel: "Search oversized hoodie",
          ctaQuery: "oversized hoodie"
        }
      }
    },
    {
      slug: "shipping-cost-guide",
      meta: { en: "Budget - 5 min read", es: "Coste - 5 min", fr: "Budget - 5 min", de: "Budget - 5 Min." },
      title: {
        en: "How to estimate shipping and total cost",
        es: "Como estimar envio y coste total",
        fr: "Estimer l'expedition et le cout total",
        de: "Versand und Gesamtkosten einschatzen"
      },
      summary: {
        en: "Understand why item price, weight, packaging, service fees, consolidation, and shipping line choices all affect the final cost.",
        es: "Entiende como precio, peso, empaque, comisiones, consolidacion y linea de envio afectan el coste.",
        fr: "Comprenez l'impact du prix, du poids, de l'emballage, des frais, de la consolidation et du transport.",
        de: "Verstehe, wie Preis, Gewicht, Verpackung, Gebuhren, Bundelung und Versandlinie die Kosten andern."
      },
      body: {
        en: {
          eyebrow: "Budget",
          lede: "A low item price can look attractive until shipping, packaging, and service costs are included. Estimate the full spend so the final number does not surprise you.",
          sections: [
            ["Think in total landed cost", "Total cost includes item price, domestic shipping, service fees, packaging, international shipping, and possible taxes or duties."],
            ["Weight changes the decision", "Tees and accessories are easier to add. Shoes, denim, hoodies, jackets, and bags add weight quickly."],
            ["Packaging choices matter", "Keeping shoe boxes can protect presentation but increases volume. Removing boxes may reduce shipping size."],
            ["Consolidate with a plan", "Combining items can reduce per-item shipping, but only if you actually want everything."]
          ],
          ctaTitle: "Search lighter items",
          ctaText: "Start with pieces that are easier to evaluate and ship.",
          ctaLabel: "Search T-shirts",
          ctaQuery: "t shirt"
        }
      }
    },
    {
      slug: "sneaker-search-guide",
      meta: { en: "Shoes - 7 min read", es: "Shoes - 7 min", fr: "Chaussures - 7 min", de: "Schuhe - 7 Min." },
      title: {
        en: "How to search sneakers and shoes with better keywords",
        es: "Como buscar sneakers y zapatos con mejores palabras clave",
        fr: "Mieux chercher sneakers et chaussures",
        de: "Sneaker und Schuhe mit besseren Keywords suchen"
      },
      summary: {
        en: "Move beyond one-word searches and use silhouette, use case, color, and material terms to find cleaner shoe results.",
        es: "Usa silueta, uso, color y material en lugar de una sola palabra.",
        fr: "Utilisez silhouette, usage, couleur et matiere au lieu d'un seul mot.",
        de: "Nutze Silhouette, Zweck, Farbe und Material statt Ein-Wort-Suchen."
      },
      body: {
        en: {
          eyebrow: "Shoes",
          lede: "Shoe searches get better when you describe the silhouette and use case. A single word like shoes is too broad, while a very specific nickname can miss useful alternatives.",
          sections: [
            ["Use silhouette terms first", "Try low sneaker, retro running shoe, skate shoe, chunky sneaker, trail sneaker, leather sneaker, or platform sneaker."],
            ["Add use case and color", "Search black low sneaker, white leather sneaker, gray running shoe, or brown skate shoe for more useful results."],
            ["QC the side profile", "The side view reveals toe height, heel curve, sole thickness, panel alignment, and proportions."],
            ["Check sole and insole details", "Look at outsole texture, midsole paint, glue marks, and insole length."]
          ],
          ctaTitle: "Open a shoe search",
          ctaText: "Start with a useful broad term and refine from there.",
          ctaLabel: "Search retro running shoe",
          ctaQuery: "retro running shoe"
        }
      }
    },
    {
      slug: "bags-accessories-guide",
      meta: { en: "Accessories - 5 min read", es: "Accesorios - 5 min", fr: "Accessoires - 5 min", de: "Accessoires - 5 Min." },
      title: {
        en: "How to evaluate bags and accessories from photos",
        es: "Como evaluar bolsos y accesorios desde fotos",
        fr: "Evaluer sacs et accessoires depuis les photos",
        de: "Taschen und Accessoires anhand von Fotos bewerten"
      },
      summary: {
        en: "Check proportion, hardware, straps, zipper lines, lens shape, and daily-use details before adding smaller items to a haul.",
        es: "Revisa proporcion, herrajes, correas, cremalleras, forma y uso diario.",
        fr: "Verifiez proportions, hardware, sangles, zips, forme et usage quotidien.",
        de: "Prufe Proportion, Hardware, Riemen, Reissverschlusse, Form und Alltagstauglichkeit."
      },
      body: {
        en: {
          eyebrow: "Accessories",
          lede: "Small items can make a simple outfit feel finished, but they are easy to overbuy. Use photos to judge whether the piece will actually work in your daily rotation.",
          sections: [
            ["Check scale and proportion", "A tote, shoulder bag, or crossbody can look very different depending on body size and outfit."],
            ["Inspect hardware and straps", "Pay attention to zipper lines, buckles, strap stitching, handle attachment, and metal finish."],
            ["Think about daily use", "Ask what the item needs to carry. A small shoulder bag may look good but fail if it cannot hold essentials."],
            ["Avoid filler additions", "Save only the accessories you can imagine wearing with multiple outfits."]
          ],
          ctaTitle: "Search a useful accessory",
          ctaText: "Start with a practical bag type before browsing decorative pieces.",
          ctaLabel: "Search crossbody bag",
          ctaQuery: "crossbody bag"
        }
      }
    },
    {
      slug: "seasonal-capsule-guide",
      meta: { en: "Seasonal - 6 min read", es: "Temporada - 6 min", fr: "Saison - 6 min", de: "Saisonal - 6 Min." },
      title: {
        en: "Build a small seasonal streetwear capsule",
        es: "Crea una capsula pequena de streetwear por temporada",
        fr: "Construire une petite capsule streetwear saisonniere",
        de: "Eine kleine saisonale Streetwear-Capsule bauen"
      },
      summary: {
        en: "Use a restrained list of shoes, pants, outerwear, tees, bags, and accessories to make finds easier to style together.",
        es: "Usa una lista limitada de shoes, pantalones, outerwear, tees, bolsos y accesorios.",
        fr: "Utilisez une liste courte de chaussures, pantalons, vestes, tees, sacs et accessoires.",
        de: "Nutze eine kleine Liste aus Schuhen, Hosen, Outerwear, Tees, Taschen und Accessoires."
      },
      body: {
        en: {
          eyebrow: "Seasonal",
          lede: "A capsule does not need to be boring. It simply means each new find has a role and works with the rest of your wardrobe.",
          sections: [
            ["Start with one anchor shoe", "Choose a shoe that sets the tone: clean sneaker, retro runner, skate shoe, boot, or chunky sneaker."],
            ["Pick two pants shapes", "Try one relaxed everyday pair and one stronger silhouette, such as wide-leg denim or cargo pants."],
            ["Add tops by weight", "Use tees for base layers, hoodies for volume, shirts for structure, and knitwear for texture."],
            ["Use outerwear as the statement", "A bomber, denim jacket, windbreaker, varsity jacket, or puffer can carry the outfit."]
          ],
          ctaTitle: "Search capsule basics",
          ctaText: "Use broad terms first, then refine by color and material.",
          ctaLabel: "Search wide leg pants",
          ctaQuery: "wide leg pants"
        }
      }
    },
    {
      slug: "frequently-asked-questions",
      meta: { en: "FAQ - 6 min read", es: "FAQ - 6 min", fr: "FAQ - 6 min", de: "FAQ - 6 Min." },
      title: {
        en: "Common questions before using a finds site",
        es: "Preguntas comunes antes de usar un sitio de finds",
        fr: "Questions courantes avant d'utiliser un site de finds",
        de: "Haufige Fragen vor der Nutzung einer Finds-Seite"
      },
      summary: {
        en: "Answers about link reliability, availability, search behavior, QC photos, measurements, shipping expectations, and what a finds site can and cannot do.",
        es: "Respuestas sobre enlaces, disponibilidad, busqueda, QC, medidas, envio y limites del sitio.",
        fr: "Reponses sur liens, disponibilite, recherche, QC, mesures, expedition et limites du site.",
        de: "Antworten zu Links, Verfugbarkeit, Suche, QC, Massen, Versand und Grenzen der Seite."
      },
      body: {
        en: {
          eyebrow: "FAQ",
          lede: "Joya Grid is built as a discovery layer. It helps you find categories, search terms, and outfit ideas, but it does not replace your own review before buying.",
          sections: [
            ["Does Joya Grid sell products?", "No. Joya Grid is an independent inspiration and discovery site. Orders, payments, shipping, and customer service happen elsewhere."],
            ["Why do links open Maison Looks search pages?", "Search pages are more reliable than guessed category URLs and let you compare several possible items."],
            ["Are items always available?", "No. Availability can change. A find is a starting point, not a guarantee that the same item, color, or size is available."],
            ["How should I use QC photos?", "Use QC photos to confirm shape, measurements, color, stitching, material, and obvious defects before final shipment."]
          ],
          ctaTitle: "Start with a simple search",
          ctaText: "Use one category term, then narrow gradually.",
          ctaLabel: "Search streetwear",
          ctaQuery: "streetwear"
        }
      }
    },
    {
      slug: "streetwear-color-palette-guide",
      meta: { en: "Color - 6 min read", es: "Color - 6 min", fr: "Couleur - 6 min", de: "Farbe - 6 Min." },
      title: {
        en: "How to build better streetwear color palettes",
        es: "Como crear mejores paletas de color streetwear",
        fr: "Construire de meilleures palettes streetwear",
        de: "Bessere Streetwear-Farbpaletten bauen"
      },
      summary: {
        en: "Use neutrals, accent colors, washed tones, contrast, and texture so your finds work together instead of fighting each other.",
        es: "Usa neutros, acentos, tonos lavados, contraste y textura para que las piezas combinen.",
        fr: "Utilisez neutres, accents, tons delaves, contraste et texture pour harmoniser vos pieces.",
        de: "Nutze Neutrals, Akzente, Washed Tones, Kontrast und Textur, damit Teile zusammenpassen."
      },
      body: {
        en: {
          eyebrow: "Color",
          lede: "A good outfit search is not only about finding a strong item. It is about finding items that work with the colors you already wear.",
          sections: [
            ["Start with two reliable neutrals", "Black, white, gray, navy, olive, cream, and washed brown are easier to repeat across outfits."],
            ["Add one accent color", "A red cap, yellow hoodie, green bag, or blue sneaker can make a simple outfit feel intentional."],
            ["Use washed tones", "Washed black, faded blue, sun-bleached green, and muted burgundy pair well with denim and canvas."],
            ["Search with color words", "Add color terms after the category: black cargo pants, washed hoodie, olive jacket, or cream tote bag."]
          ],
          ctaTitle: "Try a color search",
          ctaText: "Start with a wearable neutral and refine from there.",
          ctaLabel: "Search washed black hoodie",
          ctaQuery: "washed black hoodie"
        }
      }
    },
    {
      slug: "fabric-texture-photo-guide",
      meta: { en: "Fabric - 6 min read", es: "Tela - 6 min", fr: "Matiere - 6 min", de: "Material - 6 Min." },
      title: {
        en: "How to judge fabric and texture from photos",
        es: "Como juzgar tela y textura desde fotos",
        fr: "Juger matiere et texture depuis les photos",
        de: "Stoff und Textur anhand von Fotos einschatzen"
      },
      summary: {
        en: "Learn what warehouse photos can reveal about fleece, denim, nylon, knitwear, leather-like materials, and washed cotton.",
        es: "Aprende que muestran las fotos sobre fleece, denim, nylon, punto, cuero sintetico y algodon lavado.",
        fr: "Voyez ce que les photos revelent sur fleece, denim, nylon, maille, simili cuir et coton lave.",
        de: "Erkenne, was Fotos uber Fleece, Denim, Nylon, Strick, Lederoptik und Washed Cotton zeigen."
      },
      body: {
        en: {
          eyebrow: "Fabric",
          lede: "Photos cannot tell you everything, but they can reveal enough to avoid many weak buys. Texture, weight, shine, and drape all change how a piece feels in an outfit.",
          sections: [
            ["Fleece and cotton", "Look for structure around cuffs, hem, hood, and collar. Thin fleece can collapse in photos."],
            ["Denim and washed fabric", "Check whether the wash looks natural across seams and pockets."],
            ["Nylon and technical fabric", "Nylon can look glossy under warehouse lights. Compare several photos to judge the finish."],
            ["Leather-like materials", "Watch for plastic shine, uneven grain, and stiff folds."]
          ],
          ctaTitle: "Search by material",
          ctaText: "Material terms often improve the result set.",
          ctaLabel: "Search nylon jacket",
          ctaQuery: "nylon jacket"
        }
      }
    },
    {
      slug: "pants-silhouette-guide",
      meta: { en: "Pants - 6 min read", es: "Pantalones - 6 min", fr: "Pantalons - 6 min", de: "Hosen - 6 Min." },
      title: {
        en: "How to choose pants silhouettes for streetwear outfits",
        es: "Como elegir siluetas de pantalones para streetwear",
        fr: "Choisir les silhouettes de pantalons streetwear",
        de: "Hosensilhouetten fur Streetwear-Outfits wahlen"
      },
      summary: {
        en: "Compare cargo, wide-leg, denim, track pants, shorts, and tapered fits by shape, footwear pairing, and daily use.",
        es: "Compara cargo, wide-leg, denim, track pants, shorts y fits tapered por forma y uso.",
        fr: "Comparez cargo, wide-leg, denim, track pants, shorts et coupes tapered selon la forme.",
        de: "Vergleiche Cargo, Wide-Leg, Denim, Track Pants, Shorts und Tapered Fits nach Form und Alltag."
      },
      body: {
        en: {
          eyebrow: "Pants",
          lede: "Pants decide the weight and movement of an outfit. Before searching, decide whether you want clean, relaxed, utility, sporty, or exaggerated shape.",
          sections: [
            ["Cargo pants", "Cargos add volume and utility. Check pocket placement, knee shape, leg opening, and fabric stiffness."],
            ["Wide-leg pants", "Wide-leg pants work best when length and footwear pairing are intentional."],
            ["Denim", "Search by wash and fit: washed denim, black denim, baggy denim, straight denim, or carpenter denim."],
            ["Track pants and shorts", "Track pants add sport energy. For shorts, inseam and width matter more than the title."]
          ],
          ctaTitle: "Search by silhouette",
          ctaText: "Start with the shape, then narrow by color.",
          ctaLabel: "Search cargo pants",
          ctaQuery: "cargo pants"
        }
      }
    },
    {
      slug: "outerwear-jacket-search-guide",
      meta: { en: "Outerwear - 7 min read", es: "Abrigos - 7 min", fr: "Vestes - 7 min", de: "Outerwear - 7 Min." },
      title: {
        en: "How to search jackets and outerwear by silhouette",
        es: "Como buscar chaquetas y outerwear por silueta",
        fr: "Chercher vestes et outerwear par silhouette",
        de: "Jacken und Outerwear nach Silhouette suchen"
      },
      summary: {
        en: "Use better jacket keywords and QC checks for bombers, windbreakers, varsity jackets, puffers, denim jackets, and work jackets.",
        es: "Usa mejores keywords y checks QC para bombers, windbreakers, varsity, puffers y denim jackets.",
        fr: "Utilisez de meilleurs mots-cles pour bombers, windbreakers, varsity, puffers et denim jackets.",
        de: "Nutze bessere Keywords und QC-Checks fur Bomber, Windbreaker, Varsity, Puffer und Denim Jackets."
      },
      body: {
        en: {
          eyebrow: "Outerwear",
          lede: "Outerwear changes the entire outfit, so it deserves more careful searching than a generic jacket query.",
          sections: [
            ["Bomber jackets", "Search bomber jacket, cropped bomber, nylon bomber, or washed bomber. Check sleeve volume and hem ribbing."],
            ["Windbreakers", "Judge panel lines, fabric shine, hood shape, and how the hem falls."],
            ["Varsity jackets", "Look at sleeve material, collar ribbing, snaps, patches, and length."],
            ["Puffers and work jackets", "For puffers, check fill distribution. For work jackets, check texture and pocket placement."]
          ],
          ctaTitle: "Search outerwear",
          ctaText: "Use a silhouette term instead of just jacket.",
          ctaLabel: "Search bomber jacket",
          ctaQuery: "bomber jacket"
        }
      }
    },
    {
      slug: "common-finds-mistakes",
      meta: { en: "Mistakes - 5 min read", es: "Errores - 5 min", fr: "Erreurs - 5 min", de: "Fehler - 5 Min." },
      title: {
        en: "Common mistakes when browsing finds and sheets",
        es: "Errores comunes al navegar finds y sheets",
        fr: "Erreurs courantes avec les finds et sheets",
        de: "Haufige Fehler beim Browsen von Finds und Sheets"
      },
      summary: {
        en: "A practical list of avoidable mistakes: dead links, weak keywords, ignored measurements, overfilled carts, and skipped QC review.",
        es: "Errores evitables: enlaces muertos, malas keywords, medidas ignoradas, carrito lleno y QC omitido.",
        fr: "Erreurs evitables: liens morts, mots-cles faibles, mesures ignorees, panier trop plein et QC saute.",
        de: "Vermeidbare Fehler: tote Links, schwache Keywords, ignorierte Masse, volle Carts und fehlender QC."
      },
      body: {
        en: {
          eyebrow: "Mistakes",
          lede: "Finds sites and spreadsheets are useful, but they can also encourage fast, unfocused decisions. Avoid these common mistakes before building a cart.",
          sections: [
            ["Trusting old links without checking", "Links can go stale. Open the destination, confirm the page loads, and compare similar results."],
            ["Searching with one vague word", "Words like shoes, hoodie, or bag are starting points. Add silhouette, color, material, or use case."],
            ["Ignoring measurements", "Streetwear fit depends on shape. Compare measurements with clothing you already own."],
            ["Skipping QC review", "QC photos reveal shape, color, stitching, material, and packaging issues before shipment."]
          ],
          ctaTitle: "Browse with a plan",
          ctaText: "Start with one category and narrow from there.",
          ctaLabel: "Search hoodie",
          ctaQuery: "hoodie"
        }
      }
    }
  ];

  const articleOverrides = {
    it: {
      "curated-finds-board": ["Come usare un board curato senza il caos dei fogli", "Un flusso semplice per esplorare categorie, salvare parole chiave e passare dall'ispirazione a una ricerca mirata."],
      "qc-photo-checklist": ["Checklist QC per streetwear e sneaker", "Controlla silhouette, tessuto, cuciture, etichette, colore, misure e packaging prima della spedizione."],
      "category-search-guide": ["Cosa cercare per categoria", "Idee di keyword per scarpe, felpe, T-shirt, pantaloni, borse, accessori e giacche."],
      "agent-shopping-workflow": ["Dall'ispirazione al checkout: un flusso prudente", "Un processo pratico per verificare pagine, stimare spedizione, leggere QC e mantenere aspettative realistiche."],
      "measurement-sizing-guide": ["Come leggere le misure prima di ordinare streetwear", "Confronta le misure con capi che possiedi già per valutare meglio fit oversized, cropped e wide-leg."],
      "shipping-cost-guide": ["Come stimare spedizione e costo totale", "Capisci come prezzo, peso, packaging, fee, consolidamento e linea di spedizione cambiano il costo finale."],
      "sneaker-search-guide": ["Come cercare sneaker e scarpe con keyword migliori", "Usa silhouette, uso, colore e materiale invece di ricerche troppo generiche."],
      "bags-accessories-guide": ["Come valutare borse e accessori dalle foto", "Controlla proporzioni, hardware, tracolle, zip, forma delle lenti e dettagli di uso quotidiano."],
      "seasonal-capsule-guide": ["Costruire una piccola capsule streetwear stagionale", "Usa una lista essenziale di scarpe, pantaloni, outerwear, T-shirt, borse e accessori."],
      "frequently-asked-questions": ["Domande comuni prima di usare un sito di finds", "Risposte su link, disponibilità, ricerca, QC, misure, spedizione e limiti di un sito di finds."],
      "streetwear-color-palette-guide": ["Come creare palette colore streetwear migliori", "Usa neutri, accenti, toni washed, contrasto e texture per far funzionare insieme i find."],
      "fabric-texture-photo-guide": ["Come giudicare tessuto e texture dalle foto", "Cosa possono rivelare le foto su fleece, denim, nylon, maglieria, materiali effetto pelle e cotone washed."],
      "pants-silhouette-guide": ["Come scegliere silhouette di pantaloni per outfit streetwear", "Confronta cargo, wide-leg, denim, track pants, shorts e fit tapered per forma e uso."],
      "outerwear-jacket-search-guide": ["Come cercare giacche e outerwear per silhouette", "Keyword e controlli QC migliori per bomber, windbreaker, varsity, puffer, denim e work jacket."],
      "common-finds-mistakes": ["Errori comuni quando navighi finds e sheets", "Errori evitabili: link vecchi, keyword deboli, misure ignorate, carrelli pieni e QC saltato."]
    },
    nl: {
      "curated-finds-board": ["Een gecureerd finds-board gebruiken zonder spreadsheet-chaos", "Een herhaalbare workflow voor categorieën, zoekwoorden en gerichte Maison Looks-zoekopdrachten."],
      "qc-photo-checklist": ["QC-fotochecks voor streetwear en sneakers", "Controleer silhouet, stof, stiksels, labels, kleur, maatnotities en verpakking voor verzending."],
      "category-search-guide": ["Waar je per categorie naar zoekt", "Keyword-ideeën voor schoenen, hoodies, shirts, broeken, tassen, accessoires en jassen."],
      "agent-shopping-workflow": ["Van inspiratie naar checkout: een voorzichtige workflow", "Een praktisch proces voor productpagina's, verzending, QC-foto's en realistische verwachtingen."],
      "measurement-sizing-guide": ["Maten lezen voordat je streetwear bestelt", "Vergelijk maten met kleding die je al hebt voor oversized, cropped, wide-leg en fitted items."],
      "shipping-cost-guide": ["Verzending en totale kosten inschatten", "Begrijp hoe prijs, gewicht, verpakking, fees, consolidatie en verzendlijn de eindprijs bepalen."],
      "sneaker-search-guide": ["Sneakers en schoenen zoeken met betere keywords", "Gebruik silhouet, gebruik, kleur en materiaal in plaats van losse woorden."],
      "bags-accessories-guide": ["Tassen en accessoires beoordelen op foto's", "Controleer verhouding, hardware, bandjes, ritsen, lensvorm en dagelijkse bruikbaarheid."],
      "seasonal-capsule-guide": ["Een kleine seizoenscapsule voor streetwear bouwen", "Gebruik een beperkte lijst van schoenen, broeken, outerwear, tees, tassen en accessoires."],
      "frequently-asked-questions": ["Veelgestelde vragen voor finds-sites", "Antwoorden over links, beschikbaarheid, zoekgedrag, QC, maten, verzending en verwachtingen."],
      "streetwear-color-palette-guide": ["Betere streetwear-kleurpaletten maken", "Gebruik neutrale kleuren, accenten, washed tones, contrast en textuur zodat finds samenwerken."],
      "fabric-texture-photo-guide": ["Stof en textuur beoordelen op foto's", "Leer wat foto's tonen over fleece, denim, nylon, knitwear, leerachtige materialen en washed cotton."],
      "pants-silhouette-guide": ["Broeksilhouetten kiezen voor streetwear-outfits", "Vergelijk cargo, wide-leg, denim, track pants, shorts en tapered fits op vorm en gebruik."],
      "outerwear-jacket-search-guide": ["Jassen en outerwear zoeken op silhouet", "Betere keywords en QC-checks voor bombers, windbreakers, varsity jackets, puffers en work jackets."],
      "common-finds-mistakes": ["Veelgemaakte fouten bij finds en sheets", "Vermijd dode links, zwakke keywords, genegeerde maten, te volle carts en overgeslagen QC."]
    },
    pt: {
      "curated-finds-board": ["Como usar um board curado sem o caos dos spreadsheets", "Um fluxo repetível para navegar categorias, salvar palavras-chave e ir para uma busca focada."],
      "qc-photo-checklist": ["Checklist de fotos QC para streetwear e sneakers", "Revise silhueta, tecido, costuras, etiquetas, cor, medidas e embalagem antes do envio."],
      "category-search-guide": ["O que pesquisar por categoria", "Ideias de palavras-chave para tênis, hoodies, camisetas, calças, bolsas, acessórios e jaquetas."],
      "agent-shopping-workflow": ["Da inspiração ao checkout: um fluxo cuidadoso", "Um processo prático para checar páginas, estimar envio, revisar QC e manter expectativas realistas."],
      "measurement-sizing-guide": ["Como ler medidas antes de pedir streetwear", "Compare medidas com roupas que você já tem para acertar melhor oversized, cropped e wide-leg."],
      "shipping-cost-guide": ["Como estimar envio e custo total", "Entenda como preço, peso, embalagem, taxas, consolidação e frete afetam o custo final."],
      "sneaker-search-guide": ["Como buscar sneakers e tênis com melhores palavras-chave", "Use silhueta, uso, cor e material em vez de pesquisas com uma palavra só."],
      "bags-accessories-guide": ["Como avaliar bolsas e acessórios por fotos", "Confira proporção, ferragens, alças, zíperes, formato das lentes e uso diário."],
      "seasonal-capsule-guide": ["Monte uma pequena cápsula streetwear sazonal", "Use uma lista enxuta de tênis, calças, jaquetas, camisetas, bolsas e acessórios."],
      "frequently-asked-questions": ["Perguntas comuns antes de usar um site de finds", "Respostas sobre links, disponibilidade, busca, QC, medidas, envio e limites de um site de finds."],
      "streetwear-color-palette-guide": ["Como criar paletas de cor streetwear melhores", "Use neutros, cores de destaque, tons washed, contraste e textura para combinar melhor os finds."],
      "fabric-texture-photo-guide": ["Como julgar tecido e textura por fotos", "Veja o que fotos mostram sobre fleece, denim, nylon, malha, materiais tipo couro e algodão washed."],
      "pants-silhouette-guide": ["Como escolher silhuetas de calças para streetwear", "Compare cargo, wide-leg, denim, track pants, shorts e fits tapered por forma e uso."],
      "outerwear-jacket-search-guide": ["Como buscar jaquetas e outerwear por silhueta", "Use melhores keywords e checks QC para bombers, windbreakers, varsity, puffers e work jackets."],
      "common-finds-mistakes": ["Erros comuns ao navegar finds e sheets", "Evite links mortos, keywords fracas, medidas ignoradas, carrinhos cheios e QC pulado."]
    }
  };

  for (const article of articles) {
    for (const [lang, entries] of Object.entries(articleOverrides)) {
      const entry = entries[article.slug];
      if (!entry) continue;
      article.title[lang] = entry[0];
      article.summary[lang] = entry[1];
    }
    for (const lang of ["it", "nl", "pt"]) {
      if (!article.meta[lang]) article.meta[lang] = article.meta.en.replace("min read", "min");
    }
  }

  const articleBySlug = Object.fromEntries(articles.map((article) => [article.slug, article]));
  let isTranslatingFinds = false;

  const copy = {
    en: {
      nav: ["Home", "Finds", "Categories", "Guides", "About"],
      brandSub: "Streetstyle finds",
      visit: "Visit Maison Looks",
      footer: "Joya Grid is an independent inspiration and discovery site. Product imagery and prices are editorial examples.",
      footerArticles: "Joya Grid is an independent inspiration and discovery site. We do not sell products or process orders.",
      searchPlaceholder: "Try cargo, sneaker, denim...",
      searchButton: "Search",
      home: {
        skip: "Skip to finds",
        heroEyebrow: "Curated streetwear discovery",
        heroTitle: "JoyaGoo Spreadsheet",
        heroText: "Browse outfit ideas, statement sneakers, daily bags, and seasonal street-style pieces, then continue to Maison Looks Streetstyle for the full inspiration feed.",
        browse: "Browse finds",
        searchMaison: "Search Maison Looks",
        categoriesEyebrow: "Shop by mood",
        categoriesTitle: "Fast paths into the archive",
        findsEyebrow: "Latest board",
        findsTitle: "Street-style finds",
        emptyTitle: "No matching finds",
        emptyText: "Try another keyword or switch back to all categories.",
        guidesEyebrow: "Buying guides",
        guidesTitle: "Read before you search",
        viewAll: "View all guides",
        aboutEyebrow: "Promotion model",
        aboutTitle: "Built to send style traffic to Maison Looks",
        aboutText: "This site acts as a lightweight discovery layer: curated categories, searchable outfit cards, strong image previews, and consistent outbound links to Maison Looks search results.",
        explore: "Explore Maison Looks"
      },
      list: {
        eyebrow: "Joya Grid guides",
        title: "Streetwear search articles",
        intro: "Original buying notes for people who want a cleaner alternative to scrolling through raw spreadsheets."
      },
      readGuide: "Read guide"
    },
    es: {
      nav: ["Inicio", "Finds", "Categorias", "Guias", "Acerca"],
      brandSub: "Finds streetstyle",
      visit: "Visitar Maison Looks",
      footer: "Joya Grid es un sitio independiente de inspiracion y descubrimiento. Las imagenes y precios son ejemplos editoriales.",
      footerArticles: "Joya Grid es un sitio independiente de inspiracion y descubrimiento. No vendemos productos ni procesamos pedidos.",
      searchPlaceholder: "Prueba cargo, sneaker, denim...",
      searchButton: "Buscar",
      home: {
        skip: "Saltar a finds",
        heroEyebrow: "Descubrimiento streetwear curado",
        heroTitle: "JoyaGoo Spreadsheet",
        heroText: "Explora ideas de outfits, sneakers destacados, bolsos diarios y piezas street-style de temporada, y continua en Maison Looks.",
        browse: "Ver finds",
        searchMaison: "Buscar en Maison Looks",
        categoriesEyebrow: "Comprar por mood",
        categoriesTitle: "Rutas rapidas hacia el archivo",
        findsEyebrow: "Ultimo tablero",
        findsTitle: "Finds street-style",
        emptyTitle: "Sin resultados",
        emptyText: "Prueba otra palabra clave o vuelve a todas las categorias.",
        guidesEyebrow: "Guias de compra",
        guidesTitle: "Lee antes de buscar",
        viewAll: "Ver todas las guias",
        aboutEyebrow: "Modelo de promocion",
        aboutTitle: "Creado para enviar trafico de estilo a Maison Looks",
        aboutText: "Este sitio funciona como una capa ligera de descubrimiento: categorias curadas, tarjetas buscables, buenas vistas previas y enlaces consistentes a resultados de Maison Looks.",
        explore: "Explorar Maison Looks"
      },
      list: {
        eyebrow: "Guias de Joya Grid",
        title: "Articulos de busqueda streetwear",
        intro: "Notas originales para quienes quieren una alternativa mas clara que desplazarse por hojas de calculo."
      },
      readGuide: "Leer guia"
    },
    fr: {
      nav: ["Accueil", "Finds", "Categories", "Guides", "A propos"],
      brandSub: "Finds streetstyle",
      visit: "Visiter Maison Looks",
      footer: "Joya Grid est un site independant d'inspiration et de decouverte. Les images et prix sont des exemples editoriaux.",
      footerArticles: "Joya Grid est un site independant d'inspiration et de decouverte. Nous ne vendons pas de produits et ne traitons pas de commandes.",
      searchPlaceholder: "Essayez cargo, sneaker, denim...",
      searchButton: "Rechercher",
      home: {
        skip: "Aller aux finds",
        heroEyebrow: "Decouverte streetwear curative",
        heroTitle: "JoyaGoo Spreadsheet",
        heroText: "Parcourez des idees de tenues, sneakers fortes, sacs quotidiens et pieces street-style de saison, puis continuez sur Maison Looks.",
        browse: "Voir les finds",
        searchMaison: "Rechercher Maison Looks",
        categoriesEyebrow: "Acheter par mood",
        categoriesTitle: "Acces rapides a l'archive",
        findsEyebrow: "Dernier tableau",
        findsTitle: "Finds street-style",
        emptyTitle: "Aucun resultat",
        emptyText: "Essayez un autre mot-cle ou revenez a toutes les categories.",
        guidesEyebrow: "Guides d'achat",
        guidesTitle: "Lire avant de chercher",
        viewAll: "Voir tous les guides",
        aboutEyebrow: "Modele de promotion",
        aboutTitle: "Concu pour envoyer du trafic style vers Maison Looks",
        aboutText: "Ce site sert de couche de decouverte legere: categories curatives, cartes consultables, apercus visuels solides et liens vers les resultats Maison Looks.",
        explore: "Explorer Maison Looks"
      },
      list: {
        eyebrow: "Guides Joya Grid",
        title: "Articles de recherche streetwear",
        intro: "Notes originales pour ceux qui veulent une alternative plus claire aux feuilles de calcul brutes."
      },
      readGuide: "Lire le guide"
    },
    de: {
      nav: ["Home", "Finds", "Kategorien", "Guides", "Info"],
      brandSub: "Streetstyle finds",
      visit: "Maison Looks besuchen",
      footer: "Joya Grid ist eine unabhangige Inspirations- und Discovery-Seite. Bilder und Preise sind redaktionelle Beispiele.",
      footerArticles: "Joya Grid ist eine unabhangige Inspirations- und Discovery-Seite. Wir verkaufen keine Produkte und bearbeiten keine Bestellungen.",
      searchPlaceholder: "Versuche cargo, sneaker, denim...",
      searchButton: "Suchen",
      home: {
        skip: "Zu Finds springen",
        heroEyebrow: "Kuratierte Streetwear-Discovery",
        heroTitle: "JoyaGoo Spreadsheet",
        heroText: "Entdecke Outfit-Ideen, Statement-Sneaker, Alltagstaschen und saisonale Street-Style-Teile und suche weiter bei Maison Looks.",
        browse: "Finds ansehen",
        searchMaison: "Maison Looks suchen",
        categoriesEyebrow: "Nach Mood shoppen",
        categoriesTitle: "Schnelle Wege ins Archiv",
        findsEyebrow: "Aktuelles Board",
        findsTitle: "Street-style finds",
        emptyTitle: "Keine passenden Finds",
        emptyText: "Versuche ein anderes Keyword oder gehe zuruck zu allen Kategorien.",
        guidesEyebrow: "Kauf-Guides",
        guidesTitle: "Vor dem Suchen lesen",
        viewAll: "Alle Guides ansehen",
        aboutEyebrow: "Promotion-Modell",
        aboutTitle: "Gebaut, um Style-Traffic zu Maison Looks zu senden",
        aboutText: "Diese Seite ist eine leichte Discovery-Schicht: kuratierte Kategorien, durchsuchbare Outfit-Karten, starke Bildvorschauen und Links zu Maison Looks Suchergebnissen.",
        explore: "Maison Looks entdecken"
      },
      list: {
        eyebrow: "Joya Grid Guides",
        title: "Streetwear-Suchartikel",
        intro: "Originale Hinweise fur Nutzer, die eine klarere Alternative zu rohen Tabellen wollen."
      },
      readGuide: "Guide lesen"
    },
    it: {
      nav: ["Home", "Finds", "Categorie", "Guide", "Info"],
      brandSub: "Find streetstyle",
      visit: "Visita Maison Looks",
      footer: "Joya Grid è un sito indipendente di ispirazione e scoperta. Immagini e prezzi sono esempi editoriali.",
      footerArticles: "Joya Grid è un sito indipendente di ispirazione e scoperta. Non vendiamo prodotti e non gestiamo ordini.",
      searchPlaceholder: "Prova cargo, sneaker, denim...",
      searchButton: "Cerca",
      home: {
        skip: "Vai ai find",
        heroEyebrow: "Scoperta streetwear curata",
        heroTitle: "JoyaGoo Spreadsheet",
        heroText: "Sfoglia idee outfit, sneaker statement, borse quotidiane e pezzi street-style stagionali, poi continua la ricerca su Maison Looks.",
        browse: "Sfoglia find",
        searchMaison: "Cerca su Maison Looks",
        categoriesEyebrow: "Acquista per mood",
        categoriesTitle: "Percorsi rapidi nell'archivio",
        findsEyebrow: "Board recente",
        findsTitle: "Find street-style",
        emptyTitle: "Nessun risultato",
        emptyText: "Prova un'altra parola chiave o torna a tutte le categorie.",
        guidesEyebrow: "Guide all'acquisto",
        guidesTitle: "Leggi prima di cercare",
        viewAll: "Vedi tutte le guide",
        aboutEyebrow: "Modello promozionale",
        aboutTitle: "Creato per inviare traffico style a Maison Looks",
        aboutText: "Questo sito è uno strato leggero di scoperta: categorie curate, card outfit ricercabili, anteprime forti e link coerenti ai risultati Maison Looks.",
        explore: "Esplora Maison Looks"
      },
      list: {
        eyebrow: "Guide Joya Grid",
        title: "Articoli di ricerca streetwear",
        intro: "Note originali per chi vuole un'alternativa più chiara alle liste e ai fogli grezzi."
      },
      readGuide: "Leggi la guida"
    },
    nl: {
      nav: ["Home", "Finds", "Categorieën", "Gidsen", "Over"],
      brandSub: "Streetstyle finds",
      visit: "Bezoek Maison Looks",
      footer: "Joya Grid is een onafhankelijke inspiratie- en ontdekkingssite. Afbeeldingen en prijzen zijn redactionele voorbeelden.",
      footerArticles: "Joya Grid is een onafhankelijke inspiratie- en ontdekkingssite. We verkopen geen producten en verwerken geen bestellingen.",
      searchPlaceholder: "Probeer cargo, sneaker, denim...",
      searchButton: "Zoeken",
      home: {
        skip: "Ga naar finds",
        heroEyebrow: "Gecureerde streetwear discovery",
        heroTitle: "JoyaGoo Spreadsheet",
        heroText: "Bekijk outfitideeën, opvallende sneakers, dagelijkse tassen en seizoensstukken, en zoek daarna verder op Maison Looks.",
        browse: "Bekijk finds",
        searchMaison: "Zoek op Maison Looks",
        categoriesEyebrow: "Shop per mood",
        categoriesTitle: "Snelle routes door het archief",
        findsEyebrow: "Nieuwste board",
        findsTitle: "Street-style finds",
        emptyTitle: "Geen resultaten",
        emptyText: "Probeer een ander trefwoord of ga terug naar alle categorieën.",
        guidesEyebrow: "Koopgidsen",
        guidesTitle: "Lees voordat je zoekt",
        viewAll: "Bekijk alle gidsen",
        aboutEyebrow: "Promotiemodel",
        aboutTitle: "Gemaakt om style-verkeer naar Maison Looks te sturen",
        aboutText: "Deze site werkt als een lichte ontdekkingslaag: gecureerde categorieën, doorzoekbare outfitkaarten, sterke previews en consistente links naar Maison Looks-resultaten.",
        explore: "Ontdek Maison Looks"
      },
      list: {
        eyebrow: "Joya Grid gidsen",
        title: "Streetwear zoekartikelen",
        intro: "Originele koopnotities voor mensen die een duidelijker alternatief willen voor ruwe spreadsheets."
      },
      readGuide: "Lees gids"
    },
    pt: {
      nav: ["Início", "Finds", "Categorias", "Guias", "Sobre"],
      brandSub: "Finds streetstyle",
      visit: "Visitar Maison Looks",
      footer: "Joya Grid é um site independente de inspiração e descoberta. Imagens e preços são exemplos editoriais.",
      footerArticles: "Joya Grid é um site independente de inspiração e descoberta. Não vendemos produtos nem processamos pedidos.",
      searchPlaceholder: "Tente cargo, sneaker, denim...",
      searchButton: "Pesquisar",
      home: {
        skip: "Ir para finds",
        heroEyebrow: "Descoberta streetwear curada",
        heroTitle: "JoyaGoo Spreadsheet",
        heroText: "Explore ideias de looks, sneakers de destaque, bolsas do dia a dia e peças street-style sazonais, depois continue no Maison Looks.",
        browse: "Ver finds",
        searchMaison: "Pesquisar Maison Looks",
        categoriesEyebrow: "Comprar por mood",
        categoriesTitle: "Caminhos rápidos no arquivo",
        findsEyebrow: "Board recente",
        findsTitle: "Finds street-style",
        emptyTitle: "Nenhum resultado",
        emptyText: "Tente outra palavra-chave ou volte para todas as categorias.",
        guidesEyebrow: "Guias de compra",
        guidesTitle: "Leia antes de pesquisar",
        viewAll: "Ver todos os guias",
        aboutEyebrow: "Modelo de promoção",
        aboutTitle: "Criado para enviar tráfego de estilo ao Maison Looks",
        aboutText: "Este site funciona como uma camada leve de descoberta: categorias curadas, cards de looks pesquisáveis, boas prévias visuais e links consistentes para resultados do Maison Looks.",
        explore: "Explorar Maison Looks"
      },
      list: {
        eyebrow: "Guias Joya Grid",
        title: "Artigos de busca streetwear",
        intro: "Notas originais para quem quer uma alternativa mais clara aos spreadsheets brutos."
      },
      readGuide: "Ler guia"
    }
  };

  function getLang() {
    const stored = localStorage.getItem(LANG_KEY);
    return supported[stored] ? stored : "en";
  }

  function setText(selector, value) {
    const node = document.querySelector(selector);
    if (node && value) node.textContent = value;
  }

  function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, (character) => {
      return {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "\"": "&quot;",
        "'": "&#39;"
      }[character];
    });
  }

  function addLanguageSelect() {
    if (document.querySelector("#languageSelect")) return;
    const select = document.createElement("select");
    select.id = "languageSelect";
    select.className = "language-select";
    select.setAttribute("aria-label", "Language");
    select.innerHTML = Object.entries(supported)
      .map(([code, label]) => `<option value="${escapeHtml(code)}">${escapeHtml(label)}</option>`)
      .join("");
    select.value = getLang();
    select.addEventListener("change", () => {
      localStorage.setItem(LANG_KEY, select.value);
      applyLanguage(select.value);
    });
    const header = document.querySelector(".site-header");
    const cta = document.querySelector(".header-cta");
    if (header && cta) header.insertBefore(select, cta);
  }

  function applyGlobal(lang) {
    const t = copy[lang] || copy.en;
    document.documentElement.lang = lang;
    document.querySelectorAll(".brand small").forEach((node) => {
      node.textContent = t.brandSub;
    });
    document.querySelectorAll("nav a").forEach((node, index) => {
      if (t.nav[index]) node.textContent = t.nav[index];
    });
    document.querySelectorAll(".header-cta").forEach((node) => {
      node.textContent = t.visit;
    });
    document.querySelectorAll(".site-footer p").forEach((node) => {
      node.textContent = document.body.classList.contains("articles-index") ? t.footerArticles : t.footer;
    });
    const input = document.querySelector("#searchInput");
    if (input) input.placeholder = t.searchPlaceholder;
    setText("#searchButton", t.searchButton);
  }

  function applyHome(lang) {
    const t = (copy[lang] || copy.en).home;
    setText(".skip-link", t.skip);
    setText(".hero .eyebrow", t.heroEyebrow);
    setText(".hero h1", t.heroTitle);
    setText(".hero p:not(.eyebrow)", t.heroText);
    setText(".hero-actions .button.primary", t.browse);
    setText(".hero-actions .button.ghost", t.searchMaison);
    setText("#categories .eyebrow", t.categoriesEyebrow);
    setText("#categories h2", t.categoriesTitle);
    setText("#finds .eyebrow", t.findsEyebrow);
    setText("#finds h2", t.findsTitle);
    setText("#emptyState h3", t.emptyTitle);
    setText("#emptyState p", t.emptyText);
    setText("#guides .eyebrow", t.guidesEyebrow);
    setText("#guides h2", t.guidesTitle);
    setText("#guides .text-link", t.viewAll);
    setText("#about .eyebrow", t.aboutEyebrow);
    setText("#about h2", t.aboutTitle);
    setText("#about p:not(.eyebrow)", t.aboutText);
    setText("#about .button", t.explore);
    renderGuideCards(lang);
    translateFinds(lang);
  }

  function translateFinds(lang) {
    if (isTranslatingFinds) return;
    isTranslatingFinds = true;
    const labels = categoryLabels[lang] || categoryLabels.en;
    try {
      document.querySelectorAll(".category-tab").forEach((node) => {
        const key = node.dataset.category;
        if (labels[key] && node.textContent !== labels[key]) node.textContent = labels[key];
      });
      document.querySelectorAll(".product-card").forEach((card) => {
        const categoryNode = card.querySelector(".product-meta .muted");
        if (!categoryNode) return;
        const category = categoryNode.dataset.category || categoryNode.textContent.trim();
        categoryNode.dataset.category = category;
        const categoryText = labels[category] || category;
        if (categoryNode.textContent !== categoryText) categoryNode.textContent = categoryText;
        const link = card.querySelector(".card-link");
        if (link) {
          const searchWords = {
            en: "Search",
            es: "Buscar",
            fr: "Rechercher",
            de: "Suchen",
            it: "Cerca",
            nl: "Zoek",
            pt: "Pesquisar"
          };
          const linkText = `${searchWords[lang] || searchWords.en} ${categoryText}`;
          if (link.textContent !== linkText) link.textContent = linkText;
        }
      });
      const count = document.querySelector("#resultCount");
      if (count && count.textContent) {
        const number = count.textContent.match(/\d+/);
        if (number) {
          const label = {
            en: Number(number[0]) === 1 ? "find" : "finds",
            es: Number(number[0]) === 1 ? "find" : "finds",
            fr: Number(number[0]) === 1 ? "find" : "finds",
            de: Number(number[0]) === 1 ? "Find" : "Finds"
          };
          const countText = `${number[0]} ${label[lang] || label.en}`;
          if (count.textContent !== countText) count.textContent = countText;
        }
      }
    } finally {
      setTimeout(() => {
        isTranslatingFinds = false;
      }, 0);
    }
  }

  function renderGuideCards(lang) {
    const grid = document.querySelector(".guide-grid");
    if (!grid) return;
    const selected = articles.slice(0, 6);
    grid.innerHTML = selected
      .map((article) => `
        <article class="guide-card">
          <p class="guide-meta">${escapeHtml(article.meta[lang] || article.meta.en)}</p>
          <h3>${escapeHtml(article.title[lang] || article.title.en)}</h3>
          <p>${escapeHtml(article.summary[lang] || article.summary.en)}</p>
          <a href="articles/${escapeHtml(article.slug)}.html">${escapeHtml((copy[lang] || copy.en).readGuide)}</a>
        </article>
      `)
      .join("");
  }

  function renderArticleList(lang) {
    const list = document.querySelector(".guide-list");
    if (!list) return;
    list.innerHTML = articles
      .map((article) => `
        <article class="guide-list-item">
          <p class="guide-meta">${escapeHtml(article.meta[lang] || article.meta.en)}</p>
          <h2>${escapeHtml(article.title[lang] || article.title.en)}</h2>
          <p>${escapeHtml(article.summary[lang] || article.summary.en)}</p>
          <a href="articles/${escapeHtml(article.slug)}.html">${escapeHtml((copy[lang] || copy.en).readGuide)}</a>
        </article>
      `)
      .join("");
  }

  function renderArticlePage(lang) {
    const body = document.querySelector(".article-body");
    if (!body) return;
    const slug = location.pathname.split("/").pop().replace(".html", "");
    const article = articleBySlug[slug];
    if (!article) return;
    const articleBody = (article.body[lang] || article.body.en);
    const sections = articleBody.sections
      .map(([heading, text]) => `<h2>${escapeHtml(heading)}</h2><p>${escapeHtml(text)}</p>`)
      .join("");
    body.innerHTML = `
      <p class="eyebrow">${escapeHtml(articleBody.eyebrow)}</p>
      <h1>${escapeHtml(article.title[lang] || article.title.en)}</h1>
      <p class="article-lede">${escapeHtml(articleBody.lede)}</p>
      ${sections}
      <div class="article-cta">
        <h2>${escapeHtml(articleBody.ctaTitle)}</h2>
        <p>${escapeHtml(articleBody.ctaText)}</p>
        <a class="button primary" href="https://maisonlooks.com/en/search?q=${encodeURIComponent(articleBody.ctaQuery)}" target="_blank" rel="noopener noreferrer">${escapeHtml(articleBody.ctaLabel)}</a>
      </div>
    `;
    document.title = `${article.title[lang] || article.title.en} - JoyaGoo Spreadsheet Guide`;
  }

  function applyArticleList(lang) {
    const t = (copy[lang] || copy.en).list;
    setText(".article-hero .eyebrow", t.eyebrow);
    setText(".article-hero h1", t.title);
    setText(".article-hero p:not(.eyebrow)", t.intro);
    renderArticleList(lang);
  }

  function ensureFallbackTranslations() {
    for (const article of articles) {
      for (const lang of ["es", "fr", "de", "it", "nl", "pt"]) {
        if (!article.body[lang]) {
          article.body[lang] = translateArticleFallback(article.body.en, lang);
        }
      }
    }
  }

  function translateArticleFallback(body, lang) {
    const labels = {
      es: {
        eyebrow: "Guia",
        ctaTitle: "Buscar en Maison Looks",
        ctaText: "Usa esta busqueda como punto de partida y revisa los detalles antes de decidir.",
        ctaLabel: "Abrir busqueda"
      },
      fr: {
        eyebrow: "Guide",
        ctaTitle: "Rechercher sur Maison Looks",
        ctaText: "Utilisez cette recherche comme point de depart et verifiez les details avant de choisir.",
        ctaLabel: "Ouvrir la recherche"
      },
      de: {
        eyebrow: "Guide",
        ctaTitle: "Bei Maison Looks suchen",
        ctaText: "Nutze diese Suche als Startpunkt und prufe Details vor der Entscheidung.",
        ctaLabel: "Suche offnen"
      },
      it: {
        eyebrow: "Guida",
        ctaTitle: "Cerca su Maison Looks",
        ctaText: "Usa questa ricerca come punto di partenza e controlla i dettagli prima di decidere.",
        ctaLabel: "Apri ricerca"
      },
      nl: {
        eyebrow: "Gids",
        ctaTitle: "Zoek op Maison Looks",
        ctaText: "Gebruik deze zoekopdracht als startpunt en controleer de details voordat je beslist.",
        ctaLabel: "Open zoekopdracht"
      },
      pt: {
        eyebrow: "Guia",
        ctaTitle: "Pesquisar no Maison Looks",
        ctaText: "Use esta busca como ponto de partida e confira os detalhes antes de decidir.",
        ctaLabel: "Abrir busca"
      }
    };
    const intro = {
      es: "Esta guia resume los puntos practicos que debes revisar antes de guardar un find o avanzar hacia una compra.",
      fr: "Ce guide resume les points pratiques a verifier avant de sauvegarder un find ou de passer a l'achat.",
      de: "Dieser Guide fasst die praktischen Punkte zusammen, die du vor dem Speichern eines Finds oder vor dem Kauf prufen solltest."
      ,
      it: "Questa guida riassume i punti pratici da controllare prima di salvare un find o procedere con un acquisto.",
      nl: "Deze gids vat de praktische punten samen die je controleert voordat je een find opslaat of verdergaat met kopen.",
      pt: "Este guia resume os pontos práticos para revisar antes de salvar um find ou avançar para uma compra."
    };
    const sectionText = {
      es: "Revisa este punto con calma, compara varias opciones y confirma que encaja con tu presupuesto, tu talla y tu forma de vestir.",
      fr: "Verifiez ce point calmement, comparez plusieurs options et confirmez qu'il correspond a votre budget, taille et style.",
      de: "Prufe diesen Punkt in Ruhe, vergleiche mehrere Optionen und stelle sicher, dass er zu Budget, Groesse und Stil passt."
      ,
      it: "Controlla questo punto con calma, confronta più opzioni e verifica che funzioni con budget, taglia e stile.",
      nl: "Controleer dit punt rustig, vergelijk meerdere opties en kijk of het past bij je budget, maat en stijl.",
      pt: "Revise este ponto com calma, compare opções e confirme se combina com seu orçamento, tamanho e estilo."
    };
    const sectionHeadings = {
      es: ["Que revisar", "Como comparar", "Que evitar", "Siguiente paso"],
      fr: ["Ce qu'il faut verifier", "Comment comparer", "Ce qu'il faut eviter", "Etape suivante"],
      de: ["Was du prufen solltest", "Wie du vergleichst", "Was du vermeiden solltest", "Nachster Schritt"],
      it: ["Cosa controllare", "Come confrontare", "Cosa evitare", "Prossimo passo"],
      nl: ["Wat je controleert", "Hoe je vergelijkt", "Wat je vermijdt", "Volgende stap"],
      pt: ["O que revisar", "Como comparar", "O que evitar", "Próximo passo"]
    };
    return {
      eyebrow: labels[lang].eyebrow,
      lede: intro[lang],
      sections: body.sections.map((_, index) => [sectionHeadings[lang][index] || sectionHeadings[lang][0], sectionText[lang]]),
      ctaTitle: labels[lang].ctaTitle,
      ctaText: labels[lang].ctaText,
      ctaLabel: labels[lang].ctaLabel,
      ctaQuery: body.ctaQuery
    };
  }

  function applyLanguage(lang) {
    applyGlobal(lang);
    if (document.body.classList.contains("home-page")) applyHome(lang);
    if (document.body.classList.contains("articles-index")) applyArticleList(lang);
    if (document.querySelector(".article-body")) renderArticlePage(lang);
  }

  ensureFallbackTranslations();
  document.addEventListener("DOMContentLoaded", () => {
    addLanguageSelect();
    applyLanguage(getLang());
    const productGrid = document.querySelector("#productGrid");
    const categoryTabs = document.querySelector("#categoryTabs");
    [productGrid, categoryTabs].filter(Boolean).forEach((node) => {
      new MutationObserver(() => {
        if (!isTranslatingFinds) translateFinds(getLang());
      }).observe(node, { childList: true, subtree: true });
    });
  });
})();
