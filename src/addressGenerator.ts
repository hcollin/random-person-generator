import { randomKunta } from "./kunnat";
import { getPostalAreas, findPostalCodesForCity, getRandomPostalCode } from "./data/postalAreas";
import { rnd, arnd, roll } from "./utils/randUtils";

export interface Address {
    street: string;
    street2?: string;
    zip: string;
    city: string;
    county?: string;
    country: string;
    oneLine: string;
}

export function getRandomAddress(): Address {
    const po = getRandomPostalCode();

    const city = po.parsedName;
    const zip = po.zipcode;

    // const city = randomKunta();
    // const postalCodes = findPostalCodesForCity(city);

    // if(postalCodes.length === 0) {
    //     console.warn("No zip found for ", city);
    //     return getRandomAddress();
    // }

    // const zip: string = postalCodes[rnd(0, postalCodes.length - 1)].zipcode;

    const addr: Address = {
        street: randomStreetName(),
        zip: zip,
        city: city,
        country: "FINLAND",
        oneLine: "",
    };

    addr.oneLine = `${addr.street}, ${addr.zip} ${addr.city}, ${addr.country}`;
    return addr;
}

function randomStreetName(): string {
    const streetNamePartials: string[] = [
        // Paikkakuntia
        "Uudenmaan",
        "Hämeen",
        "Lapin",
        "Pirkkalan",
        "Nokian",
        "Turun",
        "Helsingin",
        "Tampereen",

        // Nimiä
        "Roobertin",
        "Matin",
        "Pekan",
        "Kallen",
        "Timon",
        "Annan",
        "Simon",
        "Sibeliuksen",
        "Mannerheimin",
        "Liisan",
        "Lauran",
        "Petterin",
        "Tapanin",
        "Kyllikin",
        "Martin",
        "Saulin",
        "Sannan",
        "Aleksanterin",
        "Kustaan",
        "Jussin",
        "Mirjan",
        "Martan",
        "Kustin",
        "Jorman",
        "Yrjön",
        "Uunon",

        // Ammatteja
        "Poliisi",
        "Tuomarin",
        "Lääkärin",
        "Insinöörin",
        "Opettajan",
        "Professorin",
        "Teekkarin",
        "Opiskelijan",
        "Hoitajan",
        "Kauppias",
        "Vartio",
        "Kapteenin",
        "Politiikon",
        "Juoksijan",
        "Uimarin",
        "Automiehen",
        "Filosofin",
        "Kuninkaan",
        "Kuningattaren",
        "Prinssin",
        "Prinsessan",
        "Rengin",
        "Mestarin",
        "Kisälli",
        "Oppipojan",
        "Vainajan",
        "Sotilaan",
        "Invalidin",
        "Lesken",
        "Leskentekijän",
        "Urheilijan",
        "Kisa",
        "Hyppääjän",
        "Tanssi",
        "Arkkitehdin",

        // Kaloja
        "Siika",
        "Kuha",
        "Lohi",
        "Valas",
        "Ahven",
        "Ankerias",

        // Eläimiä
        "Peura",
        "Karhu",
        "Ilves",
        "Hirvi",
        "Lammas",
        "Kissan",
        "Koiran",
        "Siili",
        "Kirppu",
        "Kärpän",
        "Suden",
        "Otson",

        // Rakennuksia
        "Telakka",
        "Tori",
        "Torni",
        "Portti",
        "Tehtaan",
        "Maneesi",
        "Areena",
        "Kauppa",
        "Tila",
        "Koulu",
        "Yliopiston",
        "Sairalaan",
        "Hautausmaan",
        "Kuivurin",
        "Varasto",
        "Kehräämön",
        "Siilo",
        "Halli",
        "Virasto",
        "Koti",
        "Mökki",
        "Kirkko",
        "Puisto",

        // Tiede ja avaruus
        "Tähti",
        "Aurinko",
        "Fysiikan",
        "Kemian",
        "Matematiikan",
        "Historian",
        "Kuu",
        "Elementin",
        "Sukkula",

        // Maat
        "Englannin",
        "Ruotsin",
        "Suomen",
        "Venäjän",
        "Viron",
        "Espanjan",
        "Saksan",
        "Ranskan",

        // Maantieto
        "Saari",
        "Niemen",
        "Ranta",
        "Lahden",
        "Poukaman",
        "Piilo",
        "Vuori",
        "Kaivos",
        "Kuoppa",
        "Monttu",
        "Mäki",
        "Rinne",
        "Rata",
        "Niitty",
        "Kumpu",
        "Pelto",
        "Metsä",
        "Korpi",

        // Huonekalut ja esineet

        "Taulu",
        "Tuoli",
        "Pöytä",
        "Hylly",
        "Pullo",

        // Materiaalit
        "Lasi",
        "Laasti",
        "Harkko",
        "Kivi",
        "Tiili",
        "Puu",
        "Sora",
        "Hiekka",
        "Marmori",
        "Kulta",
        "Hopea",
        "Pronssi",
        "Metalli",

        // Elementit
        "Maa",
        "Vesi",
        "Tuli",
        "Ilma",

        // Uskonto
        "Taivaan",
        "Helvetin",
        "Pakanan",
        "Hurskaan",
        "Alttari",
        "Papin",
        "Piispan",
        "Risti",
        "Arkku",
        "Rukous",
        "Ane",

        // Puut
        "Sammal",
        "Kuusi",
        "Mänty",
        "Kataja",
        "Koivu",
        "Sieni",
        "Honka",
        "Hongan",
        "Ranka",
        "Kanto",
        "Hakkuu",

        // Kukat
        "Kukka",
        "Ruusu",
        "Orvokki",
        "Kielo",
        "Leinikki",
        "Vuokko",

        // Marjat ja vihannekset
        "Mustikka",
        "Mansikka",
        "Peruna",
        "Herne",
        "Palko",
        "Verso",
        "Marja",

        // Linnut
        "Joutsen",
        "Kotkan",
        "Variksen",
        "Haukan",
        "Korpin",
        "Tiaisen",
        "Tintti",
        "Sorsa",
        "Ankka",
        "Kuikka",
        "Telkän",
        "Pöllö",
        "Huuhkajan",

        // Kangas
        "Kangas",
        "Villa",
        "Lanka",
        "Ompeleen",
        "Ompelijan",
        "Kutojan",
        "Rukki",
        "Kehruu",
        "Värttinä",
        "Neula",
        "Räätälin",

        // Sota
        "Ampujan",
        "Ammus",
        "Tykki",
        "Varuskunnan",
        "Marssi",
        "Komento",
        "Kenraalin",
        "Upseerin",
        "Juoksuhaudan",
        "Hauta",
        "Rynnäkkö",
        "Kuula",

        // Autot
        "Moottori",
        "Kampi",
        "Sylinteri",
        "Rengas",
        "Vaihde",

        // Tietokone
        "Prosessori",
        "Kone",
        "Algoritmi",
        "Pilvi",
        "Tieto",
        "Tiedon",

        // Keski-aika
        "Puukko",
        "Terä",
        "Miekka",
        "Tikari",
        "Kirves",
        "Keihäs",
        "Seiväs",
        "Kilpi",
        "Kypärä",
        "Säärystin",
        "Ritari",
        "Aseenkantajan",
        "Orjan",
        "Nimismiehen",
        "Voudin",
        "Velhon",
        "Ennustajan",
        "Taikurin",
        "Tietäjän",
        "Shamaanin",
        "Poppamiehen",
        "Loitsu",
        "Loitsijan",
        "Varkaan",
        "Haltian",
        "Kääpiön",
        "Aave",
        "Mörkö",
        "Peikko",
        "Sammon",
        "Menninkäisen",
        "Turson",
        "Artefakti",
        "Aarre",
        "Kalma",
        "Muumion",
        "Soturin",
        "Taistelijan",

        // Astiat
        "Laatikko",
        "Astia",
        "Kulho",
        "Muki",

        // Sarjakuvat
        "Muumin",
        "Ankan",
        "Hiiren",
        "Piirros",

        // Ruumiinosat
        "Kallo",
        "Käsi",
        "Jalka",

        // Geometria
        "Pallo",
        "Kolmio",
        "Neliö",

        "Keidas",
        "Lähde",
        "Koski",
        "Pato",
        "Juoksu",

        // Työkalut
        "Teollisuus",
        "Vasara",
        "Naula",
        "Ruuvi",
        "Saha",
        "Paja",
        "Ahjo",
        "Verstas",
        "Meisseli",
        "Taltta",
        "Lauta",
        "Liima",
        "Kolvi",
        "Liitos",
        "Laite",

        // Leivonta
        "Leipurin",
        "Pulla",
        "Leipä",
        "Keittäjän",
        "Munkki",
        "Rinkeli",
        "Hiiva",
        "Jauho",
        "Sokeri",

        // Musiikki
        "Sävel",
        "Musiikki",
        "Sointu",
        "Piano",
        "Mandoliini",
        "Kitara",
        "Muusikon",
        "Soittajan",

        // Maalaus
        "Pensseli",
        "Maali",
        "Sivellin",
        "Tussi",
        "Maalarin",
        "Taiteilijan",
        "Artistin",

        "Ahkion",
        "Auto",
        "Rautatie",
        "Satama",
        "Asema",
        "Laituri",

        "Kansan",
        "Rahvaan",
        "Aatelis",
        "Köyhän",
        "Rikkaan",
        "Ystävän",
        "Vieraan",
        "Veljen",
        "Siskon",
        "Kummin",
        "Enon",
        "Mummon",
        "Vaarin",
        "Mamman",
        "Pappan",
        "Kaiman",
        "Sedän",
        "Tädin",
        "Muukalaisen",
        "Tuttavan",
    ];

    const streetNameAdjective = [
        "Itäinen ",
        "Läntinen ",
        "Pohjoinen ",
        "Eteläinen ",
        "Koillinen ",
        "Luoteinen ",

        "Vanha ",
        "Uusi ",

        "Pitkä ",
        "Lyhyt ",
        "Iso ",
        "Pieni ",

        "Toinen ",
        "Kolmas ",

        "Vähä-",
        "Iki-",
        "Suur-",

        "Ylä-",
        "Ala-",

        "Suora ",
        "Käyrä ",
        "Kiero ",
        "Kapea ",
        "Leveä ",
    ];

    const streetNameLastPart = [
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "katu",
        "tie",
        "tie",
        "tie",
        "tie",
        "tie",
        "tie",
        "tie",
        "tie",
        "tie",
        "tie",
        "tie",
        "tie",
        "polku",
        "polku",
        "polku",
        "polku",
        "polku",
        "kuja",
        "kuja",
        "kuja",
        "linja",
        "bulevardi",
        "raitti",
        "raitti",
        "puisto",
        "puisto",
        "piha",
        "piha",
        "korpi",
        "rata",
        "rata",
        "kaari",
        "taival",
        "väylä",
        " valtatie",
        " kehätie",
    ];

    const apartment = ` ${arnd([
        "as",
        "as",
        "as",
        "as",
        "A",
        "A",
        "A",
        "A",
        "B",
        "B",
        "B",
        "B",
        "C",
        "C",
        "C",
        "D",
        "E",
        "F",
    ])} ${rnd(1, 30)}`;

    return `${roll(15) ? arnd(streetNameAdjective) : ""}${arnd(streetNamePartials)}${arnd(streetNameLastPart)} ${rnd(
        1,
        100
    )}${roll(30) ? apartment : ""}`;
}
