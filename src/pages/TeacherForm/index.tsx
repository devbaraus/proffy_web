import React, {FormEvent, useState} from "react";

import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";

import warningIcon from '../../assets/images/icons/warning.svg'

import './style.css'
import api from "../../services/api";
import { useHistory } from "react-router-dom";


function TeacherForm() {
    const history = useHistory()

    const [scheduleItems, setScheduleItems] = useState([
        {week_day: 0, from: '', to: ''},
    ])

    const [name, setName] = useState('')
    const [avatar, setAvatar] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [bio, setBio] = useState('')

    const [subject, setSubject] = useState('')
    const [cost, setCost] = useState('')


    function addNewScheduleItem() {
        setScheduleItems([
            ...scheduleItems,
            {week_day: 0, from: '', to: ''},
        ]);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault()

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro feito com sucesso!')
            history.push('/')
        }).catch(() => {
            alert('Não foi possível fazer o cadastro!')
        })
    }

    function setScheduleItemValue(position: number, field: string, value: string) {
        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
            if (index === position) {
                return {
                    ...scheduleItem,
                    [field]: value
                }
            }
            return scheduleItem
        })
        setScheduleItems(updatedScheduleItems)
    }

    return (
        <div id="page-teacher-form" className="container">
            <PageHeader
                title="Que incrível que você quer dar aulas."
                description="O primeiro passo é preencher esse formulário de inscrição"
            />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                        <Input label="Nome Completo"
                               name="name"
                               value={name}
                               onChange={e => setName(e.target.value)}
                        />
                        <Input
                            label="Avatar"
                            name="avatar"
                            value={avatar}
                            onChange={e => setAvatar(e.target.value)}
                        />
                        <Input
                            label="Whatsapp"
                            name="whatsapp"
                            value={whatsapp}
                            type="tel"
                            onChange={e => setWhatsapp(e.target.value)}
                        />
                        <Textarea
                            label="Biografia"
                            name="bio"
                            value={bio}
                            onChange={e => setBio(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Sobre a aula</legend>
                        <Select
                            label="Matéria"
                            name="subject"
                            options={[
                                {value: 'Artes', label: 'Artes'},
                                {value: 'Biologia', label: 'Biologia'},
                                {value: 'Ciências', label: 'Ciências'},
                                {value: 'Educação Física', label: 'Educação Física'},
                                {value: 'Geografia', label: 'Geografia'},
                                {value: 'História', label: 'História'},
                                {value: 'Matemática', label: 'Matemática'},
                                {value: 'Português', label: 'Português'},
                                {value: 'Química', label: 'Química'},
                            ]}
                            value={subject}
                            onChange={e => setSubject(e.target.options[e.target.selectedIndex].value)}
                        />
                        <Input
                            label="Custo da sua hora por aula"
                            name="cost"
                            value={cost}
                            onChange={e => setCost(e.target.value)}
                        />
                    </fieldset>
                    <fieldset>
                        <legend>Horários disponíveis
                            <button type="button" onClick={addNewScheduleItem}>
                                + Novo horário
                            </button>
                        </legend>
                        {
                            scheduleItems.map((scheduleItem, index) => {
                                return (
                                    <div key={index} className="schedule-item">
                                        <Select
                                            label="Dia da Semana"
                                            name="week_day"
                                            options={[
                                                {value: '0', label: 'Domingo'},
                                                {value: '1', label: 'Segunda-feira'},
                                                {value: '2', label: 'Terça-feira'},
                                                {value: '3', label: 'Quarta-feira'},
                                                {value: '4', label: 'Quinta-feira'},
                                                {value: '5', label: 'Sexta-feira'},
                                                {value: '6', label: 'Sábado'},
                                            ]}
                                            value={scheduleItem.week_day}
                                            onChange={e => setScheduleItemValue(index, 'week_day', e.target.value)}
                                        />
                                        <Input
                                            label="Das"
                                            name="from"
                                            type="time"
                                            value={scheduleItem.from}
                                            onChange={e => setScheduleItemValue(index, 'from', e.target.value)}
                                        />
                                        <Input
                                            label="Até"
                                            name="to"
                                            type="time"
                                            value={scheduleItem.to}
                                            onChange={e => setScheduleItemValue(index, 'to', e.target.value)}
                                        />
                                    </div>
                                )
                            })
                        }
                    </fieldset>
                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante! <br/>
                            Preencha todos os dados
                        </p>
                        <button type="submit">
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    )
}

export default TeacherForm;
