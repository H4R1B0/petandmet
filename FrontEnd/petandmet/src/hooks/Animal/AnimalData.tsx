import axios from "axios"

interface AnimalData{
    name: string| null,
    age: number| null,
    specie: string| null,
    breed: string| null,
    gender: string| null,
    character: string| null,
    find_place: string| null,
    center_uuid: string,
    enter_date: string| null,
    adoption_status: string| null,
    enter_age: number| null,
    notice_date: string| null,
    adoption_start_date: string| null,
    photo_url: string| null
  }

  const GetAnimal = async (params: string | undefined, accessToken: string | unknown, domain: string) => {
    try {
      const res = await axios.get(`${domain}/animal/detail?uuid=${params}`, {
        headers: {
          Authorization: `${accessToken}`,
        },
      });
  
      console.log('동물 정보 획득 완료', res.data.response);
      return res.data.response as AnimalData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const DeleteAnimal = async (params: string | undefined, accessToken: string | unknown, domain: string) => {
      
      try{
          axios.delete(`${domain}/animal/${params}`,
          {
              headers: {
                  Authorization: `${accessToken}`,
                }
            }
            ).then((res) =>{
            console.log(params)
            console.log('동물 삭제 완료', res)
        })
    }catch(error){
        console.log(error)
    }
  };
export { GetAnimal, DeleteAnimal }
