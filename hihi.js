// Get elements from HTML

const habitInput = document.getElementById("habit-input");
const habitType = document.getElementById("habit-type");
const addHabitBtn = document.getElementById("add-habit-btn");

const habitList = document.getElementById("habit-list");

const progressText = document.getElementById("progress-text");
const progressFill = document.getElementById("progress-fill");

const plantsContainer =
    document.getElementById("plants-container");

const totalCompletedElement =
    document.getElementById("total-completed");

const plantCountElement =
    document.getElementById("plant-count");

const streakCountElement =
    document.getElementById("streak-count");

const gardenLevel =
    document.getElementById("garden-level");

const gardenMessage =
    document.getElementById("garden-message");


// Load habits from browser storage

let habits =
    JSON.parse(localStorage.getItem("everbloomHabits")) || [];


// Add habit

addHabitBtn.addEventListener("click", addHabit);


// Allow Enter key

habitInput.addEventListener("keypress", function(event) {

    if (event.key === "Enter") {

        addHabit();

    }

});


// FUNCTION: ADD HABIT

function addHabit() {

    const habitName = habitInput.value.trim();

    if (habitName === "") {

        alert("Please enter a habit!");

        return;

    }


    const newHabit = {

        id: Date.now(),

        name: habitName,

        icon: habitType.value,

        completed: false

    };


    habits.push(newHabit);


    saveHabits();


    habitInput.value = "";


    renderHabits();

}


// FUNCTION: COMPLETE HABIT

function toggleHabit(id) {

    habits = habits.map(function(habit) {

        if (habit.id === id) {

            return {

                ...habit,

                completed: !habit.completed

            };

        }

        return habit;

    });


    saveHabits();


    renderHabits();

}


// FUNCTION: DELETE HABIT

function deleteHabit(id) {

    habits = habits.filter(function(habit) {

        return habit.id !== id;

    });


    saveHabits();


    renderHabits();

}


// SAVE TO LOCAL STORAGE

function saveHabits() {

    localStorage.setItem(

        "everbloomHabits",

        JSON.stringify(habits)

    );

}


// DISPLAY HABITS

function renderHabits() {

    habitList.innerHTML = "";


    if (habits.length === 0) {

        habitList.innerHTML = `

            <p class="empty-message">

                Your garden is waiting for its first habit 🌱

            </p>

        `;

    }


    habits.forEach(function(habit) {

        const habitItem =
            document.createElement("div");


        habitItem.classList.add("habit-item");


        const completedClass =
            habit.completed ? "completed" : "";


        const activeClass =
            habit.completed ? "active" : "";


        habitItem.innerHTML = `

            <div class="habit-left">

                <span>${habit.icon}</span>

                <span class="habit-name ${completedClass}">

                    ${habit.name}

                </span>

            </div>


            <div>

                <button
                    class="complete-btn ${activeClass}"
                    onclick="toggleHabit(${habit.id})"
                >

                    ${habit.completed ? "Completed ✓" : "Complete"}

                </button>


                <button
                    class="delete-btn"
                    onclick="deleteHabit(${habit.id})"
                >

                    Delete

                </button>

            </div>

        `;


        habitList.appendChild(habitItem);

    });


    updateProgress();

}


// UPDATE PROGRESS

function updateProgress() {

    const total = habits.length;


    const completedHabits =
        habits.filter(function(habit) {

            return habit.completed;

        });


    const completed =
        completedHabits.length;


    progressText.textContent =
        `${completed} / ${total} completed`;


    let percentage = 0;


    if (total > 0) {

        percentage =
            (completed / total) * 100;

    }


    progressFill.style.width =
        percentage + "%";


    updateGarden(completed);

}


// UPDATE GARDEN

function updateGarden(completed) {

    plantsContainer.innerHTML = "";


    const plants = [

        "🌱",

        "🌿",

        "🌷",

        "🌻",

        "🌸",

        "🌳",

        "🍀",

        "🌺"

    ];


    for (let i = 0; i < completed; i++) {

        const plant =
            document.createElement("div");


        plant.classList.add("plant");


        plant.textContent =
            plants[i % plants.length];


        // Random horizontal position

        const left =
            Math.random() * 85;


        // Different vertical positions

        const bottom =
            20 + Math.random() * 80;


        plant.style.left =
            left + "%";


        plant.style.bottom =
            bottom + "px";


        // Different sizes

        const size =
            35 + Math.random() * 35;


        plant.style.fontSize =
            size + "px";


        plantsContainer.appendChild(plant);

    }


    updateGardenStats(completed);

}


// GARDEN STATS

function updateGardenStats(completed) {

    totalCompletedElement.textContent =
        completed;


    plantCountElement.textContent =
        completed;


    // Simple streak calculation

    let streak = 0;


    if (completed > 0) {

        streak = completed;

    }


    streakCountElement.textContent =
        streak + " 🔥";


    // Garden level

    const level =
        Math.floor(completed / 5) + 1;


    gardenLevel.textContent =
        "Garden Level: " + level;


    // Garden messages

    if (completed === 0) {

        gardenMessage.textContent =
            "Complete habits to grow your garden!";

    }

    else if (completed < 3) {

        gardenMessage.textContent =
            "A new life is beginning in your garden 🌱";

    }

    else if (completed < 5) {

        gardenMessage.textContent =
            "Your garden is starting to bloom 🌸";

    }

    else if (completed < 10) {

        gardenMessage.textContent =
            "Your garden is flourishing beautifully! 🌿";

    }

    else {

        gardenMessage.textContent =
            "You have created an amazing ecosystem! 🌳";

    }

}


// INITIAL LOAD

renderHabits();