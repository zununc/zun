// Portfolio Gallery Modal Functionality

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Modal elements
    const modal = document.getElementById('imageModal');
    const modalClose = document.querySelector('.modal-close');
    const modalPrev = document.getElementById('modalPrev');
    const modalNext = document.getElementById('modalNext');
    
    // Gallery items
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentIndex = 0;
    
    // Project data (customize this for each project)
    const projects = [
        {
            title: 'Looped: Physics Learning App',
            category: 'Lovable Application',
            image: 'images/IMG_1496.jpeg',
            imageAlt: 'Looped physics learning app screenshot',
            description: 'A highly personalized way of teaching physics, specifically waves, to middle school students using student inputed variables, and AI persona panel, and a digital poster they can download.',
            features: [
                'Personalized learning paths based on student inputs',
                'AI persona panel',
                'Teacher dashboard to monitor student info',
                'Downloadable digital poster'
            ],
            impact: 'This class project can be found here https://looped584.lovable.app/ with the ability to remix the site to fit your needs.',
            tags: ['Lovable', 'Physics', 'Education', 'grades 6-8']
        },
        {
            title: 'Vice President GPSG',
            category: 'Elected position',
            image: 'images/IMG_5078.png',
            imageAlt: 'GPSG badge',
            description: 'As Vice President of the UNC Graduate and Professional Student Government, I represent the graduate student body in university-wide governance, serving on key councils and advisory committees that shape academic policy, AI strategy, and student affairs.',
            features: [
                'Provost AI Committee',
                'AI Advisory Committee',
                'Tuition and Fee Advisory Task Force',
                'Rules & Judiciary Committee'
            ],
            impact: 'Respresented 11,553 graduate and professional students at UNC Chapel Hill.',
            tags: ['Elected Position', 'Policy', 'AI', 'Student Government']
        },
        {
            title: 'PD for Runway Models using XR',
            category: 'iOS & Meta Quest',
            image: 'images/IMG_1772.jpeg',
            imageAlt: 'XR runway training app screenshot',
            description: 'This program is designed to train professional models using novel technology, industry standard metrics, and accessible training procedures.',
            features: [
                'AI-powered coach with live feedback',
                'Designed for iOS and the Meta Quest',
                'AR overlay for training anywhere',
                'Progress tracking and personalized recommendations'
            ],
            impact: 'User tested with industry professionals in modeling, engineering, and Meta.',
            tags: ['Mobile App', 'AI', 'XR', 'Model']
        },
        {
            title: 'Internship Review',
            category: 'BMC poster',
            image: 'images/IMG_1494.PNG',
            imageAlt: 'Internship review poster image',
            description: 'A poster reviewing my work at my internship conducting high-level market research.',
            features: [
                'Examples of market research',
                'Competitive Market Analysis',
                'Semester in review',
                'Overall internship goals'
            ],
            impact: 'Developed a comprehensive tool about the embodied learning sector documenting price, installations, technology, and more.',
            tags: ['Internship', 'Web Tool', 'Education', 'Poster']
        },
        {
            title: 'Self driven AI research',
            category: 'Local LLM experiments',
            image: 'images/Ollamass1.jpg',
            imageAlt: 'Ollama image',
            description: 'Conducting my own experiments using local llms through Ollama and LMstudio',
            features: [
                'Successfully downloaded local models to train on my personal computer',
                'Test limits of responses offline',
                'Test model size for computer specs ',
                'Shared findings with peers'
            ],
            impact: 'Downloaded multiple models to test how well they run on specific Mac computers.',
            tags: ['AI', 'LLM', 'Research', 'Experiment']
        },
        {
            title: 'STEM Learning Game',
            category: 'Educational Game',
            description: 'An immersive educational game that teaches STEM concepts through problem-solving challenges and interactive simulations. Designed for middle school students to explore science, technology, engineering, and math in an engaging environment.',
            features: [
                '30+ levels covering physics, chemistry, and engineering',
                'Real-time physics simulations',
                'Multiplayer collaborative challenges',
                'Curriculum-aligned learning objectives'
            ],
            impact: 'Downloaded 500,000+ times. Students show 45% better understanding of complex STEM concepts. Winner of 3 EdTech innovation awards.',
            tags: ['Game-Based Learning', 'STEM', 'Middle School', 'Simulation']
        },
        {
            title: 'Interactive Whiteboard',
            category: 'Collaboration Tool',
            description: 'Real-time collaborative whiteboard for virtual classrooms and remote learning. Enables teachers and students to brainstorm, draw, and work together on visual problems in real-time.',
            features: [
                'Real-time collaboration with up to 50 users',
                'Drawing tools, shapes, and mathematical symbols',
                'Screen recording for lecture capture',
                'Integration with video conferencing platforms'
            ],
            impact: 'Used by 20,000+ classrooms globally. 90% of teachers report improved student engagement in remote lessons. Featured in EdWeek and eSchool News.',
            tags: ['Collaboration', 'Remote Learning', 'Web Tool', 'Real-Time']
        },
        {
            title: 'Learning Analytics Platform',
            category: 'Data Visualization',
            description: 'Comprehensive analytics platform that aggregates data from multiple sources to provide actionable insights on student learning, engagement, and outcomes. Helps institutions make data-driven decisions.',
            features: [
                'Multi-source data integration (LMS, SIS, assessment tools)',
                'Predictive analytics for at-risk student identification',
                'Customizable dashboards and reports',
                'Privacy-compliant data handling'
            ],
            impact: 'Implemented at 30+ institutions serving 200,000+ students. Early intervention programs increased student retention by 18%. Institutions report improved graduation rates.',
            tags: ['Analytics', 'Big Data', 'Higher Ed', 'Predictive']
        },
        {
            title: 'Reading Companion App',
            category: 'Literacy App',
            description: 'AI-powered reading app that helps children develop literacy skills through interactive stories, vocabulary building, and comprehension activities. Adapts to each child\'s reading level.',
            features: [
                'Adaptive reading level adjustment',
                'Interactive vocabulary practice',
                'Comprehension quizzes and activities',
                'Parent progress reports'
            ],
            impact: '300,000+ downloads. Children show 2x improvement in reading fluency after 6 months. Recommended by literacy specialists and educators.',
            tags: ['Literacy', 'Early Education', 'AI', 'Mobile App']
        }
    ];
    
    // Filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Open modal when gallery item is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            currentIndex = index;
            openModal(index);
        });
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    
    // Close modal when clicking outside content
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowLeft') {
            showPrevious();
        } else if (e.key === 'ArrowRight') {
            showNext();
        }
    });
    
    // Previous/Next buttons
    modalPrev.addEventListener('click', showPrevious);
    modalNext.addEventListener('click', showNext);
    
    // Functions
    function openModal(index) {
        updateModalContent(index);
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    function updateModalContent(index) {
        const project = projects[index];
        const modalImage = document.getElementById('modalImage');
modalImage.src = project.image;
modalImage.alt = project.imageAlt || project.title;
        
        document.getElementById('modalTitle').textContent = project.title;
        document.getElementById('modalCategory').textContent = project.category;
        document.getElementById('modalDescription').textContent = project.description;
        document.getElementById('modalImpact').textContent = project.impact;
        
        // Update features list
        const featuresList = document.getElementById('modalFeatures');
        featuresList.innerHTML = '';
        project.features.forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });
        
        // Update tags
        const tagsContainer = document.querySelector('.modal-tags');
        tagsContainer.innerHTML = '';
        project.tags.forEach(tag => {
            const span = document.createElement('span');
            span.className = 'tag';
            span.textContent = tag;
            tagsContainer.appendChild(span);
        });
    }
    
    function showPrevious() {
        currentIndex = (currentIndex - 1 + projects.length) % projects.length;
        updateModalContent(currentIndex);
    }
    
    function showNext() {
        currentIndex = (currentIndex + 1) % projects.length;
        updateModalContent(currentIndex);
    }
});
