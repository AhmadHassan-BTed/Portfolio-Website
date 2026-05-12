const scriptURL = 'https://script.google.com/macros/s/AKfycbyYFhG-yV0vNvjFb8bIRXAWjBhuti5pz2OSWkScdiWqpNRNzBlhoMGB1VjPP_Y-YLCh/exec';
    const form = document.forms['thisForm'];

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

      fetch(scriptURL, { method: 'POST', body: formData })
        .then(response => {
          tick(); // Call the tick() function after successful form submission
        })
        .catch(error => console.error('Error!', error.message));
    });

    function tick() {
      $(".trigger").toggleClass("drawn");

      if ($(".trigger").hasClass("drawn")) {
        $(".doneTick").css("left", "37vw");

        setTimeout(function () {
          $(".trigger").removeClass("drawn");

          setTimeout(function () {
            $(".doneTick").css("left", "0vw");
            $(".doneTick").css("bottom", "10vw");
          }, 2000);
        }, 2000);
      }

      // Clear form fields
      form.reset();

      // Hide date and time fields
      document.getElementById('date').style.display = 'none';
      document.getElementById('time').style.display = 'none';
    }