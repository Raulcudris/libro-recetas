// Datos de los comandos de Git y GitHub
const gitCommands = [
    {
        title: "Inicializar repositorio",
        command: "git init",
        description: "Crea un nuevo repositorio Git en el directorio actual.",
        category: "basic"
    },
    {
        title: "Clonar repositorio",
        command: "git clone <url_repositorio>",
        description: "Descarga un repositorio existente desde una URL remota.",
        category: "basic"
    },
    {
        title: "Ver estado",
        command: "git status",
        description: "Muestra el estado del directorio de trabajo y del área de staging.",
        category: "basic"
    },
    {
        title: "Añadir cambios",
        command: "git add <archivo>",
        description: "Añade cambios específicos al área de staging.",
        category: "basic"
    },
    {
        title: "Añadir todos los cambios",
        command: "git add .",
        description: "Añade todos los cambios al área de staging.",
        category: "basic"
    },
    {
        title: "Confirmar cambios",
        command: "git commit -m \"mensaje descriptivo\"",
        description: "Confirma los cambios en el área de staging con un mensaje descriptivo.",
        category: "basic"
    },
    {
        title: "Ver historial",
        command: "git log",
        description: "Muestra el historial de commits del repositorio.",
        category: "basic"
    },
    {
        title: "Crear rama",
        command: "git branch <nombre_rama>",
        description: "Crea una nueva rama con el nombre especificado.",
        category: "branch"
    },
    {
        title: "Cambiar de rama",
        command: "git checkout <nombre_rama>",
        description: "Cambia a la rama especificada.",
        category: "branch"
    },
    {
        title: "Crear y cambiar de rama",
        command: "git checkout -b <nombre_rama>",
        description: "Crea una nueva rama y cambia a ella inmediatamente.",
        category: "branch"
    },
    {
        title: "Fusionar ramas",
        command: "git merge <nombre_rama>",
        description: "Fusiona la rama especificada con la rama actual.",
        category: "branch"
    },
    {
        title: "Eliminar rama",
        command: "git branch -d <nombre_rama>",
        description: "Elimina la rama especificada.",
        category: "branch"
    },
    {
        title: "Añadir repositorio remoto",
        command: "git remote add <nombre> <url>",
        description: "Añade un repositorio remoto con un nombre específico.",
        category: "remote"
    },
    {
        title: "Enviar cambios al remoto",
        command: "git push <remoto> <rama>",
        description: "Envía los commits locales a la rama del repositorio remoto.",
        category: "remote"
    },
    {
        title: "Traer cambios del remoto",
        command: "git pull <remoto> <rama>",
        description: "Obtiene los cambios del repositorio remoto y los fusiona con la rama local.",
        category: "remote"
    },
    {
        title: "Ver repositorios remotos",
        command: "git remote -v",
        description: "Muestra los repositorios remotos configurados.",
        category: "remote"
    },
    {
        title: "Fork en GitHub",
        command: "Click en 'Fork' en GitHub",
        description: "Crea una copia personal de un repositorio en tu cuenta de GitHub.",
        category: "github"
    },
    {
        title: "Pull Request",
        command: "Click en 'New Pull Request' en GitHub",
        description: "Solicita al propietario del repositorio original que revise e incorpore tus cambios.",
        category: "github"
    },
    {
        title: "GitHub Pages",
        command: "Configuración del repositorio > GitHub Pages",
        description: "Publica el contenido de tu repositorio como un sitio web estático.",
        category: "github"
    },
    {
        title: "Deshacer cambios locales",
        command: "git checkout -- <archivo>",
        description: "Descarta cambios locales en un archivo específico.",
        category: "basic"
    },
    {
        title: "Restaurar commit anterior",
        command: "git revert <commit_hash>",
        description: "Crea un nuevo commit que deshace los cambios de un commit anterior.",
        category: "basic"
    },
    {
        title: "Ver diferencias",
        command: "git diff",
        description: "Muestra las diferencias entre el directorio de trabajo y el área de staging.",
        category: "basic"
    }
];

// Función para renderizar los comandos
function renderCommands(commands) {
    const container = document.getElementById('commandsContainer');
    container.innerHTML = '';
    
    if (commands.length === 0) {
        container.innerHTML = '<p class="no-results">No se encontraron comandos que coincidan con tu búsqueda.</p>';
        return;
    }
    
    commands.forEach(cmd => {
        const card = document.createElement('div');
        card.className = 'command-card';
        card.dataset.category = cmd.category;
        
        const categoryClass = `category-${cmd.category}`;
        
        card.innerHTML = `
            <h3>${cmd.title}</h3>
            <div class="command">${cmd.command}</div>
            <p class="description">${cmd.description}</p>
            <span class="category ${categoryClass}">${getCategoryName(cmd.category)}</span>
        `;
        
        container.appendChild(card);
    });
}

// Función para obtener el nombre completo de la categoría
function getCategoryName(category) {
    const names = {
        'basic': 'Básico',
        'branch': 'Ramas',
        'remote': 'Remoto',
        'github': 'GitHub'
    };
    return names[category] || category;
}

// Función para filtrar comandos por categoría
function filterByCategory(category) {
    if (category === 'all') {
        renderCommands(gitCommands);
        return;
    }
    
    const filteredCommands = gitCommands.filter(cmd => cmd.category === category);
    renderCommands(filteredCommands);
}

// Función para buscar comandos
function searchCommands() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    
    if (!searchTerm) {
        const activeCategory = document.querySelector('.filter-btn.active').dataset.category;
        filterByCategory(activeCategory);
        return;
    }
    
    const filteredCommands = gitCommands.filter(cmd => 
        cmd.title.toLowerCase().includes(searchTerm) || 
        cmd.command.toLowerCase().includes(searchTerm) ||
        cmd.description.toLowerCase().includes(searchTerm)
    );
    
    renderCommands(filteredCommands);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Renderizar todos los comandos al cargar
    renderCommands(gitCommands);
    
    // Filtros por categoría
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterByCategory(btn.dataset.category);
        });
    });
    
    // Buscador
    document.getElementById('searchBtn').addEventListener('click', searchCommands);
    document.getElementById('searchInput').addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchCommands();
        }
    });
});