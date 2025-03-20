// let correspond = {
//     "Имя фамилия": "finame",
//     "Среднее":["avgFrom", "avgTo"]
// }

// let dataFilter = (dataForm) => {
    
//     let dictFilter = {};
//     // перебираем все элементы формы с фильтрами
    
//     for(let j = 0; j < dataForm.elements.length; j++) {

//         // выделяем очередной элемент формы
//         let item = dataForm.elements[j];
        
//         // получаем значение элемента
//         let valInput = item.value;

//         // если поле типа text - приводим его значение к нижнему регистру
//         if (item.type == "text") {
//             valInput = valInput.toLowerCase();
//         } 
//         // Обработка числовых полей
//         else if (item.type == "number") {
//             if (valInput !== "") {
//                 valInput = Number(valInput); // Преобразуем в число
//             } else if (item.id.includes("From")) {
//                 valInput = -Infinity; // Заносим -бесконечность
//             } else if (item.id.includes("To")) {
//                 valInput = Infinity; // Заносим +бесконечность
//             }
//         }

//         // формируем очередной элемент ассоциативного массива
//         dictFilter[item.id] = valInput;
//     }       
//     return dictFilter;
// }

// let filterTable = (data, idTable, dataForm) => {
//     // получаем данные из полей формы
//     let datafilter = dataFilter(dataForm);
    
//     // выбираем данные соответствующие фильтру и формируем таблицу из них
//     let tableFilter = data.filter(item => {
//         let result = true;
        
//         for(let key in item) {
//             let val = item[key];
            
//             // текстовые поля проверяем на вхождение
//             if (typeof val == 'string') {
//                 val = val.toLowerCase();
//                 result &&= val.indexOf(datafilter[key]) !== -1;
//             }
//             // Проверяем числовые поля на принадлежность интервалу
//             else if (typeof val == 'number') {
//                 if (datafilter[key + "From"] !== undefined && val < datafilter[key + "From"]) {
//                     result = false;
//                 }
//                 if (datafilter[key + "To"] !== undefined && val > datafilter[key + "To"]) {
//                     result = false;
//                 }
//             }
//         }
//         return result;
//     });
    
//     // Удаляем все строки таблицы с id=idTable
//     let table = document.getElementById(idTable);
//     if (table) {
//         while (table.rows.length > 1) { // Сохраняем заголовок
//             table.deleteRow(1);
//         }
//     }
    
//     // показать на странице таблицу с отфильтрованными строками
//     createTable(tableFilter, idTable);
// }