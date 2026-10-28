const STORAGE_KEY = "daybloom_data";

const defaultData = {

    tasks: [],

    habits: [
        {
            id: 1,
            name: "Drink enough water",
            icon: "💧",
            completed: false,
            streak: 0
        },
        {
            id: 2,
            name: "Read for 20 minutes",
            icon: "📚",
            completed: false,
            streak: 0
        },
        {
            id: 3,
            name: "Move your body",
            icon: "🏃",
            completed: false,
            streak: 0
        }
    ],

    mood: null,

    xp: 0,

    focusMinutes: 0,

    reflection: "",

    dailyScores: {},

    lastActiveDate: null
};


export function getData() {

    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) {

        localStorage.setItem(
            STORAGE_KEY,
            JSON.stringify(defaultData)
        );

        return structuredClone(defaultData);
    }

    return JSON.parse(saved);
}


export function saveData(data) {

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(data)
    );
}


export function resetData() {

    localStorage.removeItem(STORAGE_KEY);

    location.reload();
}
