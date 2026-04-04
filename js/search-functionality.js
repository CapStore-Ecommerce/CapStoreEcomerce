/**
 * Funcionalidad de búsqueda unificada para CapStore
 */
function performSearch() {
	const searchDesktop = document.getElementById('search-desktop');
	const searchMobile = document.getElementById('search-mobile');
	const query = (searchDesktop?.value || searchMobile?.value || '').trim();

	if (query.length > 0) {
		window.location.href = `listing-grid-1-full.html?search=${encodeURIComponent(query)}`;
	}
}

// Escuchar clics en el botón de búsqueda
document.addEventListener('click', function (e) {
	if (e.target.closest('#search-btn-desktop') || e.target.closest('#search-btn-mobile')) {
		performSearch();
	}
});

// Escuchar la tecla Enter en el input
document.addEventListener('keypress', function (e) {
	if (e.key === 'Enter') {
		if (e.target.id === 'search-desktop' || e.target.id === 'search-mobile') {
			performSearch();
		}
	}
});