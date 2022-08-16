// To parse this data:
//
//   import { Convert, Welcome } from "./file";
//
//   const welcome = Convert.toWelcome(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface HotCheck {
    pais: string;
    liga: string;
    conteoActual: number;
    maxConteo: number;
    gamesFinished: number;
    totDraw: number;
    lstConteo: number[];
    dateNextGame: string;
    percentDraw: number;
}

export interface Liga {
    Stages: Stage[];
}

export interface LigaHomologada {
    nombrePublico: string;
    nombreForApi: string;
}

export interface Summary {
    TLName : string; // Team Local Name
    TVName : string; // Team Visit Name
    TLGoals: number; // Team Visit Goals
    TVGoals: number; // Team Visit Goals
    CurrentCount: number; // Partidos sin empate hasta nuevo empate
    Date: Date
}

export interface Event {
    Eid:    string;
    Pids:   { [key: string]: string };
    Sids:   { [key: string]: string };
    Tr1?:   string;
    Tr2?:   string;
    Trh1?:  string;
    Trh2?:  string;
    Tr1OR?: string;
    Tr2OR?: string;
    T1:     T1[];
    T2:     T1[];
    Eps:    Eps;
    Esid:   number;
    Epr:    number;
    Ecov:   number;
    Ern:    number;
    ErnInf: string;
    Ewt?:   number;
    Et:     number;
    Esd:    number;
    LuUT:   number;
    Eds?:   number;
    Edf?:   number;
    Eact:   number;
    IncsX:  number;
    ComX:   number;
    LuX:    number;
    StatX:  number;
    SubsX:  number;
    SDFowX: number;
    SDInnX: number;
    EO:     number;
    LuC:    number;
    Ehid:   number;
    Stg:    Stage;
    Pid:    number;
    Spid:   number;
}

export interface Stage {
    Sid:          string;
    Snm:          CompN;
    Scd:          Scd;
    Cid:          string;
    Cnm:          Cnm;
    Csnm:         Cnm;
    Ccd:          Ccd;
    Ccdiso:       Ccdiso;
    CompId:       string;
    CompN:        CompN;
    CompST:       Cnm;
    CompD:        Cnm;
    Scu:          number;
    Chi:          number;
    Shi:          number;
    Sdn:          CompN;
    Events?:      Event[];
    LeagueTable?: LeagueTable;
}

export enum Eps {
    Ft = "FT",
    NS = "NS",
    Postp = "Postp.",
    The13 = "13'",
}

export interface T1 {
    Nm:       string;
    ID:       string;
    tbd:      number;
    Img:      string;
    Gd:       number;
    Pids:     { [key: string]: string[] };
    CoNm:     Cnm;
    CoId:     Ccdiso;
    HasVideo: boolean;
}

export enum Ccdiso {
    Arg = "ARG",
}

export enum Cnm {
    Argentina = "Argentina",
}

export enum Ccd {
    Argentina = "argentina",
}

export enum CompN {
    PrimeraDivision = "Primera Division",
}

export interface LeagueTable {
    L: L[];
}

export interface L {
    Tables: Table[];
}

export interface Table {
    LTT:   number;
    team:  Team[];
    phrX:  PhrX[];
    phrC?: { [key: string]: string };
}

export interface PhrX {
    V: number;
    D: number;
}

export interface Team {
    rnk:  number;
    Tid:  string;
    win:  number;
    winn: string;
    wreg: number;
    wot:  number;
    wap:  number;
    Tnm:  string;
    lst:  number;
    lstn: string;
    lreg: number;
    lot:  number;
    lap:  number;
    drw:  number;
    drwn: string;
    gf:   number;
    ga:   number;
    gd:   number;
    pf:   number;
    pa:   number;
    ptsn: string;
    phr?: number[];
    Ipr:  number;
    Img:  string;
    pts:  number;
    pld:  number;
}

export enum Scd {
    PrimeraDivision = "primera-division",
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toWelcome(json: string): Liga {
        return cast(JSON.parse(json), r("Welcome"));
    }

