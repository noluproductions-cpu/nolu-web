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

    // 1b. Mobile Navigation Menu Toggle
    const menuToggle = document.getElementById('menu-toggle');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            header.classList.toggle('nav-open');
        });
        
        // Close menu when clicking navigation links
        const navLinks = header.querySelectorAll('nav a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                header.classList.remove('nav-open');
            });
        });
    }

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

    // 4. Subtle Card Hover Elevate (handled via CSS smooth transitions)

    // 5. Clean Ambient Canvas Particles Background for Hero
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];

        const resizeCanvas = () => {
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedX = Math.random() * 0.2 - 0.1;
                this.speedY = Math.random() * 0.2 - 0.1;
                this.alpha = Math.random() * 0.15 + 0.05;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(168, 85, 247, ${this.alpha})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            const count = Math.min(40, Math.floor((canvas.width * canvas.height) / 25000));
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
            requestAnimationFrame(animate);
        };
        animate();
    }
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
    const projectsData = {
        'vos-spse': {
            title: 'VOŠ a SPŠE Plzeň',
            tag: 'Správa sociálních sítí',
            duration: '> 1.5 roku',
            team: '6 členů (mediální tým)',
            role: 'Kompletní správa sociálních sítí a tvorba obsahu',
            desc: 'Dlouhodobě zajišťujeme správu Instagramu školy VOŠ a SPŠE Plzeň. Podílíme se na plánování obsahu, tvorbě Reels a videí, fotografování školních akcí, produkci podcastů a vedení studentského mediálního týmu.',
            deliverables: [
                'Správa Instagramu',
                'Tvorba krátkých dynamických Reels',
                'Vedení a mentoring 6členného studentského týmu',
                'Nahrávání a postprodukce školního podcastu'
            ],
            image: 'GRAFIKA/spse_logo.png',
            stats: {
                metric1: 'Stabilní růst dosahu',
                val1: '+150%',
                metric2: 'Vytvořených Reels',
                val2: '120+'
            }
        },
        'robovehicle': {
            title: 'RoboVehicle 2025',
            tag: 'Full Media Coverage',
            duration: '5 dní',
            team: '2 kreativci',
            role: 'Real-time Content & Cinematic Recap',
            desc: 'Kompletní mediální zajištění pětidenní prestižní mezinárodní technické soutěže. Zajišťovali jsme okamžitou dokumentaci a střih pro sociální sítě s týmy z Německa, Číny, Slovenska a Turecka přímo v reálném čase.',
            deliverables: [
                'Real-time Instagram Stories & Storytelling',
                'Denní video shrnutí (Daily Recap) do 12 hodin',
                'Cinematic video produkce a rozhovory se soutěžícími',
                'Profesionální fotodokumentace klíčových disciplín'
            ],
            image: 'GRAFIKA/LOGA/PNG/logo5-web.png',
            stats: {
                metric1: 'Rychlost střihu',
                val1: '< 4 hod',
                metric2: 'Celkový dosah',
                val2: '35K+'
            }
        },
        'culture-coworking': {
            title: 'Culture Coworking',
            tag: 'Zahraniční spolupráce',
            duration: '1 měsíc',
            team: '2 konzultanti',
            role: 'Strategie digitální komunikace',
            desc: 'Konzultační a tvůrčí spolupráce s prémiovým irským Co-Workingovým centrem. Cílem projektu bylo zanalyzovat irský trh malých podnikatelů a navrhnout novou obsahovou strategii, která zvýší počet rezervací.',
            deliverables: [
                'Definice strategických obsahových pilířů',
                'Tvorba měsíčního publikačního kalendáře a scénářů',
                'Konkurenční analýza lokálního trhu v Irsku',
                'Audit dosavadních sociálních sítí (IG, LinkedIn)',
                'Návrh nového grafického manuálu a vizuálních šablon'
            ],
            image: 'GRAFIKA/LOGA/PNG/logo4-web.png',
            stats: {
                metric1: 'Míra zapojení (ER)',
                val1: '+45%',
                metric2: 'Podnikatelé osloveni',
                val2: '5000+'
            }
        }
    };

    const modal = document.getElementById('project-modal');
    const modalClose = document.getElementById('modal-close');
    const modalTriggers = document.querySelectorAll('[data-project-id]');

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
        data.deliverables.forEach(bullet => {
            const li = document.createElement('li');
            li.textContent = bullet;
            bulletsContainer.appendChild(li);
        });

        // Set global modal visual showcase title
        const visualTitle = document.querySelector('.modal-visual-showcase .modal-section-title');
        if (visualTitle) {
            visualTitle.textContent = 'Klíčové výsledky';
        }

        // Show modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // prevent scrolling behind
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const projectId = trigger.getAttribute('data-project-id');
            openModal(projectId);
        });
    });

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



    // 7. Tech Gear Spec Toast System
    const techSpecs = {
        'Canon EOS RP': {
            icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>`,
            title: 'Canon EOS RP',
            desc: '26.2 MP Full-Frame bezzrcadlovka. Používáme ji s prémiovými objektivy pro cinematic hloubku ostrosti, vynikající výkon za špatného světla a čistý výstup.'
        },
        'DJI RS4': {
            icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 7l-7 5 7 5V7z"></path><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>`,
            title: 'DJI RS4 Stabilizátor',
            desc: 'Nejnovější tříosý stabilizátor řady DJI. Umožňuje nám natáčet extrémně dynamické akční záběry, běhy a plynulé průlety s plnou kontrolou ostření.'
        },
        'DJI MIC 2': {
            icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>`,
            title: 'DJI MIC 2 (Bezdrátový zvuk)',
            desc: 'Špičkové mikrofony se záznamem do 32-bit float a aktivním potlačením okolního hluku. Zajišťují dokonale čistý zvuk rozhovorů i ve větrném venkovním prostředí.'
        },
        'iPhone 16 & Pro': {
            icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>`,
            title: 'iPhone 16 & Pro',
            desc: 'Vybavení pro ultra-rychlý střih a natáčení ve 4K/120fps. Nepostradatelný nástroj pro okamžitou tvorbu Reels a trendů přímo na místě činu.'
        },
        'RGB Světla': {
            icon: `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"></path><path d="M9 18h6"></path><path d="M10 22h4"></path></svg>`,
            title: 'Kreativní RGB Osvěltení',
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
            document.getElementById('toast-icon').innerHTML = spec.icon;
            document.getElementById('toast-title').textContent = spec.title;
            document.getElementById('toast-body').textContent = spec.desc;

            // Activate Toast
            toast.classList.add('active');

            // Deactivate after 5.5 seconds
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
            fetch("https://formsubmit.co/ajax/3913dcdbfbd86738eaf23a8cc85231d9", {
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
                    showFormStatus('✓ Odesláno! Zkontrolujte prosím e-mail info@noluproductions.cz pro aktivaci formuláře.', 'success');
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
