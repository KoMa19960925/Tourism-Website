const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#site-nav");
const mobileLayout = window.matchMedia("(max-width: 52rem)");

function updateMenu() {
    menuToggle.hidden = !mobileLayout.matches;
    menuToggle.setAttribute("aria-expanded", "false");
    navigation.toggleAttribute("data-collapsed", mobileLayout.matches);
}

updateMenu();
mobileLayout.addEventListener("change", updateMenu);

menuToggle.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    navigation.toggleAttribute("data-collapsed", expanded);
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        updateMenu();
        menuToggle.focus();
    }
});

const search = document.querySelector("#destination-search");

if (search) {
    const cards = [...document.querySelectorAll(".destination-card")];
    const status = document.querySelector(".search-status");

    search.parentElement.hidden = false;

    function filterDestinations() {
        const query = search.value.trim().toLowerCase();
        let matches = 0;

        for (const card of cards) {
            const heading = card.querySelector("h2").textContent.toLowerCase();
            card.hidden = !heading.includes(query);
            if (!card.hidden) matches += 1;
        }

        status.hidden = !query;
        status.textContent = matches === 0
            ? "No destinations found. Try a different name."
            : matches + (matches === 1 ? " destination found." : " destinations found.");
    }

    search.addEventListener("input", filterDestinations);
    filterDestinations();
}

const taskForm = document.querySelector("#new-task-form");

if (taskForm) {
    const taskInput = document.querySelector("#new-task-input");
    const tasks = document.querySelector("#tasks");
    const emptyTasks = document.querySelector("#empty-tasks");

    taskForm.addEventListener("submit", (event) => {
        event.preventDefault();
        const text = taskInput.value.trim();
        if (!text) return;

        const item = document.createElement("li");
        const label = document.createElement("span");
        const remove = document.createElement("button");

        label.textContent = text;
        remove.type = "button";
        remove.textContent = "Delete";
        remove.setAttribute("aria-label", "Delete " + text);
        remove.addEventListener("click", () => {
            const nextButton = item.nextElementSibling?.querySelector("button");
            const previousButton = item.previousElementSibling?.querySelector("button");
            item.remove();
            emptyTasks.hidden = tasks.childElementCount > 0;
            (nextButton || previousButton || taskInput).focus();
        });

        item.append(label, remove);
        tasks.append(item);
        emptyTasks.hidden = true;
        taskForm.reset();
        taskInput.focus();
    });
}
