const menu = document.getElementById('menu');
const body = document.body; // Referenz auf den Body für das Scroll-Management

function closeNavbar() {
    // Schließt das Menü (verschiebt es nach rechts aus dem Viewport)
    menu.classList.remove('max-md:left-0');
    // Wichtig: Verwende left-[100%] anstelle von -left-full für bessere Kompatibilität/Animation
    menu.classList.add('max-md:left-[100%]'); 
    
    // Scrollen wieder aktivieren
    body.style.overflow = 'auto';
}

function openNavbar() {
    // Öffnet das Menü (verschiebt es nach links in den Viewport)
    menu.classList.remove('max-md:left-[100%]');
    menu.classList.add('max-md:left-0');
    
    // Scrollen deaktivieren
    body.style.overflow = 'hidden';
}

// Event Listener für Menü-Links (Schließen bei Klick und Hervorhebung)
document.querySelectorAll('#menu a').forEach(link => {
    link.addEventListener('click', function () {
        
        // 1. Navbar schließen, wenn ein Link geklickt wird
        // Achtung: closeNavbar() muss hier aufgerufen werden, um das Scrollen zu reaktivieren.
        closeNavbar(); 
        
        // 2. Hervorhebung/Styling der Links
        document.querySelectorAll('#menu a').forEach(el => 
            el.classList.remove('border', 'border-white/10', 'bg-white/10', 'font-medium', 'rounded-full')
        );
        // Die 'Karte' hat spezielle Klassen, die nicht überschrieben werden sollten, außer man klickt sie selbst
        if (!this.classList.contains('bg-green-600')) {
             this.classList.add('border', 'border-white/10', 'bg-white/10', 'font-medium', 'rounded-full');
        }
    });
});