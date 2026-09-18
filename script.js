// ================================
// FOOD SEARCH
// ================================

const searchBox =
    document.getElementById("foodSearch");

searchBox.addEventListener(
    "input",
    function () {

        const searchValue =
            this.value.toLowerCase();

        const cards =
            document.querySelectorAll(
                ".food-card"
            );

        cards.forEach(card => {

            const foodName =
                card.querySelector("h3")
                    .textContent
                    .toLowerCase();

            if (
                foodName.includes(searchValue)
            ) {

                card.style.display = "block";

            } else {

                card.style.display = "none";

            }

        });

    }
);


// ================================
// FOOD REQUEST
// ================================

const requestButtons =
    document.querySelectorAll(
        ".request-button"
    );

requestButtons.forEach(button => {

    button.addEventListener(
        "click",
        function () {

            alert(
                "Food request submitted successfully! ❤️"
            );

        }
    );

});


// ================================
// FORM SUBMISSION
// ================================

const forms =
    document.querySelectorAll(".form");

forms.forEach(form => {

    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            alert(
                "Thank you! Your information has been submitted successfully."
            );

            form.reset();

        }
    );

});