const scriptURL = 'https://script.google.com/macros/s/AKfycbxE3aTkRIDpfNBQNZxt14Syi6bDc-B-37f3Re75L59Ac_3hQH8sWNZHhkFXLpRsOHd2cA/exec'
const form = document.forms['thisHireMeForm']


   // Set the initial values for date and time fields on page load
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString();
    document.getElementById('date').value = formattedDate;
    document.getElementById('time').value = formattedTime;

 form.addEventListener('submit', e => {
      e.preventDefault();

      // Update form data with the current date and time
      const formData = new FormData(form);
      formData.append('date', formattedDate);
      formData.append('time', formattedTime);

      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
    .then(response =>  tick()
    // alert("Thanks for Contacting us..! We Will Contact You Soon...")
    )
    .catch(error => console.error('Error!', error.message))
});
    
    function tick() {
     $(".trigger").toggleClass("drawn");

    if ($(".trigger").hasClass("drawn")) {
        $(".doneTick").css("left", "37vw");
        // event.preventDefault(); // Prevent form submission
                setTimeout(function () {
                    $(".trigger").removeClass("drawn");

                    setTimeout(function () {
                    $(".doneTick").css("left", "0vw");

                }, 2000);
                }, 2000);
    }  
    // Clear form fields
    $("#myHireMeForm")[0].reset();    

      // Hide date and time fields
      document.getElementById('date').style.display = 'none';
      document.getElementById('time').style.display = 'none';
    }
