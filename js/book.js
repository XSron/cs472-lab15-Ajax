$(document).ready(function(){
    $.ajax('https://elibraryrestapi.herokuapp.com/elibrary/api/book/list',
    {
        "type": "GET"
    }).done((data) => {
        const booklist = data
        const tbBook = $("#tbBook")
        booklist.forEach((book, index) => {
            tbBook.append(`
                <tr>
                    <th>${index+1}</th>
                    <td>${book.isbn}</td>
                    <td>${book.title}</td>
                    <td>${book.overdueFee}</td>
                    <td>${book.publisher}</td>
                    <td>${book.datePublished}</td>
                </tr>
            `)
        })
    }).fail((jqXHR, textStatus, errorThrown) => {
        alert(textStatus)
    })

    $("#frmBook").submit((e) => {
        e.preventDefault();
        $.ajax('https://elibraryrestapi.herokuapp.com/elibrary/api/book/add',
        {
            type: "POST",
            contentType: "application/json",
            data: JSON.stringify({
                isbn: $("#isbn").val(),
                title: $("#title").val(),
                overdueFee: $("#overdue").val(),
                publisher: $("#publisher").val(),
                datePublished: $("#datePublished").val()
            })
        }).done(data => {
            alert('succeed')
            window.location.replace("../html/booklist.html");
        }).fail((jqXHR, textStatus, errorThrown) => {
            alert(JSON.stringify(jqXHR))
        })
    })
})