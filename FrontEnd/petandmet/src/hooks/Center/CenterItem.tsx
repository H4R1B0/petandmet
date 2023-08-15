import axios from "axios"

interface item{
    center_uuid : string | unknown,
    item_name : string | null,
    item_url : string | null,
    item_target_price : number | null
}
export const ItemEnroll = (params: item, accessToken : string| unknown, domain : string) => {
        try{
            axios.post(`${domain}/center/item`, params,
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

    