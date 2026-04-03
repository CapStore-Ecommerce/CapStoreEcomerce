/**
 * Funcionalidad de búsqueda unificada para CapStore
 * Redirige a listing-grid-1-full.html con parámetro de búsqueda
 */

function initializeSearch() {
	function performSearch() {
		const searchDesktop = document.getElementById('search-desktop');
		const searchMobile = document.getElementById('search-mobile');
		const query = (searchDesktop?.value || searchMobile?.value || '').trim();
		
		if (query.length > 0) {
			window.location.href = `listing-grid-1-full.html?search=${encodeURIComponent(query)}`;
		}
	}

	// Event listeners para búsqueda desktop
	const searchBtnDesktop = document.getElementById('search-btn-desktop');
	const searchInputDesktop = document.getElementById('search-desktop');
	
	if (searchBtnDesktop) {
		searchBtnDesktop.addEventListener('click', performSearch);
	}
	if (searchInputDesktop) {
		searchInputDesktop.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') performSearch();
		});
	}

	// Event listeners para búsqueda móvil
	const searchBtnMobile = document.getElementById('search-btn-mobile');
	const searchInputMobile = document.getElementById('search-mobile');
	
	if (searchBtnMobile) {
		searchBtnMobile.addEventListener('click', performSearch);
	}
	if (searchInputMobile) {
		searchInputMobile.addEventListener('keypress', (e) => {
			if (e.key === 'Enter') performSearch();
		});
	}
}

// Ejecutar cuando el DOM esté cargado
if (document.readyState === 'loading') {
	document.addEventListener('DOMContentLoaded', initializeSearch);
} else {
	initializeSearch();
}
