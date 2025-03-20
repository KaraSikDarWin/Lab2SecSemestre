function filterTable(data, tableId, form) {
    resetSorting();

    const nameFilter = form.fiName.value.toLowerCase().trim();
    const avgFrom = parseFloat(form.numberFrom.value) || -Infinity;
    const avgTo = parseFloat(form.numberTo.value) || Infinity;
    const bestFrom = parseFloat(form.bestFrom.value) || -Infinity;
    const bestTo = parseFloat(form.bestTo.value) || Infinity;

    const filteredData = data.filter(entry => {
        let bestTime = entry.results[0]; 
        for (let i = 1; i < entry.results.length; i++) {
            if (entry.results[i] < bestTime) {
                bestTime = entry.results[i];
            }
        }
        return (
            (nameFilter === "" || entry.name.toLowerCase().includes(nameFilter)) &&
            (entry.avg >= avgFrom && entry.avg <= avgTo) &&
            (bestTime >= bestFrom && bestTime <= bestTo)
        );
    });

    renderTable(filteredData, tableId);
}

function renderTable(data, tableId) {
    const tableBody = document.getElementById(tableId).getElementsByTagName('tbody')[0];
    tableBody.innerHTML = ""; 
    
    data.forEach(entry => {
        const row = tableBody.insertRow();
        row.insertCell(0).textContent = entry.number;
        row.insertCell(1).textContent = entry.name;
        entry.results.forEach(time => row.insertCell(-1).textContent = time);
        row.insertCell(-1).textContent = entry.avg;
    });
}

function resetFilter(form, data){
    resetSorting();
form.fiName.value ="";
form.numberFrom.value="";
form.numberTo.value="";
form.bestFrom.value="";
form.bestTo.value="";
renderTable(data,"list");
}

