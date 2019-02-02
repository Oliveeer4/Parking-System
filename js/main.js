document.getElementById('formulario').addEventListener('submit' , cadastrarVeiculo);
function cadastrarVeiculo(e){
    let modeloVeiculo = document.getElementById('modeloVeiculo').value;
    let placaoVeiculo = document.getElementById('placaVeiculo').value;
    let time = new Date();

    if(!modeloVeiculo && !placaoVeiculo){
        alert("Preencha os dados para o cadastramento deste veiculo...");
        return false;
    }

    carro = {
        modelo: modeloVeiculo,
        placa: placaoVeiculo,
        hora: time.getHours(),
        minutos: time.getMinutes(),
        segundos: time.getSeconds()
    }

    if(localStorage.getItem('patio2') == null){
        let carros = [];
        carros.push(carro);
        localStorage.setItem('patio2', JSON.stringify(carros));
        
        
    }else{
        let carros = JSON.parse(localStorage.getItem('patio2'));
        carros.push(carro);
        localStorage.setItem('patio2', JSON.stringify(carros));
    mostrarPatio();
    document.getElementById('formulario').reset(); 
    e.preventDefault();

}
}
//Remove placa
function deleteCar(placa){
    let carros = JSON.parse(localStorage.getItem('patio2'));
    for(let i = 0; i < carros.length; i++){
        if(carros[i].placa == placa){
            carros.splice(i, 1);
        }
        localStorage.setItem('patio2', JSON.stringify(carros));
    }
    
    mostrarPatio();
}
function mostrarPatio(){
    let carros = JSON.parse(localStorage.getItem('patio2'));
    let carrosResultado = document.getElementById('resultado');
    

    carrosResultado.innerHTML = '';
    for(let i = 0; i < carros.length; i ++){
        let modelo = carros [i].modelo;
        let placa = carros [i].placa;
        let hora = carros [i].hora;
        let minutos = carros [i].minutos;
        let segundos = carros [i].segundos;
        carrosResultado.innerHTML += '<tr><td>'+ modelo + '</td>'+
        '<td>'+ placa + '</td>' +
        '<td>'+ hora + ':' + minutos + '</td>' +
        '<td><button class="btn btn-danger" onclick="deleteCar(\''+placa+'\')">Delete</button><td/>' +
'</tr>';

    }

}
