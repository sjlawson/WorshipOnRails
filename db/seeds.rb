# -*- coding: utf-8 -*-

Programme.create!([
  {title: "Some Sunday", notes: "Things", user_id: 1}
])
Programme::HABTM_Resources.create!([
  {resource_id: 1, programme_id: 2}
])
ProgrammesResource.create!([
  {resource_id: 1, programme_id: 2}
])
ProgrammesScripture.create!([
  {scripture_id: 1, programme_id: 2, programmeOrder: 1}
])
ProgrammesSong.create!([
  {programme_id: 2, song_id: 2, programmeOrder: 2},
  {programme_id: 2, song_id: 1, programmeOrder: 3},
  {programme_id: 2, song_id: 3, programmeOrder: 1}
])
Resource.create!([
  {title: "Candle Pranying", location: "http://2.bp.blogspot.com/-0hzKwG1jpeU/TieldXC9ISI/AAAAAAAAAAM/CKMF_MkmvAQ/s1600/Praying-Hand-Background.jpg", resourceType: "jpg", attribution: "", user_id: 1}
])
Resource::HABTM_Programme.create!([
  {resource_id: 1, programme_id: 2}
])
Scripture.create!([
  {title: "Proverbs 21:21 NIV", content: "Whoever pursues righteousness and love finds life, prosperity and honor.", author: "Solomon", user_id: 1}
])
Scripture::HABTM_Programmes.create!([
  {scripture_id: 1, programme_id: 2, programmeOrder: 1}
])
Song.create!([
  {title: "Be Thou My Vision", content: "[Verse 1]\r\nBe Thou my Vision, O Lord of my heart;\r\nNaught be all else to me, save that Thou art\r\nThou my best Thought, by day or by night,\r\nWaking or sleeping, Thy presence my light. \r\n[Verse 2]\r\nBe Thou my Wisdom, and Thou my true Word;\r\nI ever with Thee and Thou with me, Lord;\r\nThou my great Father, I Thy true son;\r\nThou in me dwelling, and I with Thee one.\r\n[Verse 3]\r\nBe Thou my battle Shield, Sword for the fight;\r\nBe Thou my Dignity, Thou my Delight;\r\nThou my soul’s Shelter, Thou my high Tower:\r\nRaise Thou me heavenward, O Power of my power.\r\n[Verse 4]\r\nRiches I heed not, nor man’s empty praise,\r\nThou mine Inheritance, now and always:\r\nThou and Thou only, first in my heart,\r\nHigh King of Heaven, my Treasure Thou art.\r\n[Verse 5]\r\nHigh King of Heaven, my victory won,\r\nMay I reach Heaven’s joys, O bright Heaven’s Sun!\r\nHeart of my own heart, whatever befall,\r\nStill be my Vision, O Ruler of all.", license: "", author: "", user_id: 1},
  {title: "Lamentation", content: "[Verse 1]\r\nO my God, save me\r\nFor the waters, they strangle me\r\nI’m so tired of calling out\r\nAnd my eyes of crying\r\n[Verse 2]\r\nWaiting so long for Your salvation\r\nMust I suffer wrong\r\nIn hands of those who hate me?\r\nDon’t leave me alone for I just have You\r\nI have long endured attacks because of You\r\n[Verse 3]\r\nMy face is all scarred, waiting so long\r\nO my God, rescue me\r\nI’m reduced to ashes\r\nAll my friends abandoned me\r\n[Verse 4]\r\nI am alone, they despise me\r\nDon’t reject me in my old age\r\nWhen my body fails in strength to serve You\r\nIn You I find refuge for I just have You", license: "", author: "", user_id: 1},
  {title: "God of Wonders", content: "[Verse 1]\r\nLord of all creation\r\nof water earth and sky\r\nThe heavens are your Tabernacle\r\nGlory to the Lord on high\r\n[Chorus]\r\nGod of wonders beyond our galaxy\r\nYou are Holy, Holy\r\nThe universe declares your Majesty\r\nAnd you are holy holy\r\nLord of Heaven and Earth\r\nLord of Heaven and Earth\r\n[Verse 2]\r\nEarly in the morning\r\nI will celebrate the light\r\nWhen i stumble in the darkness\r\nI will call your name by night\r\n[Bridge]\r\nlord of heaven and earth\r\nlord of heaven and earth\r\nHallelujah to the lord of heaven and earth (repeat 3 times)\r\nholy......holy....holy god.....\r\n[End Tag]\r\nPrecious lord reveal your heart to me....\r\nFather holy..\r\nThe universe declares your majesty\r\nYou are holy, holy, holy, holy,\r\nHallelujah to the lord of heaven and earth \r\n<6x>", license: "", author: "", user_id: 1}
])
Admin.create email: 'sjlawson@sdf.org', password: 'somepass'
User.create email: 'sjlawson@sdf.org', password: 'somepass'
