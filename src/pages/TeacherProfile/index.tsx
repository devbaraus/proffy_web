import React, { FormEvent, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import PageHeader from '../../components/PageHeader'
import Input from '../../components/Input'
import Textarea from '../../components/Textarea'
import Select from '../../components/Select'
import warningIcon from '../../assets/images/icons/warning.svg'
import cameraIcon from '../../assets/images/icons/camera.svg'
import { UserData } from '../../contexts/auth'
import api from '../../services/api'
import './styles.scss'
import backgroundImg from '../../assets/images/success-background.svg'

function TeacherProfile() {
  const history = useHistory()

  const [scheduleItems, setScheduleItems] = useState([
    { week_day: 0, from: '', to: '' },
  ])

  const [name, setName] = useState('')
  const [surname, setSurname] = useState('')
  const [avatar, setAvatar] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  const [subject, setSubject] = useState('')
  const [cost, setCost] = useState('')

  function addNewScheduleItem() {
    setScheduleItems([...scheduleItems, { week_day: 0, from: '', to: '' }])
  }

  function handleDeleteClass(index: number) {
    let initialSchedule = [...scheduleItems]
    initialSchedule.splice(index, 1)
    setScheduleItems(initialSchedule)
  }

  function handleCreateClass(e: FormEvent) {
    e.preventDefault()

    api
      .post('classes', {
        name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost: Number(cost),
        schedule: scheduleItems,
      })
      .then(() => {
        alert('Cadastro feito com sucesso!')
        history.push('/')
      })
      .catch(() => {
        alert('Não foi possível fazer o cadastro!')
      })
  }

  function setScheduleItemValue(
    position: number,
    field: string,
    value: string,
  ) {
    const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {
      if (index === position) {
        return {
          ...scheduleItem,
          [field]: value,
        }
      }
      return scheduleItem
    })
    setScheduleItems(updatedScheduleItems)
  }

  function handleUploadAvatar() {
    const el = document.createElement('input')
    el.setAttribute('type', 'file')
    el.setAttribute('accept', 'image/*')
    el.click()
    el.addEventListener('change', async () => {
      if (el.files && el.files[0]) {
        let reader = new FileReader()

        reader.onload = imageIsLoaded
        reader.readAsDataURL(el.files[0])

        await uploadAvatar({ image: el.files[0] })
      }
    })

    function imageIsLoaded(e: ProgressEvent<FileReader>) {
      // @ts-ignore
      setAvatar(e.target.result)
    }

    async function uploadAvatar({ image }: { image: any }) {
      const formData = new FormData()
      formData.append('image', image)
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
        },
      }
      return api.post('avatar', formData, config)
    }
  }

  useEffect(() => {
    api.get('profile').then((response) => {
      // @ts-ignore
      const { name, email, avatar, surname, bio, whatsapp } = response.data
        .user as UserData

      setName(name as string)
      setSurname(surname as string)
      setAvatar(avatar as string)
      setBio(bio as string)
      setWhatsapp(whatsapp as string)
      setEmail(email as string)
    })
  }, [])

  return (
    <div id="page-teacher-profile" className="container">
      <PageHeader background={backgroundImg}>
        <div className="profile-header">
          <form>
            <div className="image-group">
              <div className="avatar-preview">
                <img
                  src={
                    avatar ||
                    'https://api.adorable.io/avatars/285/abott@adorable.png'
                  }
                  alt="avatar"
                />
                <img
                  src={cameraIcon}
                  alt="Icone Camera"
                  className="camera-icon"
                  onClick={(e) => {
                    handleUploadAvatar()
                  }}
                />
              </div>
            </div>
          </form>
          <h2>{name + ' ' + surname}</h2>
          <h3>{subject}</h3>
        </div>
      </PageHeader>

      <main>
        <form onSubmit={handleCreateClass}>
          <fieldset>
            {/*<legend>Seus dados</legend>*/}
            <div id="personal-info">
              <div id="name-info">
                <Input
                  label="Nome"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div id="surname-info">
                <Input
                  label="Sobrenome"
                  id="surname-info"
                  name="surname"
                  value={surname}
                  onChange={(e) => setSurname(e.target.value)}
                />
              </div>
              <div id="email-info">
                <Input
                  label="E-mail"
                  name="email"
                  value={email}
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div id="whatsapp-info">
                <Input
                  label="Whatsapp"
                  name="whatsapp"
                  value={whatsapp}
                  placeholder="(  ) _ ____-____"
                  type="tel"
                  accept="number"
                  pattern="[0-9]{2}-[0-9]{5}-[0-9]{4}"
                  onChange={(e) => setWhatsapp(e.target.value)}
                />
              </div>
              <div id="bio-info">
                <Textarea
                  label="Biografia"
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>Sobre a aula</legend>
            <div id="subject-info">
              <div>
                <Select
                  label="Matéria"
                  name="subject"
                  options={[
                    { value: 'Artes', label: 'Artes' },
                    {
                      value: 'Biologia',
                      label: 'Biologia',
                    },
                    {
                      value: 'Ciências',
                      label: 'Ciências',
                    },
                    {
                      value: 'Educação Física',
                      label: 'Educação Física',
                    },
                    {
                      value: 'Geografia',
                      label: 'Geografia',
                    },
                    {
                      value: 'História',
                      label: 'História',
                    },
                    {
                      value: 'Matemática',
                      label: 'Matemática',
                    },
                    {
                      value: 'Português',
                      label: 'Português',
                    },
                    { value: 'Química', label: 'Química' },
                  ]}
                  value={subject}
                  onChange={(e) =>
                    setSubject(e.target.options[e.target.selectedIndex].value)
                  }
                />
              </div>
              <div>
                <Input
                  label="Custo da sua hora por aula"
                  name="cost"
                  value={cost}
                  onChange={(e) => setCost(e.target.value)}
                />
              </div>
            </div>
          </fieldset>
          <fieldset>
            <legend>
              Horários disponíveis
              <button type="button" onClick={addNewScheduleItem}>
                + Novo horário
              </button>
            </legend>
            {scheduleItems.map((scheduleItem, index) => {
              return (
                <div key={index}>
                  <div className="schedule-item">
                    <Select
                      label="Dia da Semana"
                      name="week_day"
                      options={[
                        {
                          value: '0',
                          label: 'Domingo',
                        },
                        {
                          value: '1',
                          label: 'Segunda-feira',
                        },
                        {
                          value: '2',
                          label: 'Terça-feira',
                        },
                        {
                          value: '3',
                          label: 'Quarta-feira',
                        },
                        {
                          value: '4',
                          label: 'Quinta-feira',
                        },
                        {
                          value: '5',
                          label: 'Sexta-feira',
                        },
                        { value: '6', label: 'Sábado' },
                      ]}
                      value={scheduleItem.week_day}
                      onChange={(e) =>
                        setScheduleItemValue(index, 'week_day', e.target.value)
                      }
                    />
                    <Input
                      label="Das"
                      name="from"
                      type="time"
                      value={scheduleItem.from}
                      onChange={(e) =>
                        setScheduleItemValue(index, 'from', e.target.value)
                      }
                    />
                    <Input
                      label="Até"
                      name="to"
                      type="time"
                      value={scheduleItem.to}
                      onChange={(e) =>
                        setScheduleItemValue(index, 'to', e.target.value)
                      }
                    />
                  </div>
                  <div className="schedule-item-delete">
                    <hr />
                    <span onClick={(e) => handleDeleteClass(index)}>
                      Excluir horário
                    </span>
                    <hr />
                  </div>
                </div>
              )
            })}
          </fieldset>
          <footer>
            <p>
              <img src={warningIcon} alt="Aviso importante" />
              Importante! <br />
              Preencha todos os dados
            </p>
            <button type="submit">Salvar cadastro</button>
          </footer>
        </form>
      </main>
    </div>
  )
}

export default TeacherProfile
