document.addEventListener('DOMContentLoaded', function() {
  const toggleButton = document.getElementById('toggleButton');
  const body = document.body;
  const modeImage = document.getElementById('modeImage');
  const icon = document.querySelector('.icon');
  const portfolioArrow = document.getElementById('portfolioArrow');
  const portfolioMenu = document.getElementById('portfolioMenu');
  const floatingText = document.getElementById('floatingText');
  const authorName = document.getElementById('authorName');
  const leftEye = document.querySelector('.left-eye');
  const rightEye = document.querySelector('.right-eye');
  const imageModal = document.getElementById('imageModal');
  const modalImage = document.getElementById('modalImage');
  const closeModal = document.querySelector('.close-modal');
  const viewButtons = document.querySelectorAll('.view-btn');

  // Toggle dark/light mode
  toggleButton.addEventListener('click', function() {
      if (body.classList.contains('dark-mode')) {
          body.classList.remove('dark-mode');
          body.classList.add('light-mode');
          modeImage.src = 'PF/Lightmode.gif';
          icon.textContent = '☀️'; // Sun icon for light mode
          portfolioArrow.querySelector('.arrow-icon').textContent = '☁️'; // Cloud icon for light mode
      } else {
          body.classList.remove('light-mode');
          body.classList.add('dark-mode');
          modeImage.src = 'PF/Darkmode.gif';
          icon.textContent = '🌙'; // Moon icon for dark mode
          portfolioArrow.querySelector('.arrow-icon').textContent = '⭐'; // Star icon for dark mode
      }
  });

  // Toggle portfolio menu
  portfolioArrow.addEventListener('click', function(event) {
      event.stopPropagation();
      
      if (portfolioMenu.classList.contains('show')) {
          // Hide menu with animation
          portfolioMenu.classList.remove('show');
          portfolioMenu.classList.add('hide');
          setTimeout(() => {
              portfolioMenu.style.display = 'none';
              portfolioMenu.classList.remove('hide');
          }, 500);
      } else {
          // Show menu with animation
          portfolioMenu.style.display = 'flex';
          portfolioMenu.classList.add('show');
          
          // Add ear tracking
          setTimeout(() => {
              addEarTracking();
          }, 600);
      }
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
      if (!portfolioArrow.contains(event.target) && !portfolioMenu.contains(event.target)) {
          if (portfolioMenu.classList.contains('show')) {
              portfolioMenu.classList.remove('show');
              portfolioMenu.classList.add('hide');
              setTimeout(() => {
                  portfolioMenu.style.display = 'none';
                  portfolioMenu.classList.remove('hide');
              }, 500);
          }
      }
  });

  // Prevent closing when clicking inside the menu
  portfolioMenu.addEventListener('click', function(event) {
      event.stopPropagation();
  });

  // View CV Image in Modal
  viewButtons.forEach(button => {
      button.addEventListener('click', function() {
          const imgSrc = this.getAttribute('data-img');
          modalImage.src = imgSrc;
          imageModal.style.display = 'block';
          
          // Add subtle loading animation
          modalImage.style.opacity = '0';
          setTimeout(() => {
              modalImage.style.opacity = '1';
          }, 200);
      });
  });
  
  // Close modal
  closeModal.addEventListener('click', function() {
      imageModal.style.opacity = '0';
      setTimeout(() => {
          imageModal.style.display = 'none';
          imageModal.style.opacity = '1';
      }, 300);
  });
  
  // Close modal when clicking outside the content
  imageModal.addEventListener('click', function(event) {
      if (event.target === imageModal) {
          imageModal.style.opacity = '0';
          setTimeout(() => {
              imageModal.style.display = 'none';
              imageModal.style.opacity = '1';
          }, 300);
      }
  });

  // Add keyboard support for modal (Escape key closes modal)
  document.addEventListener('keydown', function(event) {
      if (event.key === 'Escape' && imageModal.style.display === 'block') {
          imageModal.style.opacity = '0';
          setTimeout(() => {
              imageModal.style.display = 'none';
              imageModal.style.opacity = '1';
          }, 300);
      }
  });

  // Typing effect for floating text
  const text = "ABOUT ME";
  let i = 0;
  let typingSpeed = 100;
  
  function typeWriter() {
      if (i < text.length) {
          floatingText.textContent += text.charAt(i);
          i++;
          
          // Add a slight random delay for realistic typing
          const randomDelay = Math.floor(Math.random() * 50) + typingSpeed;
          setTimeout(typeWriter, randomDelay);
          
          // Add subtle animation to the text
          floatingText.style.textShadow = `0 0 ${10 + Math.random() * 5}px rgba(0, 128, 255, 0.8), 0 0 ${20 + Math.random() * 5}px rgba(0, 128, 255, 0.4)`;
      } else {
          // When typing is complete, add pulsing effect
          floatingText.classList.add('pulse-glow');
          
          // Reveal author name with animation
          setTimeout(() => {
              authorName.style.opacity = '1';
              authorName.style.transform = 'translate(-50%, 0) scale(1.05)';
              
              // Add floating animation
              setTimeout(() => {
                  authorName.style.animation = 'float 3s ease-in-out infinite';
              }, 500);
          }, 800);
      }
  }
  
  // Add ear tracking based on mouse movement
  function addEarTracking() {
      document.addEventListener('mousemove', function(e) {
          if (portfolioMenu.classList.contains('show')) {
              const mouseX = e.clientX;
              const mouseY = e.clientY;
              
              const menuRect = portfolioMenu.getBoundingClientRect();
              const menuCenterX = menuRect.left + menuRect.width / 2;
              const menuCenterY = menuRect.top + menuRect.height / 2;
              
              // Calculate angle between mouse and menu center
              const deltaX = mouseX - menuCenterX;
              const deltaY = mouseY - menuCenterY;
              
              // Move eyes to follow cursor
              if (leftEye && rightEye) {
                  const maxEyeMove = 5;
                  const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
                  const normX = deltaX / distance || 0; // Avoid division by zero
                  const normY = deltaY / distance || 0; // Avoid division by zero
                  
                  leftEye.style.transform = `translate(${normX * maxEyeMove}px, ${normY * maxEyeMove}px)`;
                  rightEye.style.transform = `translate(${normX * maxEyeMove}px, ${normY * maxEyeMove}px)`;
              }
          }
      });
  }
  
  // Start typing effect after a short delay
  setTimeout(typeWriter, 800);
  
  // Add initial animations for elements
  modeImage.addEventListener('load', function() {
      modeImage.style.transform = 'scale(1.03)';
      modeImage.style.filter = 'contrast(130%) brightness(105%) saturate(130%)';
      
      setTimeout(() => {
          modeImage.style.transform = 'scale(1)';
      }, 500);
  });
  
  // Add hover effects to info cards
  const infoCards = document.querySelectorAll('.info-card');
  infoCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          this.style.transform = 'translateY(-5px)';
          this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3), 0 0 20px rgba(0, 128, 255, 0.2)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.transform = '';
          this.style.boxShadow = '';
      });
  });
  
  // Add animations to skill tags
  const skillTags = document.querySelectorAll('.skill-tags span');
  skillTags.forEach((tag, index) => {
      tag.style.animation = `fadeIn 0.3s ease forwards ${index * 0.05}s`;
      tag.style.opacity = '0';
  });
  
  // Add hover effect to CV cards
  const cvCards = document.querySelectorAll('.cv-card');
  cvCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
          // Add glow effect
          this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3), 0 0 25px rgba(0, 128, 255, 0.3)';
      });
      
      card.addEventListener('mouseleave', function() {
          this.style.boxShadow = '';
      });
  });
  
  // Image zoom on hover
  modalImage.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.02)';
      this.style.transition = 'transform 0.3s ease';
  });
  
  modalImage.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
  });

  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  
  cvCards.forEach(card => {
      if (isMobile) {
          // Mobile-specific adjustments
          const overlay = card.querySelector('.cv-overlay');
          const image = card.querySelector('.cv-image');
          
          // Make overlay always visible on mobile
          if (overlay) {
              overlay.style.opacity = '1';
              overlay.style.background = 'rgba(0, 20, 50, 0.85)';
              overlay.style.padding = '10px';
          }
          
          // Adjust image for mobile
          if (image) {
              image.style.filter = 'blur(1px) brightness(0.8)';
          }
          
          // Make entire card clickable to view
          card.style.cursor = 'pointer';
          card.addEventListener('click', function(e) {
              if (!e.target.closest('.cv-action-btn')) {
                  const viewBtn = this.querySelector('.view-btn');
                  if (viewBtn) viewBtn.click();
              }
          });
      } else {
          // Desktop hover effects
          card.addEventListener('mouseenter', function() {
              this.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.3), 0 0 25px rgba(0, 128, 255, 0.3)';
          });
          
          card.addEventListener('mouseleave', function() {
              this.style.boxShadow = '';
          });
      }
      
      // Prevent button text from wrapping
      const buttons = card.querySelectorAll('.cv-action-btn');
      buttons.forEach(btn => {
          btn.style.whiteSpace = 'nowrap';
      });
  });
});