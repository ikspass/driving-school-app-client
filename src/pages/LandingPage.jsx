import React from 'react'
import Separator from '../components/UI/Separator/Separator'

const LandingPage = () => {

  return (
    <div className='content-container' style={{gap: '50px'}}>
      <div className="content-container">
        <p className="heading-text-2">Автошкола автоводитель плюс</p>
        <div className="horizontal-container">
          <div className="image-container">
            <img src="" alt="Изображение 1" />
          </div>
          <div className="image-container">
            <img src="" alt="Изображение 2" />
          </div>
          <div className="image-container">
            <img src="" alt="Изображение 3" />
          </div>
        </div>
      </div>
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
        <p className="heading-text-2">Расписание занятий</p>
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
      </div>
      <div className="content-container">
        <p className="heading-text-2">Наши преподаватели</p>
      </div>
    </div>
  )
}

export default LandingPage