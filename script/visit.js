document.addEventListener('DOMContentLoaded', function(){
    let check = document.getElementById('checkAvailability')
    const errorMessage = document.getElementById('error_message');
    check.addEventListener('click', function(event){
        event.preventDefault();
        let numVisitor = document.getElementById('number_of_visitors').value;
        let numVisitorParsed = parseFloat(numVisitor, 10);
        let booking_date = document.getElementById('booking_date').value;
        let time = document.getElementById('time').value;
        if (numVisitor.length === 0){
            errorMessage.setAttribute('style', 'text-align: center; color: red;');
            errorMessage.textContent = 'Data not completed, please re-enter';
        } else if (numVisitorParsed <= 0 || isNaN(numVisitor) || Math.floor(numVisitorParsed) != numVisitorParsed){
            errorMessage.setAttribute('style', 'text-align: center; color: red;');
            errorMessage.textContent = 'Please enter a valid number of people';
        } else {
            if (reserve(booking_date, time, numVisitor)){
                alert('Your reservation is successful');
                errorMessage.textContent = '';
            } else {
                alert('Sorry, the reservation is full!!');
                errorMessage.textContent = '';
            }
        }
    })
    let reset = document.getElementById('resetContent');
    reset.addEventListener('click', function(){
        errorMessage.setAttribute('style', 'display:None;');
    })
})