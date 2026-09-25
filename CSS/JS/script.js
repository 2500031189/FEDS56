// ===============================
// SIGNUP
// ===============================

const signupForm = document.getElementById("signupForm");

if (signupForm) {
    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("signupName").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        const users = JSON.parse(localStorage.getItem("users")) || [];

        const existingUser = users.find(user => user.email === email);

        if (existingUser) {
            document.getElementById("signupMessage").textContent =
                "Account already exists!";
            return;
        }

        const newUser = {
            name: name,
            email: email,
            password: password,
            role: "user"
        };

        users.push(newUser);

        localStorage.setItem("users", JSON.stringify(users));

        document.getElementById("signupMessage").textContent =
            "Registration successful!";

        signupForm.reset();
    });
}


// ===============================
// LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        // Admin login
        if (email === "admin@oes.com" && password === "admin123") {
            localStorage.setItem("loggedInUser", "admin");
            window.location.href = "admin.html";
            return;
        }

        // User login
        const users = JSON.parse(localStorage.getItem("users")) || [];

        const user = users.find(
            user => user.email === email && user.password === password
        );

        if (user) {
            localStorage.setItem("loggedInUser", JSON.stringify(user));
            window.location.href = "user.html";
        } else {
            document.getElementById("loginMessage").textContent =
                "Invalid email or password.";
        }
    });
}


// ===============================
// DISPLAY USER NAME
// ===============================

const userNameElement = document.getElementById("userName");

if (userNameElement) {
    const loggedInUser = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    if (loggedInUser && loggedInUser.name) {
        userNameElement.textContent = loggedInUser.name;
    }
}


// ===============================
// EXAM TIMER
// ===============================

const timerElement = document.getElementById("timer");

if (timerElement) {

    let timeLeft = 5 * 60;

    const examTimer = setInterval(function() {

        let minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;

        seconds = seconds < 10 ? "0" + seconds : seconds;

        timerElement.textContent = minutes + ":" + seconds;

        if (timeLeft <= 0) {

            clearInterval(examTimer);

            alert("Time is over! Please submit your examination.");

        }

        timeLeft--;

    }, 1000);
}


// ===============================
// EXAM SUBMISSION
// ===============================

const examForm = document.getElementById("examForm");

if (examForm) {

    examForm.addEventListener("submit", function(event) {

        event.preventDefault();

        let score = 0;

        const correctAnswers = {
            q1: "b",
            q2: "c",
            q3: "c",
            q4: "c",
            q5: "c"
        };

        for (let question in correctAnswers) {

            const selectedAnswer = document.querySelector(
                'input[name="' + question + '"]:checked'
            );

            if (
                selectedAnswer &&
                selectedAnswer.value === correctAnswers[question]
            ) {
                score++;
            }
        }

        // Save result
        localStorage.setItem("examScore", score);

        // Go to result page
        window.location.href = "result.html";
    });
}


// ===============================
// DISPLAY RESULT
// ===============================

const scoreText = document.getElementById("scoreText");

if (scoreText) {

    const score = localStorage.getItem("examScore");

    if (score !== null) {
        scoreText.textContent = score + " / 5";
    } else {
        scoreText.textContent = "0 / 5";
    }
}


// ===============================
// LOGOUT
// ===============================

function logout() {

    localStorage.removeItem("loggedInUser");

    window.location.href = "login.html";
}