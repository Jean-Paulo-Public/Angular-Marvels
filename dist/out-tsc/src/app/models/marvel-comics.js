// To parse this data:
//
//   import { Convert, MarvelComics } from "./file";
//
//   const marvelComics = Convert.toMarvelComics(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
export var Role;
(function (Role) {
    Role["Colorist"] = "colorist";
    Role["Editor"] = "editor";
    Role["Inker"] = "inker";
    Role["Letterer"] = "letterer";
    Role["Penciler"] = "penciler";
    Role["Penciller"] = "penciller";
    Role["PencillerCover"] = "penciller (cover)";
    Role["Writer"] = "writer";
})(Role || (Role = {}));
export var DateType;
(function (DateType) {
    DateType["DigitalPurchaseDate"] = "digitalPurchaseDate";
    DateType["FocDate"] = "focDate";
    DateType["OnsaleDate"] = "onsaleDate";
    DateType["UnlimitedDate"] = "unlimitedDate";
})(DateType || (DateType = {}));
export var DiamondCode;
(function (DiamondCode) {
    DiamondCode["Empty"] = "";
    DiamondCode["Jul190068"] = "JUL190068";
})(DiamondCode || (DiamondCode = {}));
export var Format;
(function (Format) {
    Format["Comic"] = "Comic";
    Format["Digest"] = "Digest";
    Format["Empty"] = "";
    Format["TradePaperback"] = "Trade Paperback";
})(Format || (Format = {}));
export var Extension;
(function (Extension) {
    Extension["Jpg"] = "jpg";
})(Extension || (Extension = {}));
export var PriceComicsType;
(function (PriceComicsType) {
    PriceComicsType["DigitalPurchasePriceComics"] = "digitalPurchasePriceComics";
    PriceComicsType["PrintPriceComics"] = "printPriceComics";
})(PriceComicsType || (PriceComicsType = {}));
export var ItemType;
(function (ItemType) {
    ItemType["Cover"] = "cover";
    ItemType["InteriorStory"] = "interiorStory";
    ItemType["Promo"] = "promo";
})(ItemType || (ItemType = {}));
export var Language;
(function (Language) {
    Language["EnUs"] = "en-us";
})(Language || (Language = {}));
export var TextObjectComicsType;
(function (TextObjectComicsType) {
    TextObjectComicsType["IssueSolicitText"] = "issue_solicit_text";
})(TextObjectComicsType || (TextObjectComicsType = {}));
export var URLType;
(function (URLType) {
    URLType["Detail"] = "detail";
    URLType["InAppLink"] = "inAppLink";
    URLType["Purchase"] = "purchase";
    URLType["Reader"] = "reader";
})(URLType || (URLType = {}));
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    static toMarvelComics(json) {
        return cast(JSON.parse(json), r("MarvelComics"));
    }
    static marvelComicsToJson(value) {
        return JSON.stringify(uncast(value, r("MarvelComics")), null, 2);
    }
}
function invalidValue(typ, val, key, parent = '') {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}
function prettyTypeName(typ) {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        }
        else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    }
    else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    }
    else {
        return typeof typ;
    }
}
function jsonToJSProps(typ) {
    if (typ.jsonToJS === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}
function jsToJSONProps(typ) {
    if (typ.jsToJSON === undefined) {
        const map = {};
        typ.props.forEach((p) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}
function transform(val, typ, getProps, key = '', parent = '') {
    function transformPrimitive(typ, val) {
        if (typeof typ === typeof val)
            return val;
        return invalidValue(typ, val, key, parent);
    }
    function transformUnion(typs, val) {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            }
            catch (_) { }
        }
        return invalidValue(typs, val, key, parent);
    }
    function transformEnum(cases, val) {
        if (cases.indexOf(val) !== -1)
            return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }
    function transformArray(typ, val) {
        // val must be an array with no invalid elements
        if (!Array.isArray(val))
            return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }
    function transformDate(val) {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }
    function transformObject(props, additional, val) {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, key, ref);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key, ref);
            }
        });
        return result;
    }
    if (typ === "any")
        return val;
    if (typ === null) {
        if (val === null)
            return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false)
        return invalidValue(typ, val, key, parent);
    let ref = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ))
        return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems") ? transformArray(typ.arrayItems, val)
                : typ.hasOwnProperty("props") ? transformObject(getProps(typ), typ.additional, val)
                    : invalidValue(typ, val, key, parent);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number")
        return transformDate(val);
    return transformPrimitive(typ, val);
}
function cast(val, typ) {
    return transform(val, typ, jsonToJSProps);
}
function uncast(val, typ) {
    return transform(val, typ, jsToJSONProps);
}
function l(typ) {
    return { literal: typ };
}
function a(typ) {
    return { arrayItems: typ };
}
function u(...typs) {
    return { unionMembers: typs };
}
function o(props, additional) {
    return { props, additional };
}
function m(additional) {
    return { props: [], additional };
}
function r(name) {
    return { ref: name };
}
const typeMap = {
    "MarvelComics": o([
        { json: "code", js: "code", typ: 0 },
        { json: "status", js: "status", typ: "" },
        { json: "copyright", js: "copyright", typ: "" },
        { json: "attributionText", js: "attributionText", typ: "" },
        { json: "attributionHTML", js: "attributionHTML", typ: "" },
        { json: "etag", js: "etag", typ: "" },
        { json: "data", js: "data", typ: r("DataComics") },
    ], false),
    "DataComics": o([
        { json: "offset", js: "offset", typ: 0 },
        { json: "limit", js: "limit", typ: 0 },
        { json: "total", js: "total", typ: 0 },
        { json: "count", js: "count", typ: 0 },
        { json: "results", js: "results", typ: a(r("ResultComics")) },
    ], false),
    "ResultComics": o([
        { json: "id", js: "id", typ: 0 },
        { json: "digitalId", js: "digitalId", typ: 0 },
        { json: "title", js: "title", typ: "" },
        { json: "issueNumber", js: "issueNumber", typ: 0 },
        { json: "variantDescription", js: "variantDescription", typ: "" },
        { json: "description", js: "description", typ: u(null, "") },
        { json: "modified", js: "modified", typ: "" },
        { json: "isbn", js: "isbn", typ: "" },
        { json: "upc", js: "upc", typ: "" },
        { json: "diamondCode", js: "diamondCode", typ: r("DiamondCode") },
        { json: "ean", js: "ean", typ: "" },
        { json: "issn", js: "issn", typ: "" },
        { json: "format", js: "format", typ: r("Format") },
        { json: "pageCount", js: "pageCount", typ: 0 },
        { json: "textObjects", js: "textObjects", typ: a(r("TextObjectComics")) },
        { json: "resourceURI", js: "resourceURI", typ: "" },
        { json: "urls", js: "urls", typ: a(r("URLComics")) },
        { json: "series", js: "series", typ: r("SeriesComics") },
        { json: "variants", js: "variants", typ: a(r("SeriesComics")) },
        { json: "collections", js: "collections", typ: a("any") },
        { json: "collectedIssues", js: "collectedIssues", typ: a(r("SeriesComics")) },
        { json: "dates", js: "dates", typ: a(r("DateElementComics")) },
        { json: "prices", js: "prices", typ: a(r("PriceComics")) },
        { json: "thumbnail", js: "thumbnail", typ: r("ThumbnailComics") },
        { json: "images", js: "images", typ: a(r("ThumbnailComics")) },
        { json: "creators", js: "creators", typ: r("CreatorsComics") },
        { json: "characters", js: "characters", typ: r("CharactersComics") },
        { json: "stories", js: "stories", typ: r("StoriesComics") },
        { json: "events", js: "events", typ: r("CharactersComics") },
    ], false),
    "CharactersComics": o([
        { json: "available", js: "available", typ: 0 },
        { json: "collectionURI", js: "collectionURI", typ: "" },
        { json: "items", js: "items", typ: a(r("SeriesComics")) },
        { json: "returned", js: "returned", typ: 0 },
    ], false),
    "SeriesComics": o([
        { json: "resourceURI", js: "resourceURI", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "CreatorsComics": o([
        { json: "available", js: "available", typ: 0 },
        { json: "collectionURI", js: "collectionURI", typ: "" },
        { json: "items", js: "items", typ: a(r("CreatorsComicsItem")) },
        { json: "returned", js: "returned", typ: 0 },
    ], false),
    "CreatorsComicsItem": o([
        { json: "resourceURI", js: "resourceURI", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "role", js: "role", typ: r("Role") },
    ], false),
    "DateElementComics": o([
        { json: "type", js: "type", typ: r("DateType") },
        { json: "date", js: "date", typ: "" },
    ], false),
    "ThumbnailComics": o([
        { json: "path", js: "path", typ: "" },
        { json: "extension", js: "extension", typ: r("Extension") },
    ], false),
    "PriceComics": o([
        { json: "type", js: "type", typ: r("PriceComicsType") },
        { json: "price", js: "price", typ: 3.14 },
    ], false),
    "StoriesComics": o([
        { json: "available", js: "available", typ: 0 },
        { json: "collectionURI", js: "collectionURI", typ: "" },
        { json: "items", js: "items", typ: a(r("StoriesComicsItem")) },
        { json: "returned", js: "returned", typ: 0 },
    ], false),
    "StoriesComicsItem": o([
        { json: "resourceURI", js: "resourceURI", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("ItemType") },
    ], false),
    "TextObjectComics": o([
        { json: "type", js: "type", typ: r("TextObjectComicsType") },
        { json: "language", js: "language", typ: r("Language") },
        { json: "text", js: "text", typ: "" },
    ], false),
    "URLComics": o([
        { json: "type", js: "type", typ: r("URLType") },
        { json: "url", js: "url", typ: "" },
    ], false),
    "Role": [
        "colorist",
        "editor",
        "inker",
        "letterer",
        "penciler",
        "penciller",
        "penciller (cover)",
        "writer",
    ],
    "DateType": [
        "digitalPurchaseDate",
        "focDate",
        "onsaleDate",
        "unlimitedDate",
    ],
    "DiamondCode": [
        "",
        "JUL190068",
    ],
    "Format": [
        "Comic",
        "Digest",
        "",
        "Trade Paperback",
    ],
    "Extension": [
        "jpg",
    ],
    "PriceComicsType": [
        "digitalPurchasePriceComics",
        "printPriceComics",
    ],
    "ItemType": [
        "cover",
        "interiorStory",
        "promo",
    ],
    "Language": [
        "en-us",
    ],
    "TextObjectComicsType": [
        "issue_solicit_text",
    ],
    "URLType": [
        "detail",
        "inAppLink",
        "purchase",
        "reader",
    ],
};
//# sourceMappingURL=marvel-comics.js.map