document.addEventListener('DOMContentLoaded',function(){
    const head_tech = document.querySelector('.head_tech');
    const tech_form = document.querySelector('.technology_zone');
    const innovation_form = document.querySelector('.innovation_zone');
    const ecology_form = document.querySelector('.ecology_zone');
    head_tech.setAttribute('style', 'background-color: white; color: black;');
    tech_form.setAttribute('style', 'display: block; margin-top: 20px; background-color: #E6E6FA;');
    const header = document.querySelectorAll('.apply_block h3');

    function resetHeaders() {
        for (let i=0; i<header.length; i++){
            header[i].setAttribute('style','background-color: #663399; color: white;');
        }
    }

    for (let i = 0; i<header.length; i++){
        header[i].addEventListener('click', function(){
            resetHeaders();
            header[i].setAttribute('style', 'background-color: white; color: black;');
            if (header[i].innerHTML == 'Technology Zone'){
                innovation_form.setAttribute('style', 'display: none');
                ecology_form.setAttribute('style', 'display: none');
                tech_form.setAttribute('style', 'display: block; margin-top: 20px; background-color: #E6E6FA;');
            }
            if (header[i].innerHTML == 'Innovation Zone'){
                tech_form.setAttribute('style', 'display: none');
                ecology_form.setAttribute('style', 'display: none');
                innovation_form.setAttribute('style', 'display: block; margin-top: 20px; background-color: #E6E6FA;');
            }
            if (header[i].innerHTML == 'Ecology Zone'){
                tech_form.setAttribute('style', 'display: none');
                innovation_form.setAttribute('style', 'display: none');
                ecology_form.setAttribute('style', 'display: block; margin-top: 20px; background-color: #E6E6FA;');
            }
        })
    }

    const techList = ['TechWave Solutions', 'Quantum Leap Technologies', 'CyberGuard Systems', 'SmartCity Innovations', 'Connectify Networks'];
    const innovationList = ['Ecotech Labs', 'HealthSphere Innovations', 'CreaTech Studio'];
    const ecologyList = ['GreenFuture Enterprises', 'WaterWise Solutions', 'ReCycle Innovations', 'Ecobuild Technologies'];
    const buttons = document.querySelectorAll('button');
    const labels = document.querySelectorAll('label');
    let company_storage = [];
    let rank_storage = {};

    function updateTable() {
        for (let i = 1; i <= 10; i++) {
            document.getElementById("zone" + i).innerHTML = "";
            document.getElementById("company" + i).innerHTML = "";
        }
        
        for (let rank in rank_storage) {
            let companyName = rank_storage[rank];
            document.getElementById("company" + rank).innerHTML = companyName;
            
            let zone = "";
            if (techList.includes(companyName)) {
                zone = "Technology";
            } else if (innovationList.includes(companyName)) {
                zone = "Innovation";
            } else {
                zone = "Ecology";
            }
            document.getElementById("zone" + rank).innerHTML = zone;
        }
        document.getElementById("total_num").innerHTML = "Total number of completed choices: " + Object.keys(rank_storage).length;
        document.getElementById("time").innerHTML = "Last change time: " + new Date();
    }


    let rank_data = []
    for (let i = 0; i < buttons.length; i++) {
    (function(index) {
        buttons[index].addEventListener('click', function(event) {
            event.preventDefault();
            if (index < labels.length) {
                var selectedCompany = labels[index].textContent;
            } else{
                return;
            }
            let rankInput = buttons[index].previousElementSibling; 
            let rank = parseInt(rankInput.value);
            if (isNaN(rank) || rank != rankInput.value) {
                alert('Please enter the rank of chosen company');
                rankInput.value = '';
                return;
            } else if (rank < 1 || rank > 10){
                alert('Please enter the rank of chosen company between 1 and 10');
                rankInput.value = '';
            } else if (company_storage.includes(selectedCompany)) {
                alert('You have already chosen the company.');
                rankInput.value = '';
                return;
            } else if (rank_storage[rank]) {
                alert('You have already chosen the rank');
                rankInput.value = '';
                return;
            } else{
                company_storage.push(selectedCompany);
                rank_storage[rank] = selectedCompany; 
                rank_data.push(rank)
                updateTable();
                let suffix;
                if (rank === 1) {
                    suffix = 'st';
                } else if (rank === 2) {
                    suffix = 'nd';
                } else if (rank === 3) {
                    suffix = 'rd';
                } else {
                    suffix = 'th'; 
                }
                let displayMessage = 'You have chosen ' + selectedCompany + ' as rank ' + rank + suffix + ' in ';
                if (techList.includes(selectedCompany)) {
                    displayMessage += 'Technology Zone Successfully.';
                } else if (innovationList.includes(selectedCompany)) {
                    displayMessage += 'Innovation Zone Successfully.';
                } else {
                    displayMessage += 'Ecology Zone Successfully.';
                }
                alert(displayMessage);
                rankInput.value = ''
        }
        });
    })(i)};

    let text = '';
    const error_message = document.getElementById('error');
    let blank_set = new Set();
    let blank_list = []

    document.getElementById('submit').onclick = function(){
        // Check if table is empty
        if (Object.keys(rank_storage).length === 0) {
            error_message.textContent = 'You have not chosen any company';
            error_message.setAttribute('style', 'color: red; text-align: center;');
            return;
        }

        let ranks = Object.keys(rank_storage).map(Number).sort((a, b) => a - b);
        for (let i = 0; i<ranks.length; i++){
            if (ranks[i + 1] - ranks[i] > 1 || (ranks[i - 1] === undefined && (ranks[i] > 1)) || (ranks.length === 1 && ranks[i] != 1)) {
                for (let j = 1; j<=Math.max(...rank_data); j++){
                    if (rank_data.includes(j)){
                        continue;
                    }
                    else {
                        blank_set.add(j);
                    }
                }  
            }
    }
    
        blank_list = Array.from(blank_set);
        for (let x = 0; x<blank_list.length; x++){
            if (rank_data.includes(blank_list[x])){
                blank_list.splice(x, 1);
                x -= 1;
            }
        }

        if (blank_list.length >= 1){
            for (let index = 0; index<blank_list.length; index++){
                if (blank_list[index] === 1) {
                    if (index === 0){
                        text += blank_list[index] + 'st';
                    }
                } else if (blank_list[index] === 2) {
                    if (index === 0){
                        text += blank_list[index] + 'nd';
                    } else if (blank_list.length === 2) {
                        text += ' and ' + blank_list[index] + 'nd';
                    } else {
                        text += ', ' + blank_list[index] + 'nd';
                    }
                } else if (blank_list[index] === 3){
                    if (index === 0){
                        text += blank_list[index] + 'rd';
                    } else if (blank_list.length === 2) {
                        text += ' and ' + blank_list[index] + 'rd';
                    } else if (blank_list.length -1 === index) {
                        text += ', and ' + blank_list[index] + 'rd';
                    }
                    else {
                        text += ', ' + blank_list[index] + 'rd';
                    }
                } else{
                    if (index === 0){
                        text += blank_list[index] + 'th';
                    } else if (blank_list.length === 2 || blank_list.length -1 === index) {
                        text += ' and ' + blank_list[index] + 'th';
                    } else if (blank_list.length -1 === index) {
                        text += ', and ' + blank_list[index] + 'rd';
                    }
                    else {
                        text += ', ' + blank_list[index] + 'th';
                    }
                }
            }
            error_message.textContent = "You have not chosen your " + text + " chosen company, you cannot leave any gap between your chosen companies.";
            error_message.setAttribute('style', 'color: red; text-align: center;');
            text = ''
            return;
        } 
        // If all checks pass, submit the form
        updateTable();
        error_message.textContent = 'You have successfully submitted your application at time ' + new Date();
        error_message.setAttribute('style', 'color: red; text-align: center;');
    }

        // Add clear button functionality
        document.getElementById('clear').onclick = function() {
            rank_data = [];
            ranks = {};
            blank_list = [];
            blank_set = new Set();
            rank_storage = {};
            company_storage = [];
            updateTable();
            error_message.textContent = '';
        }
})