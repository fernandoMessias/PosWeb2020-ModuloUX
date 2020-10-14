let listTipoAtendimento = [];
let voluntarios = [
    {
        id: '1',
        nome: "Dr. Mário Lopez",
        especialidade: "Clínico Geral"
    },
    {
        id: '2',
        nome: "Dra. Sandra Ramos",
        especialidade: "Fisioterapeuta"
    },
    {
        id: '3',
        nome : "Pedro Andrade",
        especialidade: "Outros"
    },
    {
        id: '4',
        nome: "Dra. Patrícia Sanches",
        especialidade: "Psicóloga"
    }
];

$('.selectable').click(function(e){
    let $el = $(e.target);
    let $horario = $('#datepicker');
    let tipoAtendimento = $el.data('tipo-atendimento');
    let hasTipoAtendimento = listTipoAtendimento.filter((tipo)=>tipo==tipoAtendimento).length == 1;

    $el.toggleClass('selected');
    
    if(hasTipoAtendimento) {
        listTipoAtendimento = listTipoAtendimento.filter((tipo)=>tipo!=tipoAtendimento)
    }
    else {
        listTipoAtendimento.push(tipoAtendimento);
    }

    if($horario.val() != '') {
        showVoluntarios();
    }
});

$('#datepicker').on('change', function(e){
    let $el = $(e.target);
    if($el.val() == '') {
        $('#voluntarios').addClass('d-none');
    }
    else {
        showVoluntarios();
    }
});

function showVoluntarios() {
    $('#voluntarios').removeClass('d-none');
    $('input[name="voluntario"]').off('change');
    $('#voluntarios > fieldset').empty();

    let voluntariosDesejados = voluntarios.filter((voluntario)=>{
        let hasTipoAtendimento = false;
        listTipoAtendimento.map((tipoAtendimento)=>{
            if(!hasTipoAtendimento)
            hasTipoAtendimento = tipoAtendimento == voluntario.especialidade;
        });
        return hasTipoAtendimento;
    });

    voluntariosDesejados.map((voluntario)=>addVoluntario(voluntario));
    $('input[name="voluntario"]').on('change', selectVoluntario);
}

function addVoluntario(voluntario) {
    let template = `<div class="input-group border-bottom mb-3">
                        <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input id="voluntario-${voluntario.id}" type="radio" name="voluntario" value="${voluntario.nome}">
                        </div>
                        </div>
                        <label for="voluntario-${voluntario.id}" class="ml-2 mb-2">
                        <p class="mb-0">${voluntario.nome}</p>
                        <small class="text-muted">${voluntario.especialidade}</small>
                        </label>
                    </div>`;
    $('#voluntarios > fieldset').append($(template));
    //document.querySelector('#voluntarios > fieldset').insertAdjacentHTML('beforeend', template);
}

function selectVoluntario(e) {
    let $el = $(e.target);
    $('#horarios').removeClass('d-none');
    console.log(e.target);
}