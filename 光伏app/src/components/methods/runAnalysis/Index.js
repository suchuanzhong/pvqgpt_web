import { fetch} from '@/plugin/axios';
export default {
  index(year) {
    return new Promise(resolve => {
      fetch('./../../../../static/json/yxfx.json',{year:year}).then(res => {
         
              resolve(res)

       
      })
    })
  },
}