import {useCallback, useEffect, useState} from "react";
import axios from "../../utils/axios";
import {useParams} from "react-router-dom";


function PCPage() {

    const [PC, setPC] = useState(null)
    const params = useParams()

    const fetchPC = useCallback(async () => {
        const {data} = await axios.get(`/store/${params.id}`)
        console.log(data)
        setPC(data)
    }, [params.id])
    console.log('pc',PC)

    useEffect(()=>{
        fetchPC()
    },[fetchPC])

    if (!PC){
        return <div>Загрузка</div>
    }

    return<div className={'text-white text-5xl'}>
страница компьютера
        {PC.name}
        {/*{PC.name}*/}
    </div>

}

export  default PCPage