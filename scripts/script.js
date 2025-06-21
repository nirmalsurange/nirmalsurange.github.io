// Update copyright year
document.getElementById('current-year').textContent = new Date().getFullYear();

// Smooth scrolling for navigation links
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 70, // Offset for header
                behavior: 'smooth'
            });
        }
    });
});

// Publications data from Nirmal Surange's publications PDF
const samplePublications = [
    {
        title: "Teclass: A human-annotated relevance-based headline classification and generation dataset for telugu",
        authors: "G. Kanumolu, L. Madasu, N. Surange, and M. Shrivastava",
        venue: "Proceedings of the 2024 Joint International Conference on Computational Linguistics, Language Resources and Evaluation, LREC/COLING",
        year: 2024,
        url: "https://scholar.google.com/citations?user=CaOYynIAAAAJ&hl=en"
    },
    {
        title: "Mukhyansh: A headline generation dataset for indic languages",
        authors: "L. Madasu, G. Kanumolu, N. Surange, and M. Shrivastava",
        venue: "Proceedings of the 37th Pacific Asia Conference on Language, Information and Computation, PACLIC",
        year: 2023,
        url: "https://scholar.google.com/citations?user=CaOYynIAAAAJ&hl=en"
    },
    {
        title: "Semrel2024: A collection of semantic textual relatedness datasets for 13 languages",
        authors: "N. Ousidhoum, S. H. Muhammad, M. Abdalla, et al. (including N. Surange)",
        venue: "Findings of the Association for Computational Linguistics, ACL",
        year: 2024,
        url: "https://scholar.google.com/citations?user=CaOYynIAAAAJ&hl=en"
    },
    // {
    //     title: "Semeval task 1: Semantic textual relatedness for african and asian languages",
    //     authors: "N. Ousidhoum, S. H. Muhammad, M. Abdalla, et al. (including N. Surange)",
    //     venue: "Proceedings of the 18th International Workshop on Semantic Evaluation, SemEval@NAACL",
    //     year: 2024,
    //     url: "https://scholar.google.com/citations?user=CaOYynIAAAAJ&hl=en"
    // },
    // {
    //     title: "Indian language summarization using pretrained sequence-to-sequence models",
    //     authors: "A. Urlana, S. M. Bhatt, N. Surange, and M. Shrivastava",
    //     venue: "Working Notes of FIRE 2022 - Forum for Information Retrieval Evaluation",
    //     year: 2022,
    //     url: "https://scholar.google.com/citations?user=CaOYynIAAAAJ&hl=en"
    // },
    // {
    //     title: "Tesum: Human-generated abstractive summarization corpus for telugu",
    //     authors: "A. Urlana, N. Surange, P. Baswani, P. Ravva, and M. Shrivastava",
    //     venue: "Proceedings of the Thirteenth Language Resources and Evaluation Conference, LREC 2022",
    //     year: 2022,
    //     url: "https://scholar.google.com/citations?user=CaOYynIAAAAJ&hl=en"
    // },
    // {
    //     title: "LTRC @mup 2022: Multi-perspective scientific document summarization using pre-trained generation models",
    //     authors: "A. Urlana, N. Surange, and M. Shrivastava",
    //     venue: "Proceedings of the Third Workshop on Scholarly Document Processing, SDP@COLING 2022",
    //     year: 2022,
    //     url: "https://scholar.google.com/citations?user=CaOYynIAAAAJ&hl=en"
    // }
];

// Display publications
function displayPublications(publications) {
    const publicationsList = document.getElementById('publications-list');
    
    if (!publicationsList) return;
    
    // Clear loading message
    publicationsList.innerHTML = '';
    
    // Sort publications by year (recent first)
    publications.sort((a, b) => b.year - a.year);
    
    // Add publications to the DOM
    publications.forEach(pub => {
        const pubElement = document.createElement('div');
        pubElement.className = 'publication-item';
        
        pubElement.innerHTML = `
            <a href="${pub.url}" target="_blank" class="publication-title">${pub.title}</a>
            <p class="publication-authors">${pub.authors}</p>
            <p>
                <span class="publication-venue">${pub.venue}</span>
                <span class="publication-year">${pub.year}</span>
            </p>
        `;
        
        publicationsList.appendChild(pubElement);
    });
}

// Try to fetch publications from Google Scholar (this may not work due to CORS restrictions)
async function fetchPublications() {
    try {
        // This is a placeholder - direct API access to Google Scholar is restricted
        // In a real implementation, you would need a server-side proxy or use a different approach
        
        // For now, use the sample data as a fallback
        displayPublications(samplePublications);
        
    } catch (error) {
        console.error('Error fetching publications:', error);
        // Use sample data as fallback
        displayPublications(samplePublications);
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Display publications
    fetchPublications();
    
    // Add active class to navigation items on scroll
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
});

// Add a simple animation for page elements
document.addEventListener('DOMContentLoaded', function() {
    const fadeInElements = document.querySelectorAll('.section');
    
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                fadeInObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });
});
