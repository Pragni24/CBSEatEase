function toggleCalculator() {
   var calculatorPopup = document.getElementById('calculatorPopup');
   if (calculatorPopup.style.display === 'none' || calculatorPopup.style.display === '') {
      calculatorPopup.style.display = 'block';
   } else {
      calculatorPopup.style.display = 'none';
   }
}
