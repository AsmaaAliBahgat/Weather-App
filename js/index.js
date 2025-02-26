let data = {};
let search = 'Egypt';
let submit = document.getElementById('submit');
let icon = `<i class="fa-solid fa-temperature-high"></i>`;

// Fetch the weather data (Accepts 'search' parameter)
async function getPost(location = search) {
    try {
        let response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=08b89ba224c6416db49210513252202&q=${location}&days=3&aqi=yes`);
        data = await response.json();

        if (data.error) {
            console.error('Error:', data.error.message);
            document.getElementById("weather").innerHTML = `<p style="color:red;">⚠ ${data.error.message}</p>`;
            return;
        }

        console.log(data);
        displayData();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById("weather").innerHTML = `<p style="color:red;">⚠ Failed to fetch data. Check your API key or connection.</p>`;
    }
}

// Initial API call
getPost();

// Search for weather data
submit.addEventListener('click', function () {
    search = document.getElementById('search').value;
    getPost(search);
});

// Display the weather data
function displayData() {
    let forecastHTML = "";
    const forecastDays = data.forecast.forecastday;

    for (let i = 0; i < forecastDays.length; i++) {
        let forecast = forecastDays[i];
        let formattedDate = new Date(forecast.date).toDateString();
        
        forecastHTML += `
            <div class="col-md-4 weather">
                <div class="card">
                    <div class="card-body">
                        ${icon}
                        <h5 class="card-date">${formattedDate}</h5>
                        <h5 class="card-title">${data.location.name}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${data.location.tz_id}</h6>
                        <p class="card-text">Temperature: ${forecast.day.avgtemp_c}°C</p>
                        <p class="card-text">Weather: ${forecast.day.condition.text}</p>
                    </div>
                </div>
            </div>
        `;
    }

    document.getElementById("weather").innerHTML = forecastHTML;
}

// Subscribe to newsletter
document.getElementById("Subscribe").addEventListener("click", function () {
    const email = document.getElementById("user-mail").value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(email)) {
        showCustomAlert("✅ Thank you for subscribing! You will receive an email shortly.", "green");
    } else {
        showCustomAlert("❌ Invalid email address!", "red");
    }
});

// Custom Alert Function
function showCustomAlert(message, color) {
    let alertBox = document.createElement("div");
    alertBox.style.position = "fixed";
    alertBox.style.top = "20px";
    alertBox.style.left = "50%";
    alertBox.style.transform = "translateX(-50%)";
    alertBox.style.background = color;
    alertBox.style.color = "white";
    alertBox.style.padding = "10px 20px";
    alertBox.style.borderRadius = "5px";
    alertBox.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
    alertBox.style.zIndex = "1000";
    alertBox.innerText = message;

    document.body.appendChild(alertBox);
    setTimeout(() => {
        alertBox.remove();
    }, 3000);
}
