// To parse this data:
//
//   import { Convert, MarvelEvents } from "./file";
//
//   const marvelEvents = Convert.toMarvelEvents(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.
export var Role;
(function (Role) {
    Role["Artist"] = "artist";
    Role["Colorist"] = "colorist";
    Role["ColoristCover"] = "colorist (cover)";
    Role["Editor"] = "editor";
    Role["Inker"] = "inker";
    Role["InkerCover"] = "inker (cover)";
    Role["Letterer"] = "letterer";
    Role["Other"] = "other";
    Role["Penciler"] = "penciler";
    Role["PencilerCover"] = "penciler (cover)";
    Role["Penciller"] = "penciller";
    Role["PencillerCover"] = "penciller (cover)";
    Role["RoleColorist"] = "Colorist";
    Role["RoleLetterer"] = "Letterer";
    Role["RolePenciller"] = "Penciller";
    Role["Writer"] = "writer";
})(Role || (Role = {}));
export var ItemType;
(function (ItemType) {
    ItemType["Cover"] = "cover";
    ItemType["Credits"] = "credits";
    ItemType["Empty"] = "";
    ItemType["InteriorStory"] = "interiorStory";
    ItemType["Pinup"] = "pinup";
    ItemType["Promo"] = "promo";
    ItemType["TableOfContents"] = "table of contents";
    ItemType["TextArticle"] = "text article";
})(ItemType || (ItemType = {}));
export var Extension;
(function (Extension) {
    Extension["Jpg"] = "jpg";
})(Extension || (Extension = {}));
export var URLType;
(function (URLType) {
    URLType["Detail"] = "detail";
    URLType["Wiki"] = "wiki";
})(URLType || (URLType = {}));
// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    static toMarvelEvents(json) {
        return cast(JSON.parse(json), r("MarvelEvents"));
    }
    static marvelEventsToJson(value) {
        return JSON.stringify(uncast(value, r("MarvelEvents")), null, 2);
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
    "MarvelEvents": o([
        { json: "code", js: "code", typ: 0 },
        { json: "status", js: "status", typ: "" },
        { json: "copyright", js: "copyright", typ: "" },
        { json: "attributionText", js: "attributionText", typ: "" },
        { json: "attributionHTML", js: "attributionHTML", typ: "" },
        { json: "etag", js: "etag", typ: "" },
        { json: "data", js: "data", typ: r("DataEvents") },
    ], false),
    "DataEvents": o([
        { json: "offset", js: "offset", typ: 0 },
        { json: "limit", js: "limit", typ: 0 },
        { json: "total", js: "total", typ: 0 },
        { json: "count", js: "count", typ: 0 },
        { json: "results", js: "results", typ: a(r("ResultEvents")) },
    ], false),
    "ResultEvents": o([
        { json: "id", js: "id", typ: 0 },
        { json: "title", js: "title", typ: "" },
        { json: "description", js: "description", typ: "" },
        { json: "resourceURI", js: "resourceURI", typ: "" },
        { json: "urls", js: "urls", typ: a(r("URLEvents")) },
        { json: "modified", js: "modified", typ: "" },
        { json: "start", js: "start", typ: u(Date, null) },
        { json: "end", js: "end", typ: u(Date, null) },
        { json: "thumbnail", js: "thumbnail", typ: r("ThumbnailEvents") },
        { json: "creators", js: "creators", typ: r("CreatorsEvents") },
        { json: "characters", js: "characters", typ: r("CharactersEvents") },
        { json: "stories", js: "stories", typ: r("StoriesEvents") },
        { json: "comics", js: "comics", typ: r("CharactersEvents") },
        { json: "series", js: "series", typ: r("CharactersEvents") },
        { json: "next", js: "next", typ: u(r("NextEvents"), null) },
        { json: "previous", js: "previous", typ: u(r("NextEvents"), null) },
    ], false),
    "CharactersEvents": o([
        { json: "available", js: "available", typ: 0 },
        { json: "collectionURI", js: "collectionURI", typ: "" },
        { json: "items", js: "items", typ: a(r("NextEvents")) },
        { json: "returned", js: "returned", typ: 0 },
    ], false),
    "NextEvents": o([
        { json: "resourceURI", js: "resourceURI", typ: "" },
        { json: "name", js: "name", typ: "" },
    ], false),
    "CreatorsEvents": o([
        { json: "available", js: "available", typ: 0 },
        { json: "collectionURI", js: "collectionURI", typ: "" },
        { json: "items", js: "items", typ: a(r("CreatorsEventsItem")) },
        { json: "returned", js: "returned", typ: 0 },
    ], false),
    "CreatorsEventsItem": o([
        { json: "resourceURI", js: "resourceURI", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "role", js: "role", typ: r("Role") },
    ], false),
    "StoriesEvents": o([
        { json: "available", js: "available", typ: 0 },
        { json: "collectionURI", js: "collectionURI", typ: "" },
        { json: "items", js: "items", typ: a(r("StoriesEventsItem")) },
        { json: "returned", js: "returned", typ: 0 },
    ], false),
    "StoriesEventsItem": o([
        { json: "resourceURI", js: "resourceURI", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "type", js: "type", typ: r("ItemType") },
    ], false),
    "ThumbnailEvents": o([
        { json: "path", js: "path", typ: "" },
        { json: "extension", js: "extension", typ: r("Extension") },
    ], false),
    "URLEvents": o([
        { json: "type", js: "type", typ: r("URLType") },
        { json: "url", js: "url", typ: "" },
    ], false),
    "Role": [
        "artist",
        "colorist",
        "colorist (cover)",
        "editor",
        "inker",
        "inker (cover)",
        "letterer",
        "other",
        "penciler",
        "penciler (cover)",
        "penciller",
        "penciller (cover)",
        "Colorist",
        "Letterer",
        "Penciller",
        "writer",
    ],
    "ItemType": [
        "cover",
        "credits",
        "",
        "interiorStory",
        "pinup",
        "promo",
        "table of contents",
        "text article",
    ],
    "Extension": [
        "jpg",
    ],
    "URLType": [
        "detail",
        "wiki",
    ],
};
//# sourceMappingURL=marvel-events.js.map