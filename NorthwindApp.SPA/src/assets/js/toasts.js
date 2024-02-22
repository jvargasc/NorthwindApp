const liveToastBtn = document.getElementById('liveToastBtn');
// console.log(liveToastBtn);
if (liveToastBtn) {
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast);
  // console.log(liveToast);
  liveToastBtn.addEventListener('click', () => {
    toastBootstrap.show();
  });
}

function showToast() {
  console.log(liveToastBtn);
  console.log('showToast()');
  const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast)
  toastBootstrap.show();
}

// function showToast() {

//   console.log('showToast()');

//   const liveToastBtn = document.getElementById('liveToastBtn')
//   const liveToast = document.getElementById('liveToast')
//   const toastLiveExampleII = document.getElementById('liveToastContainer')

//   // console.log(liveToastBtn);
//   // console.log(liveToast);
//   // console.log(toastLiveExampleII);

//   if (liveToastBtn) {
//     const toastBootstrap = bootstrap.Toast.getOrCreateInstance(liveToast)
//     console.log(liveToast);
//     liveToastBtn.addEventListener('click', () => {
//       toastBootstrap.show();
//       liveToast.classList.add('show');
//       console.log(liveToast);
//     })
//   }
// }
