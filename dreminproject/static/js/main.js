document.addEventListener('DOMContentLoaded', ()=>{
    let currentTab = 0;
    let tabs = [...document.querySelectorAll(".form-tab")];
    let secondTabs = [...document.querySelectorAll(".second-tab")];
    let secondStage = false;
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
  document.querySelector('.button-submit').addEventListener('click', ()=>{
    secondStage = true;
    tabs[currentTab].classList.remove('active');
    tabs = secondTabs;
    currentTab = '0';
    document.querySelector(".button-next").style.display = "block";
    document.getElementById(currentTab).classList.add("active");
    document.querySelector(".button-prev").style.display = "none";
    document.querySelector(".button-submit").style.display = "none";
  });

  document.querySelector('.button-next').addEventListener('click', ()=>{
    if (secondStage){
      lastTab = currentTab;
      currentTab = document.querySelector('.active').querySelector('input[name="ans"]:checked').value;
      document.getElementById(lastTab).classList.remove('active');
      if (currentTab.slice(0, 4) == 'exit') {
        
        document.querySelector(".button-next").style.display = "none";
        let results = ['Вклад в банке', [80, 10, 10], [50, 30, 20], [40, 30, 20, 10], 
        [50, 25, 10, 15], [40, 40, 20], [30, 25, 45],
        [50, 30, 20], [45, 25, 15, 15], [30, 40, 30], [30, 25, 45],
        [45, 30, 25], [45, 25, 15, 15], [30, 50, 20], [30, 25, 45],
        [45, 30, 25], [30, 50, 20], [30, 25, 45], [0, 70, 30]]
        let cof = document.querySelector('.stocks-list__item-title').innerHTML;
        let form_r = results[currentTab.slice(5)];
        if (currentTab.slice(5) != '0'){
          let stock = form_r[0]
          bonds = form_r[1], 
          funds = form_r[2];
          let corr = [20, 15, 10, 10, 0, 10, 10, 15, 20, 25];
          if (cof < 5){
            stock -= corr[cof - 1];
            if (cof == 2) {
              funds += 10;
              bonds += 5;
            }else{
              funds += corr[cof - 1]/2;
              bonds += corr[cof - 1]/2;
            }
          }
          if (cof > 5){
            stock += corr[cof - 1];
            if (funds > bonds){
              if (cof == 6 || cof == 7 || cof == 9) {
                funds -= corr[cof - 1]/2;
                bonds -= corr[cof - 1]/2;
              }
              if (cof == 8 ){
                bonds -= 10;
                funds -= 5;
              }
              if (cof == 10){
                bonds -= 15;
                funds -= 10;
              }
            }else{
              bonds -= corr[cof - 1]
            }
          }
          if(form_r.length == 4){
            document.querySelector('.stocks-list__item-title').innerHTML = 'Мы советуваем вам вложить ' + stock + '% в акции, ' + bonds + '% в облигации, ' + funds + '% в фонды и ' + form_r[3] + '% в фьючерсы';
          }else{
            document.querySelector('.stocks-list__item-title').innerHTML = 'Мы советуваем вам вложить ' + stock + '% в акции, ' + bonds + '% в облигации, ' + funds + '% в фонды';
          }
        }else{
          document.querySelector('.stocks-list__item-title').innerHTML = 'Мы бы порекомендовали вам открыть вклад в банке';
        }
        document.querySelector('.form-box').style.display = 'none';
        document.querySelector('.stocks-list__item').style.display = 'block';
      } else {
        document.querySelector(".button-next").style.display = "block";
        document.querySelector(".button-submit").style.display = "none";
        document.getElementById(currentTab).classList.add("active");
      }
    }
    else{
      tabs[currentTab].classList.remove('active');
      currentTab += 1;
      showTab(currentTab);
    }
  })
  document.querySelector('.button-prev').addEventListener('click', ()=>{
    tabs[currentTab].classList.remove('active');
    currentTab -= 1;
    showTab(currentTab);
  })
});