# Locale translation review

Chrome resolves `_locales/` by user UI language and falls back to `en` when a locale is missing or malformed. If a translation reads poorly enough that fallback-to-English would be preferable, delete that locale's folder — users of that language will gracefully fall back to English.

Every non-English locale in v0.3.0 was LLM-generated in one pass. Expect functional-not-professional quality, especially for smaller languages. For each locale, review the 8 translated `message` fields by opening `_locales/<code>/messages.json` alongside `_locales/en/messages.json`, and tick the box when reviewed.

| Locale | Code | Reviewed | Notes |
|---|---|---|---|
| Afrikaans | af | [ ] |  |
| Albanian | sq | [ ] |  |
| Amharic | am | [ ] |  |
| Arabic | ar | [ ] |  |
| Armenian | hy | [ ] |  |
| Assamese | as | [ ] |  |
| Aymara | ay | [ ] |  |
| Azerbaijani | az | [ ] |  |
| Bangla | bn | [ ] |  |
| Bashkir | ba | [ ] |  |
| Basque | eu | [ ] |  |
| Belarusian | be | [ ] |  |
| Bhojpuri | bho | [ ] |  |
| Bosnian | bs | [ ] |  |
| Bulgarian | bg | [ ] |  |
| Burmese | my | [ ] |  |
| Catalan | ca | [ ] |  |
| Cebuano | ceb | [ ] |  |
| Chinese (Simplified) | zh-CN | [ ] |  |
| Chinese (Traditional) | zh-TW | [ ] |  |
| Corsican | co | [ ] |  |
| Croatian | hr | [ ] |  |
| Czech | cs | [ ] |  |
| Danish | da | [ ] |  |
| Dhivehi | dv | [ ] |  |
| Dutch | nl | [ ] |  |
| Dzongkha | dz | [ ] |  |
| English | en | [x] | Hand-authored reference. |
| Esperanto | eo | [ ] |  |
| Estonian | et | [ ] |  |
| Ewe | ee | [ ] |  |
| Faroese | fo | [ ] |  |
| Fijian | fj | [ ] |  |
| Filipino | fil | [ ] |  |
| Finnish | fi | [ ] |  |
| French | fr | [ ] |  |
| Ga | gaa | [ ] |  |
| Galician | gl | [ ] |  |
| Ganda | lg | [ ] |  |
| Georgian | ka | [ ] |  |
| German | de | [ ] |  |
| Greek | el | [ ] |  |
| Guarani | gn | [ ] |  |
| Gujarati | gu | [ ] |  |
| Haitian Creole | ht | [ ] |  |
| Hausa | ha | [ ] |  |
| Hawaiian | haw | [ ] |  |
| Hebrew | iw | [ ] | YouTube uses deprecated `iw` code, not `he`. |
| Hindi | hi | [ ] |  |
| Hmong | hmn | [ ] |  |
| Hungarian | hu | [ ] |  |
| Icelandic | is | [ ] |  |
| Igbo | ig | [ ] |  |
| Indonesian | id | [ ] |  |
| Irish | ga | [ ] |  |
| Italian | it | [ ] |  |
| Japanese | ja | [ ] |  |
| Javanese | jv | [ ] |  |
| Kannada | kn | [ ] |  |
| Kazakh | kk | [ ] |  |
| Khmer | km | [ ] |  |
| Kinyarwanda | rw | [ ] |  |
| Krio | kri | [ ] |  |
| Korean | ko | [ ] |  |
| Kurdish | ku | [ ] |  |
| Kyrgyz | ky | [ ] |  |
| Lao | lo | [ ] |  |
| Latin | la | [ ] |  |
| Latvian | lv | [ ] |  |
| Lingala | ln | [ ] |  |
| Lithuanian | lt | [ ] |  |
| Luxembourgish | lb | [ ] |  |
| Macedonian | mk | [ ] |  |
| Maithili | mai | [ ] |  |
| Malagasy | mg | [ ] |  |
| Malay | ms | [ ] |  |
| Malayalam | ml | [ ] |  |
| Maltese | mt | [ ] |  |
| Māori | mi | [ ] |  |
| Marathi | mr | [ ] |  |
| Mongolian | mn | [ ] |  |
| Nepali | ne | [ ] |  |
| Northern Sotho | nso | [ ] |  |
| Norwegian | no | [ ] |  |
| Nyanja | ny | [ ] |  |
| Odia | or | [ ] |  |
| Oromo | om | [ ] |  |
| Pashto | ps | [ ] |  |
| Persian | fa | [ ] |  |
| Polish | pl | [ ] |  |
| Portuguese (Brazil) | pt-BR | [ ] |  |
| Portuguese (Portugal) | pt-PT | [ ] |  |
| Punjabi | pa | [ ] |  |
| Quechua | qu | [ ] |  |
| Romanian | ro | [ ] |  |
| Russian | ru | [ ] |  |
| Samoan | sm | [ ] |  |
| Sanskrit | sa | [ ] |  |
| Scottish Gaelic | gd | [ ] |  |
| Serbian | sr | [ ] |  |
| Shona | sn | [ ] |  |
| Sindhi | sd | [ ] |  |
| Sinhala | si | [ ] |  |
| Slovak | sk | [ ] |  |
| Slovenian | sl | [ ] |  |
| Somali | so | [ ] |  |
| Southern Sotho | st | [ ] |  |
| Spanish | es | [ ] |  |
| Sundanese | su | [ ] |  |
| Swahili | sw | [ ] |  |
| Swedish | sv | [ ] |  |
| Tajik | tg | [ ] |  |
| Tamil | ta | [ ] |  |
| Tatar | tt | [ ] |  |
| Telugu | te | [ ] |  |
| Thai | th | [ ] |  |
| Tigrinya | ti | [ ] |  |
| Tsonga | ts | [ ] |  |
| Turkish | tr | [ ] |  |
| Turkmen | tk | [ ] |  |
| Ukrainian | uk | [ ] |  |
| Urdu | ur | [ ] |  |
| Uyghur | ug | [ ] |  |
| Uzbek | uz | [ ] |  |
| Vietnamese | vi | [ ] |  |
| Welsh | cy | [ ] |  |
| Western Frisian | fy | [ ] |  |
| Xhosa | xh | [ ] |  |
| Yiddish | yi | [ ] |  |
| Yoruba | yo | [ ] |  |
| Zulu | zu | [ ] |  |
