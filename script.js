function addSubject() {
    var credits = document.getElementById('credits').value;
    var grade = document.getElementById('grade').value;

    if (credits === "" || grade === "") {
        alert('Kérlek, add meg az értékeket!');
        return;
    }

    var table = document.getElementById('subjectTable');
    var row = table.insertRow();

    var cell1 = row.insertCell(0);
    cell1.innerHTML = '<input type="text" value="' + credits + '" disabled>';

    var cell2 = row.insertCell(1);
    cell2.innerHTML = '<input type="text" value="' + grade + '"disabled>';

    var cell3 = row.insertCell(2);
    cell3.innerHTML = '<img src="del.png" class="icon" onclick="deleteSubject(this)">';

    calculateStatistics();
    
    // Reset input fields
    document.getElementById('credits').value = '';
    document.getElementById('grade').value = '';
}

function deleteSubject(button) {
    var row = button.parentNode.parentNode;
    var table = row.parentNode;
    table.removeChild(row);
    calculateStatistics();
}

function calculateStatistics() {
    var table = document.getElementById('subjectTable');
    var rowCount = table.rows.length - 1;
    var totalCredits = 0;
    var totalGradeCredits = 0;
    var averageGrade = 0;

    for (var i = 1; i <= rowCount; i++) {
        var credits = parseInt(table.rows[i].cells[0].getElementsByTagName('input')[0].value);
        var grade = parseInt(table.rows[i].cells[1].getElementsByTagName('input')[0].value);

        totalCredits += credits;

        if (grade > 1) {
            totalGradeCredits += credits;
            averageGrade += (grade * credits);
        }
    }

    var totalSubjects = rowCount;
    averageGrade = totalGradeCredits > 0 ? (averageGrade / totalGradeCredits).toFixed(2) : 0;

    document.getElementById('totalSubjects').innerText = totalSubjects;
    document.getElementById('totalCredits').innerText = totalCredits;
    document.getElementById('totalGradeCredits').innerText = totalGradeCredits;
    document.getElementById('averageGrade').innerText = averageGrade;
}