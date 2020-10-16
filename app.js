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

let agendamento = {
    data: '',
    voluntario: {},
    horario: ''
}

let selectedNumber = 0;

$('.selectable').click(function(e){
    clearHorarios();
    let $el = $(e.target);
    let $data = $('#datepicker');
    let tipoAtendimento = $el.data('tipo-atendimento');
    let hasTipoAtendimento = listTipoAtendimento.filter((tipo)=>tipo==tipoAtendimento).length == 1;

    $el.toggleClass('selected');

    if ($el.hasClass('selected')) {
        selectedNumber++;
    } else {
        selectedNumber--;
    }

    if (selectedNumber > 0) {
        $('#calendario').removeClass('d-none');
        $('#voluntarios').removeClass('text-white');
    } else {
        $('#calendario').addClass('d-none');
        $('#voluntarios').addClass('text-white');
    }
    
    if(hasTipoAtendimento) {
        listTipoAtendimento = listTipoAtendimento.filter((tipo)=>tipo!=tipoAtendimento)
    }
    else {
        listTipoAtendimento.push(tipoAtendimento);
    }

    if($data.val() != '') {
        showVoluntarios();
        $('#horarios').addClass('d-none');
    }
});

$('#datepicker').on('change', function(e){
    clearHorarios();
    let $data = $(e.target);
    $('#horarios').addClass('d-none');
    if($data.val() == '') {
        $('#voluntarios').addClass('d-none');        
    }
    else {
        agendamento.data = moment($data.val(), "DD-MM-YYYY");
        showVoluntarios();
        agendamento.data.locale('pt-br');
        agendamento.data.format('LL');
    }
});

$('.horario-agendamento').click(function(e){
    e.preventDefault();

    clearHorarios();
    let $el = $(e.currentTarget);
    
    $el.addClass('selected');
    agendamento.horario = $el.data('horario');

    resumeAgendamento();

});

function showVoluntarios() {
    let legend = `<legend class="sr-only">Escolha o profissional</legend>`;
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

    $('#voluntarios > fieldset').append($(legend));
    voluntariosDesejados.map((voluntario)=>addVoluntario(voluntario));
    $('input[name="voluntario"]').on('change', selectVoluntario);
}

function addVoluntario(voluntario) {
    let template = `<div class="input-group border-bottom mb-3">
                        <div class="input-group-prepend">
                        <div class="input-group-text">
                            <input id="voluntario-${voluntario.id}" type="radio" name="voluntario" value="${voluntario.id}">
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
    clearHorarios();
    let $el = $(e.target);
    $('#horarios').removeClass('d-none');
    agendamento.voluntario = voluntarios.filter((voluntario)=>voluntario.id == $el.val())[0];
}

function resumeAgendamento() {
    let $resumo = $('#resumo-atendimento');
    $resumo.empty();

    if(agendamento.horario == '') return;

    $('#resume-box').removeClass('d-none');
    agendamento.data.locale('pt-br');
    let template = `<div class="col-12 col-md-6 mb-1">
                        ${agendamento.voluntario.nome} <span class="badge badge-pill badge-primary ml-2"> ${agendamento.voluntario.especialidade}</span>
                    </div>
                    <div class="col-12 col-md-6 text-md-right">
                        <small>${agendamento.data.format('LL')} ${agendamento.horario}</small>
                    </div>`;
    $resumo.append($(template));
}

function clearHorarios(){
    let $listHorarios = $('.horario-agendamento');

    $listHorarios.each(function(){
        $(this).removeClass('selected');
    });

    agendamento.horario = '';
    $('#resume-box').addClass('d-none');

    resumeAgendamento();
}