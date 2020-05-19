const wrapper = document.querySelector('#wrapper');
const layerOne = document.querySelector('#layer-1');
const layerTwo = document.querySelector('#layer-2');
const layerThree = document.querySelector('#layer-3');
const layerFour = document.querySelector('#layer-4');

wrapper.addEventListener('mousemove', (e) => {
   const x = e.clientX - window.innerWidth / 2;
   const y = e.clientY - window.innerHeight / 2;

   layerOne.style.transform = 'translateX(-' + (50 + x / 200) + '%) translateY(-' + (50 + y / 200) + '%)';
   layerTwo.style.transform = 'translateX(-' + (50 + x / 1000) + '%) translateY(-' + (50 + y / 1000) + '%)';
   layerThree.style.transform = 'translateX(-' + (50 + x / 200) + '%) translateY(-' + (50 + y / 200) + '%)';
   layerFour.style.transform = 'translateX(-' + (50 + x / 25) + '%) translateY(-' + (50 + y / 25) + '%)';
});



















