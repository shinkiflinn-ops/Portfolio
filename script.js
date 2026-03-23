document.addEventListener('DOMContentLoaded', () => {
            const terminal = document.getElementById('ui-terminal');
            const buttons = document.querySelectorAll('.ui-btn');
            const themeToggle = document.getElementById('theme-toggle');
            const root = document.querySelector(':root');

            // Theme toggle
            themeToggle.addEventListener('click', () => {
                const currentBg = getComputedStyle(root).getPropertyValue('--bg-color').trim();
                if (currentBg === '#1a1a1a') {
                    root.style.setProperty('--bg-color', '#f2f2f2');
                    root.style.setProperty('--text-color', '#1a1a1a');
                    root.style.setProperty('--card-bg', '#e0e0e0');
                    root.style.setProperty('--ui-bg', '#d0d0d0');
                    root.style.setProperty('--accent-color', '#2a8e9e');
                    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
                } else {
                    root.style.setProperty('--bg-color', '#1a1a1a');
                    root.style.setProperty('--text-color', '#f2f2f2');
                    root.style.setProperty('--card-bg', '#2a2a2a');
                    root.style.setProperty('--ui-bg', '#111');
                    root.style.setProperty('--accent-color', '#48b9c7');
                    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
                }
            });

            // Typing effect for terminal
            function typeText(element, text, speed = 50) {
                let i = 0;
                element.textContent = '';
                const timer = setInterval(() => {
                    element.textContent += text.charAt(i);
                    i++;
                    if (i > text.length - 1) {
                        clearInterval(timer);
                    }
                }, speed);
            }

            // Typing append for additional text
            function typeAppend(element, text, speed = 50) {
                let i = 0;
                const startText = element.textContent;
                const timer = setInterval(() => {
                    element.textContent = startText + text.substring(0, i + 1);
                    i++;
                    if (i > text.length - 1) {
                        clearInterval(timer);
                    }
                    element.scrollTop = element.scrollHeight;
                }, speed);
            }

            // Initial terminal text
            const initialText = "root@portfolio:~/$ systemctl status creative_core\n... [OK] Core initialized.\nroot@portfolio:~/$ _";
            typeText(terminal, initialText);

            // Commandes simulées et leurs réponses
            const commands = {
                'analyze_circuit.sys': 'root@portfolio:~/$ ./analyze_circuit.sys\n[INFO] Circuit detected. NE555 Timer: Stable. Gates (74LS): Active. Total Nodes: 12. Clock Speed: 1.001Hz.',
                'compile_code.run': 'root@portfolio:~/$ ./compile_code.run\n[LOG] Compilation started: Valdoria (GDScript). [███----] 30%. Error at L450: Unexpected token. Build Failed.',
                'build_project.exe': 'root@portfolio:~/$ ./build_project.exe\n[LOG] Creating release package for: International_Mélodyès. Content check... SEO optimization... YouTube algorithm sync... [DONE] Package ready.'
            };

            buttons.forEach(button => {
                button.addEventListener('click', function() {
                    const cmd = this.getAttribute('data-cmd');
                    const output = commands[cmd];
                    
                    if (output) {
                        // Récupérer le contenu actuel
                        const currentText = terminal.textContent;
                        // Mettre à jour avec la nouvelle sortie et faire défler vers le bas
                        terminal.textContent = `${currentText}\n${output}\nroot@portfolio:~/$ _`;
                        terminal.scrollTop = terminal.scrollHeight;
                    }
                });
            });

            const playBtn = document.getElementById('play-trigger');
            let isRunning = false;

            const resetUI = () => {
                const root = document.querySelector(':root');
                const terminal = document.getElementById('ui-terminal');
                const panel = document.querySelector('.ui-panel');

                root.style.setProperty('--accent-color', '#48b9c7');
                terminal.style.color = getComputedStyle(root).getPropertyValue('--text-color');
                panel.classList.remove('overclock-active', 'glow-active');
                terminal.classList.remove('glitch-active');
                playBtn.classList.remove('flash-active');
                playBtn.textContent = 'PLAY';
                playBtn.style.borderColor = '#48b9c7';
                playBtn.style.color = '#48b9c7';

                // Reset terminal initial text (optional)
                terminal.textContent = "root@portfolio:~/$ systemctl status creative_core\n... [OK] Core initialized.\nroot@portfolio:~/$ _";
                terminal.scrollTop = terminal.scrollHeight;
            };

            playBtn.addEventListener('click', () => {
                const root = document.querySelector(':root');
                const terminal = document.getElementById('ui-terminal');
                const panel = document.querySelector('.ui-panel');

                if (isRunning) {
                    isRunning = false;
                    resetUI();
                    return;
                }

                isRunning = true;

                // Change accent to green
                root.style.setProperty('--accent-color', '#00ff00');
                // Set terminal text to green
                terminal.style.color = '#00ff00';

                const newText = "\n[SYSTEM] : INITIALIZING VALDORIA_CORE.EXE...\n[WARNING] : OVERCLOCKING DETECTED\n[OK] : LEVEL LIMITS REMOVED\nroot@portfolio:~/$ _";
                typeAppend(terminal, newText, 100);

                // Add animations to panel
                panel.classList.add('overclock-active');
                panel.classList.add('glow-active');

                // Add glitch effect on terminal for 5 seconds
                terminal.classList.add('glitch-active');
                setTimeout(() => {
                    terminal.classList.remove('glitch-active');
                }, 5000);

                // Animate button
                playBtn.textContent = "RUNNING";
                playBtn.style.borderColor = "#00ff00";
                playBtn.style.color = "#00ff00";
                playBtn.classList.add('flash-active');
            });
        });

        // Modal functionality
        const modal = document.getElementById('project-modal');
        const modalTitle = document.getElementById('modal-title');
        const modalDescription = document.getElementById('modal-description');
        const closeBtn = document.querySelector('.close');

        // Get all project cards
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            card.addEventListener('click', () => {
                const title = card.getAttribute('data-title');
                const description = card.getAttribute('data-description');
                modalTitle.textContent = title;
                modalDescription.textContent = description;
                modal.style.display = 'block';
            });
        });

        // Close modal when clicking close button
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        // Close modal when clicking outside the modal content
        window.addEventListener('click', (event) => {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Image Modal functionality
        const imgModal = document.getElementById('image-modal');
        const expandedImg = document.getElementById('expanded-img');
        const imgCaption = document.getElementById('img-caption');
        const closeImgBtn = document.querySelector('.close-img');
        const pictures = document.querySelectorAll('.picture-frame img');

        pictures.forEach(img => {
            img.addEventListener('click', () => {
                imgModal.style.display = 'block';
                expandedImg.src = img.src;
                imgCaption.textContent = img.alt;
            });
        });

        closeImgBtn.addEventListener('click', () => {
            imgModal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target === imgModal) {
                imgModal.style.display = 'none';
            }
        });