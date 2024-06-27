document.addEventListener("DOMContentLoaded", function () {
  fetchCryptoData(); // Fetch cryptocurrency data on page load

  // Add event listener for search input
  const searchInput = document.getElementById("searchInput");
  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.trim().toLowerCase();
    filterCryptoList(searchTerm);
  });
});

function fetchCryptoData() {
  fetch("http://localhost/cashRich/server/fetch_crypto_data.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      displayCryptoList(data.data); // Display list of cryptocurrencies
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayCryptoList(cryptoData) {
  const cryptoListContainer = document.getElementById("cryptoList");
  cryptoListContainer.innerHTML = ""; // Clear previous list

  const row = document.createElement("div");
  row.classList.add("row");

  Object.values(cryptoData).forEach((crypto) => {
    const price = crypto.quote.USD.price.toFixed(3);
    const percentChange24h = crypto.quote.USD.percent_change_24h.toFixed(3);

    // Determine the icon and color for the 24h change
    const changeIcon =
      percentChange24h >= 0
        ? "fas fa-arrow-up text-success"
        : "fas fa-arrow-down text-danger";
    const changeColor = percentChange24h >= 0 ? "text-success" : "text-danger";

    const cryptoItem = document.createElement("div");
    cryptoItem.classList.add(
      "crypto-item",
      "col-12",
      "col-sm-6",
      "col-md-4",
      "mb-4"
    );

    cryptoItem.innerHTML = `
      <div class="card mx-3">
        <div class="card-body">
          <div class="row">
            <div class="col-9">
              <h5 class="card-title fw-bold">${crypto.name} (${crypto.symbol})</h5>
            </div>
            <div class="col-3">
              <p class="card-text ${changeColor}">
                <i class="${changeIcon}"></i> ${percentChange24h}%
              </p>
            </div>
          </div>
          <div class="row bg-gray-300 p-4">
            <div class="col-6">
              <p class="card-text">Price (USD): $${price}</p>
            </div>
            <div class="col-6">
              <p class="card-text">Rank: ${crypto.cmc_rank}</p>
            </div>
          </div>
        </div>
        
      </div>
    `;

    row.appendChild(cryptoItem);
  });

  cryptoListContainer.appendChild(row);
}

function filterCryptoList(searchTerm) {
  const cryptoItems = document.querySelectorAll(".crypto-item");
  cryptoItems.forEach((item) => {
    const nameElement = item
      .querySelector(".card-title")
      .textContent.toLowerCase();
    const symbol = nameElement
      .substring(nameElement.indexOf("(") + 1, nameElement.indexOf(")"))
      .toLowerCase();
    if (nameElement.includes(searchTerm) || symbol.includes(searchTerm)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  });
}

function logout() {
  // Perform logout actions, e.g., clear session storage, redirect to login page
  sessionStorage.clear();
  window.location.href = "login.html"; // Redirect to login page
}
