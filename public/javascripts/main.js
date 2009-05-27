OpenAjax.hub.subscribe('jabbify.*.*', function(name, results){
  console.log(name);
  console.log(results.data);
});

window.sendJab = function(){
  Jabbify.send('message', 'create', { message: 'hello world' });
}

Jabbify.connect({ name: 'Matt' }, sendJab);

document.getElementById('button').onclick = window.sendJab;
