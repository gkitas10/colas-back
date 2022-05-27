var socket=io();

var searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('Escritorio is required')
}

var computer = searchParams.get('escritorio');
console.log(computer);
var label = $('small');

$('h1').text('Escritorio '+computer);

$('button').on('click', function () {
    socket.emit('assignTicket', { computer:computer }, function (res) {
        if(res === 'There are no tickets'){
            label.text(res);
            alert(res);
            return;
        }

        label.text('Ticket '+ res.number);
    });
});