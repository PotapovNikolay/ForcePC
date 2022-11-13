
function CountItemsInCart(){
    return<div className={'flex flex-row text-white'}>
        <button className={'text-[#00c78d] text-3xl'}>
            -
        </button>
        <div className={'text-3xl'}>
            1
        </div>
        <button className={'text-[#00c78d] text-3xl'}>
            +
        </button>
    </div>
}

function ItemCart() {
    return <div className={'flex flex-row rounded-2xl py-5 px-5 shadow-md shadow-gray-100 justify-between'}>
        <div className={'flex flex-row space-x-5'}>
            <div>
                <div className={'w-20 h-20 bg-gray-300'}>

                </div>
            </div>
            <div className={'flex flex-col self-start'}>
                <div className={'font-medium text-lg'}>
                    Офисный компьютер
                </div>
                <div className={''}>
                    что то на тонком
                </div>
            </div>
        </div>
        <div className={'self-center'}>
            <CountItemsInCart/>
        </div>
        <div>

        </div>
    </div>
}

function Cart() {

    return <div className={'text-white w-2/3 pl-8 mt-8'}>
        <div className={'flex flex-row justify-between'}>
            <div className={'flex flex-row items-end space-x-8'}>
                <div className={'text-4xl'}>
                    Корзина
                </div>
                <div>
                    предмет
                </div>
            </div>
            <div className={'flex flex-row'}>
                <div>
                    всего
                </div>
                <div>
                    304 0000
                </div>
            </div>
        </div>
        <div className={'flex flex-col mt-8'}>
            <ItemCart/>
        </div>
    </div>
}

export default Cart