document.addEventListener("DOMContentLoaded", function () {
  const cvPhoto = document.querySelector(".cv-photo");
  const textElements = document.querySelectorAll(
    ".description, .job-title, .job-name, .list-secondary-item"
  );

  cvPhoto.addEventListener("click", function () {
    const currentLanguage = document.documentElement.lang;
    const newLanguage = currentLanguage === "en" ? "pl" : "en";

    fetch(`cv_universal_${newLanguage}/pl_content.html`) // zmiana nazwy pliku językowego
      .then((response) => response.text())
      .then((html) => {
        const parser = new DOMParser();
        const newDocument = parser.parseFromString(html, "text/html");

        textElements.forEach((element) => {
          const newElement = newDocument.querySelector(element.className);
          if (newElement) {
            element.innerHTML = newElement.innerHTML;
          }
        });

        document.documentElement.lang = newLanguage;
      })
      .catch((error) => console.error("Error fetching language file:", error));
  });
});
