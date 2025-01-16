document.addEventListener('DOMContentLoaded', ()=>{
    let currentTab = 0;
    let tabs = [...document.querySelectorAll(".form-tab")];
    
    function showTab(n) {
      tabs[n].classList.add("active");
      if (n == 0) {
        document.querySelector(".button-prev").style.display = "none";
      } else {
        document.querySelector(".button-prev").style.display = "inline";
      }
      if (n == (tabs.length - 1)) {
        document.querySelector(".button-next").style.display = "none";
        document.querySelector(".button-submit").style.display = "block";
      } else {
        document.querySelector(".button-next").style.display = "block";
        document.querySelector(".button-submit").style.display = "none";
      }
    }
    
    function nextPrev(n) {
      let x = [...document.querySelectorAll(".tab")];
      if (n == 1 && !validateForm()) return false;
      x[currentTab].style.display = "none";
      currentTab = currentTab + n;
      if (currentTab >= x.length) {
        document.getElementById("regForm").submit();
        return false;
      }
      showTab(currentTab);
    }
    
    function validateForm() {
      let x, y, i, valid = true;
      x = document.getElementsByClassName("tab");
      y = x[currentTab].getElementsByTagName("input");
      for (i = 0; i < y.length; i++) {
        if (y[i].value == "") {
          y[i].className += " invalid";
          valid = false;
        }
      }
      if (valid) {
        document.getElementsByClassName("step")[currentTab].className += " finish";
      }
      return valid;
    }
    
    function fixStepIndicator(n) {
      let i, x = document.getElementsByClassName("step");
      for (i = 0; i < x.length; i++) {
        x[i].className = x[i].className.replace(" active", "");
      }
      x[n].className += " active";
    }
  //document.querySelector('.form-question').innerHTML = formData[c][0];
  //document.querySelector('.radio-label-1').innerHTML = formData[c][1];
  //document.querySelector('.radio-label-2').innerHTML = formData[c][2];
  //document.querySelector('.radio-label-3').innerHTML = formData[c][3];
  //answers.push(document.querySelector('input[name="ans"]:checked').value)
  document.querySelector('.button-next').addEventListener('click', ()=>{
    tabs[currentTab].classList.remove('active');
    currentTab += 1;
    showTab(currentTab);
  })
  document.querySelector('.button-prev').addEventListener('click', ()=>{
    tabs[currentTab].classList.remove('active');
    currentTab -= 1;
    showTab(currentTab);
  })
});