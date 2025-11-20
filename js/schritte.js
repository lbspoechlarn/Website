let currentStep = 0;
  const totalSteps = 3;

  const steps = document.querySelectorAll('.step');
  const dots = document.querySelectorAll('.dot');
  const nextBtn = document.getElementById('nextBtn');

  function updateSteps() {
    steps.forEach((step, index) => {
      step.style.opacity = index === currentStep ? '1' : '0';
      step.style.transform = index === currentStep ? 'translateY(0)' : 'translateY(20px)';
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle('bg-green-500', index === currentStep);
      dot.classList.toggle('bg-gray-600', index !== currentStep);
    });

    if (currentStep === totalSteps - 1) {
      nextBtn.textContent = 'Los geht\'s!';
    }
  }

  nextBtn.addEventListener('click', () => {
    if (currentStep < totalSteps - 1) {
      currentStep++;
      updateSteps();
    } else {
      window.location.href = '../index.html';
    }
  });

  updateSteps();