// ===========================
// RESULTADOS PAGE SCRIPTS
// =========================== 

// Datos de errores
const errorData = [
    { id: 1, error: 'Imágenes No Optimizadas', category: 'Rendimiento', severity: 'critical', impact: 'Alto', solution: 'Comprimir y usar Lazy Loading' },
    { id: 2, error: 'Falta de Caché del Navegador', category: 'Rendimiento', severity: 'high', impact: 'Alto', solution: 'Configurar encabezados de caché' },
    { id: 3, error: 'Múltiples Archivos CSS/JS', category: 'Rendimiento', severity: 'high', impact: 'Medio', solution: 'Minificar y concatenar archivos' },
    { id: 4, error: 'Diseño No Responsivo', category: 'UX', severity: 'critical', impact: 'Alto', solution: 'Implementar Mobile-First' },
    { id: 5, error: 'Exceso de Fuentes Web', category: 'Rendimiento', severity: 'medium', impact: 'Medio', solution: 'Limitar a 2 fuentes máximo' },
    { id: 6, error: 'Títulos y Meta Duplicados', category: 'SEO', severity: 'critical', impact: 'Alto', solution: 'Crear títulos únicos por página' },
    { id: 7, error: 'Contenido de Baja Calidad', category: 'SEO', severity: 'critical', impact: 'Alto', solution: 'Crear contenido de 1000+ palabras' },
    { id: 8, error: 'Enlaces Rotos (404)', category: 'SEO', severity: 'high', impact: 'Medio', solution: 'Auditar y corregir enlaces' },
    { id: 9, error: 'Estructura de URL Confusa', category: 'SEO', severity: 'medium', impact: 'Medio', solution: 'URLs cortas y descriptivas' },
    { id: 10, error: 'Falta de Schema Markup', category: 'SEO', severity: 'high', impact: 'Medio', solution: 'Implementar JSON-LD' },
    { id: 11, error: 'Ausencia de SSL (HTTPS)', category: 'Seguridad', severity: 'critical', impact: 'Alto', solution: 'Instalar certificado SSL' },
    { id: 12, error: 'Formularios Demasiado Largos', category: 'Conversión', severity: 'high', impact: 'Alto', solution: 'Reducir a campos esenciales' },
    { id: 13, error: 'CTAs Débiles o Inexistentes', category: 'Conversión', severity: 'critical', impact: 'Alto', solution: 'Crear CTAs claros y visibles' },
    { id: 14, error: 'Política de Privacidad No Conforme', category: 'Seguridad', severity: 'high', impact: 'Medio', solution: 'Implementar GDPR/CCPA' },
    { id: 15, error: 'Velocidad de Servidor Lenta', category: 'Rendimiento', severity: 'critical', impact: 'Alto', solution: 'Mejorar hosting o usar CDN' }
];

// Datos de categorías
const categoryData = {
    'Rendimiento': 6,
    'SEO': 4,
    'Seguridad': 3,
    'UX': 1,
    'Conversión': 1
};

// Datos de impacto
const impactData = {
    'Rendimiento': 32,
    'SEO': 28,
    'Seguridad': 18,
    'Conversión': 15,
    'UX': 7
};

// Datos de tendencias (últimos 12 meses)
const trendsData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    rendimiento: [45, 42, 40, 38, 35, 32, 30, 28, 26, 24, 22, 20],
    seo: [38, 36, 35, 34, 33, 32, 31, 30, 29, 28, 27, 26],
    seguridad: [28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17],
    conversion: [22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11]
};

// Initialize charts
document.addEventListener('DOMContentLoaded', function() {
    initCharts();
    populateErrorTable();
    setupNavbar();
});

function initCharts() {
    // Chart 1: Error Category Distribution
    const ctx1 = document.getElementById('errorCategoryChart').getContext('2d');
    new Chart(ctx1, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: [
                    '#FF6B35',
                    '#4ECDC4',
                    '#1A535C',
                    '#FF8C42',
                    '#48bb78'
                ],
                borderColor: '#fff',
                borderWidth: 3
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        padding: 15,
                        usePointStyle: true
                    }
                }
            }
        }
    });

    // Chart 2: Impact on Conversions
    const ctx2 = document.getElementById('impactChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: Object.keys(impactData),
            datasets: [{
                label: 'Impacto en Conversiones (%)',
                data: Object.values(impactData),
                backgroundColor: [
                    '#FF6B35',
                    '#4ECDC4',
                    '#1A535C',
                    '#FF8C42',
                    '#48bb78'
                ],
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            }
        }
    });

    // Chart 3: Trends
    const ctx3 = document.getElementById('trendsChart').getContext('2d');
    new Chart(ctx3, {
        type: 'line',
        data: {
            labels: trendsData.labels,
            datasets: [
                {
                    label: 'Errores de Rendimiento',
                    data: trendsData.rendimiento,
                    borderColor: '#FF6B35',
                    backgroundColor: 'rgba(255, 107, 53, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#FF6B35',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Errores SEO',
                    data: trendsData.seo,
                    borderColor: '#4ECDC4',
                    backgroundColor: 'rgba(78, 205, 196, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#4ECDC4',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                },
                {
                    label: 'Errores de Seguridad',
                    data: trendsData.seguridad,
                    borderColor: '#1A535C',
                    backgroundColor: 'rgba(26, 83, 92, 0.1)',
                    tension: 0.4,
                    fill: true,
                    pointRadius: 5,
                    pointBackgroundColor: '#1A535C',
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        font: { size: 12, weight: 'bold' },
                        padding: 15,
                        usePointStyle: true
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    max: 50,
                    ticks: {
                        callback: function(value) {
                            return value + ' errores';
                        }
                    }
                }
            }
        }
    });
}

function populateErrorTable() {
    const tbody = document.getElementById('errorTableBody');
    tbody.innerHTML = '';

    errorData.forEach((error, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${error.id}</strong></td>
            <td>${error.error}</td>
            <td><span class="badge" style="background-color: ${getCategoryColor(error.category)}; color: white;">${error.category}</span></td>
            <td><span class="severity-badge severity-${error.severity}">${error.severity.toUpperCase()}</span></td>
            <td><span class="impact-badge">${error.impact}</span></td>
            <td>${error.solution}</td>
        `;
        tbody.appendChild(row);
    });
}

function getCategoryColor(category) {
    const colors = {
        'Rendimiento': '#FF6B35',
        'SEO': '#4ECDC4',
        'Seguridad': '#1A535C',
        'UX': '#FF8C42',
        'Conversión': '#48bb78'
    };
    return colors[category] || '#999';
}

function exportData() {
    const csvContent = generateCSV();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    link.setAttribute('href', url);
    link.setAttribute('download', 'VIVVS-Auditoria-Resultados.csv');
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function generateCSV() {
    let csv = 'ID,Error,Categoría,Severidad,Impacto,Solución\n';
    
    errorData.forEach(error => {
        csv += `${error.id},"${error.error}","${error.category}","${error.severity}","${error.impact}","${error.solution}"\n`;
    });
    
    return csv;
}

function setupNavbar() {
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Print functionality
window.addEventListener('keydown', function(e) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        window.print();
    }
});