    public static welcomeToJson(value: Liga): string {
        return JSON.stringify(uncast(value, r("Welcome")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any = ''): never {
    if (key) {
        throw Error(`Invalid value for key "${key}". Expected type ${JSON.stringify(typ)} but got ${JSON.stringify(val)}`);
    }
    throw Error(`Invalid value ${JSON.stringify(val)} for type ${JSON.stringify(typ)}`, );
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof typ === typeof val) return val;
        return invalidValue(typ, val, key);
    }

    function transformUnion(typs: any[], val: any): any {
        // val must validate against one typ in typs
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases, val);
    }

    function transformArray(typ: any, val: any): any {
        // val must be an array with no invalid elements
        if (!Array.isArray(val)) return invalidValue("array", val);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue("Date", val);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue("object", val);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(key => {
            const prop = props[key];
            const v = Object.prototype.hasOwnProperty.call(val, key) ? val[key] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, prop.key);
        });
        Object.getOwnPropertyNames(val).forEach(key => {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
                result[key] = transform(val[key], additional, getProps, key);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val);
    }
    if (typ === false) return invalidValue(typ, val);
    while (typeof typ === "object" && typ.ref !== undefined) {
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val);
    }
    // Numbers can be parsed by Date but shouldn't be.
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "Welcome": o([
        { json: "Stages", js: "Stages", typ: a(r("Stage")) },
    ], false),
    "Event": o([
        { json: "Eid", js: "Eid", typ: "" },
        { json: "Pids", js: "Pids", typ: m("") },
        { json: "Sids", js: "Sids", typ: m("") },
        { json: "Tr1", js: "Tr1", typ: u(undefined, "") },
        { json: "Tr2", js: "Tr2", typ: u(undefined, "") },
        { json: "Trh1", js: "Trh1", typ: u(undefined, "") },
        { json: "Trh2", js: "Trh2", typ: u(undefined, "") },
        { json: "Tr1OR", js: "Tr1OR", typ: u(undefined, "") },
        { json: "Tr2OR", js: "Tr2OR", typ: u(undefined, "") },
        { json: "T1", js: "T1", typ: a(r("T1")) },
        { json: "T2", js: "T2", typ: a(r("T1")) },
        { json: "Eps", js: "Eps", typ: r("Eps") },
        { json: "Esid", js: "Esid", typ: 0 },
        { json: "Epr", js: "Epr", typ: 0 },
        { json: "Ecov", js: "Ecov", typ: 0 },
        { json: "Ern", js: "Ern", typ: 0 },
        { json: "ErnInf", js: "ErnInf", typ: "" },
        { json: "Ewt", js: "Ewt", typ: u(undefined, 0) },
        { json: "Et", js: "Et", typ: 0 },
        { json: "Esd", js: "Esd", typ: 0 },
        { json: "LuUT", js: "LuUT", typ: 0 },
        { json: "Eds", js: "Eds", typ: u(undefined, 0) },
        { json: "Edf", js: "Edf", typ: u(undefined, 0) },
        { json: "Eact", js: "Eact", typ: 0 },
        { json: "IncsX", js: "IncsX", typ: 0 },
        { json: "ComX", js: "ComX", typ: 0 },
        { json: "LuX", js: "LuX", typ: 0 },
        { json: "StatX", js: "StatX", typ: 0 },
        { json: "SubsX", js: "SubsX", typ: 0 },
        { json: "SDFowX", js: "SDFowX", typ: 0 },
        { json: "SDInnX", js: "SDInnX", typ: 0 },
        { json: "EO", js: "EO", typ: 0 },
        { json: "LuC", js: "LuC", typ: 0 },
        { json: "Ehid", js: "Ehid", typ: 0 },
        { json: "Stg", js: "Stg", typ: r("Stage") },
        { json: "Pid", js: "Pid", typ: 0 },
        { json: "Spid", js: "Spid", typ: 0 },
    ], false),
    "Stage": o([
        { json: "Sid", js: "Sid", typ: "" },
        { json: "Snm", js: "Snm", typ: r("CompN") },
        { json: "Scd", js: "Scd", typ: r("Scd") },
        { json: "Cid", js: "Cid", typ: "" },
        { json: "Cnm", js: "Cnm", typ: r("Cnm") },
        { json: "Csnm", js: "Csnm", typ: r("Cnm") },
        { json: "Ccd", js: "Ccd", typ: r("Ccd") },
        { json: "Ccdiso", js: "Ccdiso", typ: r("Ccdiso") },
        { json: "CompId", js: "CompId", typ: "" },
        { json: "CompN", js: "CompN", typ: r("CompN") },
        { json: "CompST", js: "CompST", typ: r("Cnm") },
        { json: "CompD", js: "CompD", typ: r("Cnm") },
        { json: "Scu", js: "Scu", typ: 0 },
        { json: "Chi", js: "Chi", typ: 0 },
        { json: "Shi", js: "Shi", typ: 0 },
        { json: "Sdn", js: "Sdn", typ: r("CompN") },
        { json: "Events", js: "Events", typ: u(undefined, a(r("Event"))) },
        { json: "LeagueTable", js: "LeagueTable", typ: u(undefined, r("LeagueTable")) },
    ], false),
    "T1": o([
        { json: "Nm", js: "Nm", typ: "" },
        { json: "ID", js: "ID", typ: "" },
        { json: "tbd", js: "tbd", typ: 0 },
        { json: "Img", js: "Img", typ: "" },
        { json: "Gd", js: "Gd", typ: 0 },
        { json: "Pids", js: "Pids", typ: m(a("")) },
        { json: "CoNm", js: "CoNm", typ: r("Cnm") },
        { json: "CoId", js: "CoId", typ: r("Ccdiso") },
        { json: "HasVideo", js: "HasVideo", typ: true },
    ], false),
    "LeagueTable": o([
        { json: "L", js: "L", typ: a(r("L")) },
    ], false),
    "L": o([
        { json: "Tables", js: "Tables", typ: a(r("Table")) },
    ], false),
    "Table": o([
        { json: "LTT", js: "LTT", typ: 0 },
        { json: "team", js: "team", typ: a(r("Team")) },
        { json: "phrX", js: "phrX", typ: a(r("PhrX")) },
        { json: "phrC", js: "phrC", typ: u(undefined, m("")) },
    ], false),
    "PhrX": o([
        { json: "V", js: "V", typ: 0 },
        { json: "D", js: "D", typ: 0 },
    ], false),
    "Team": o([
        { json: "rnk", js: "rnk", typ: 0 },
        { json: "Tid", js: "Tid", typ: "" },
        { json: "win", js: "win", typ: 0 },
        { json: "winn", js: "winn", typ: "" },
        { json: "wreg", js: "wreg", typ: 0 },
        { json: "wot", js: "wot", typ: 0 },
        { json: "wap", js: "wap", typ: 0 },
        { json: "Tnm", js: "Tnm", typ: "" },
        { json: "lst", js: "lst", typ: 0 },
        { json: "lstn", js: "lstn", typ: "" },
        { json: "lreg", js: "lreg", typ: 0 },
        { json: "lot", js: "lot", typ: 0 },
        { json: "lap", js: "lap", typ: 0 },
        { json: "drw", js: "drw", typ: 0 },
        { json: "drwn", js: "drwn", typ: "" },
        { json: "gf", js: "gf", typ: 0 },
        { json: "ga", js: "ga", typ: 0 },
        { json: "gd", js: "gd", typ: 0 },
        { json: "pf", js: "pf", typ: 0 },
        { json: "pa", js: "pa", typ: 0 },
        { json: "ptsn", js: "ptsn", typ: "" },
        { json: "phr", js: "phr", typ: u(undefined, a(0)) },
        { json: "Ipr", js: "Ipr", typ: 0 },
        { json: "Img", js: "Img", typ: "" },
        { json: "pts", js: "pts", typ: 0 },
        { json: "pld", js: "pld", typ: 0 },
    ], false),
    "Eps": [
        "FT",
        "NS",
        "Postp.",
        "13'",
    ],
    "Ccdiso": [
        "ARG",
    ],
    "Cnm": [
        "Argentina",
    ],
    "Ccd": [
        "argentina",
    ],
    "CompN": [
        "Primera Division",
    ],
    "Scd": [
        "primera-division",
    ],
};
