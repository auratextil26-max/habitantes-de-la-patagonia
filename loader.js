document.addEventListener("DOMContentLoaded", () => {

    const loader = document.createElement("div");
    loader.className = "page-loader";

    loader.innerHTML = `
        <div class="loader-content">
            <img src="logo.png" class="loader-logo">
            <h1>Habitantes de la Patagonia</h1>
            <p>Una experiencia fotográfica y sonora</p>
        </div>
    `;

    document.body.appendChild(loader);

    setTimeout(() => {
        loader.classList.add("hide");

        setTimeout(() => {
            loader.remove();
        }, 900);

    }, 1800);

});
