(function () {
  // Buyer-QC previews captured from each corresponding MaisonLooks product page
  // on 2026-09-03. The source page remains authoritative for the complete,
  // current gallery; grouped QC albums are represented by their visible cover.
  const qcData = {
    "clean-low-sneaker": {
      qcStatus: "available",
      qcLabel: "30 buyer QC photos & videos",
      buyerPhotoCount: 30,
      qcImages: [
        "https://cdn.maisonlooks.com/file-1774339293120-765241869.webp",
        "https://cdn.maisonlooks.com/file-1774339293126-107462068.webp",
        "https://cdn.maisonlooks.com/file-1774339292648-509702297.webp",
        "https://cdn.maisonlooks.com/file-1774339293694-561376118.webp",
        "https://cdn.maisonlooks.com/file-1774339293832-893717326.webp",
        "https://cdn.maisonlooks.com/file-1774339293116-947055834.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/7712360227/30c40d8a22ce38a2d795c6ec/thumbs/001-w416-fc267437f9c6e5cce81b2e4d.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/7712360227/b855b3de7a22d8e8ada7fb37/thumbs/001-w416-1fcd18bad95bc0da1bf9b760.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/7712360227/dc8fd1ff927d743a4ec648a9/thumbs/001-w416-d8524d22cd426a80ecd18733.webp"
      ]
    },
    "retro-runner-shoe": {
      qcStatus: "available",
      qcLabel: "16 buyer QC photos & videos",
      buyerPhotoCount: 16,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/1057222682655/7e776d9a704727020962437d/thumbs/001-w416-7ce7bf78805e6e303210c271.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/1057222682655/addf5aac097cebae30a13953/thumbs/001-w416-8bd83223c0791fe9b56f6336.webp"
      ]
    },
    "court-training-sneaker": {
      qcStatus: "available",
      qcLabel: "22 buyer QC photos & videos",
      buyerPhotoCount: 22,
      qcImages: [
        "https://cdn.maisonlooks.com/file-1775529649163-707627371.webp",
        "https://cdn.maisonlooks.com/file-1775529650280-694056912.webp",
        "https://cdn.maisonlooks.com/file-1775529649107-495078107.webp",
        "https://cdn.maisonlooks.com/file-1775529632775-918614952.webp",
        "https://cdn.maisonlooks.com/file-1775529649853-700979408.webp",
        "https://cdn.maisonlooks.com/file-1775529650041-420091308.webp",
        "https://cdn.maisonlooks.com/file-1775529614679-243221395.webp",
        "https://cdn.maisonlooks.com/file-1775529538158-537946030.webp",
        "https://cdn.maisonlooks.com/file-1775529539901-980416065.webp",
        "https://cdn.maisonlooks.com/file-1775529520356-872881937.webp",
        "https://cdn.maisonlooks.com/file-1775529528870-171496114.webp",
        "https://cdn.maisonlooks.com/file-1775529538264-202508086.webp",
        "https://cdn.maisonlooks.com/file-1775529539950-184328712.webp",
        "https://cdn.maisonlooks.com/file-1775529527565-751530716.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7712725001/8ad0b36da72479baf34f231b/thumbs/001-w416-a18d22bc42f751bf591cce04.webp"
      ]
    },
    "gallery-graphic-tee": {
      qcStatus: "available",
      qcLabel: "60 buyer QC photos & videos",
      buyerPhotoCount: 60,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/streetstyle/streetstyle/weidian/805026645352/7b74c084188e40fdb8605ac1/thumbs/001-w416-d702e589b2b91db5f3be4382.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/streetstyle/weidian/805026645352/b785317eb101bcebb8a70fac/thumbs/001-w416-409b12e3c5815a21ab60f3f9.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/805026645352/04c3cda34bfadf1344c0e9f2/thumbs/001-w416-4fe181aad69f977b98641ee3.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/805026645352/db99a330c4ae6df5dec88887/thumbs/001-w416-d702e589b2b91db5f3be4382.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/805026645352/286e747cc4a27d5bac56b225/thumbs/001-w416-7fa2720d886fac4f39abe170.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/streetstyle/weidian/805026645352/a056a45917b30accb9181e4c/thumbs/001-w416-2ee1511e631f3f33d2af329e.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/streetstyle/weidian/805026645352/b99abd95c76fc3967872e636/thumbs/001-w416-4fe181aad69f977b98641ee3.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/streetstyle/weidian/805026645352/7e3c6b7cf156ee7e98289f1a/thumbs/001-w416-4a7c6c61b7b2a21538075831.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/streetstyle/weidian/805026645352/fcd90305efce6cd59113ea85/thumbs/001-w416-b8ff49b3a2ca35213aafca65.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/streetstyle/weidian/805026645352/0069f1126f7337dcd713e61e/thumbs/001-w416-006f2a84b5856d4d374221f1.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/streetstyle/weidian/805026645352/742b5dc30abc8545f9a4d8dc/thumbs/001-w416-cb3710dbfd824617162adc63.webp"
      ]
    },
    "tech-audio-headphones": {
      qcStatus: "available",
      qcLabel: "7 buyer QC photos & videos",
      buyerPhotoCount: 7,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/canary-20260811/pk-specialty-store/weidian/7488240220/cc2007b9df1a4d2e01d1c730/thumbs/cover-w416-d48dc132578464dcd321e1fd.webp",
        "https://cdn.maisonlooks.com/source-qc/canary-20260811/pk-specialty-store/weidian/7488240220/9dbe519c26afc467bf7e52e9/thumbs/cover-w416-2cea647aa7d0029410477f59.webp",
        "https://cdn.maisonlooks.com/source-qc/canary-20260811/pk-specialty-store/weidian/7488240220/b64c7369cb7472cbbc9d56a2/thumbs/cover-w416-ade17d5f1fe780a05acaa87c.webp"
      ]
    },
    "white-logo-cap": {
      qcStatus: "empty",
      qcLabel: "No buyer QC media published",
      buyerPhotoCount: 0,
      qcImages: []
    },
    "air-jordan-4-black-white": {
      qcStatus: "available",
      qcLabel: "14 buyer QC photos & videos",
      buyerPhotoCount: 14,
      qcImages: [
        "https://cdn.maisonlooks.com/file-1775620353232-460167907.webp",
        "https://cdn.maisonlooks.com/file-1775620357261-401331555.webp",
        "https://cdn.maisonlooks.com/file-1775620365406-42265564.webp",
        "https://cdn.maisonlooks.com/file-1775620365698-766241431.webp",
        "https://cdn.maisonlooks.com/file-1775620365463-217253995.webp",
        "https://cdn.maisonlooks.com/file-1775620365650-740371339.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7712795643/99e8cdd062eaadea53a29222/thumbs/001-w416-993da41be07a8a26de14f828.webp"
      ]
    },
    "gel-kayano-white-black": {
      qcStatus: "available",
      qcLabel: "58 buyer QC photos & videos",
      buyerPhotoCount: 58,
      qcImages: [
        "https://cdn.maisonlooks.com/file-1774407049547-830129778.webp",
        "https://cdn.maisonlooks.com/file-1774407049054-34875657.webp",
        "https://cdn.maisonlooks.com/file-1774407049588-154090774.webp",
        "https://cdn.maisonlooks.com/file-1774407049714-120055926.webp",
        "https://cdn.maisonlooks.com/file-1774407049861-241884653.webp",
        "https://cdn.maisonlooks.com/file-1774407048705-530133621.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/5f/5f4a369fa6a8d754f646e7f6.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/04/04fd2e57b0ee1f30157367cf.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/de/ded96798d62fce4659a4c191.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/4e/4e2c2680c9025f8348f1df2d.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/11/11511e3a70e8eea514ec697c.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/00/002b16eb510f9f7ccc77b5e7.webp"
      ]
    },
    "margiela-replica-beige": {
      qcStatus: "available",
      qcLabel: "44 buyer QC photos & videos",
      buyerPhotoCount: 44,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/1018907721135/5292b1fba32a3abcc9c2da2f/thumbs/001-w416-da86a4fc53f2efb5d064f377.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/1018907721135/41bd25ed4a37659deab832e2/thumbs/001-w416-8d13dd131d8374b229270072.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/1018907721135/2050e59c722f5c9da475cdad/thumbs/001-w416-98c4ffc8f3de9ed0f600f72d.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/1018907721135/c599b39d47c0defb6cf6e540/thumbs/001-w416-dc44c8452a1514a51fea0208.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/1018907721135/771f987323b2e2b1a42a1068/thumbs/001-w416-1e2786e3c253f26eef12756d.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/1018907721135/b1b07740f161fb1e9634ac7b/thumbs/001-w416-6eed0159bb3ce1758c4e45c3.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/1018907721135/fcff739aacbca0cfd9868592/thumbs/001-w416-415735cf58a4c65db664a677.webp"
      ]
    },
    "lv-trainer-white-blue": {
      qcStatus: "available",
      qcLabel: "15 buyer QC photos & videos",
      buyerPhotoCount: 15,
      qcImages: [
        "https://cdn.maisonlooks.com/file-1775627000060-950854867.webp",
        "https://cdn.maisonlooks.com/file-1775626999021-6418684.webp",
        "https://cdn.maisonlooks.com/file-1775626978070-913318782.webp",
        "https://cdn.maisonlooks.com/file-1775627002255-707099792.webp",
        "https://cdn.maisonlooks.com/file-1775627002232-615091703.webp",
        "https://cdn.maisonlooks.com/file-1775627002249-700703554.webp",
        "https://cdn.maisonlooks.com/source-qc/canary-20260811/pk-specialty-store/weidian/7433293185/bb20dea1ceacde6e1aacd98a/thumbs/cover-w416-03580f6e1a08458777db4d13.webp"
      ]
    },
    "arrow-sneaker-black-yellow": {
      qcStatus: "available",
      qcLabel: "98 buyer QC photos & videos",
      buyerPhotoCount: 98,
      qcImages: [
        "https://cdn.maisonlooks.com/file-1775548383002-425054634.webp",
        "https://cdn.maisonlooks.com/file-1775548390046-383641110.webp",
        "https://cdn.maisonlooks.com/file-1775548387655-310764078.webp",
        "https://cdn.maisonlooks.com/file-1775548390180-91159338.webp",
        "https://cdn.maisonlooks.com/file-1775548389715-152579140.webp",
        "https://cdn.maisonlooks.com/file-1775548387635-467674889.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/e1/e1e506ea464f4b2a5555e74b.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/cc/cc56d7cc31fbd50c34d4b228.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/90/90a7dd6a91e44b9d931d0c46.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/62/627bc349404862b02b835f5f.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/39/39bf860393f972a319be66e8.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/42/42e1409d97eb96c7f31ff98d.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/72/720b44ecca8439d377bbbc07.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/e3/e3f17d1acd33a1f131ca21e3.webp"
      ]
    },
    "mm6-blakey-black-white": {
      qcStatus: "available",
      qcLabel: "8 buyer QC photos & videos",
      buyerPhotoCount: 8,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/14/1486bbb344c1b9602008ab30.webp"
      ]
    },
    "pegasus-black-orange": {
      qcStatus: "available",
      qcLabel: "21 buyer QC photos & videos",
      buyerPhotoCount: 21,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7746519394/9c063119fc9b0244dab94825/thumbs/001-w416-563a31f3dd1f46d86b7b845f.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7746519394/82d1ce1090ad89ba1f189eda/thumbs/001-w416-ad89080ee9aef204b551166e.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7746519394/d0cd6b558519ffe3c114742c/thumbs/001-w416-950ac9b4871c1a70e077c012.webp"
      ]
    },
    "erd-black-tee": {
      qcStatus: "available",
      qcLabel: "5 buyer QC photos & videos",
      buyerPhotoCount: 5,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7712450131/0c8067bc0b517a6941bba52a/thumbs/001-w416-378ac88f8cd6e7443411b09e.webp"
      ]
    },
    "gallery-art-that-kills-tee": {
      qcStatus: "available",
      qcLabel: "25 buyer QC photos & videos",
      buyerPhotoCount: 25,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/46/46c75a3cedfa52ef5131979c.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/72/7296af015aa2d092d9eac906.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/ba/ba18f0bd02a5e8d377baae7f.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/59/595e73e799b79605fa2ad850.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/45/45f20ea03dc6e6201b5850e4.webp"
      ]
    },
    "distressed-denim-jeans": {
      qcStatus: "available",
      qcLabel: "41 buyer QC photos & videos",
      buyerPhotoCount: 41,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/canary-20260811/pk-specialty-store/weidian/7462808489/332a1e041baa86368235371a/thumbs/cover-w416-0d8937ce405465580986222f.webp",
        "https://cdn.maisonlooks.com/source-qc/canary-20260811/pk-specialty-store/weidian/7462808489/799f74a83bfee20ceec7ad46/thumbs/cover-w416-ffa3077f5a247345bbff6aa3.webp",
        "https://cdn.maisonlooks.com/source-qc/canary-20260811/pk-specialty-store/weidian/7462808489/b47340ddde228255a365d409/thumbs/cover-w416-dbb137819ed839c113010d9d.webp",
        "https://cdn.maisonlooks.com/source-qc/canary-20260811/pk-specialty-store/weidian/7462808489/c9d3ba5e523ff6521eb7c4cc/thumbs/cover-w416-517ea5a960d7aca6354c7fdc.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/7462808489/60b2dc42b8d45f0b5785662d/thumbs/001-w416-1354311177b84923eb00377e.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/7462808489/7bd53db43937dbd5606727a8/thumbs/001-w416-9b5d822e896ccbc0567ed9b1.webp"
      ]
    },
    "dior-oblique-cardholder": {
      qcStatus: "available",
      qcLabel: "21 buyer QC photos & videos",
      buyerPhotoCount: 21,
      qcImages: [
        "https://cdn.maisonlooks.com/file-1774492287937-467059489.webp",
        "https://cdn.maisonlooks.com/file-1774492288172-381346599.webp",
        "https://cdn.maisonlooks.com/file-1774492288437-39565143.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7715403410/8254b8bcdd64177db36e0976/thumbs/001-w416-76222f53d2a41d1e9333cce9.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7715403410/c6b101ffa26db8781e0bdc92/thumbs/001-w416-9aa5e8e6b934b25fb1abdc5e.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7715403410/eb187e16de24a95908e77bd3/thumbs/001-w416-7fb351cf343876ebb9a2d33d.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7715403410/f50bd5f1913be0c6c68e908b/thumbs/001-w416-56d56a138cf9c3c8e056bd80.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7715403410/e956e30b16deccf2f9ea8853/thumbs/001-w416-ad299958b7c8788164d7207e.webp",
        "https://cdn.maisonlooks.com/source-qc/official/official/weidian/7715403410/b16b88bdbc2ce4f84bba57cb/thumbs/001-w416-a0743401522f84ba11fa5a70.webp"
      ]
    },
    "corteiz-track-pants": {
      qcStatus: "available",
      qcLabel: "16 buyer QC photos & videos",
      buyerPhotoCount: 16,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/full-20260822-official-v1/media/65/65a69c661570ca1791cc102d.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260822-official-v1/media/86/860fee63854d92b16c8cd9c0.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260822-official-v1/media/0c/0c2d192a361b0154bd21903b.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260822-official-v1/media/02/025e320e0d837e6089e33708.webp"
      ]
    },
    "supreme-99-long-sleeve": {
      qcStatus: "available",
      qcLabel: "35 buyer QC photos & videos",
      buyerPhotoCount: 35,
      qcImages: [
        "https://cdn.maisonlooks.com/file-1775788737307-334742319.webp",
        "https://cdn.maisonlooks.com/file-1775788736842-500147515.webp",
        "https://cdn.maisonlooks.com/file-1775788737097-274220722.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/e9/e94bcd64b8fa2ad00665be62.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/b0/b05ea9728f6aea407da3f4eb.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/28/284982a0434c00e09c7f6383.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/c3/c348930ac38e8593d51cd46a.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/bb/bba92679fafa3e5a3c7ea18a.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/17/174784e8cd2a0d9c9ff5944c.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/da/da8c38b39bf14b4bd1b8ed7b.webp",
        "https://cdn.maisonlooks.com/source-qc/full-20260821-v1/media/6d/6d2f4810939884421ed6dd59.webp"
      ]
    },
    "psg-black-gold-jersey": {
      qcStatus: "available",
      qcLabel: "43 buyer QC photos & videos",
      buyerPhotoCount: 43,
      qcImages: [
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/949831492611/9fd7030e5885777ee6c51532/thumbs/001-w416-f20d2ec5a773c31049681716.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/949831492611/1ac210859067ef8f27749e73/thumbs/001-w416-7eab245760fb4ea63014b95b.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/949831492611/3cc692126b3989ea83cbe145/thumbs/001-w416-8c9ef927efd7a2dc6891bd3e.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/949831492611/52654ea0f6f11caf57564b90/thumbs/001-w416-6561919a5aa31206442e5295.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/949831492611/62d6c78dc4804ee6b3f3f871/thumbs/001-w416-bf48aa3298b88705a4179a1c.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/949831492611/69ac198ec9255b03fd97a5c4/thumbs/001-w416-ccb3f517e1287b5a8cc063f6.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/949831492611/96505daba3eec423754744aa/thumbs/001-w416-5aadc9c5ff6271bdcf086698.webp",
        "https://cdn.maisonlooks.com/source-qc/streetstyle/official/weidian/949831492611/d72f420034c541e0cd8aee41/thumbs/001-w416-2f123dc9284eef6804e6703a.webp"
      ]
    }
  };

  window.JOYA_PRODUCTS = (window.JOYA_PRODUCTS || []).map((product) => ({
    ...product,
    ...(qcData[product.id] || {
      qcStatus: "not-published",
      qcLabel: "QC availability not listed",
      buyerPhotoCount: null,
      qcImages: []
    }),
    qcCheckedAt: "2026-09-03"
  }));
})();
