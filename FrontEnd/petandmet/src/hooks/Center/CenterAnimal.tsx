import axios from "axios"

interface Animal{
    request: {
      name: string,
      age: number,
      specie: string,
      breed: string,
      gender: string,
      character: string,
      find_place: string,
      center_uuid: string,
      enter_date: string,
      adoption_status: string,
      enter_age: number,
      notice_date: string,
      adoption_start_date: string,
    },
    image: string
  }
const AnimalEnroll = (params: Animal, accessToken : string| unknown, domain : string) => {
        try{
            axios.post(`${domain}/animal`, params,
            {
                headers: {
                    Authorization: `${accessToken}`,
                }
            }
            ).then((res) =>{
                console.log('등록 완료', res)
            })
        }catch(error){
            console.log(error)
        }
    }

interface AnimalData{
  uuid: string| null,
  name: string| null,
  age: number| null,
  specie: string| null,
  breed: string| null,
  gender: string| null,
  character: string| null,
  find_place: string| null,
  center_uuid: string | unknown,
  enter_date: string| null,
  adoption_status: string| null,
  enter_age: number| null,
  notice_date: string| null,
  adoption_start_date: string| null,
  photo_url: string| null
}
const AnimalUpdate = (params: AnimalData, accessToken : string| unknown, domain : string) => {
    try{
        axios.patch(`${domain}/animal`, params,
        {
            headers: {
                Authorization: `${accessToken}`,
            }
        }
        ).then((res) =>{
            console.log('동물 수정 완료', res)
        })
    }catch(error){
        console.log(error)
    }
}

const AnimalDelete = (params: number, accessToken : string| unknown, domain : string) => {
    console.log(params)
    console.log(accessToken)
    console.log(domain)
    try{
        axios.delete(`${domain}/animal/${params}`,
        {
            headers: {
                Authorization: `${accessToken}`,
            }
        }
        ).then((res) =>{
            console.log('동물 삭제 완료', res)
        })
    }catch(error){
        console.log(error)
    }
}
export { AnimalEnroll, AnimalUpdate, AnimalDelete }

    