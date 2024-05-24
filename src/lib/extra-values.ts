import {
    IDrumsParamsValues,
    IGuitarParamsValues,
    IPianoParamsValues,
} from "@/interfaces/extra_params.interface";

export const EXTRA_ACOUSTIC_GUITAR_PARAMS: IGuitarParamsValues = {
    material_fingerboard: {
        name: "Материал грифа",
        array: ["клён", "композит", "ованкол", "орех", "палисандр", "другой"],
    },
    material_body: {
        name: "Материал корпуса",
        array: [
            "агатис",
            "зебрано",
            "кайя",
            "клён",
            "коа",
            "красное дерево",
            "ламина",
            "липа",
            "окум",
            "орех",
            "палисандр",
            "пластик",
            "сапеле",
            "ясень",
            "другой",
        ],
    },
    form_body: {
        name: "Форм-фактор",
        array: [
            "аудиториум",
            "гранд аудиториум",
            "гранд концерт",
            "джамбо",
            "дредноут",
            "концерт",
            "мини дредноут",
            "оркестр",
            "фолк",
            "другой",
        ],
    },
    count_string: {
        name: "Количество струн",
        array: ["12", "6", "другой"],
    },
};

export const EXTRA_ELECTRIC_GUITAR_PARAMS: IGuitarParamsValues = {
    material_fingerboard: {
        name: "Материал грифа",
        array: ["клён", "композит", "ованкол", "орех", "палисандр", "другой"],
    },
    material_body: {
        name: "Материал корпуса",
        array: [
            "агатис",
            "зебрано",
            "кайя",
            "клён",
            "коа",
            "красное дерево",
            "ламина",
            "липа",
            "окум",
            "орех",
            "палисандр",
            "пластик",
            "сапеле",
            "ясень",
            "другой",
        ],
    },
    form_body: {
        name: "Форм-фактор",
        array: [
            "Azes",
            "Azs",
            "Es",
            "Iceman",
            "Jet",
            "Les paul",
            "Mustang",
            "Prestige",
            "Stratocaster",
            "Superstrat",
            "Telecaster",
            "другой",
        ],
    },
    pickup_config: {
        name: "Конфигурация звукоснимателей",
        array: [
            "H-h",
            "H-s",
            "H-s-s",
            "Hh",
            "Hsh",
            "S-s",
            "S-s-h",
            "S-s-s",
            "нss",
            "другой",
        ],
    },
    color: {
        name: "Цвет",
        array: [
            "черный",
            "белый",
            "фиолетовый",
            "золотистый",
            "зеленый",
            "голубой",
            "другой",
        ],
    },
    count_string: {
        name: "Количество струн",
        array: ["6", "7", "8", "другой"],
    },
};

export const EXTRA_BASS_GUITAR_PARAMS: IGuitarParamsValues = {
    material_fingerboard: {
        name: "Материал грифа",
        array: ["клён", "композит", "ованкол", "орех", "палисандр", "другой"],
    },
    material_body: {
        name: "Материал корпуса",
        array: [
            "агатис",
            "зебрано",
            "кайя",
            "клён",
            "коа",
            "красное дерево",
            "ламина",
            "липа",
            "окум",
            "орех",
            "палисандр",
            "пластик",
            "сапеле",
            "ясень",
            "другой",
        ],
    },
    count_string: {
        name: "Количество струн",
        array: ["4", "5", "6", "другой"],
    },
    pickup_config: {
        name: "Конфигурация звукоснимателей",
        array: [
            "H",
            "Hh",
            "Jass bass pickup",
            "Jj",
            "Jp",
            "P",
            "Pj",
            "S-s",
            "Sh",
            "пьезо",
            "другой",
        ],
    },
    color: {
        name: "Цвет",
        array: [
            "черный",
            "белый",
            "фиолетовый",
            "золотистый",
            "зеленый",
            "голубой",
            "другой",
        ],
    },
    form_body: {
        name: "Форм-фактор",
        array: ["Ehb", "Gsr", "Sr", "другой"],
    },
};

export const EXTRA_ACOUSTIC_PIANO_PARAMS: IPianoParamsValues = {
    material: {
        name: "Материал корпуса",
        array: ["ель"],
    },
    color: {
        name: "Цвет",
        array: ["белый", "красное дерево", "черный"],
    },
};

export const EXTRA_SYNTHESIZER_PIANO_PARAMS: IPianoParamsValues = {
    material: {
        name: "Материал корпуса",
        array: ["пластик", "металлический", "другое"],
    },
    color: {
        name: "Цвет",
        array: ["белый", "красный", "черный", "другое"],
    },
    metronome: {
        name: "Метроном",
        array: ["да", "нет"],
    },
    type: {
        name: "Тип",
        array: [
            "аналоговый",
            "аналоговый программируемый fm синтезатор",
            "рабочая станция",
            "синтезатор",
            "цифровой",
        ],
    },
    record: {
        name: "Запись композиции",
        array: ["да", "нет"],
    },
};

export const EXTRA_DRUMS_CYMBALS_PARAMS: IDrumsParamsValues = {
    material: {
        name: "Сплав",
        array: ["бронза", "бронза (b12)", "бронза (b20)", "латунь"],
    },
    diameter: {
        name: "Диаметр",
        array: ["10", "15", "20", "25", "30", "35", "40"],
    },
    type: {
        name: "Тип",
        array: [
            "Наборы тарелок",
            "Сrash тарелки",
            "Ride тарелки",
            "Hi-Hat тарелки",
            "Splash тарелки",
        ],
    },
};

export const EXTRA_DRUMS_PARAMS: IDrumsParamsValues = {
    material: {
        name: "Материал",
        array: [
            "бубинга",
            "ель",
            "клен",
            "орех",
            "орех, береза",
            "сталь",
            "тополь",
        ],
    },
    type: {
        name: "Тип",
        array: [
            "Акустические ударные установки, комплекты",
            "Mалые барабаны",
            "Том-томы",
            "Напольные томы",
            "Бас-барабаны",
        ],
    },
    color: {
        name: "Цвет",
        array: [
            "белый",
            "коричневый",
            "красный",
            "натуральный",
            "серебристый",
            "синий",
            "черный",
        ],
    },
};

export const subcategories = [
    { name: "Электрогитары", extra_params: EXTRA_ELECTRIC_GUITAR_PARAMS },
    { name: "Акустические", extra_params: EXTRA_ACOUSTIC_GUITAR_PARAMS },
    { name: "Фортепиано", extra_params: EXTRA_ACOUSTIC_PIANO_PARAMS },
    { name: "Синтезаторы", extra_params: EXTRA_SYNTHESIZER_PIANO_PARAMS },
    { name: "Барабаны", extra_params: EXTRA_DRUMS_PARAMS },
    { name: "Тарелки", extra_params: EXTRA_DRUMS_CYMBALS_PARAMS },
];