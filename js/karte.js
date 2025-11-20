    const faqs = [
        {
            question: "Wo kann ich mich nieder Saufen?",
            answer: "Natürlich im leiwandesten Cafe Pöchlarn's das INTAKT",
        },
        {
            question: "Wo kann ich gut essen gehen? ",
            answer: "Johnnys Burger - Teuer, aber lecker. Ünal's Pizza - geht ab und zu. Wok Ling - günstig, geht jeden Tag :) ",
        },
        {
            question: "Woher bekomm ich andere Lebensmitteln?",
            answer: "Gegenüber eines umbeliebten Gebäude, befindet sich ein Spar.",
        },
        {
            question: "Woher bekomm ich mehr Stoff?",
            answer: "Zwei Trafiks. Eine am Hauptplatz und eine nähe Wok Ling. 48°12'30.9 N 15°12'02.6 E 17-19 & 20-21 Uhr",
        },
    ];

    const container = document.getElementById("faqContainer");

    faqs.forEach((faq, index) => {
        const wrapper = document.createElement("div");
        wrapper.className = "border-b border-slate-200 py-4 cursor-pointer";

        const header = document.createElement("div");
        header.className = "flex items-center justify-between";
        header.innerHTML = `
            <h3 class="text-base font-medium">${faq.question}</h3>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none"
                xmlns="http://www.w3.org/2000/svg"
                class="transition-all duration-500 ease-in-out icon">
                <path d="m4.5 7.2 3.793 3.793a1 1 0 0 0 1.414 0L13.5 7.2"
                    stroke="#1D293D" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;

        const answer = document.createElement("p");
        answer.className = "text-sm text-slate-500 transition-all duration-500 ease-in-out max-w-md opacity-0 max-h-0 -translate-y-2 pt-0 answer";
        answer.textContent = faq.answer;

        wrapper.appendChild(header);
        wrapper.appendChild(answer);
        container.appendChild(wrapper);

        header.addEventListener("click", () => {
            const allAnswers = document.querySelectorAll(".answer");
            const allIcons = document.querySelectorAll(".icon");

            allAnswers.forEach((el, i) => {
                if (i === index) {
                    const isOpen = el.classList.contains("opacity-100");
                    el.classList.toggle("opacity-100", !isOpen);
                    el.classList.toggle("max-h-[300px]", !isOpen);
                    el.classList.toggle("translate-y-0", !isOpen);
                    el.classList.toggle("pt-4", !isOpen);
                    el.classList.toggle("opacity-0", isOpen);
                    el.classList.toggle("max-h-0", isOpen);
                    el.classList.toggle("-translate-y-2", isOpen);

                    allIcons[i].classList.toggle("rotate-180", !isOpen);
                } else {
                    el.classList.remove("opacity-100", "max-h-[300px]", "translate-y-0", "pt-4");
                    el.classList.add("opacity-0", "max-h-0", "-translate-y-2");
                    allIcons[i].classList.remove("rotate-180");
                }
            });
        });
    });