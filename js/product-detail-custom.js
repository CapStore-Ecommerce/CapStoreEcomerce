const SUBAPASE_URL = "https://fyfnerpebeynjpbqwyci.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ5Zm5lcnBlYmV5bmpwYnF3eWNpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ3MTE3MzgsImV4cCI6MjA5MDI4NzczOH0.vSkfrV_3yx-LXJh77OSBu3jRXgnDRaePS93P77lm9E0";
const supabaseClient = supabase.createClient(SUBAPASE_URL, SUPABASE_KEY);

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    if (productId) await cargarDatosProducto(productId);
});
async function cargarDatosProducto(id) {
    const { data: p, error } = await supabaseClient
        .from('inventario')
        .select(`*, resenas (*)`)
        .eq('id', id)
        .single();

    if (error || !p) return;

    // 1. Textos y descripción larga
    document.getElementById('product-name').innerText = p.nombre;
    document.getElementById('product-description').innerHTML = `<br>${p.descripcion_corta}`;

    // Aquí es donde se carga la descripción larga
    const longDesc = document.getElementById('product-long-description');
    if (longDesc) {
        // Usamos innerHTML por si la descripción trae etiquetas <br> o negritas
        longDesc.innerHTML = p.descripcion_larga;
    }

    // 2. Especificaciones (Color y Peso)
    const specColor = document.getElementById('spec-color');
    const specWeight = document.getElementById('spec-weight');
    if (specColor) specColor.innerText = p.color_nombre || 'N/A';
    if (specWeight) specWeight.innerText = p.peso || '0.6kg';

    // 3. Precios
    const container = document.getElementById('price-container');
    if (container) {
        let html = `<span class="new_price">$${Number(p.precio).toLocaleString()}</span>`;
        if (p.porcentaje_descuento > 0) {
            html += `<span class="percentage">-${p.porcentaje_descuento}%</span>
                     <span class="old_price">$${Number(p.precio_antiguo).toLocaleString()}</span>`;
        }
        container.innerHTML = html;
    }

    // 4. Reseñas y Sliders
    renderizarResenas(p.resenas);
    configurarSliders(p);
}
function renderizarResenas(resenas) {
    const container = document.getElementById('reviews-container'); // Asegúrate de tener este ID en el HTML
    if (!container) return;

    if (!resenas || resenas.length === 0) {
        container.innerHTML = "<p>Aún no hay reseñas para este producto.</p>";
        return;
    }

    let html = '';
    resenas.forEach(r => {
        html += `
            <div class="review-item" style="margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px;">
                <div class="stars" style="color: #f39c12;">
                    ${'★'.repeat(Math.floor(r.estrellas))}${r.estrellas % 1 !== 0 ? '½' : ''} 
                    <span style="color: #ccc;">(${r.estrellas})</span>
                </div>
                <strong>${r.titulo}</strong>
                <p>${r.comentario}</p>
                <small class="text-muted">${new Date(r.fecha_creacion).toLocaleDateString()}</small>
            </div>
        `;
    });
    container.innerHTML = html;
}
function configurarSliders(p) {
    const mainSlider = $('#main-slider');
    const thumbSlider = $('#thumb-slider');

    if (mainSlider.data('owl.carousel')) mainSlider.owlCarousel('destroy');
    if (thumbSlider.data('owl.carousel')) thumbSlider.owlCarousel('destroy');

    let htmlMain = '';
    let htmlThumbs = '';

    // Generamos los items (usando el estilo de la plantilla original)
    for (let i = 1; i <= 7; i++) {
        const url = p[`imagen_url_${i}`];
        if (url && url.trim() !== "") {
            // El principal suele llevar img-fluid o item-box
            htmlMain += `<div class="item-box" style="background-image: url('${url}'); height: 450px; background-repeat: no-repeat; background-position: center;"></div>`;
            // El de abajo (miniaturas) DEBE ser un div con la clase item
            htmlThumbs += `<div class="item" style="background-image: url('${url}');"></div>`;
        }
    }

    mainSlider.html(htmlMain).owlCarousel({
        items: 1,
        margin: 0,
        nav: false,
        dots: false,
        loop: false,
        mouseDrag: false,
        touchDrag: false
    });

    thumbSlider.html(htmlThumbs).owlCarousel({
        items: 5, // <--- CAMBIO CLAVE: Forzamos 5 imágenes
        margin: 10, // Espacio entre miniaturas
        nav: false,
        dots: false,
        loop: false,
        responsive: {
            0: { items: 3 },   // En celulares se ven 3
            768: { items: 5 }  // En PC se ven las 5 que pides
        }
    });

    // Manejo de clic en miniaturas para cambiar la principal
    thumbSlider.on('click', '.owl-item', function () {
        const index = $(this).index();
        mainSlider.trigger('to.owl.carousel', [index, 300]);

        // Efecto visual de "Seleccionado"
        $('.slider-two .item').removeClass('active');
        $(this).find('.item').addClass('active');
    });
}