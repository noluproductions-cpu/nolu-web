/* ==========================================================================
   NOLU Productions - Premium Interactive Scripts
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Smooth Header Shrink on Scroll
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Interactive Spotlight Gradient Following Mouse Cursor
    const spotlight = document.getElementById('spotlight');
    document.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        spotlight.style.setProperty('--mouse-x', `${x}%`);
        spotlight.style.setProperty('--mouse-y', `${y}%`);
    });

    // 3. Scroll Reveal System using Intersection Observer
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Once it is revealed, we don't need to observe it anymore
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(element => {
        revealObserver.observe(element);
    });

    // 4. 3D Parallax Tilt Effect for Cards
    const initTiltEffect = (card) => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            // Calculate tilt angle (-6 to 6 degrees)
            const rotateX = ((centerY - y) / centerY) * 6;
            const rotateY = ((x - centerX) / centerX) * 6;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            card.style.boxShadow = `0 30px 60px rgba(99, 102, 241, 0.1), 0 0 20px rgba(255, 255, 255, 0.05)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
            card.style.boxShadow = '';
        });
    };

    const tiltCards = document.querySelectorAll('.glass-card-tilt');
    tiltCards.forEach(card => {
        if (!card.closest('.projects-grid')) {
            initTiltEffect(card);
        }
    });

    // 5. Interactive Canvas Particles Background for Hero
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let mouse = { x: null, y: null, radius: 140 };

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        window.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        });

        window.addEventListener('mouseleave', () => {
            mouse.x = null;
            mouse.y = null;
        });

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2.5 + 1; // Slightly larger for play buttons
                this.speedX = Math.random() * 0.3 - 0.15;
                this.speedY = Math.random() * 0.3 - 0.15;
                this.baseAlpha = Math.random() * 0.25 + 0.1;
                this.alpha = this.baseAlpha;
                this.isTriangle = Math.random() < 0.25; // 25% of particles are mini play button triangles!
                this.angle = Math.random() * Math.PI * 2; // Initial rotation angle
                this.rotationSpeed = (Math.random() * 0.015 - 0.0075); // Slow rotation
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.angle += this.rotationSpeed;

                // Bounce off boundaries
                if (this.x > canvas.width || this.x < 0) this.speedX = -this.speedX;
                if (this.y > canvas.height || this.y < 0) this.speedY = -this.speedY;

                // Mouse interaction (push away)
                if (mouse.x && mouse.y) {
                    const dx = this.x - mouse.x;
                    const dy = this.y - mouse.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < mouse.radius) {
                        const force = (mouse.radius - distance) / mouse.radius;
                        const directionX = dx / distance;
                        const directionY = dy / distance;
                        this.x += directionX * force * 1.8;
                        this.y += directionY * force * 1.8;
                        this.alpha = Math.min(0.8, this.baseAlpha + force * 0.4);
                    } else {
                        if (this.alpha > this.baseAlpha) this.alpha -= 0.005;
                    }
                } else {
                    if (this.alpha > this.baseAlpha) this.alpha -= 0.005;
                }
            }

            draw() {
                ctx.save();
                ctx.translate(this.x, this.y);
                
                if (this.isTriangle) {
                    // Draw a neon pink-purple play button triangle
                    ctx.rotate(this.angle);
                    ctx.fillStyle = `rgba(217, 70, 239, ${this.alpha})`; // Neon magenta
                    ctx.beginPath();
                    const r = this.size * 2.2;
                    ctx.moveTo(r, 0);
                    ctx.lineTo(-r/2, -r * Math.sqrt(3)/2);
                    ctx.lineTo(-r/2, r * Math.sqrt(3)/2);
                    ctx.closePath();
                    ctx.fill();
                } else {
                    // Draw a neon violet circle
                    ctx.fillStyle = `rgba(139, 92, 246, ${this.alpha})`; // Electric indigo
                    ctx.beginPath();
                    ctx.arc(0, 0, this.size, 0, Math.PI * 2);
                    ctx.fill();
                }
                ctx.restore();
            }
        }

        const initParticles = () => {
            const count = Math.min(65, Math.floor((canvas.width * canvas.height) / 16000));
            particles = [];
            for (let i = 0; i < count; i++) {
                particles.push(new Particle());
            }
        };
        initParticles();
        window.addEventListener('resize', initParticles);

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });

            // Draw connection lines colored in signature neon purple-magenta gradients
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (110 - dist) / 110 * 0.1;
                        ctx.strokeStyle = `rgba(217, 70, 239, ${alpha})`; // Magenta/Pink link
                        ctx.lineWidth = 0.4;
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            requestAnimationFrame(animate);
        };
        animate();
    }

    // 6. Dynamic Project Showcase Modal System
    let projectsData = {};

    const projectsGrid = document.getElementById('projects-grid');
    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');

    const openModal = (projectId) => {
        const data = projectsData[projectId];
        if (!data) return;

        // Populate modal fields
        document.getElementById('modal-title').textContent = data.title;
        document.getElementById('modal-tag').textContent = data.tag;
        
        document.getElementById('modal-stat-dur').textContent = data.duration;
        document.getElementById('modal-stat-team').textContent = data.team;
        document.getElementById('modal-stat-role').textContent = data.role;
        
        document.getElementById('modal-stat-met1').textContent = data.stats.metric1;
        document.getElementById('modal-stat-val1').textContent = data.stats.val1;
        document.getElementById('modal-stat-met2').textContent = data.stats.metric2;
        document.getElementById('modal-stat-val2').textContent = data.stats.val2;

        document.getElementById('modal-desc').textContent = data.desc;
        
        // Populate deliverables bullet list
        const bulletsContainer = document.getElementById('modal-bullets');
        bulletsContainer.innerHTML = '';
        if (data.deliverables && Array.isArray(data.deliverables)) {
            data.deliverables.forEach(bullet => {
                const li = document.createElement('li');
                li.textContent = bullet;
                bulletsContainer.appendChild(li);
            });
        }

        // Set player cover image
        const playerBg = document.getElementById('mock-player-img');
        if (playerBg) {
            playerBg.src = data.image || 'GRAFIKA/LOGA/PNG/logo4.png';
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling behind
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    // Load projects dynamically from JSON
    if (projectsGrid) {
        fetch('data/projects.json')
            .then(response => response.json())
            .then(jsonData => {
                const list = jsonData.projects_list || [];
                projectsGrid.innerHTML = ''; // Clear fallback/loading text

                list.forEach((proj, index) => {
                    projectsData[proj.id] = proj;

                    // Create project card element
                    const card = document.createElement('div');
                    card.className = `project-card glass-card-tilt reveal reveal-delay-${(index % 3) + 1} active`;
                    
                    card.innerHTML = `
                        <div class="project-content">
                            <div class="project-meta">
                                <span class="project-tag">${proj.tag}</span>
                                <span class="project-duration">${proj.duration}</span>
                            </div>
                            <h3 class="project-title">${proj.title}</h3>
                            <p class="project-description">${proj.card_desc}</p>
                            <button class="project-btn" data-project-id="${proj.id}">Zobrazit detaily</button>
                        </div>
                    `;

                    // Add click event for details button
                    const btn = card.querySelector('.project-btn');
                    btn.addEventListener('click', (e) => {
                        e.preventDefault();
                        openModal(proj.id);
                    });

                    projectsGrid.appendChild(card);
                    
                    // Bind the 3D Parallax Tilt Effect to this newly created card
                    if (typeof initTiltEffect === 'function') {
                        initTiltEffect(card);
                    }
                });
            })
            .catch(err => {
                console.error('Chyba při načítání projektů:', err);
                projectsGrid.innerHTML = '<p style="color: var(--text-secondary); text-align: center; width: 100%;">Nepodařilo se načíst projekty. Zkuste to prosím později.</p>';
            });
    }

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Simulated Video Player Play Trigger
    const mockPlayer = document.getElementById('mock-player');
    const playerProgress = document.getElementById('player-progress');
    const playerTime = document.getElementById('player-time');
    let playingInterval = null;

    mockPlayer.addEventListener('click', () => {
        const iconBtn = mockPlayer.querySelector('.play-trigger-btn svg');
        const isPlaying = mockPlayer.getAttribute('data-playing') === 'true';

        if (!isPlaying) {
            // Play
            mockPlayer.setAttribute('data-playing', 'true');
            iconBtn.innerHTML = '<rect x="6" y="4" width="4" height="16"></rect><rect x="14" y="4" width="4" height="16"></rect>';
            
            let percent = 35;
            let sec = 42;
            playingInterval = setInterval(() => {
                percent += 0.5;
                if (percent >= 100) percent = 0;
                playerProgress.style.width = `${percent}%`;
                
                sec += 1;
                if (sec >= 60) sec = 0;
                playerTime.textContent = `01:${sec < 10 ? '0' + sec : sec} / 03:12`;
            }, 1000);
        } else {
            // Pause
            mockPlayer.setAttribute('data-playing', 'false');
            iconBtn.innerHTML = '<polygon points="5 3 19 12 5 21 5 3"></polygon>';
            clearInterval(playingInterval);
        }
    });

    // 7. Tech Gear Spec Toast System
    const techSpecs = {
        'Canon EOS RP': {
            icon: '📷',
            title: 'Canon EOS RP',
            desc: '26.2 MP Full-Frame bezzrcadlovka. Používáme ji s prémiovými objektivy pro cinematic hloubku ostrosti, vynikající výkon za špatného světla a čistý výstup.'
        },
        'DJI RS4': {
            icon: '🎬',
            title: 'DJI RS4 Stabilizátor',
            desc: 'Nejnovější tříosý stabilizátor řady DJI. Umožňuje nám natáčet extrémně dynamické akční záběry, běhy a plynulé průlety s plnou kontrolou ostření.'
        },
        'DJI MIC 2': {
            icon: '🎙️',
            title: 'DJI MIC 2 (Bezdrátový zvuk)',
            desc: 'Špičkové mikrofony se záznamem do 32-bit float a aktivním potlačením okolního hluku. Zajišťují dokonale čistý zvuk rozhovorů i ve větrném venkovním prostředí.'
        },
        'iPhone 16 & Pro': {
            icon: '📱',
            title: 'iPhone 16 & Pro',
            desc: 'Vybavení pro ultra-rychlý střih a natáčení ve 4K/120fps. Nepostradatelný nástroj pro okamžitou tvorbu Reels a trendů přímo na místě činu.'
        },
        'RGB Světla': {
            icon: '💡',
            title: 'Kreativní RGB Osvětlení',
            desc: 'Přenosná i studiová LED světla s plným spektrem barev. Pomáhají nám okamžitě přetvořit nudný interiér v atraktivní, barevně nasvícenou scénu.'
        }
    };

    const techItems = document.querySelectorAll('.tech-item');
    const toast = document.getElementById('tech-toast');
    let toastTimeout = null;

    techItems.forEach(item => {
        item.addEventListener('click', () => {
            const name = item.querySelector('.tech-name').textContent.trim();
            const spec = techSpecs[name];
            if (!spec) return;

            // Clear previous timeout
            if (toastTimeout) clearTimeout(toastTimeout);

            // Populate Toast
            document.getElementById('toast-icon').textContent = spec.icon;
            document.getElementById('toast-title').textContent = spec.title;
            document.getElementById('toast-body').textContent = spec.desc;

            // Activate Toast
            toast.classList.add('active');

            // Deactivate after 5 seconds
            toastTimeout = setTimeout(() => {
                toast.classList.remove('active');
            }, 5500);
        });
    });

    // Close toast clicking on it
    toast.addEventListener('click', () => {
        toast.classList.remove('active');
    });

    // 8. Interactive Form Submission
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get values
            const name = document.getElementById('form-name').value.trim();
            const email = document.getElementById('form-email').value.trim();
            const message = document.getElementById('form-msg').value.trim();

            if (!name || !email || !message) {
                showFormStatus('Vyplňte prosím všechna pole formuláře.', 'error');
                return;
            }

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Odesílám...';
            submitBtn.disabled = true;

            // Send actual request to Formsubmit
            fetch("https://formsubmit.co/ajax/213f38458f292c278a7901cecb011680", {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({
                    Name: name,
                    Email: email,
                    Message: message
                })
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === "true" || data.success === true) {
                    showFormStatus('✓ Vaše zpráva byla úspěšně odeslána! Ozveme se Vám co nejdříve.', 'success');
                    contactForm.reset();
                } else if (data.message && data.message.includes('Activation')) {
                    showFormStatus('✓ Odesláno! Zkontrolujte prosím e-mail noluproductions@gmail.com pro aktivaci formuláře.', 'success');
                    contactForm.reset();
                } else {
                    showFormStatus('Něco se nepovedlo. Zkuste to prosím znovu nebo nám napište přímo na e-mail.', 'error');
                }
            })
            .catch(error => {
                console.error("Chyba při odesílání:", error);
                showFormStatus('Chyba sítě. Zkuste to prosím znovu nebo nám napište přímo na e-mail.', 'error');
            })
            .finally(() => {
                // Reset button
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
            });
        });
    }

    const showFormStatus = (msg, type) => {
        formStatus.textContent = msg;
        formStatus.className = 'form-status'; // reset
        formStatus.classList.add(type);
        formStatus.style.display = 'flex';

        // Auto hide after 6 seconds
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 6000);
    };
});
