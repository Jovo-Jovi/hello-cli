# i18n model

## 1. Locale

One locale, `en`. `defaultLocale` is `en`. Direction is `ltr`.

There is no second catalogue, no `[locale]` route, no `Accept-Language` handling, and no
language cookie. The command does not infer a language.

## 2. Catalogue

`devos.config.json` `guards.i18n.catalogues.en` is `src/i18n/messages/en.json`.

T01 creates that file as `{}`. T02 writes the keys in `docs/CONTENT_MODEL.md`: `greeting`,
`nameMissing`, and `nameRejected`. The safe failure sentence is not a catalogue key.

`guard:i18n` requires the file once `src/` exists, requires matching keys if another locale is
ever added, and rejects an empty string value.

## 3. Source

User-facing sentences live in the catalogue. A second locale, if a change request adds one,
must carry the same keys. There is no HTML `lang` attribute, because there is no HTML.

## 4. Direction and CSS

No stylesheet. Logical CSS properties are not used, because there is no CSS. `guard:design`
still forbids a raw colour, a physical CSS property, and a third-party URL in `src/`.
