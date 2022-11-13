import {NavLink} from "react-router-dom";


function Footer(){

    return<div className={'bg-gray-100 grid grid-cols-2 xl:flex xl:flex-row md:flex md:flex-row lg:flex lg:flex-row justify-around xl:justify-center  md:space-x-16 lg:space-x-16 xl:space-x-16 py-8 pb-16 px-10 xl:px-0'}>
        <div className={'flex flex-col space-y-1.5'}>
            <div className={'text-xl font-bold pb-2'}>
                Услуги
            </div>
            <NavLink to={'/'}>
                Модернизация
            </NavLink>
            <NavLink to={'/'}>
                Тех. Обслуживание
            </NavLink>
            <NavLink to={'/'}>
                Кастомизация
            </NavLink>
            <NavLink to={'/'}>
                Сервис центр
            </NavLink>
        </div>
        <div className={'flex flex-col space-y-1.5'}>
            <div className={'text-xl font-bold pb-2'}>
                Поддержка
            </div>
            <NavLink to={'/'}>
                Доставка
            </NavLink>
            <NavLink to={'/'}>
                Оплата
            </NavLink>
            <NavLink to={'/'}>
                Гарантия
            </NavLink>
            <NavLink to={'/'}>
                FAQ
            </NavLink>
        </div>
        <div className={'flex flex-col  space-y-1.5 mt-4 md:mt-0'}>
            <div className={'text-xl font-bold pb-2'}>
                Компания
            </div>
            <NavLink to={'/'}>
                Контакты
            </NavLink>
            <NavLink to={'/'}>
                О нас
            </NavLink>
            <NavLink to={'/'}>
                Новости
            </NavLink>
        </div>
        <div className={'flex flex-col  space-y-1.5 mt-4 md:mt-0'}>
            <div className={'text-xl font-bold pb-2'}>
                Контакты
            </div>
            <NavLink to={'/'}>
                +7 (999) 999 99-99
            </NavLink>
            <NavLink to={'/'}>
                Белгород
            </NavLink>
            <NavLink to={'/'}>
                telegram
            </NavLink>
        </div>
    </div>
}

export default Footer