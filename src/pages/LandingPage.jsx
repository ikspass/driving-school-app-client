import React, {useEffect, useState} from 'react'
import Separator from '../components/UI/Separator/Separator'
import { fetchInstructors, fetchTeachers, fetchTransports } from '../http/adminAPI'

const LandingPage = () => {
  const [loading, setLoading] = useState(true)
  const [instructors, setInstructors] = useState([])
  const [teachers, setTeachers] = useState([])
  const [transports, setTransports] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instructorsData = await fetchInstructors();
        const updatedInstructorsData = instructorsData.map(instructor => ({fullName: instructor.user.fullName, img: instructor.user.img}));
        setInstructors(updatedInstructorsData);

        const teachersData = await fetchTeachers();
        const updatedTeachersData = teachersData.map(teacher => ({fullName: teacher.user.fullName, img: teacher.user.img}));
        setTeachers(updatedTeachersData);

        const transportsData = await fetchTransports();
        setTransports(transportsData);

      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData();
  }, [])
  
  if (loading) {
    return <div className="small-text">Загрузка...</div>;
  }
  
  return (
    <div className='content-container' style={{gap: '150px'}}>
      <p className="heading-text-2">Автошкола автоводитель плюс</p>
      <div className='content-container' style={{width: '600px'}}>
        <p className="heading-text-2">Об автошколе</p>
        <p className="">
          Автошкола в Минске ООО «АвтоводительПлюс» находится в центре, в районе станции метро Немига (за торговым домом «На Немиге») на ул. Раковская 20. Автошкола работает с 1978 года, и за всё время работы мы успешно обучили вождению более 50 000 человек.
        </p>
        <p className="">
          Мы обучаем на категорию «B». Преподаватели и инструкторы автошколы — высококвалифицированные специалисты с большим опытом преподавания. Обучение вождению проводится на современных иномарках с МКПП и с АКПП.
        </p>
        <p className="">
          Есть возможность подготовки организованных групп сотрудников компаний с оплатой по безналичному расчету.
        </p>
        <p className="">
          Также при необходимости мы предлагаем дополнительные занятия вождения на автодроме или в городе студентам нашей и других школ
        </p>
      </div>
      <div className='content-container'>
        <p className="heading-text-2" style={{marginBottom: '40px'}}>Расписание занятий</p>
        <div className="horizontal-container" style={{gap: '70px'}}>
          <div className="content-container" style={{textAlign: 'center'}}>
            <p className="heading-text-2">
              Утренние
            </p>
            <Separator />
            <p className="">
              Для записи в автошколу понадобится пакет документов, который включает:
            </p>
          </div>
          <div className="content-container" style={{textAlign: 'center'}}>
            <p className="heading-text-2">
              Дневные
            </p>
            <Separator />
            <p className="">
              Для записи в автошколу понадобится пакет документов, который включает:
            </p>
          </div>
          <div className="content-container" style={{textAlign: 'center'}}>
            <p className="heading-text-2">
              Вечерние
            </p>
            <Separator />
            <p className="">
              Для записи в автошколу понадобится пакет документов, который включает:
            </p>
          </div>
        </div>
      </div>
      <div className='content-container' style={{width: '600px'}}>
        <p className="heading-text-2">Запись на обучение</p>
        <p className="">
          Для записи в автошколу понадобится пакет документов, который включает:
        </p>
        <p className="">- Паспорт</p>
        <p className="">- Медицинская справка о прохождении освидетельствования</p>
        <p className="">- 3 фотографии 3 х 4</p>
      </div>
      <div className="content-container">
        <p className="heading-text-2">Наши инструкторы</p>
        <div className="horizontal-container" style={{flexWrap: 'wrap', justifyContent: 'center'}}>
          {instructors.map((instructor, index) => 
            <div key={index} className="message-frame filter-container" style={{width: 'fit-content', alignItems: 'center', textAlign: 'center'}}>
              <div className="image-container">
                <img src={`${process.env.REACT_APP_API_URL}/${instructor.img}`} alt={instructor.fullName} />
              </div>
              <p>{instructor.fullName}</p>
            </div>
          )}
        </div>
      </div>
      <div className="content-container">
        <p className="heading-text-2">Наши преподаватели</p>
        <div className="horizontal-container"  style={{flexWrap: 'wrap', justifyContent: 'center'}}>
          {teachers.map((instructor, index) => 
            <div key={index} className="message-frame filter-container" style={{width: 'fit-content', alignItems: 'center'}}>
              <div className="image-container">
                <img src={`${process.env.REACT_APP_API_URL}/${instructor.img}`} alt={instructor.fullName} />
              </div>
              <p>{instructor.fullName}</p>
            </div>
          )}
        </div>
      </div>
      <div className="content-container">
          <p className="heading-text-2">Автопарк</p>
          <div className="horizontal-container" style={{flexWrap: 'wrap', justifyContent: 'center'}}>
            {transports.map((transport, index) => 
              <div key={index} className="message-frame content-container" style={{width: '300px'}}>
                <p>{transport.name}</p>
                <Separator />
                <p>{transport.color}</p>
              </div>
            )}
          </div>
      </div>
    </div>
  )
}

export default LandingPage